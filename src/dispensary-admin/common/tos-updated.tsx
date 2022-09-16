import { useMutation } from '@apollo/react-hooks';
import React, { useEffect } from 'react';

import { setViewedTermsOfService, acceptTermsOfService } from 'shared/graphql/user/mutations';
import { useStores } from 'src/hooks/use-stores';
import { UpdateBanner } from 'src/components/update-banner';

type Props = {
  hideTOSBanner: () => void;
};

export function TermsOfServiceUpdated(props: Props): JSX.Element {
  const { hideTOSBanner } = props;
  const { apolloClient, User, UI } = useStores();
  const { profile } = User;
  const [saveTOSAccepted] = useMutation(acceptTermsOfService, { client: apolloClient });

  async function handleAcceptTOS(): Promise<void> {
    try {
      await saveTOSAccepted();
      hideTOSBanner();
    } catch (err) {
      console.error({ err });
      UI.showErnie('Something went wrong, please try again.', 'danger');
    }
  }

  useEffect(() => {
    async function setViewedTOS(): Promise<void> {
      if (!profile.firstViewedTOS) {
        await apolloClient.mutate({
          mutation: setViewedTermsOfService,
        });
      }
    }
    void setViewedTOS();
  }, [apolloClient, profile.firstViewedTOS]);

  return (
    <UpdateBanner buttonText='Got it, thanks' heading="We've Updated our Terms of Service" onClick={handleAcceptTOS}>
      By clicking the button to the right, or through continued use, you acknowledge that you've read and agree to these
      <a target='_blank' href='/images/legal-terms.pdf'>
        terms
      </a>
      .
    </UpdateBanner>
  );
}
