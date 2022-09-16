import React from 'react';
import { useObserver } from 'mobx-react-lite';
import _ from 'lodash';
import { useQuery } from '@apollo/react-hooks';

import { useStores } from 'src/hooks/use-stores';

import { Page } from '../components/customize.styles';
import { EmbedYourMenu } from './embed-your-menu';
import { EmbedHomepageSections } from './embed-homepage-sections';
import MENU_SECTIONS from './get-menu-sections.gql';

export function Embed() {
  const { UI, apolloClient } = useStores();
  const dispensary = useObserver(() => UI.dispensary);

  const { data } = useQuery(MENU_SECTIONS, {
    variables: { dispensaryId: dispensary?.id },
    client: apolloClient,
  });

  const menuSections = _.map(_.get(data, `getMenuSections`, []), (section) => ({
    value: section.label,
    key: section.id,
    ...section,
  }));

  const updateValue = (event) => {
    const { name: fieldName, value, type, checked } = event.target;
    if (type === 'checkbox') {
      UI.updateDispensaryProperty(fieldName, checked);
    } else {
      UI.updateDispensaryProperty(fieldName, value);
    }
    UI.unpublishedDispoChanges = true;
    return true;
  };

  return (
    <React.Fragment>
      <Page pb='66px'>
        <EmbedYourMenu updateValue={updateValue} dispensary={dispensary} />
        {!_.isEmpty(menuSections) && (
          <EmbedHomepageSections updateValue={updateValue} dispensary={dispensary} menuSections={menuSections} />
        )}
      </Page>
    </React.Fragment>
  );
}
