import React, { useState } from 'react';
import { inject } from 'mobx-react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

import { ModalContainer, ModalButton, ModalSecondaryHeader, ModalClose, ModalCopy } from 'shared/modals';

const HolidayHoursModal = inject(
  'UI',
  'User'
)(({ history, UI, User }) => {
  const [isOpen, setIsOpen] = useState(true);

  const shouldShowHolidayHoursModal =
    isOpen &&
    !localStorage.getItem('dutchieHolidayHoursModal') &&
    moment().isBefore('2019-12-02') &&
    User.isDispensaryUser &&
    User.profile?.permissions?.settings;

  if (!shouldShowHolidayHoursModal) {
    return null;
  }

  const closeModal = () => {
    localStorage.setItem('dutchieHolidayHoursModal', moment().toISOString());
    setIsOpen(false);
  };

  return (
    <ModalContainer isOpen padding='30px 57px 52px' width='462px'>
      <TurkeyContainer>
        <img src='/icons/turkey.svg' width='91px' />
      </TurkeyContainer>

      <ModalSecondaryHeader lowercase fontSize='15px'>
        Reminder: Update Your Holiday Hours!
      </ModalSecondaryHeader>

      <ModalCopy>
        Are your hours changing over the holidays? If so, here’s a friendly reminder to adjust them on dutchie.
      </ModalCopy>

      <div>
        <ModalButton
          buttonContainerWidth='142px'
          onClick={() => {
            history.push(`/dispensaries/${UI.dispensary.id}/settings`);
            closeModal();
          }}
        >
          Update Hours
        </ModalButton>
      </div>

      <ModalClose onClick={closeModal} />
    </ModalContainer>
  );
});

export default withRouter(HolidayHoursModal);

const TurkeyContainer = styled.div`
  margin-bottom: 21px;
`;
