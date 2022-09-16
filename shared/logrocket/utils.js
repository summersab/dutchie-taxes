'use strict';

/*
Do not clean up this file

This is copy and pasted *directly* from log rocket's source code
The point of this file is to run logrocket's code without running logrocket
because logrocket sometimes breaks other things so we need it running all the time
but it's really expensive so we can't actually initialize actual logrocket

In production this file is not used and instead logrocket's file is used
If there's an exception coming from this file then the odds are there is an
exception on production. you need to look at how it's being called and fix the bad
usage (which could be other files shared/logrocket, just not this one)


tl;dr: Fixing exceptions in this file will never fix exceptions in production.


*/

var objectPrototype = Object.prototype;

export function isUndefined(what) {
  return what === void 0;
}

export function isFunction(what) {
  return typeof what === 'function';
}

export function isString(what) {
  return objectPrototype.toString.call(what) === '[object String]';
}

export function isObject(what) {
  return typeof what === 'object' && what !== null;
}

export function isEmptyObject(what) {
  for (var _ in what) return false; // eslint-disable-line guard-for-in, no-unused-vars
  return true;
}

// Sorta yanked from https://github.com/joyent/node/blob/aa3b4b4/lib/util.js#L560
// with some tiny modifications
export function isError(what) {
  var toString = objectPrototype.toString.call(what);
  return (
    (isObject(what) && toString === '[object Error]') ||
    toString === '[object Exception]' || // Firefox NS_ERROR_FAILURE Exceptions
    what instanceof Error
  );
}

export function each(obj, callback) {
  var i, j;

  if (isUndefined(obj.length)) {
    for (i in obj) {
      if (hasKey(obj, i)) {
        callback.call(null, i, obj[i]);
      }
    }
  } else {
    j = obj.length;
    if (j) {
      for (i = 0; i < j; i++) {
        callback.call(null, i, obj[i]);
      }
    }
  }
}

export function objectMerge(obj1, obj2) {
  if (!obj2) {
    return obj1;
  }
  each(obj2, function (key, value) {
    obj1[key] = value;
  });
  return obj1;
}

export function truncate(str, max) {
  return !max || str.length <= max ? str : str.substr(0, max) + '\u2026';
}

/**
 * hasKey, a better form of hasOwnProperty
 * Example: hasKey(MainHostObject, property) === true/false
 *
 * @param {Object} host object to check property
 * @param {string} key to check
 */
export function hasKey(object, key) {
  return objectPrototype.hasOwnProperty.call(object, key);
}

export function joinRegExp(patterns) {
  // Combine an array of regular expressions and strings into one large regexp
  // Be mad.
  var sources = [],
    i = 0,
    len = patterns.length,
    pattern;

  for (; i < len; i++) {
    pattern = patterns[i];
    if (isString(pattern)) {
      // If it's a string, we need to escape it
      // Taken from: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
      sources.push(pattern.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1'));
    } else if (pattern && pattern.source) {
      // If it's a regexp already, we want to extract the source
      sources.push(pattern.source);
    }
    // Intentionally skip other cases
  }
  return new RegExp(sources.join('|'), 'i');
}

export function urlencode(o) {
  var pairs = [];
  each(o, function (key, value) {
    pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
  });
  return pairs.join('&');
}

export function uuid4() {
  var crypto = window.crypto || window.msCrypto;

  if (!isUndefined(crypto) && crypto.getRandomValues) {
    // Use window.crypto API if available
    var arr = new Uint16Array(8);
    crypto.getRandomValues(arr);

    // set 4 in byte 7
    arr[3] = (arr[3] & 0xfff) | 0x4000;
    // set 2 most significant bits of byte 9 to '10'
    arr[4] = (arr[4] & 0x3fff) | 0x8000;

    var pad = function (num) {
      var v = num.toString(16);
      while (v.length < 4) {
        v = '0' + v;
      }
      return v;
    };

    return (
      pad(arr[0]) + pad(arr[1]) + pad(arr[2]) + pad(arr[3]) + pad(arr[4]) + pad(arr[5]) + pad(arr[6]) + pad(arr[7])
    );
  } else {
    // http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/2117523#2117523
    return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}

/**
 * Returns a simple, child-less string representation of a DOM element
 * e.g. [HTMLElement] => <input class="btn" />
 * @param HTMLElement
 */
export function htmlElementAsString(elem) {
  var out = ['<'];
  out.push(elem.tagName.toLowerCase());
  var attrWhitelist = ['id', 'type', 'name', 'value', 'class', 'placeholder', 'title', 'alt'];
  each(attrWhitelist, function (index, key) {
    var attr = elem.getAttribute(key);
    if (attr) {
      out.push(' ' + key + '="' + attr + '"');
    }
  });
  out.push(' />');
  return out.join('');
}
