import React, { SVGAttributes } from 'react';

export function ProximaNova(props: SVGAttributes<unknown>): JSX.Element {
  return (
    <svg width='86' height='11' viewBox='0 0 86 11' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        d='M0.991211 10V0.662109H5.09277C6.03613 0.662109 6.78125 0.944661 7.32812 1.50977C7.875 2.07031 8.14844 2.76302 8.14844 3.58789C8.14844 4.41276 7.87272 5.10775 7.32129 5.67285C6.77441 6.2334 6.03158 6.51367 5.09277 6.51367H2.63184V10H0.991211ZM2.63184 5.07129H4.87402C5.33887 5.07129 5.7194 4.93457 6.01562 4.66113C6.31641 4.3877 6.4668 4.02995 6.4668 3.58789C6.4668 3.14583 6.31641 2.78809 6.01562 2.51465C5.7194 2.24121 5.33887 2.10449 4.87402 2.10449H2.63184V5.07129ZM9.46777 10V3.23926H10.9375V4.23047C11.2064 3.89323 11.5345 3.61751 11.9219 3.40332C12.3092 3.18913 12.7148 3.08203 13.1387 3.08203V4.53809C13.0156 4.51074 12.8607 4.49707 12.6738 4.49707C12.3639 4.49707 12.0335 4.58822 11.6826 4.77051C11.3317 4.94824 11.0833 5.1556 10.9375 5.39258V10H9.46777ZM13.9043 6.60938C13.9043 6.1263 13.9863 5.67057 14.1504 5.24219C14.3145 4.80924 14.5423 4.43327 14.834 4.11426C15.1302 3.79069 15.4971 3.53548 15.9346 3.34863C16.3721 3.16178 16.8529 3.06836 17.377 3.06836C18.0788 3.06836 18.6963 3.23014 19.2295 3.55371C19.7673 3.87728 20.1729 4.30566 20.4463 4.83887C20.7243 5.36751 20.8633 5.95768 20.8633 6.60938C20.8633 7.26562 20.7243 7.86263 20.4463 8.40039C20.1729 8.93359 19.7673 9.36198 19.2295 9.68555C18.6963 10.0091 18.0788 10.1709 17.377 10.1709C16.8529 10.1709 16.3721 10.0775 15.9346 9.89062C15.4971 9.69922 15.1302 9.44401 14.834 9.125C14.5423 8.80143 14.3145 8.42318 14.1504 7.99023C13.9863 7.55729 13.9043 7.09701 13.9043 6.60938ZM15.4287 6.60938C15.4287 7.23828 15.6042 7.77148 15.9551 8.20898C16.306 8.64648 16.7799 8.86523 17.377 8.86523C17.9831 8.86523 18.4593 8.64876 18.8057 8.21582C19.1566 7.77832 19.332 7.24284 19.332 6.60938C19.332 5.98503 19.1566 5.45638 18.8057 5.02344C18.4593 4.59049 17.9831 4.37402 17.377 4.37402C16.7799 4.37402 16.306 4.59049 15.9551 5.02344C15.6042 5.45638 15.4287 5.98503 15.4287 6.60938ZM20.9727 10L23.4541 6.52734L21.1162 3.23926H22.7637L24.377 5.53613L25.9697 3.23926H27.624L25.2861 6.52734L27.7812 10H26.127L24.377 7.50488L22.6133 10H20.9727ZM28.8887 2.14551C28.7109 1.96777 28.6221 1.75358 28.6221 1.50293C28.6221 1.25228 28.7109 1.03809 28.8887 0.860352C29.071 0.682617 29.2852 0.59375 29.5312 0.59375C29.7865 0.59375 30.0007 0.682617 30.1738 0.860352C30.3516 1.03809 30.4404 1.25228 30.4404 1.50293C30.4404 1.75358 30.3516 1.96777 30.1738 2.14551C30.0007 2.32324 29.7865 2.41211 29.5312 2.41211C29.2852 2.41211 29.071 2.32324 28.8887 2.14551ZM28.7998 10V3.23926H30.2695V10H28.7998ZM32.1768 10V3.23926H33.6465V4.16211C33.8151 3.9069 34.1068 3.66081 34.5215 3.42383C34.9408 3.18685 35.3828 3.06836 35.8477 3.06836C36.3353 3.06836 36.734 3.18001 37.0439 3.40332C37.3584 3.62663 37.5749 3.93197 37.6934 4.31934C37.9076 3.9821 38.2243 3.69043 38.6436 3.44434C39.0674 3.19368 39.5163 3.06836 39.9902 3.06836C40.6191 3.06836 41.0999 3.23926 41.4326 3.58105C41.7699 3.92285 41.9385 4.43327 41.9385 5.1123V10H40.4688V5.59082C40.4688 5.21257 40.3776 4.91634 40.1953 4.70215C40.0176 4.4834 39.7396 4.37402 39.3613 4.37402C39.056 4.37402 38.7598 4.46517 38.4727 4.64746C38.1855 4.8252 37.96 5.03255 37.7959 5.26953V10H36.3193V5.59082C36.3193 4.77962 35.9479 4.37402 35.2051 4.37402C34.9043 4.37402 34.6104 4.46517 34.3232 4.64746C34.0407 4.8252 33.8151 5.03711 33.6465 5.2832V10H32.1768ZM43.4355 7.92871C43.4355 7.55501 43.5039 7.22461 43.6406 6.9375C43.7819 6.64583 43.9665 6.41569 44.1943 6.24707C44.4268 6.07389 44.6774 5.94401 44.9463 5.85742C45.2197 5.77083 45.5 5.72754 45.7871 5.72754C46.7441 5.72754 47.471 6.01693 47.9678 6.5957V5.59082C47.9678 5.20345 47.8219 4.89811 47.5303 4.6748C47.2432 4.44694 46.8626 4.33301 46.3887 4.33301C45.6322 4.33301 44.9645 4.61556 44.3857 5.18066L43.7842 4.16211C44.5544 3.43294 45.5023 3.06836 46.6279 3.06836C47.0199 3.06836 47.3776 3.11393 47.7012 3.20508C48.0293 3.29167 48.3255 3.42839 48.5898 3.61523C48.8542 3.79753 49.0615 4.05273 49.2119 4.38086C49.3623 4.70443 49.4375 5.08496 49.4375 5.52246V10H47.9678V9.27539C47.7126 9.5625 47.3958 9.78353 47.0176 9.93848C46.6439 10.0934 46.2337 10.1709 45.7871 10.1709C45.5046 10.1709 45.2266 10.123 44.9531 10.0273C44.6797 9.93164 44.4268 9.79492 44.1943 9.61719C43.9665 9.4349 43.7819 9.19792 43.6406 8.90625C43.5039 8.61458 43.4355 8.28874 43.4355 7.92871ZM44.9189 7.95605C44.9189 8.31608 45.0534 8.60775 45.3223 8.83105C45.5957 9.0498 45.9421 9.15918 46.3613 9.15918C46.694 9.15918 47.0039 9.09993 47.291 8.98145C47.5781 8.8584 47.8037 8.68522 47.9678 8.46191V7.43652C47.8037 7.21322 47.5781 7.04232 47.291 6.92383C47.0039 6.80078 46.694 6.73926 46.3613 6.73926C45.9421 6.73926 45.5957 6.85091 45.3223 7.07422C45.0534 7.29297 44.9189 7.58691 44.9189 7.95605ZM54.9814 10V0.662109H56.6631L61.4414 7.14258V0.662109H63.0752V10H61.4961L56.6221 3.33496V10H54.9814ZM64.5996 6.60938C64.5996 6.1263 64.6816 5.67057 64.8457 5.24219C65.0098 4.80924 65.2376 4.43327 65.5293 4.11426C65.8255 3.79069 66.1924 3.53548 66.6299 3.34863C67.0674 3.16178 67.5482 3.06836 68.0723 3.06836C68.7741 3.06836 69.3916 3.23014 69.9248 3.55371C70.4626 3.87728 70.8682 4.30566 71.1416 4.83887C71.4196 5.36751 71.5586 5.95768 71.5586 6.60938C71.5586 7.26562 71.4196 7.86263 71.1416 8.40039C70.8682 8.93359 70.4626 9.36198 69.9248 9.68555C69.3916 10.0091 68.7741 10.1709 68.0723 10.1709C67.5482 10.1709 67.0674 10.0775 66.6299 9.89062C66.1924 9.69922 65.8255 9.44401 65.5293 9.125C65.2376 8.80143 65.0098 8.42318 64.8457 7.99023C64.6816 7.55729 64.5996 7.09701 64.5996 6.60938ZM66.124 6.60938C66.124 7.23828 66.2995 7.77148 66.6504 8.20898C67.0013 8.64648 67.4753 8.86523 68.0723 8.86523C68.6784 8.86523 69.1546 8.64876 69.501 8.21582C69.8519 7.77832 70.0273 7.24284 70.0273 6.60938C70.0273 5.98503 69.8519 5.45638 69.501 5.02344C69.1546 4.59049 68.6784 4.37402 68.0723 4.37402C67.4753 4.37402 67.0013 4.59049 66.6504 5.02344C66.2995 5.45638 66.124 5.98503 66.124 6.60938ZM72.0645 3.23926H73.6299L75.6055 8.30469L77.5811 3.23926H79.1602L76.4053 10H74.8193L72.0645 3.23926ZM79.6797 7.92871C79.6797 7.55501 79.748 7.22461 79.8848 6.9375C80.026 6.64583 80.2106 6.41569 80.4385 6.24707C80.6709 6.07389 80.9215 5.94401 81.1904 5.85742C81.4639 5.77083 81.7441 5.72754 82.0312 5.72754C82.9883 5.72754 83.7152 6.01693 84.2119 6.5957V5.59082C84.2119 5.20345 84.0661 4.89811 83.7744 4.6748C83.4873 4.44694 83.1068 4.33301 82.6328 4.33301C81.8763 4.33301 81.2087 4.61556 80.6299 5.18066L80.0283 4.16211C80.7985 3.43294 81.7464 3.06836 82.8721 3.06836C83.264 3.06836 83.6217 3.11393 83.9453 3.20508C84.2734 3.29167 84.5697 3.42839 84.834 3.61523C85.0983 3.79753 85.3057 4.05273 85.4561 4.38086C85.6064 4.70443 85.6816 5.08496 85.6816 5.52246V10H84.2119V9.27539C83.9567 9.5625 83.64 9.78353 83.2617 9.93848C82.888 10.0934 82.4779 10.1709 82.0312 10.1709C81.7487 10.1709 81.4707 10.123 81.1973 10.0273C80.9238 9.93164 80.6709 9.79492 80.4385 9.61719C80.2106 9.4349 80.026 9.19792 79.8848 8.90625C79.748 8.61458 79.6797 8.28874 79.6797 7.92871ZM81.1631 7.95605C81.1631 8.31608 81.2975 8.60775 81.5664 8.83105C81.8398 9.0498 82.1862 9.15918 82.6055 9.15918C82.9382 9.15918 83.248 9.09993 83.5352 8.98145C83.8223 8.8584 84.0479 8.68522 84.2119 8.46191V7.43652C84.0479 7.21322 83.8223 7.04232 83.5352 6.92383C83.248 6.80078 82.9382 6.73926 82.6055 6.73926C82.1862 6.73926 81.8398 6.85091 81.5664 7.07422C81.2975 7.29297 81.1631 7.58691 81.1631 7.95605Z'
        fill='#222222'
      />
    </svg>
  );
}