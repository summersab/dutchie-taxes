import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { useUI } from 'src/hooks/use-ui';
import useApolloClient from 'shared/hooks/use-apollo-client';

import { GqlDispensaries_Profile_Embed_Settings as GqlEmbedSettings } from 'types/graphql';

import { ModalContainer as Container, ModalPrimaryHeader as Header, ModalButton as Button } from 'shared/modals';
import { CheckboxOld as Checkbox } from 'shared/components';
import { chainDispensaryIds } from 'shared/graphql/dispensary/queries';
import { dispensaryUpdate } from 'shared/graphql/dispensary/mutations';
import Editor from 'src/dispensary-admin/settings/editor';

type AdvancedSettingsProps = {
  embedSettings: GqlEmbedSettings | null;
  onClose: () => void;
};

const initialState = {
  pageCSS: ``,
  iframeCSS: ``,
  disableRouting: false,
  disablePageLoadsAtTop: false,
  applyToAllLocations: false,
  autoGTM: false,
};

export default function AdvancedSettings({ embedSettings, onClose }: AdvancedSettingsProps): JSX.Element {
  const { dispensary, fetchDispensary, showErnie } = useUI();
  const apolloClient = useApolloClient();

  const [state, setState] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (embedSettings) {
      setIsLoading(true);
      const { iframeCSS, pageCSS, disableRouting, disablePageLoadsAtTop, applyToAllLocations, autoGTM } = embedSettings;
      setState({
        iframeCSS: iframeCSS ?? '',
        pageCSS: pageCSS ?? '',
        disableRouting: !!disableRouting,
        disablePageLoadsAtTop: !!disablePageLoadsAtTop,
        applyToAllLocations: !!applyToAllLocations,
        autoGTM: !!autoGTM,
      });
      setIsLoading(false);
    }
  }, [embedSettings]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.persist instanceof Function) {
      event.persist();
    }
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setState((prevState) => ({
      ...prevState,
      [event.target.name]: value,
    }));
  };

  const handleSubmit = async (): Promise<void> => {
    setIsLoading(true);
    try {
      let dispensaryIds = [dispensary.id];
      if (state.applyToAllLocations) {
        const { data } = await apolloClient.query({
          fetchPolicy: 'network-only',
          query: chainDispensaryIds,
          variables: { chainId: dispensary.chain },
        });

        if (data?.chainDispensaryIds) {
          dispensaryIds = data?.chainDispensaryIds;
        }
      }

      const updates = await Promise.all(
        dispensaryIds.map((id) =>
          apolloClient.mutate({
            mutation: dispensaryUpdate,
            variables: {
              input: {
                profile: {
                  embedSettings: state,
                },
                id,
              },
            },
          })
        )
      );

      await fetchDispensary();
      if (!updates.every((u) => u?.data?.dispensaryUpdate?.success)) {
        showErnie('Error updating embedded settings. Please try again', 'danger');
      }

      showErnie(
        `Successfully updated embedded settings for ${
          (state.applyToAllLocations ? dispensary.chain : dispensary.name) ?? ''
        }`,
        'success'
      );
      onClose();
    } catch (error) {
      showErnie('There was an error getting your id. Please contact support.', 'danger');
      console.error(error);
    }
    setIsLoading(false);
  };

  return (
    <Container isOpen onRequestClose={onClose} p='84px 35px 36px 35px' width='495px'>
      <Header copy='Advanced Embed Settings' close={onClose} />
      <ScrollableContent>
        <Checkbox
          name='disableRouting'
          label='Disable Routing'
          onChange={handleChange}
          checked={state.disableRouting}
          mb={2}
        />
        <Checkbox
          name='disablePageLoadsAtTop'
          label='Disable page loads at top of the iframe'
          onChange={handleChange}
          checked={state.disablePageLoadsAtTop}
          mb={2}
        />
        <Checkbox
          name='autoGTM'
          label='Publish Google Tag Manager events to parent frame'
          onChange={handleChange}
          checked={state.autoGTM}
          mb={3}
        />
        <Editor name='iframeCSS' title='iframe.css' initialValue={state.iframeCSS} onChange={handleChange} />
        <Editor name='pageCSS' title='page.css' initialValue={state.pageCSS} onChange={handleChange} />
      </ScrollableContent>
      {dispensary.chain && (
        <Checkbox
          name='applyToAllLocations'
          label='Apply to all locations'
          onChange={handleChange}
          checked={state.applyToAllLocations}
          mt='12px'
          width='100%'
        />
      )}
      <Button alignItems='flex-start' onClick={handleSubmit} loading={isLoading} width='135px'>
        Save
      </Button>
    </Container>
  );
}

const ScrollableContent = styled.div`
  width: 100%;
  overflow: auto;
`;
