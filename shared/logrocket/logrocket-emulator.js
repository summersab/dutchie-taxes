'use strict';

import { isUndefined, isFunction, isError, objectMerge, hasKey, htmlElementAsString } from './utils';

function NotImplemented() {}

function now() {
  return +new Date();
}

// First, check for JSON support
// If there is no JSON, we no-op the core features of LogRocket
// since JSON is required to encode the payload
export default function LogRocket() {
  this._hasJSON = !!(typeof JSON === 'object' && JSON.stringify);
  // LogRocket can run in contexts where there's no document (react-native)
  this._hasDocument = typeof document !== 'undefined';
  this._lastCapturedException = null;
  this._lastEventId = null;
  this._globalServer = null;
  this._globalKey = null;
  this._globalProject = null;
  this._globalContext = {};
  this._globalOptions = {
    logger: 'javascript',
    ignoreErrors: [],
    ignoreUrls: [],
    whitelistUrls: [],
    includePaths: [],
    crossOrigin: 'anonymous',
    collectWindowErrors: true,
    maxMessageLength: 0,
    stackTraceLimit: 50,
  };
  this._ignoreOnError = 0;
  this._isLogRocketInstalled = false;
  this._originalErrorStackTraceLimit = Error.stackTraceLimit;
  // capture references to window.console *and* all its methods first
  // before the console plugin has a chance to monkey patch
  this._originalConsole = window.console || {};
  this._originalConsoleMethods = {};
  this._plugins = [];
  this._startTime = now();
  this._wrappedBuiltIns = [];
  this._breadcrumbs = [];
  this._breadcrumbLimit = 20;
  this._lastCapturedEvent = null;
  this._lastHref = window.location && location.href;
  this.sessionURL = 'DEV';

  for (var method in this._originalConsole) {
    // eslint-disable-line guard-for-in
    this._originalConsoleMethods[method] = this._originalConsole[method];
  }
}

LogRocket.init = function (...args) {
  const lr = new LogRocket();
  lr.init(...args);
};

LogRocket.track = NotImplemented;
LogRocket.identify = NotImplemented;

/*
 * The core LogRocket singleton
 *
 * @this {LogRocket}
 */

LogRocket.prototype = {
  init() {
    this._wrapBuiltIns();
  },

  captureBreadcrumb(type, data) {
    var crumb = {
      type: type,
      timestamp: now() / 1000,
      data: data,
    };

    this._breadcrumbs.push(crumb);
    if (this._breadcrumbs.length > this._breadcrumbLimit) {
      this._breadcrumbs.shift();
    }
  },

  /*
   * Manually capture an exception and send it over to Sentry
   *
   * @param {error} ex An exception to be logged
   * @param {object} options A specific set of options for this error [optional]
   * @return {Raven}
   */
  captureException(ex, options) {
    // If not an Error is passed through, recall as a message instead
    if (!isError(ex)) return this.captureMessage(ex, options);

    // Store the raw exception object for potential debugging and introspection
    this._lastCapturedException = ex;

    // TraceKit.report will re-raise any exception passed to it,
    // which means you have to wrap it in try/catch. Instead, we
    // can wrap it here and only re-raise if TraceKit.report
    // raises an exception different from the one we asked to
    // report on.
    try {
      // var stack = TraceKit.computeStackTrace(ex);
      // this._handleStackInfo(stack, options);
    } catch (ex1) {
      if (ex !== ex1) {
        throw ex1;
      }
    }

    return this;
  },

  /*
   * Manually send a message to Sentry
   *
   * @param {string} msg A plain message to be captured in Sentry
   * @param {object} options A specific set of options for this message [optional]
   * @return {Raven}
   */
  captureMessage(msg, options) {
    // config() automagically converts ignoreErrors from a list to a RegExp so we need to test for an
    // early call; we'll error on the side of logging anything called before configuration since it's
    // probably something you should see:
    if (!!this._globalOptions.ignoreErrors.test && this._globalOptions.ignoreErrors.test(msg)) {
      return;
    }

    // Fire away!
    this._send(
      objectMerge(
        {
          message: msg + '', // Make sure it's actually a string
        },
        options
      )
    );

    return this;
  },

  _send(data) {
    console.log(JSON.stringify(data, null, 2));
    console.log('Fake LogRocket thinks we should send a message', data);
  },

  /*
   * Wrap code within a context and returns back a new function to be executed
   *
   * @param {object} options A specific set of options for this context [optional]
   * @param {function} func The function to be wrapped in a new context
   * @param {function} func A function to call before the try/catch wrapper [optional, private]
   * @return {function} The newly wrapped functions with a context
   */
  wrap(options, func, _before) {
    'use strict';

    var self = this;
    // 1 argument has been passed, and it's not a function
    // so just return it
    if (isUndefined(func) && !isFunction(options)) {
      return options;
    }

    // options is optional
    if (isFunction(options)) {
      func = options;
      options = undefined;
    }

    // At this point, we've passed along 2 arguments, and the second one
    // is not a function either, so we'll just return the second argument.
    if (!isFunction(func)) {
      return func;
    }

    // We don't wanna wrap it twice!
    try {
      if (func.__lr__) {
        return func;
      }
    } catch (e) {
      // Just accessing the __lr__ prop in some Selenium environments
      // can cause a "Permission denied" exception (see lr-js#495).
      // Bail on wrapping and return the function as-is (defers to window.onerror).
      return func;
    }

    // If this has already been wrapped in the past, return that
    if (func.__lr_wrapper__) {
      return func.__lr_wrapper__;
    }

    function wrapped() {
      var args = [],
        i = arguments.length,
        deep = !options || (options && options.deep !== false);

      if (_before && isFunction(_before)) {
        _before.apply(this, arguments);
      }

      // Recursively wrap all of a function's arguments that are
      // functions themselves.
      while (i--) args[i] = deep ? self.wrap(options, arguments[i]) : arguments[i];

      try {
        return func.apply(this, args);
      } catch (e) {
        self._ignoreNextOnError();
        self.captureException(e, options);
        throw e;
      }
    }

    // copy over properties of the old function
    for (var property in func) {
      if (hasKey(func, property)) {
        wrapped[property] = func[property];
      }
    }
    wrapped.prototype = func.prototype;

    // THIS IS THE LOGROCKET EMULATOR
    // IF YOU SEE AN EXCEPTION HERE, CHECK shared/hooks/use-fix-log-rocket.js
    func.__lr_wrapper__ = wrapped;
    // Signal that this function has been wrapped already
    // for both debugging and to prevent it to being wrapped twice
    wrapped.__lr__ = true;
    wrapped.__inner__ = func;

    return wrapped;
  },

  /**
   * Wraps addEventListener to capture breadcrumbs
   * @param evtName the event name (e.g. "click")
   * @param fn the function being wrapped
   * @returns {Function}
   * @private
   */
  _breadcrumbEventHandler(evtName) {
    var self = this;
    return function (evt) {
      // It's possible this handler might trigger multiple times for the same
      // event (e.g. event propagation through node ancestors). Ignore if we've
      // already captured the event.
      if (self._lastCapturedEvent === evt) return;

      self._lastCapturedEvent = evt;
      var elem = evt.target;
      self.captureBreadcrumb('ui_event', {
        type: evtName,
        target: () => {
          if (elem === document) return 'document';
          if (elem === window) return 'window';
          return htmlElementAsString(elem);
        },
      });
    };
  },

  /**
   * Install any queued plugins
   */
  _wrapBuiltIns() {
    var self = this;

    function fill(obj, name, replacement, noUndo) {
      var orig = obj[name];
      obj[name] = replacement(orig);
      if (!noUndo) {
        self._wrappedBuiltIns.push([obj, name, orig]);
      }
    }

    function wrapTimeFn(orig) {
      return function (fn, t) {
        // preserve arity
        // Make a copy of the arguments
        var args = [].slice.call(arguments);
        var originalCallback = args[0];
        if (isFunction(originalCallback)) {
          args[0] = self.wrap(originalCallback);
        }

        // IE < 9 doesn't support .call/.apply on setInterval/setTimeout, but it
        // also supports only two arguments and doesn't care what this is, so we
        // can just call the original function directly.
        if (orig.apply) {
          return orig.apply(this, args);
        } else {
          return orig(args[0], args[1]);
        }
      };
    }

    fill(window, 'setTimeout', wrapTimeFn);
    fill(window, 'setInterval', wrapTimeFn);
    if (window.requestAnimationFrame) {
      fill(window, 'requestAnimationFrame', function (orig) {
        return function (cb) {
          return orig(self.wrap(cb));
        };
      });
    }

    // Capture breadcrumbs from any click that is unhandled / bubbled up all the way
    // to the document. Do this before we instrument addEventListener.
    if (this._hasDocument) {
      document.addEventListener('click', self._breadcrumbEventHandler('click'));
    }

    // event targets borrowed from bugsnag-js:
    // https://github.com/bugsnag/bugsnag-js/blob/master/src/bugsnag.js#L666
    'EventTarget Window Node ApplicationCache AudioTrackList ChannelMergerNode CryptoOperation EventSource FileReader HTMLUnknownElement IDBDatabase IDBRequest IDBTransaction KeyOperation MediaController MessagePort ModalWindow Notification SVGElementInstance Screen TextTrack TextTrackCue TextTrackList WebSocket WebSocketWorker Worker XMLHttpRequest XMLHttpRequestEventTarget XMLHttpRequestUpload'.replace(
      /\w+/g,
      function (global) {
        var proto = window[global] && window[global].prototype;
        if (proto && proto.hasOwnProperty && proto.hasOwnProperty('addEventListener')) {
          fill(proto, 'addEventListener', function (orig) {
            return function (evt, fn, capture, secure) {
              // preserve arity
              try {
                if (fn && fn.handleEvent) {
                  fn.handleEvent = self.wrap(fn.handleEvent);
                }
              } catch (err) {
                // can sometimes get 'Permission denied to access property "handle Event'
              }

              // TODO: more than just click
              var before;
              if ((global === 'EventTarget' || global === 'Node') && evt === 'click') {
                before = self._breadcrumbEventHandler(evt, fn);
              }
              return orig.call(this, evt, self.wrap(fn, undefined, before), capture, secure);
            };
          });
          fill(proto, 'removeEventListener', function (orig) {
            return function (evt, fn, capture, secure) {
              fn = fn && (fn.__lr_wrapper__ ? fn.__lr_wrapper__ : fn);
              return orig.call(this, evt, fn, capture, secure);
            };
          });
        }
      }
    );

    if ('XMLHttpRequest' in window) {
      var xhrproto = XMLHttpRequest.prototype;
      fill(xhrproto, 'open', function (origOpen) {
        return function (method, url) {
          // preserve arity
          this.__lr_xhr = {
            method: method,
            url: url,
            statusCode: null,
          };
          return origOpen.apply(this, arguments);
        };
      });

      fill(xhrproto, 'send', function (origSend) {
        return function (data) {
          // preserve arity
          var xhr = this;
          'onreadystatechange onload onerror onprogress'.replace(/\w+/g, function (prop) {
            if (prop in xhr && isFunction(xhr[prop])) {
              fill(
                xhr,
                prop,
                function (orig) {
                  if (prop === 'onreadystatechange' && xhr.__lr_xhr && (xhr.readyState === 1 || xhr.readyState === 4)) {
                    try {
                      // touching statusCode in some platforms throws
                      // an exception
                      xhr.__lr_xhr.statusCode = xhr.status;
                    } catch (e) {
                      /* do nothing */
                    }
                    self.captureBreadcrumb('http_request', xhr.__lr_xhr);
                  }
                  return self.wrap(orig);
                },
                true /* noUndo */
              ); // don't track filled methods on XHR instances
            }
          });
          return origSend.apply(this, arguments);
        };
      });
    }

    // record navigation (URL) changes
    if ('history' in window && history.pushState) {
      // TODO: remove onpopstate handler on uninstall()
      var oldOnPopState = window.onpopstate;
      window.onpopstate = function () {
        self.captureBreadcrumb('navigation', {
          from: self._lastHref,
          to: location.href,
        });

        // because onpopstate only tells you the "new" (to) value of location.href, and
        // not the previous (from) value, we need to track the value of location.href
        // ourselves
        self._lastHref = location.href;
        if (oldOnPopState) {
          return oldOnPopState.apply(this, arguments);
        }
      };

      fill(history, 'pushState', function (origPushState) {
        // note history.pushState.length is 0; intentionally not declaring
        // params to preserve 0 arity
        return function (/* state, title, url */) {
          var url = arguments.length > 2 ? arguments[2] : undefined;
          self.captureBreadcrumb('navigation', {
            to: url,
            from: location.href,
          });
          if (url) self._lastHref = url;
          return origPushState.apply(this, arguments);
        };
      });
    }

    // console
    // if ('console' in window && console.log) {
    //   consolePlugin(self, console, {
    //     levels: ['debug', 'info', 'warn', 'error', 'log'],
    //     callback(msg, data) {
    //       self.captureBreadcrumb('message', {
    //         level: data.level,
    //         message: msg,
    //       });
    //     },
    //   });
    // }

    var $ = window.jQuery || window.$;
    if ($ && $.fn && $.fn.ready) {
      fill($.fn, 'ready', function (orig) {
        return function (fn) {
          return orig.call(this, self.wrap(fn));
        };
      });
    }
  },

  _restoreBuiltIns() {
    // restore any wrapped built-ins
    var builtin;
    while (this._wrappedBuiltIns.length) {
      builtin = this._wrappedBuiltIns.shift();

      var obj = builtin[0],
        name = builtin[1],
        orig = builtin[2];

      obj[name] = orig;
    }
  },

  /**** Private functions ****/
  _ignoreNextOnError() {
    var self = this;
    this._ignoreOnError += 1;
    setTimeout(function () {
      // onerror should trigger before setTimeout
      self._ignoreOnError -= 1;
    });
  },
};
