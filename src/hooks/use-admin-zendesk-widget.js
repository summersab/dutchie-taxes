import _ from 'lodash';
import { useEffect } from 'react';
import { useStores } from 'src/hooks/use-stores';
import PublicEnv from 'shared/utils/public-env';
import { hideZendeskWidget, showZendeskWidget } from 'shared/helpers/tools';
import { useFlags } from 'launchdarkly-react-client-sdk';

export default function useAdminZendeskWidget() {
  const { User } = useStores();
  const flags = useFlags();
  const widgetKey =
    PublicEnv.appEnv === 'production' ? 'ffeeab13-1fe5-4896-9223-6d3b19d9b497' : '8d311820-8a25-4ab5-b80d-9e859f0911dc';

  const rolloutZendeskMessengerWidget = flags['rollout.zendesk-messenger-widget'];

  useEffect(() => {
    if (_.isNil(rolloutZendeskMessengerWidget)) {
      return undefined;
    }
    const zendeskInitScript = document.createElement('script');
    zendeskInitScript.id = 'ze-snippet';
    zendeskInitScript.src = `https://static.zdassets.com/ekr/snippet.js?key=${widgetKey}`;
    zendeskInitScript.async = true;
    // this function will fire off a Segment tracking event when a live chat is initiated
    const trackChatWithSegment = (userId, userEmail) => {
      if (_.isFunction(window.zE)) {
        try {
          window.zE('webWidget:on', 'userEvent', (event) => {
            if (event.action === 'Chat Request Form Submitted' && window.analytics) {
              window.analytics.track('Live Chat Conversation Started', {
                userId,
                email: userEmail,
              });
            }
          });
        } catch (error) {
          if (window.Rollbar) {
            window.Rollbar.error(
              `zendesk webWidget userEvent failed with rollout.zendesk-messenger-widget as ${rolloutZendeskMessengerWidget}`,
              error
            );
          }
        }
      }
    };
    const ref = () => {
      console.log('zendesk loaded');

      if (rolloutZendeskMessengerWidget) {
        try {
          window.zE('messenger', 'loginUser', (serverCallback) => {
            serverCallback(`${User._user.zendeskWidgetToken}`);
          });
        } catch (error) {
          if (window.Rollbar) {
            window.Rollbar.error(
              `zendesk messenger loginUser failed with rollout.zendesk-messenger-widget as ${rolloutZendeskMessengerWidget}`,
              error
            );
          }
        }
      } else {
        trackChatWithSegment(User.id, User.email);
      }
    };

    document.body.appendChild(zendeskInitScript);
    if (!rolloutZendeskMessengerWidget) {
      window.zESettings = {
        webWidget: {
          authenticate: {
            jwtFn(serverCallback) {
              serverCallback(`${User._user.zendeskWidgetToken}`);
            },
          },
          contactForm: {
            fields: [
              { id: 'name', prefill: { '*': `${User._user.profile.fullName}` } },
              { id: 'email', prefill: { '*': `${User.email}` } },
            ],
          },
        },
      };
    }
    showZendeskWidget();
    window.addEventListener('load', ref);
    return () => {
      hideZendeskWidget();
      document.body.removeChild(zendeskInitScript);
      window.removeEventListener('load', ref);
    };
  }, [User, User._user.zendeskWidgetToken, rolloutZendeskMessengerWidget, widgetKey]);
}
