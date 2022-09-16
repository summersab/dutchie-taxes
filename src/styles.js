import { createGlobalStyle } from 'styled-components';
import { createMuiTheme } from '@material-ui/core/styles';
import { muiTheme } from 'shared/themes';

import { MuiAutocomplete } from 'src/components/core/autocomplete';
import { MuiSelect, MuiInputLabel } from 'src/components/core/select';

export const adminMuiTheme = createMuiTheme(
  {
    overrides: {
      MuiAutocomplete,
      MuiSelect,
      MuiInputLabel,
    },
  },
  muiTheme
);

export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: Matter;
    font-weight: 300; /* light */
    font-display: block;
    src: url(https://assets2.dutchie.com/platform-assets/Matter/Matter-Light.woff) format('opentype');
  }
  @font-face {
    font-family: Matter;
    font-weight: normal;
    font-display: block;
    src: url(https://assets2.dutchie.com/platform-assets/Matter/Matter-Regular.woff) format('opentype');
  }
  @font-face {
    font-family: Matter;
    font-weight: 600; /* semi-bold */
    font-display: block;
    src: url(https://assets2.dutchie.com/platform-assets/Matter/Matter-SemiBold.woff) format('opentype');
  }
  @font-face {
    font-family: Matter;
    font-weight: bold;
    font-display: block;
    src: url(https://assets2.dutchie.com/platform-assets/Matter/Matter-Bold.woff) format('opentype');
  }

  html, body, p, a, ol, ul, li, dl, dt, dd, blockquote, figure, fieldset, legend, textarea, pre, iframe, hr, h1, h2, h3, h4, h5, h6, input, select, button {
    -webkit-font-smoothing: antialiased;
  }

  html, body, p, a, ol, ul, li, dl, dt, dd, blockquote, figure, fieldset, legend, textarea, pre, iframe, hr, h1, h2, h3, h4, h5, h6, input, select {
    margin: 0;
    padding: 0;
  }

  * {
    box-sizing: inherit;
  }

  html {
    font-family: proxima-nova, -apple-system, BlinkMacSystemFont, 'Segoe UI',
    'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
    'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
    -moz-osx-font-smoothing: grayscale;
    -webkit-overflow-scrolling: touch;
    text-rendering: optimizeLegibility;
    overflow: unset !important;
    background-color: #f4f7fa;
  }

  textarea, pre, iframe, input, select, button { font-family: inherit; }

  body {
    color: #4a4a4a;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
  }

  img {
    max-width: 100%;
  }

  a {
    color: #4597e0;
    cursor: pointer;
    text-decoration: none;
    -webkit-transition: none 86ms ease-out;
    transition: none 86ms ease-out;
    &:hover {
      color: #4597e0;
    }
    &[role=button] {
      outline: none;
    }
  }

  select {
    appearance: none;
  }

  ::before, ::after { /* old tables */
    box-sizing: inherit;
  }

  .input, .textarea {
    appearance: none;
    align-items: center;
    border: 1px solid transparent;
    border-radius: 3px;
    box-shadow: none;
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    font-size: 1rem;
    height: 2.25em;
    justify-content: flex-start;
    line-height: 1.5;
    padding-bottom: calc(0.375em - 1px);
    padding-left: calc(0.625em - 1px);
    padding-right: calc(0.625em - 1px);
    padding-top: calc(0.375em - 1px);
    position: relative;
    vertical-align: top;
    background-color: white;
    border-color: #dbdbdb;
    color: #363636;
    box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.1);
    max-width: 100%;
    width: 100%;
  }

  .input {
    background-color: #fcfdfe;
    border-color: #d1d5da;
    border-radius: 2px;
    box-shadow: none;
    color: #707478;
    font-size: 13px;
    padding: 14px 17px 13px 17px;
    height: 42px;
  }

  textarea[disabled] {
    color: rgba(54, 54, 54, 0.3);
    background-color: whitesmoke;
    border-color: whitesmoke;
    cursor: not-allowed;
  }

  .brand:hover,
  .control a:hover,
  .tabs a:hover,
  .menu a:hover {
    text-decoration: none;
  }

  .brand {
    color: #5ea68c;
    font: bold 30px/1 proxima-nova, sans-serif;
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
    -ms-flex-negative: 0;
    flex-shrink: 0;
  }

  .main-tabs:not(:last-child) {
    background-color: #fff;
    margin-bottom: 0;
    min-height: 51px;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    z-index: 19;
    width: 100%;
  }

  .main-tabs ul {
    font-size: 14px;
    padding-right: 18px;
    padding-left: 40px;
  }

  .main-tabs a,
  .main-tabs a:hover {
    border: none;
    color: #6a6f73;
    line-height: 1;
    padding: 14px 10px 13px;
    margin-top: -1px;
  }

  .main-tabs li {
    margin-right: 10px;
  }

  .main-tabs li.is-active a {
    color: #46494c;
    border-bottom-color: transparent;
  }

  .main-tabs li.is-active a {
    font-weight: bold;
  }

  .copyright {
    display: inline-block;
    margin-right: 15px;
  }

  .main-content {
    color: #6d747b;
    -webkit-overflow-scrolling: touch;

    font-size: 13px;
    overflow: auto;
  }

  .main-content .section-title + p {
    line-height: 22px;
  }

  .main-content hr {
    background-color: #d3dadf;
    margin: 17px -65px 36px -46px;
  }

  /* Buttons */
  .button,
  button.button {
    background-color: #4597e0;
    border: none;
    border-radius: 33px;
    color: #fff;
    font: bold 13px/34px proxima-nova, sans-serif;
    height: 33px;
    padding: 0 15px;
    text-transform: uppercase;
    -webkit-transition: background-color 86ms ease-out;
    transition: background-color 86ms ease-out;
  }

  .button:hover,
  button.button:hover {
    background-color: #2c7ec7;
    color: #fff;
  }

  .button:focus,
  button.button:focus {
    box-shadow: none;
    color: #fff;
  }

  .button.disabled,
  .button.disabled:hover {
    background-color: #b8b7b7;
    cursor: default;
  }

  .button.is-gray {
    background-color: #a3b2c1;
  }

  .button.is-gray:hover {
    background-color: #777f85;
  }

  .button.is-medium,
  button.button.is-medium {
    font-size: 14px;
    height: 40px;
    line-height: 41px;
    padding: 0 18px;
  }

  .field .checkbox,
  .field .radio {
    font-size: 13px;
  }

  .field .checkbox {
    margin-top: 6px;
  }

  .field .radio {
    margin-top: 6px;
    margin-left: 1px;
  }

  .field .radio-tip {
    font-size: 13px;
    margin-top: 6px;
    margin-right: 15px;
  }

  .field .radio-tip span {
    height: 16px;
    width: 16px;
    margin-left: 10px;
    font-weight: bold;
  }

  .field-group .field .input:focus {
    border: 1px solid #7fb1f4;
  }

  .input:focus,
  .input.is-focused,
  .input:active,
  .input.is-active,
  .textarea:focus,
  .textarea.is-focused,
  .textarea:active,
  .textarea.is-active {
    border-color: #7fb1f4 !important;
  }

  .field .checkbox input[type='checkbox'],
  .field .radio input[type='radio'] {
    height: 17px;
    left: 0;
    opacity: 0;
    position: absolute;
    top: 0;
    width: 17px;
    z-index: 2;
  }

  .field .radio input[type='radio'] {
    height: 16px;
    width: 16px;
  }

  .field .checkbox input[type='checkbox'] + span,
  .field .radio input[type='radio'] + span {
    color: #6d747b;
    display: block;
    font-size: 13px;
    height: 17px;
    padding-left: 30px;
    position: relative;
    z-index: 1;
  }

  .field .radio input[type='radio'] + span {
    height: 16px;
    width: 16px;
    padding-left: 31px;
  }

  .field .checkbox input[type='checkbox'] + span {
    background: url(/icons/unchecked-icon.svg) no-repeat;
  }

  .field .checkbox input[type='checkbox']:checked + span {
    background-image: url(/icons/checked-icon.svg);
  }

  .field .radio input[type='radio'] + span {
    background: url(/icons/radio-unchecked.svg) no-repeat;
    background-size: 16px 16px;
  }

  .field .radio input[type='radio']:checked + span {
    background-image: url(/icons/radio-checked.svg);
  }

  @media screen and (min-width: 769px), print {
    .field-label.is-normal {
      min-width: 82px;
    }
  }

  .field .control .icon.is-text {
    background-color: #edf1f3;
    border: 1px solid #d1d5da;
    border-top-left-radius: 2px;
    border-bottom-left-radius: 2px;
    color: #6d747b;
    font-size: 18px;
    height: 45px;
  }

  .field .control .icon.is-text + .input {
    padding-left: 61px;
    max-width: 120px;
  }

  /* Modals */

  .modal {
    background-color: rgba(62, 68, 73, 0.93);
    bottom: 0;
    content: ' ';
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 100;
  }

  .react-modal {
    position: relative;
  }

  .react-modal:focus {
    outline: none;
  }

  .modal-card h2 {
    color: #46494c;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 16px;
  }

  .modal-card {
    text-align: left;
  }

  .modal-card h3 {
    color: #45484b;
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 23px;
  }

  .modal .modal-card-body h3 {
    font-size: 16px;
  }

  .modal-card .level-item h3 {
    margin-bottom: 0;
  }

  .modal-card {
    border-radius: 8px;
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.11);
  }

  .modal .media .image {
    width: 85px;
  }

  .modal-card .media h3 {
    color: #6d747b;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .modal-card .media p {
    color: #6d747b;
    font-size: 13px;
  }

  .modal-card.is-small {
    max-width: 390px;
  }

  .modal-card.is-medium {
    max-width: 545px;
  }

  .modal-card-title {
    color: #6d747b;
    font-size: 16px;
    font-weight: bold;
    text-align: left;
  }

  .modal-card-head {
    padding: 24px 33px 21px;
  }

  .modal-card-head .modal-close {
    opacity: 1;
    top: 16px;
  }

  .modal-card-head,
  .modal-card-foot {
    background-color: #ecf0f3;
    border-color: #d1d5da;
  }

  .modal-card-body {
    padding: 31px 47px 45px 47px;
    width: 100%;
  }

  .modal-card-body .field-group .label {
    font-size: 13px;
  }

  .modal-card-body p {
    font-size: 13px;
    line-height: 22px;
  }

  .modal-card-body hr {
    background-color: #d3dadf;
    margin-bottom: 40px;
    margin-top: 40px;
  }

  .modal-close {
    height: 36px;
    opacity: 0.7;
    position: absolute;
    right: 14px;
    top: 17px;
    width: 36px;
  }

  .modal-close:hover,
  .modal-close:focus {
    background-color: transparent;
  }

  .modal-close:before {
    height: 3px;
  }

  .modal-close:after {
    width: 3px;
  }

  .modal-close:before,
  .modal-close:after {
    background-color: #7f868e;
  }

  /* Container */
  @media screen and (min-width: 1384px) {
    .container {
      max-width: 1152px;
      width: 1152px;
    }
  }

  /* Spinner */
  .loader svg path,
  .loader svg rect {
    fill: #5ea68c;
  }

  .loader {
    margin: 0 0 2em;
    height: 100px;
    width: 20%;
    text-align: center;
    padding: 1em;
    margin: 0 auto 1em;
    display: inline-block;
    vertical-align: top;
    border: 0;
  }

  /* Transition KeyFrames */
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .fade-in {
    opacity: 0; /* make things invisible upon start */
    animation: fadeIn ease-in 1; /* call our keyframe named fadeIn, use animattion ease-in and repeat it only 1 time */
    animation-fill-mode: forwards; /* this makes sure that after animation is done we remain at the last keyframe value (opacity: 1)*/
    animation-duration: 1.1s;
    animation-delay: 0.3s;
  }

  .sticky {
    position: fixed !important;
    top: 0;
    left: 0;
    right: 0;
    border-radius: 0;
    margin: 0;
  }

  .admin--reorder--draggable-clone {
    box-shadow: 0 5px 5px -5px rgba(0, 0, 0, 0.2),
      0 -5px 5px -5px rgba(0, 0, 0, 0.2);
    cursor: row-resize;
  }

  .section-title {
    color: #46494c;
    font-size: 18px;
    font-weight: bold;
    line-height: 1;
    margin-bottom: 24px;
  }

  .level-item .section-title {
    margin-bottom: 0;
  }

  .main-content .product-columns {
    margin: 0 52px 0 -26px;
  }

  .content span span:not(:last-child) img {
    margin-right: 7px;
  }

  .tip {
    background-color: rgba(26, 27, 28, 0.93);
    border-radius: 5px;
    color: #e0e7ed;
    font-size: 12px;
    left: 7px;
    line-height: 20px;
    padding: 8px 18px 10px 21px;
    opacity: 0;
    position: absolute;
    top: -87px;
    -webkit-transition: opacity 0.25s ease-out;
    transition: opacity 0.25s ease-out;
    width: 166px;
  }

  .tip.is-active {
    opacity: 1;
  }

  .tip:after {
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-top: 5px solid rgba(26, 27, 28, 0.93);
    bottom: -5px;
    content: ' ';
    height: 0;
    left: calc(50% - 29px);
    position: absolute;
    width: 0;
  }

  .address-input {
    background-color: #fcfdfe;
    border-color: #d1d5da;
    border-radius: 2px;
    box-shadow: none;
    color: #4c5258;
    font-size: 13px;
    padding: 14px 21px 13px;
    height: 45px;
    line-height: 1;
  }

  .green-box {
    background-color: #eff9f2;
    border: 1px solid #bfded2;
    border-radius: 2px;
    color: #6d8d76;
    padding: 18px 28px 18px 19px;
    margin-bottom: 20px;
  }

  .file-label {
    position: absolute;
    z-index: 1;
  }

  .hidden-file-button {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 2;
    -moz-opacity: 0;
    /* filter: alpha(opacity: 0); */
    opacity: 0;
    width: 116px;
    height: 40px;
    cursor: pointer;
  }

  p.csv-disclaimer {
    margin-top: 25px;
    font-size: 11px;
    line-height: 18px;
    color: #707478;
  }

  .csv-another-upload {
    font-size: 12px;
  }
  .edit-product {
    width: 100%;
    background-color: #fff;
    border: 1px solid #d2d8df;
    border-radius: 3px;
    box-shadow: 2px 2px 2px 0 rgba(37, 37, 37, 0.05);
    position: relative;
    margin-bottom: 45px;

    .edit-form {
      padding: 20px 40px 60px 40px;
    }

    .label {
      text-align: right;
    }

    .field.is-content .field-body {
      padding-top: 12px;
    }
  }

  .edit-footer {
    background-color: white;
    border-top: 1px solid #d2d8df;
    bottom: -68px;
    box-shadow: 0px -2px 2px 0 rgba(0, 0, 0, 0.05);
    height: 75px;
    position: sticky;
    z-index: 5;

    .footer-button-container {
      margin-top: 15px;
      margin-left: 35px;
      margin-right: 51px;

      .save-item-button {
        width: 118px;

        &:disabled {
          background-color: #4597e0;
        }
      }

      .delete-item-button {
        cursor: pointer;
        margin-top: 11px;
        float: right;
        border: none;
        background-color: transparent;
        color: #ff5047;
        font-size: 13px;
      }
    }
  }

  .main-content {
    color: #707478;
    background-color: #f4f7fa;
    padding: 53px 0 68px 0;
    flex-grow: 1;

    @media screen and (max-width: 875px) {
      padding: 12px 0 68px 0;
    }

    .inner-content {
      max-width: 1052px;
      margin: 0 auto;

      @media screen and (max-width: 1300px) {
        margin: 0 32px;
      }
    }

    .category-select {
      select {
        background: none;
        border: none;
        font-size: 19px;
        font-weight: bold;
        padding-right: 0;
        color: #46494c;
      }

      &:after {
        margin-top: 2px !important;
      }
    }

    .admin-order-container {
      .order {
        width: 70%;
        min-width: 650px;
        max-width: 734px;
        float: left;
        background-color: #fff;
        border: 1px solid #d2d8df;
        border-radius: 3px;
        box-shadow: 0px 3px 2px 0 rgba(37, 37, 37, 0.05);

        @media screen and (max-width: 875px) {
          width: 100%;
          max-width: 100%;
        }

        .order-main {
          position: relative;
          padding-bottom: 39x;
          padding: 34px 45px 39px 45px;
          box-shadow: 0px 3px 2px 0 rgba(37, 37, 37, 0.05);
          border-bottom: 1px solid #d2d8df;
          z-index: 4;

          .number-and-customer {
            font-size: 18px;
            font-weight: bold;
            color: #46494c;
            margin-bottom: 16px;
          }

          .status {
            margin-bottom: 8px;
          }

          .time-section {
            position: absolute;
            right: 54px;
            top: 57px;

            .order-time {
              position: relative;

              img {
                position: absolute;
                top: 2px;
                left: -20px;
              }
            }
          }

          .status-button {
            position: absolute;
            right: 50px;
            top: 87px;
          }

          .close-order-button {
            position: absolute;
            right: 54px;
            top: 130px;
            font-size: 12px;
          }
        }

        .order-content {
          padding: 46px 44px 80px 40px;
          position: relative;

          .edit-button {
            position: absolute;
            right: 54px;
            top: 52px;
            cursor: pointer;
            color: #4597e0;
          }

          .top-buttons {
            position: absolute;
            right: 72px;
            top: 44px;
          }

          .product-row {
            position: relative;
            height: 82px;
            border-bottom: 1px solid #e4e8ea;

            @media screen and (max-width: 1275px) {
              height: 100px;
            }

            .item-info-container {
              display: inline-block;
              width: 250px;
              margin-top: 16px;

              .item-info {
                margin-left: 78px;
                top: 50%;
                transform: translateY(-50%);
                max-width: 220px;
                position: absolute;

                .name {
                  color: #707478;
                  font-size: 13px;
                  line-height: 16px;
                  font-weight: bold;
                }
              }
            }

            .numbers {
              position: absolute;
              right: 17px;
              top: 50%;
              transform: translateY(-50%);

              @media screen and (max-width: 1275px) {
                top: 75%;
              }

              &.edit {
                height: 34px;
              }

              .current {
                display: inline-block;
                margin-left: 54px;
              }

              .field {
                display: inline-block;
                margin-left: 19px;
                max-width: 90px;

                select,
                input,
                .icon {
                  height: 34px;
                }

                select {
                  background-color: #fcfdfe;
                  border-color: #d1d5da;
                  border-radius: 2px;
                  box-shadow: none;
                  color: #707478;
                  font-size: 13px;
                }

                .icon {
                  width: 32px;
                  font-size: 16px;
                }

                .input {
                  padding-left: 38px;
                  padding-right: 10px;
                }

                .delete-item-button {
                  cursor: pointer;
                  position: absolute;
                  top: 50%;
                  transform: translateY(-25%);
                  width: 18px;
                }
              }
            }
          }

          .order-footer {
            position: relative;

            .print-container {
              min-height: 120px;

              button {
                margin-bottom: 19px;
              }

              .delivery-option-fields {
                .field-label {
                  margin-right: 0;

                  label {
                    text-align: left;
                  }
                }

                .type {
                  margin-bottom: 18px;
                }

                .address {
                  margin-bottom: 10px;
                }

                .field-body {
                  input {
                    width: 209px;
                    height: 34.2px;
                    padding: 9.6px 15px 8.6px;
                  }
                }
              }
            }

            .price-table {
              width: 200px;

              tr {
                line-height: 30px;
              }

              td strong {
                color: #6d747b;
              }

              td:nth-child(odd) {
                text-align: left;
              }

              td:nth-child(even) {
                text-align: left;
                padding-left: 50px;
              }
            }

            .discount {
              margin-bottom: 12px;
              padding: 8px 13px;
              border-radius: 2px;
              background-color: #eaeef2;
              color: #55585c;
              font-size: 12px;
              max-width: 180px;
              text-align: center;
            }
          }
        }
      }

      .sidebar {
        margin-top: 9px;
        margin-left: 44px;
        width: calc(30% - 44px);
        max-width: 268px;
        float: left;

        .customer-info {
          .customer-name,
          .customer-phone,
          .customer-birthday {
            margin-bottom: 20px;
          }
        }

        .timeline {
          .date {
            display: inline;
            text-transform: none;
            font-weight: normal;
          }
        }
      }
    }

    .edit-info-container {
      width: 70%;
      max-width: 734px;
      float: left;
      background-color: #fff;
      border: 1px solid #d2d8df;
      border-radius: 3px;
      box-shadow: -2px 3px 2px 0 rgba(37, 37, 37, 0.05);

      &:focus {
        outline-style: none;
      }

      .container-inner {
        padding: 20px 40px;
      }
    }

    .photos-and-logo {
      margin-top: 9px;
      margin-left: 44px;
      width: calc(30% - 44px);
      max-width: 268px;
      float: left;

      .title {
        font-size: 16px;
        font-weight: bold;
      }
    }

    .dropdown-container {
      position: relative;
      cursor: pointer;

      &:after {
        border: 1px solid #fff;
        border-left: 4px solid transparent !important;
        border-right: 4px solid transparent !important;
        border-top: 5px solid #fff !important;
        border-bottom: none !important;
        transform: none !important;
        width: 6px !important;
        height: 6px !important;
        margin-top: 0 !important;
        margin-right: 0px !important;
        content: ' ';
        display: block;
        pointer-events: none;
        position: absolute;
        transform: rotate(-45deg);
        margin-top: -0.375em;
        right: 14px;
        z-index: 4;
      }

      &.pipes {
        border-right: 1px solid #dee5ea;
        border-left: 1px solid #dee5ea;
        padding: 0;

        &:after {
          border: 1px solid #a6b2c0;
          border-left: 4px solid transparent !important;
          border-right: 4px solid transparent !important;
          border-top: 5px solid #a6b2c0 !important;
          border-bottom: none !important;
          transform: none !important;
          width: 6px !important;
          height: 6px !important;
          margin-top: 0 !important;
          margin-right: 0px !important;
          content: ' ';
          display: block;
          pointer-events: none;
          position: absolute;
          transform: rotate(-45deg);
          margin-top: -0.375em;
          right: 20px;
          z-index: 4;
        }
      }

      .sort-dropdown {
        padding: 7px 40px 7px 16px;

        .bold {
          font-weight: bold;

          span {
            font-weight: normal;
          }
        }
      }
    }

    .section-title-container {
      margin-bottom: 2px !important;
      height: 33px;
    }
  }

  .add-coupon-modal {
    .field-label label {
      text-align: right;
    }

    .discount-radio {
      display: inline-block;

      .control {
        display: inline;

        input {
          width: 100px;
        }
      }

      ul {
        display: inline-block;
        margin-top: 8px;

        li {
          display: inline-block;

          span {
            font-size: 13px;
          }
        }
      }
    }

    .discount-field {
      margin-left: 124px;

      .discount-label {
        height: 45px;
      }

      input {
        width: 110px;
        height: 38px;
        font-size: 14px;
      }

      .discount-select-subtext {
        top: 9px;
      }
    }

    .num-uses-field {
      margin-bottom: 32px;

      input {
        width: 110px;
      }

      label {
        margin-top: 14px;
        margin-left: 17px;
      }
    }
  }

  .green-notification {
    background-color: #eff9f2;
    border: 1px solid #bfded2;
    border-radius: 3px;
    margin-bottom: 32px;
    margin-top: 0;
    padding: 14px 19px;

    p {
      color: #5a8266 !important;
      font-size: 12px !important;
      line-height: 18px !important;
    }
  }

  .yellow-notification {
    background-color: #fffdeb;
    border: 1px solid #d8d5ba;
    border-radius: 4px;
    margin-bottom: 32px;
    margin-top: 0;
    padding: 11px 19px;

    p {
      color: #75725b !important;
      font-size: 12px !important;
      line-height: 18px !important;
    }
  }

  .field-group {
    margin-bottom: 46px;
    margin-top: 46px;

    .field-label {
      min-width: 115px;
      padding-top: 11px;
      text-align: left;
    }

    &.admin-section .field.is-horizontal {
      margin: 23px 0;
      border-bottom: 1px solid #e5ebef;
      padding-bottom: 25px;

      &.no-divider {
        margin: 23px 0;
        border-bottom: 0 !important;
        padding-bottom: 25px;
      }
    }

    .label {
      font-size: 13px;
      font-weight: bold;
      color: #707478;
    }

    .label .field.is-content .field-label {
      padding-top: 0;
    }

    > .field:not(:last-child) {
      margin-bottom: 21px;
    }

    .field.flavor {
      width: 125px;
      margin-bottom: 5px !important;
    }

    .field.is-content {
      .field-body {
        padding-top: 5px;
      }

      &:not(:first-child) {
        margin-bottom: 35px;
        margin-top: 35px;
      }

      a {
        display: inline-block;
        font-size: 13px;
        line-height: 1;
      }
    }

    .field-body .field {
      &:not(:last-child) {
        margin-bottom: 21px;
      }

      a {
        font-size: 13px;
      }

      .control.is-delete {
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
      }

      .input,
      .textarea,
      .select select {
        background-color: #fcfdfe;
        border-color: #d1d5da;
        border-radius: 2px;
        box-shadow: none;
        color: #707478;
        font-size: 13px;
        padding: 14px 21px 13px;

        &::placeholder,
        &::-moz-placeholder,
        &::-webkit-input-placeholder,
        &::-ms-input-placeholder {
          color: #aeafaf;
        }

        &.error {
          border-color: red;
        }
      }
    }

    .select {
      min-width: 100px;

      &:after {
        border-color: #6a6f73 transparent transparent;
        border-style: solid;
        border-width: 5px 4px 0;
        margin-top: -2px;
        -webkit-transform: initial;
        transform: initial;
      }

      select {
        width: 194px;
      }

      &.combo {
        min-width: 0;

        &:after {
          right: -6px !important;
        }

        select {
          background-color: #eef1f3 !important;
          padding-right: 14px !important;
          padding-left: 14px !important;
          width: 70px;
          border-top-left-radius: 0 !important;
          border-bottom-left-radius: 0 !important;
        }
      }
    }

    .field {
      position: relative;

      .input.combo {
        border-right: hidden;
        border-top-right-radius: 0 !important;
        border-bottom-right-radius: 0 !important;
        padding-right: 21px !important;
        width: 78px;
      }

      .input,
      .select,
      .select select {
        height: 45px;
        line-height: 1;
      }

      &.is-grouped .select select {
        width: 100%;
      }

      .textarea {
        line-height: 22px;
        min-height: 196px;
        min-width: 80%;
      }

      .control.has-icon .icon {
        color: #8f989e;
        font-size: 13px;
        font-weight: bold;
        height: 46px;
        width: 55px;
      }

      .control,
      .help {
        max-width: 567px;
      }

      .help {
        color: #707478;
        margin-top: 19px;
      }

      &:last-child .button {
        margin-top: 37px;
      }
    }

    .control {
      max-width: 100% !important;

      &.is-s {
        width: 121px;
      }

      &.is-m {
        width: 300px;
      }
    }
  }

  .modal .field-group .field:last-child .button {
    margin-top: 24px;
  }

  .modal-card-body .field-group .field-label {
    margin-right: 10px;
    min-width: 114px;
  }

  .modal-card-body .field-group .more-link {
    font-size: 13px;
  }

  .control-content {
    th,
    td,
    p {
      color: #707478;
      font-size: 13px;
      line-height: 1;
    }

    tr,
    p {
      display: block;
      padding-bottom: 19px;

      &:last-child:not(:first-child) {
        padding-bottom: 10px;
      }
    }

    tr th:first-child,
    tr td:first-child {
      min-width: 170px;
    }
  }

  .button.print-order {
    height: 36px;
    width: 117px;
    border: 2px solid #4597e0;
    background-color: Transparent;
    color: #4597e0;
    margin-bottom: 30px;
    font-size: 13px;
    font-weight: bold;
    text-align: center;

    &:focus,
    &:active,
    &:hover {
      color: #4597e0;
      border: 2px solid #4597e0;
      background-color: Transparent !important;
    }
  }

  .react-datepicker__input-container input {
    background-color: #fcfdfe;
    border-color: #d1d5da;
    border-radius: 2px;
    box-shadow: none;
    color: #707478;
    font-size: 13px;
    padding: 14px 21px 13px;
    height: 45px;
    width: 125px;
  }

  .level-row {
    padding-left: 20px;
    padding-right: 20px;
    margin-bottom: 0px !important;

    span {
      color: #707478;
      font-size: 12px;
      padding-left: 10px;
    }
  }

  .main-tabs.specials {
    z-index: 1 !important;
  }

  .main-tabs.specials ul {
    justify-content: center;
  }

  .main-tabs.specials a,
  .main-tabs.specials li:not(.is-active) a:hover {
    color: #b1b6ba;
    padding: 14px;
    font-size: 13px;
    cursor: default;
  }

  .main-tabs.specials a:hover {
    padding: 14px;
  }

  .field-label.is-normal.specials {
    margin-right: 0px;
  }

  .level.level-row.specials-selected:hover {
    cursor: pointer;
    background-color: #f6f9fc;
  }

  .control.has-icon.product-search {
    margin-left: 3px;
    width: 88px;
  }

  span.specials-product-selected {
    font-weight: 700;
    color: #607991;
  }

  .control.specials-set-price {
    border: 1px solid #d1d5da;
    width: 50%;
    margin-left: -1px;
    background-color: #fcfdfe;
    padding: 14px 26px;

    span {
      color: #6d747b;
      margin-left: 17px !important;
    }

    p {
      color: #6d747b;
      margin-left: 29px;
      margin-top: 2px;
      font-size: 12px;
      line-height: 20px;
    }
  }

  .radio-tip.discount-select {
    margin-right: 39px;

    span {
      font-weight: 500;
      color: #6d747b;
    }
  }

  .control.has-icons-left.discount-select {
    margin-left: 94px;
  }

  span.discount-select-subtext {
    font-size: 12px;
    color: #6d747b;
    position: relative;
    top: 4px;
    left: 4px;
  }

  span.icon.is-left.is-text.discount-select {
    font-size: 15px;
    height: 38px;
  }

  .table.set-prices {
    margin-top: 30px;
  }

  .is-unselectable.set-price-table:hover {
    background-color: transparent;
  }

  .is-unselectable.set-price-table th {
    font-size: 13px;
    font-weight: bold;
    color: #707478;
    border-bottom: 1px solid #d3dadf;
    padding: 10px 0;
  }

  .set-price-product {
    padding: 15px 0 !important;
  }

  .set-price-input {
    padding: 15px 0 !important;
  }

  .confirm-section {
    border-bottom: 1px solid rgb(209, 213, 218);
    padding: 25px 30px;

    p {
      font-size: 13px;
      color: #6d747b;

      &.confirm-specials-heading {
        color: #6d747b;
        font-size: 14px;
        font-weight: 700;
        margin-bottom: 8px;
      }
    }
  }

  .field-label.is-normal.confirm-specials {
    text-align: left;
    min-width: 100px;
    padding-top: 0;
  }

  .confirm-specials-edit {
    font-size: 13px;
  }

  .table.confirm-products {
    background: transparent;
    border-top: 1px solid #dbdbdb;
    margin-top: 10px;
  }
  .select {
    height: auto;
  }

  .select.zah-select select {
    font-size: 13px !important;
    color: #707478 !important;
    padding: 9px 0 8px 13px !important;
    height: auto !important;
    line-height: 1 !important;
    border-radius: 2px !important;
    background-color: #fcfdfe !important;
    border: solid 1px #d1d5da !important;
  }

  .select:after {
    border: 1px solid #46494c;
    border-left: 4px solid transparent !important;
    border-right: 4px solid transparent !important;
    border-top: 5px solid #797e83 !important;
    border-bottom: none !important;
    transform: none !important;
    width: 6px !important;
    height: 6px !important;
    margin-top: -2px !important;
    content: ' ';
    display: block;
    pointer-events: none;
    position: absolute;
    transform: rotate(-45deg);
    right: 12px;
    top: 47%;
    z-index: 4;
  }

  .DateRangePicker:after {
    border: 1px solid #46494c;
    border-left: 4px solid transparent !important;
    border-right: 4px solid transparent !important;
    border-top: 5px solid #797e83 !important;
    border-bottom: none !important;
    transform: none !important;
    width: 6px !important;
    height: 6px !important;
    margin-top: 0 !important;
    margin-right: 0px !important;
    content: ' ';
    display: block;
    pointer-events: none;
    position: absolute;
    transform: rotate(-45deg);
    margin-top: -0.375em;
    right: -6px;
    top: 38%;
    z-index: 4;
  }

  .DateRangePicker:before {
    transform: none !important;
    width: 6px !important;
    height: 6px !important;
    margin-top: 0 !important;
    margin-right: 0px !important;
    content: '-';
    display: block;
    pointer-events: none;
    position: absolute;
    right: 47%;
    top: 5%;
    z-index: 4;
  }

  .couponNotice {
    background-color: #76b288;
    color: white;
    text-align: center;
    margin-top: 30px;
    margin-bottom: 30px;
    border-radius: 5px;
    padding: 1em;
    font-size: 12px;
  }

  .button.open,
  .button.open:focus {
    background-color: #fff;
    border: 2px solid #4597e0;
    color: #4597e0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 15px;

    &:hover {
      border: 2px solid #2c7ec7;
      color: #2c7ec7;
      background-color: transparent;
    }
  }

  .input::placeholder,
  .textarea::placeholder {
    color: #aeafaf;
  }

  .field .input::-moz-placeholder,
  .field .textarea::-moz-placeholder {
    color: #aeafaf;
  }

  .field .input::-webkit-input-placeholder,
  .field .textarea::-webkit-input-placeholder {
    color: #aeafaf;
  }

  .field .input:-moz-placeholder,
  .field .textarea:-moz-placeholder {
    color: #aeafaf;
  }

  .field .input:-ms-input-placeholder,
  .field .textarea:-ms-input-placeholder {
    color: #aeafaf;
  }

  .button.dropdown-button {
    position: relative;
    padding-right: 32px !important;

    &:after {
      border: 1px solid #ffffff;
      border-left: 4px solid transparent !important;
      border-right: 4px solid transparent !important;
      border-top: 5px solid #ffffff !important;
      border-bottom: none !important;
      width: 6px !important;
      height: 6px !important;
      margin-top: 0 !important;
      margin-right: 0px !important;
      content: ' ';
      display: block;
      pointer-events: none;
      position: absolute;
      right: 14px;
      top: 50%;
      transform: translateY(-50%);
      z-index: 4;
    }
  }

  .select select:focus,
  .select select.is-focused,
  .select select:active,
  .select select.is-active {
    border: 1px solid #dbdbdb;
  }

  .admin--reorder--draggable-clone td:not(.product-cell) {
    visibility: hidden;
  }

  .effect-subtext {
    font-size: 12px;
    width: 412px;
    line-height: 20px;
    margin-bottom: 24px;
    margin-top: -2px;
  }

  .image-thumbnail {
    width: 115px;
    margin-top: 12px;
    border: 1px solid #d3dadf;
    border-radius: 3px;
  }

  .image-upload {
    display: inline-block;
    position: relative;
  }

  .image-input {
    bottom: 0;
    display: block;
    height: 100%;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    opacity: 0;
    width: 100%;
    z-index: 2;

    &:hover {
      cursor: pointer;
    }
  }

  .edit-product-link {
    color: #589cd9;
    margin-top: 3px;
    cursor: pointer;
    font-size: 13px;

    &:hover {
      cursor: pointer;
    }
  }

  .field-body {
    position: relative;
  }

  .ui.big.user.input.dropdown {
    width: 185px;
    height: 45px;
    background-color: #fcfdfe;
    border: 1px solid #d1d5da;
    font-size: 11pt;
  }

  .editLabel {
    width: 75px;
    margin-bottom: 20px;
    margin-top: 15px;
    display: inline-block;
    color: #707478;
    font-size: 14px;
    font-weight: bold;
  }

  // Headway Widget Container
  #HW_frame_cont {
    left: 20px !important;
    @media only screen and (max-width: 993px) {
      display: none;
    }
  }

  .field.is-horizontal.list {
    margin-bottom: 2px !important;
  }

  p.account-section-subtext {
    color: #6d747b;
    font-size: 13px;
    margin: 14px 0;
  }

  td.sub-dispo {
    padding: 22px 10px;
    border-bottom: 1px solid #d3dadf;
    font-size: 13px;
    color: #6d747b;
  }

  td.sub-check {
    padding: 11px 10px;
    border-bottom: 1px solid #d3dadf;
    font-size: 13px;
  }

  td.sub-check .field .checkbox input[type='checkbox'] + span {
    padding: 0 0 0 27px;
  }
`;
