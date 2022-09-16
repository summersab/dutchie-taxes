import React, { useState } from 'react';
import styled from 'styled-components';
import { useObserver } from 'mobx-react';
import useLocalStorage from 'react-use-localstorage';
import { useHistory } from 'react-router-dom';

import { useAccessYir } from 'src/dispensary-admin/year-in-review/use-access-yir';
import { useStores } from 'src/hooks/use-stores';
import { mediaQueries } from 'shared/styles';
import { ModalContainer, ModalButton, ModalClose } from 'shared/modals';

export function AccessModal() {
  // state
  const { UI, User } = useStores();
  const [isOpen, setIsOpen] = useState(true);
  const [hasViewedModal, setHasViewedModal] = useLocalStorage('dutchieYearInReviewModal');
  const canAccessYir = useAccessYir();

  // hooks
  const history = useHistory();

  const isDispensaryUser = useObserver(() => User.isDispensaryUser);

  // computed
  const hideModal = !isOpen || !isDispensaryUser || hasViewedModal || !canAccessYir;

  // methods
  const closeModal = () => {
    setIsOpen(false);
  };

  // handlers
  const handleCloseClick = () => {
    setHasViewedModal(true);
    closeModal();
  };

  const handleButtonClick = () => {
    setHasViewedModal(true);
    closeModal();
    history.push(`/dispensaries/${UI.dispensary.id}/year-in-review`);
  };

  if (hideModal) {
    return null;
  }

  return (
    <StyledModalContainer isOpen>
      <TextLockup src='/year-in-review/combined.svg' />
      <Copy>
        We've compiled some awesome stats about how your store performed on Dutchie Ecommerce in 2021. Click below to
        see how you did!
      </Copy>
      <ModalButton onClick={handleButtonClick}>CHECK IT OUT</ModalButton>
      <ModalClose onClick={handleCloseClick} />
    </StyledModalContainer>
  );
}

const StyledModalContainer = styled(ModalContainer)`
  padding-top: 60px;
  padding-bottom: 60px;
`;

const TextLockup = styled.img`
  width: 100%;
  margin-bottom: 40px;
`;

const Copy = styled.p`
  font-size: 18px;
  line-height: 28px;
  font-weight: normal;
  color: #4f5d68;
  font-family: 'proxima-nova', Helvetica, arial, sans-serif;
  max-width: 600px;
  margin-bottom: 20px;

  @media ${mediaQueries.largeDesktop} {
    font-size: 17px;
    line-height: 26px;
  }

  @media ${mediaQueries.largeTablet} {
    font-size: 16px;
    line-height: 24px;
  }

  @media ${mediaQueries.largePhone} {
    font-size: 15px;
    line-height: 23px;
  }
`;
