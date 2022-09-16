import 'core-js/stable';
import 'regenerator-runtime/runtime';
import BBPromise from 'bluebird';
import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

// Polyfill for Fetch for super old chrome.
import 'unfetch/polyfill';

import SharedBootHelpers from 'shared/utils/shared-boot-helpers';
import PublicEnv from 'shared/utils/public-env';
import Root from 'src/root';

BBPromise.config({ cancellation: true });

SharedBootHelpers.initLogRocket(PublicEnv.logrocketIdAdmin);

// CURRENT_VERSION is replaced by Webpack & represents the version of the JS at build time
// eslint-disable-next-line no-undef
const currentVersion = CURRENT_VERSION;

document.addEventListener('DOMContentLoaded', async () => {
  const renderTarget = document.getElementById('render-target');
  Modal.setAppElement(renderTarget);
  ReactDOM.render(<Root currentVersion={currentVersion} />, renderTarget);
});
