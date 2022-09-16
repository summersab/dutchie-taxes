import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { Prompt, useHistory } from 'react-router-dom';
import CancelWarningModal from 'src/dispensary-admin/menu/modals/cancel-warning-modal';

function RouteLeavingGuard({ when, modal: Modal = CancelWarningModal, handleConfirm = _.noop, handleDeny = _.noop }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [nextLocation, setNextLocation] = useState(null);
  const [confirmedNavigation, setConfirmedNavigation] = useState(false);
  const history = useHistory();

  // when no is clicked, call the handleDeny func
  // then navigate to next location
  const handleDenyClick = async () => {
    await handleDeny();
    setModalVisible(false);
    setConfirmedNavigation(true);
  };

  // when yes is clicked, call the handleConfirm func
  // then navigate to the next location
  const handleConfirmClick = async () => {
    await handleConfirm();
    setModalVisible(false);
    setConfirmedNavigation(true);
  };

  // when close is clicked, just close the modal
  // and don't navigate anywhere
  const handleClose = () => {
    setModalVisible(false);
  };

  // when this function returns false, navigation is blocked completely
  const handleBlockedNavigation = (nextLocationFromPrompt) => {
    if (!confirmedNavigation) {
      setModalVisible(true);
      setNextLocation(nextLocationFromPrompt);
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (confirmedNavigation && nextLocation) {
      // Navigate to the previous blocked location
      history.push(nextLocation.pathname + nextLocation.search);
      setConfirmedNavigation(false);
    }
  }, [confirmedNavigation, nextLocation]);

  return (
    <React.Fragment>
      <Prompt when={when} message={handleBlockedNavigation} />
      {modalVisible && (
        <Modal isOpen onClickYes={handleConfirmClick} onClickNo={handleDenyClick} onClose={handleClose} />
      )}
    </React.Fragment>
  );
}

export default RouteLeavingGuard;

// import RouteLeavingGuard from 'src/routes/route-leaving-guard';
// <RouteLeavingGuard
//   when={hasChanged}
//   modal={CancelWarningModal}
//   handleConfirm={this.handleModalClickYes}
//   handleDeny={this.handleModalClickNo}
// />
