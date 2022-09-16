import React from 'react';

import { ContentContainer, Detail, Title } from '../../components/customize.styles';

import { SelectField, StyledLink } from '../embed.styles';
import { ScriptBox } from '../script-box';

import {
  InputContainer,
  Container,
  FieldTitle,
  FieldTitleContainer,
  StyledCheckbox,
  StyledCheckmarkIcon,
  OptionsCheckboxGroupContainer,
  StyledTextInput,
  StyledTooltip,
} from './embed-hompage-sections.styles';
import { useEmbedHomepageSections } from './use-embed-homepage-sections';

export function EmbedHomepageSections({ dispensary, menuSections }) {
  const {
    currentSection,
    handleMenuUrlChange,
    handleSectionSelect,
    hideTitle,
    hideViewAllLink,
    isValidUrl,
    menuUrl,
    menuUrlInputError,
    script,
    sectionHasViewAllLink,
    setHideTitle,
    setHideViewAllLink,
  } = useEmbedHomepageSections({ dispensary, menuSections });

  return (
    <Container>
      <Title>Embed Homepage Sections</Title>
      <Detail>
        Select a homepage section below to embed it on your website. <b>Note:</b> Only sections that have been created
        on your <StyledLink to={`dispensaries/${dispensary?.id}/customize/homepage`}>homepage</StyledLink> can be
        embedded.
      </Detail>

      <ContentContainer>
        <SelectField
          title='Section'
          onChange={handleSectionSelect}
          value={currentSection?.value}
          options={menuSections}
          data-testid='section-select'
        />

        <OptionsCheckboxGroupContainer>
          <FieldTitleContainer>
            <FieldTitle>Options</FieldTitle>
          </FieldTitleContainer>
          <StyledCheckbox
            name='hideTitle'
            label='Hide Title'
            onChange={() => setHideTitle(!hideTitle)}
            checked={hideTitle}
          />
          {sectionHasViewAllLink && (
            <StyledCheckbox
              name='hideViewAllLink'
              label='Hide View All Link'
              onChange={() => setHideViewAllLink(!hideViewAllLink)}
              checked={hideViewAllLink}
            />
          )}
        </OptionsCheckboxGroupContainer>

        <FieldTitleContainer>
          <FieldTitle htmlFor='menu-url-input'>Menu URL</FieldTitle>
          <StyledTooltip
            arrowRight='103px'
            bottom='30px'
            grey
            iconOpacity={0.7}
            left='auto'
            right='-103px'
            tooltipCopy='We require this URL in order to point users to the right destination when they click a product. Please copy and paste the URL of where your menu is located on your website.'
            width='250px'
          />
        </FieldTitleContainer>
        <InputContainer>
          <StyledTextInput
            id='menu-url-input'
            aria-label='menu-url-input'
            name='menuUrl'
            placeholder='Paste the URL of your menu'
            onChange={handleMenuUrlChange}
            defaultValue={dispensary.menuUrl}
            error={menuUrlInputError}
            errorMessage='Please enter a valid url'
          />
          {isValidUrl(menuUrl) && <StyledCheckmarkIcon />}
        </InputContainer>
        <ScriptBox
          script={script}
          displayScript={isValidUrl(menuUrl)}
          placeholderText='Add a valid menu URL above to generate the embed script!'
        />
      </ContentContainer>
    </Container>
  );
}
