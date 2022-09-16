import React from 'react';
import _ from 'lodash';
import styled from 'styled-components';

import { ModalContainer, ModalClose } from 'shared/modals';

export default function LearnAboutMenuTypesModal({ availableMenuTypes, onClose }) {
  const menuTypeDescriptions = {
    rec:
      'Automatically defaults to your Recreational menu. Recommended when utilizing separate pages on your site for rec. and med. menus.',
    med:
      'Automatically defaults to your Medical menu. Recommended when utilizing separate pages on your site for rec. and med. menus.',
    standard: 'The standard, default dutchie menu. This menu is recommended for most dispensaries. ',
    viewOnly:
      'Offers full browsing functionality however items cannot be added to the cart, therefore eliminating all ordering functionality. ',
    multiLocation:
      'For dispensaries that have multiple locations, this option will allow customers to type their address and find the nearest location.',
    dynamicDelivery:
      'For delivery operations that have multiple locations (the “Ice cream truck model”). This option asks the customer for their address, then takes them to the nearest location that is able to deliver to them.',
  };

  return (
    <ModalContainer width='471px' padding='43px 41px 47px 41px' isOpen onRequestClose={onClose} ariaHideApp={false}>
      <ModalClose onClick={onClose} color='#808080' />
      {_.map(availableMenuTypes, ({ key, value: title }) => (
        <DescriptionContainer key={key}>
          <DescriptionTitle>{title}</DescriptionTitle>
          <DescriptionCopy>{menuTypeDescriptions[key]}</DescriptionCopy>
        </DescriptionContainer>
      ))}
    </ModalContainer>
  );
}

const DescriptionContainer = styled.div`
  margin-bottom: 30px;
  :last-of-type {
    margin-bottom: 0;
  }
`;

const DescriptionTitle = styled.h4`
  font-size: 15px;
  font-weight: 700;
  line-height: 17px;
  text-align: left;
  margin-bottom: 11px;
  color: #47494c;
`;

const DescriptionCopy = styled.p`
  font-size: 13px;
  line-height: 18px;
  text-align: left;
  color: #6d747b;
`;
