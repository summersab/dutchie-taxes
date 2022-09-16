import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';

import { SuperAdminContent } from 'src/components/super-admin-content';
import AdvancedSettingsModal from 'src/dispensary-admin/settings/info/modals/advanced-settings';

import { Link } from 'shared/components';

import { ContentContainer, Detail, Title } from '../../components/customize.styles';

import { SelectField } from '../embed.styles';
import { ScriptBox } from '../script-box';

import LearnAboutMenuTypesModal from './learn-about-menu-types-modal';
import { useEmbedYourMenu } from './use-embed-your-menu';

export function EmbedYourMenu({ updateValue, dispensary }) {
  const {
    availableMenuTypes,
    handleMenuTypeSelect,
    menuType,
    script,
    setViewingAdvancedSettingsModal,
    setViewingLearnModal,
    viewingAdvancedSettingsModal,
    viewingLearnModal,
  } = useEmbedYourMenu({ dispensary });

  return (
    <Container>
      <Title>Embed your Menu</Title>
      <Detail>
        Select a menu type below then copy and paste the script onto the website page where you would like your menu to
        appear.
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <Link onClick={() => setViewingLearnModal(true)}>Learn about menu types</Link>
      </Detail>

      <ContentContainer>
        <SelectField
          options={availableMenuTypes}
          title='Menu Type'
          onChange={handleMenuTypeSelect}
          value={menuType}
          data-testid='menu-type-select'
        />

        <ScriptBox script={script} />
        <SuperAdminContent retainColor>
          <div>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <Link mt='9px' onClick={() => setViewingAdvancedSettingsModal(true)}>
              Advanced Settings
            </Link>
            {viewingAdvancedSettingsModal && (
              <AdvancedSettingsModal
                onClose={() => setViewingAdvancedSettingsModal(false)}
                onChange={updateValue}
                embedSettings={_.get(dispensary, 'embedSettings', null)}
              />
            )}
          </div>
        </SuperAdminContent>
      </ContentContainer>
      {viewingLearnModal && (
        <LearnAboutMenuTypesModal onClose={() => setViewingLearnModal(false)} availableMenuTypes={availableMenuTypes} />
      )}
    </Container>
  );
}

const Container = styled.div`
  padding-bottom: 45px;
`;
