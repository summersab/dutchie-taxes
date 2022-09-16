import React, { SVGAttributes } from 'react';

export function Volkhorn(props: SVGAttributes<unknown>): JSX.Element {
  return (
    <svg width='54' height='11' viewBox='0 0 54 11' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        d='M4.082 10.104C3.78733 9.30667 3.48833 8.52667 3.185 7.764C2.88167 6.99267 2.58267 6.24733 2.288 5.528C1.99333 4.80867 1.70733 4.12833 1.43 3.487C1.23933 3.071 1.08767 2.759 0.975 2.551C0.871 2.343 0.767 2.2 0.663 2.122C0.567667 2.044 0.450667 1.992 0.312 1.966C0.277333 1.862 0.251333 1.74067 0.234 1.602C0.225333 1.46333 0.221 1.32033 0.221 1.173C0.325 1.18167 0.455 1.19033 0.611 1.199C0.767 1.199 0.936 1.20333 1.118 1.212C1.3 1.212 1.47333 1.212 1.638 1.212C1.81133 1.212 1.95867 1.212 2.08 1.212C2.32267 1.212 2.61733 1.212 2.964 1.212C3.31067 1.20333 3.653 1.19033 3.991 1.173C3.98233 1.33767 3.96933 1.48933 3.952 1.628C3.94333 1.758 3.926 1.87067 3.9 1.966C3.64867 1.992 3.46667 2.04833 3.354 2.135C3.25 2.213 3.211 2.343 3.237 2.525C3.263 2.707 3.34967 2.97567 3.497 3.331C3.705 3.83367 3.90433 4.332 4.095 4.826C4.29433 5.32 4.485 5.827 4.667 6.347C4.849 6.867 5.03533 7.426 5.226 8.024H4.901C5.15233 7.46067 5.382 6.92767 5.59 6.425C5.80667 5.91367 6.01467 5.40233 6.214 4.891C6.41333 4.371 6.61267 3.82067 6.812 3.24C6.93333 2.876 6.96367 2.58567 6.903 2.369C6.84233 2.14367 6.64733 2.00933 6.318 1.966C6.28333 1.862 6.25733 1.745 6.24 1.615C6.23133 1.47633 6.227 1.329 6.227 1.173C6.34833 1.18167 6.48267 1.19033 6.63 1.199C6.77733 1.199 6.929 1.20333 7.085 1.212C7.24967 1.212 7.397 1.212 7.527 1.212C7.735 1.212 7.96467 1.20767 8.216 1.199C8.46733 1.19033 8.67533 1.18167 8.84 1.173C8.84 1.32033 8.83133 1.46333 8.814 1.602C8.79667 1.732 8.77067 1.85333 8.736 1.966C8.49333 2.018 8.294 2.15667 8.138 2.382C7.99067 2.59867 7.826 2.93233 7.644 3.383C7.21933 4.48367 6.78167 5.58 6.331 6.672C5.889 7.764 5.42967 8.87767 4.953 10.013C4.83167 10.0563 4.693 10.0823 4.537 10.091C4.38967 10.0997 4.238 10.104 4.082 10.104ZM11.4485 10.117C10.7639 10.117 10.1789 9.99567 9.69353 9.753C9.2082 9.50167 8.83986 9.15067 8.58853 8.7C8.34586 8.24067 8.22453 7.70333 8.22453 7.088C8.22453 6.42067 8.36753 5.853 8.65353 5.385C8.93953 4.90833 9.32953 4.54867 9.82353 4.306C10.3262 4.05467 10.8852 3.929 11.5005 3.929C12.2112 3.929 12.8049 4.059 13.2815 4.319C13.7669 4.579 14.1309 4.93867 14.3735 5.398C14.6249 5.84867 14.7505 6.373 14.7505 6.971C14.7505 7.60367 14.6162 8.15833 14.3475 8.635C14.0789 9.103 13.6975 9.467 13.2035 9.727C12.7095 9.987 12.1245 10.117 11.4485 10.117ZM11.6175 9.298C12.0249 9.298 12.3282 9.10733 12.5275 8.726C12.7355 8.336 12.8395 7.85067 12.8395 7.27C12.8395 6.71533 12.7702 6.24733 12.6315 5.866C12.4929 5.48467 12.3109 5.19867 12.0855 5.008C11.8602 4.81733 11.6132 4.722 11.3445 4.722C10.9372 4.722 10.6339 4.91267 10.4345 5.294C10.2352 5.66667 10.1355 6.13467 10.1355 6.698C10.1355 7.20067 10.1919 7.65133 10.3045 8.05C10.4259 8.44 10.5992 8.74767 10.8245 8.973C11.0499 9.18967 11.3142 9.298 11.6175 9.298ZM15.5095 10.039C15.5095 9.883 15.5138 9.74 15.5225 9.61C15.5398 9.47133 15.5658 9.35 15.6005 9.246C15.9472 9.23733 16.1768 9.155 16.2895 8.999C16.4108 8.843 16.4715 8.54833 16.4715 8.115V2.707C16.4715 2.51633 16.4455 2.36467 16.3935 2.252C16.3415 2.13067 16.2462 2.03967 16.1075 1.979C15.9688 1.90967 15.7652 1.86633 15.4965 1.849C15.4965 1.719 15.5052 1.59333 15.5225 1.472C15.5485 1.342 15.5875 1.22067 15.6395 1.108C15.9342 1.108 16.2332 1.08633 16.5365 1.043C16.8485 0.999667 17.1302 0.947666 17.3815 0.887C17.6328 0.817666 17.8192 0.748333 17.9405 0.679C18.0532 0.722333 18.1442 0.800333 18.2135 0.912999C18.2828 1.017 18.3175 1.16867 18.3175 1.368V8.115C18.3175 8.54833 18.3738 8.843 18.4865 8.999C18.5992 9.155 18.8158 9.23733 19.1365 9.246C19.1712 9.35 19.1928 9.47567 19.2015 9.623C19.2102 9.76167 19.2145 9.90033 19.2145 10.039C19.0932 10.0303 18.9285 10.0217 18.7205 10.013C18.5212 10.013 18.3045 10.0087 18.0705 10C17.8365 10 17.6025 10 17.3685 10C17.1345 10 16.8962 10 16.6535 10C16.4108 10.0087 16.1898 10.013 15.9905 10.013C15.7912 10.0217 15.6308 10.0303 15.5095 10.039ZM19.9275 10.039C19.9275 9.883 19.9318 9.74 19.9405 9.61C19.9578 9.47133 19.9838 9.35 20.0185 9.246C20.3651 9.23733 20.5948 9.155 20.7075 8.999C20.8288 8.843 20.8895 8.54833 20.8895 8.115V2.707C20.8895 2.51633 20.8635 2.36467 20.8115 2.252C20.7595 2.13067 20.6641 2.03967 20.5255 1.979C20.3868 1.90967 20.1831 1.86633 19.9145 1.849C19.9145 1.719 19.9231 1.59333 19.9405 1.472C19.9665 1.342 20.0055 1.22067 20.0575 1.108C20.3521 1.108 20.6511 1.08633 20.9545 1.043C21.2665 0.999667 21.5481 0.947666 21.7995 0.887C22.0508 0.817666 22.2371 0.748333 22.3585 0.679C22.4711 0.722333 22.5621 0.800333 22.6315 0.912999C22.7008 1.017 22.7355 1.16867 22.7355 1.368V8.115C22.7355 8.54833 22.7918 8.843 22.9045 8.999C23.0171 9.155 23.2338 9.23733 23.5545 9.246C23.5891 9.35 23.6108 9.47567 23.6195 9.623C23.6281 9.76167 23.6325 9.90033 23.6325 10.039C23.5111 10.0303 23.3465 10.0217 23.1385 10.013C22.9391 10.013 22.7225 10.0087 22.4885 10C22.2545 10 22.0205 10 21.7865 10C21.5525 10 21.3141 10 21.0715 10C20.8288 10.0087 20.6078 10.013 20.4085 10.013C20.2091 10.0217 20.0488 10.0303 19.9275 10.039ZM24.3454 10.039C24.3454 9.883 24.3498 9.74 24.3584 9.61C24.3758 9.47133 24.4018 9.35 24.4364 9.246C24.7831 9.23733 25.0128 9.155 25.1254 8.999C25.2468 8.843 25.3074 8.54833 25.3074 8.115V2.772C25.3074 2.564 25.2814 2.395 25.2294 2.265C25.1861 2.135 25.0951 2.03967 24.9564 1.979C24.8178 1.90967 24.6098 1.86633 24.3324 1.849C24.3324 1.719 24.3411 1.59333 24.3584 1.472C24.3844 1.342 24.4234 1.22067 24.4754 1.108C24.7701 1.108 25.0691 1.08633 25.3724 1.043C25.6844 0.999667 25.9661 0.947666 26.2174 0.887C26.4688 0.817666 26.6551 0.748333 26.7764 0.679C26.8891 0.722333 26.9801 0.800333 27.0494 0.912999C27.1188 1.017 27.1534 1.16867 27.1534 1.368V8.115C27.1534 8.53967 27.2011 8.83 27.2964 8.986C27.3918 9.142 27.5694 9.22867 27.8294 9.246C27.8641 9.35 27.8858 9.47567 27.8944 9.623C27.9031 9.76167 27.9074 9.90033 27.9074 10.039C27.7168 10.0217 27.4611 10.0087 27.1404 10C26.8198 10 26.4948 10 26.1654 10C25.9401 10 25.7104 10 25.4764 10C25.2424 10.0087 25.0258 10.013 24.8264 10.013C24.6271 10.0217 24.4668 10.0303 24.3454 10.039ZM29.4284 10.117C29.2984 9.909 29.1294 9.67067 28.9214 9.402C28.7221 9.12467 28.5054 8.83867 28.2714 8.544C28.0374 8.24067 27.7991 7.946 27.5564 7.66C27.3138 7.374 27.0841 7.11833 26.8674 6.893L28.0634 5.814C28.3061 5.58867 28.4708 5.41533 28.5574 5.294C28.6528 5.17267 28.7004 5.07733 28.7004 5.008C28.7004 4.93867 28.6744 4.88667 28.6224 4.852C28.5704 4.81733 28.4794 4.8 28.3494 4.8C28.3061 4.67 28.2714 4.54 28.2454 4.41C28.2281 4.28 28.2194 4.15 28.2194 4.02C28.3668 4.02 28.5401 4.02433 28.7394 4.033C28.9388 4.033 29.1511 4.03733 29.3764 4.046C29.6018 4.046 29.8141 4.046 30.0134 4.046C30.2128 4.046 30.4164 4.046 30.6244 4.046C30.8411 4.03733 31.0448 4.02867 31.2354 4.02C31.2354 4.15867 31.2268 4.293 31.2094 4.423C31.1921 4.553 31.1618 4.67867 31.1184 4.8C30.9104 4.80867 30.7198 4.839 30.5464 4.891C30.3818 4.943 30.2128 5.02533 30.0394 5.138C29.8748 5.242 29.6841 5.39367 29.4674 5.593L28.3494 6.607L28.2194 5.983C28.6268 6.33833 29.0124 6.71967 29.3764 7.127C29.7491 7.53433 30.1348 8.00233 30.5334 8.531C30.6634 8.70433 30.7804 8.83867 30.8844 8.934C30.9971 9.02933 31.1098 9.09867 31.2224 9.142C31.3351 9.17667 31.4738 9.20267 31.6384 9.22C31.6384 9.35867 31.6298 9.49733 31.6124 9.636C31.5951 9.766 31.5604 9.88733 31.5084 10C31.2918 10 31.0578 10.0043 30.8064 10.013C30.5638 10.0217 30.3211 10.0303 30.0784 10.039C29.8358 10.0563 29.6191 10.0823 29.4284 10.117ZM35.3538 10.117C34.6691 10.117 34.0841 9.99567 33.5988 9.753C33.1135 9.50167 32.7451 9.15067 32.4938 8.7C32.2511 8.24067 32.1298 7.70333 32.1298 7.088C32.1298 6.42067 32.2728 5.853 32.5588 5.385C32.8448 4.90833 33.2348 4.54867 33.7288 4.306C34.2315 4.05467 34.7905 3.929 35.4058 3.929C36.1165 3.929 36.7101 4.059 37.1868 4.319C37.6721 4.579 38.0361 4.93867 38.2788 5.398C38.5301 5.84867 38.6558 6.373 38.6558 6.971C38.6558 7.60367 38.5215 8.15833 38.2528 8.635C37.9841 9.103 37.6028 9.467 37.1088 9.727C36.6148 9.987 36.0298 10.117 35.3538 10.117ZM35.5228 9.298C35.9301 9.298 36.2335 9.10733 36.4328 8.726C36.6408 8.336 36.7448 7.85067 36.7448 7.27C36.7448 6.71533 36.6755 6.24733 36.5368 5.866C36.3981 5.48467 36.2161 5.19867 35.9908 5.008C35.7655 4.81733 35.5185 4.722 35.2498 4.722C34.8425 4.722 34.5391 4.91267 34.3398 5.294C34.1405 5.66667 34.0408 6.13467 34.0408 6.698C34.0408 7.20067 34.0971 7.65133 34.2098 8.05C34.3311 8.44 34.5045 8.74767 34.7298 8.973C34.9551 9.18967 35.2195 9.298 35.5228 9.298ZM42.3138 7.751C42.3138 8.12367 42.3528 8.414 42.4308 8.622C42.5174 8.83 42.6518 8.98167 42.8338 9.077C43.0244 9.16367 43.2801 9.22 43.6008 9.246C43.6441 9.35 43.6701 9.47133 43.6788 9.61C43.6874 9.74867 43.6918 9.89167 43.6918 10.039C43.5444 10.0303 43.3581 10.0217 43.1328 10.013C42.9161 10.013 42.6821 10.0087 42.4308 10C42.1794 10 41.9324 10 41.6898 10C41.2998 10 40.8968 10 40.4808 10C40.0648 10.0087 39.7354 10.0217 39.4928 10.039C39.4928 9.857 39.4971 9.70533 39.5058 9.584C39.5231 9.454 39.5448 9.34133 39.5708 9.246C39.8048 9.22867 39.9868 9.18533 40.1168 9.116C40.2468 9.04667 40.3334 8.921 40.3768 8.739C40.4288 8.54833 40.4548 8.284 40.4548 7.946V7.049H42.3138V7.751ZM42.3138 6.165V7.283H40.4548V5.866L42.3138 4.631C42.3138 4.84767 42.2878 5.06867 42.2358 5.294C42.1924 5.51067 42.1361 5.77067 42.0668 6.074L42.3138 6.165ZM42.0278 6.126C42.0971 5.92667 42.1664 5.72733 42.2358 5.528C42.3051 5.32867 42.3701 5.177 42.4308 5.073C42.6214 4.76967 42.8554 4.51833 43.1328 4.319C43.4101 4.11967 43.7221 4.02 44.0688 4.02C44.4068 4.02 44.7144 4.124 44.9918 4.332C44.9658 4.50533 44.9398 4.70467 44.9138 4.93C44.8964 5.14667 44.8834 5.36767 44.8748 5.593C44.8748 5.81833 44.8791 6.02633 44.8878 6.217C44.7578 6.269 44.5844 6.308 44.3678 6.334C44.1598 6.36 43.9734 6.373 43.8088 6.373C43.8001 6.02633 43.7481 5.788 43.6528 5.658C43.5574 5.51933 43.4231 5.45 43.2498 5.45C43.1198 5.45 42.9811 5.528 42.8338 5.684C42.6864 5.83133 42.5608 6.03067 42.4568 6.282C42.3614 6.52467 42.3138 6.789 42.3138 7.075L42.0278 6.126ZM40.4548 7.283V6.152C40.4548 5.90067 40.4331 5.70567 40.3898 5.567C40.3551 5.41967 40.2684 5.31133 40.1298 5.242C39.9998 5.164 39.7918 5.11633 39.5058 5.099C39.5058 4.969 39.5144 4.84333 39.5318 4.722C39.5578 4.592 39.6011 4.47067 39.6618 4.358C40.1211 4.358 40.5631 4.31467 40.9878 4.228C41.4211 4.13267 41.7374 4.033 41.9368 3.929C42.0581 3.97233 42.1491 4.05033 42.2098 4.163C42.2791 4.267 42.3138 4.423 42.3138 4.631L40.4548 7.283ZM46.6247 7.283V6.152C46.6247 5.90067 46.603 5.70567 46.5597 5.567C46.525 5.41967 46.4384 5.31133 46.2997 5.242C46.1697 5.164 45.9617 5.11633 45.6757 5.099C45.6757 4.969 45.6844 4.84333 45.7017 4.722C45.7277 4.592 45.771 4.47067 45.8317 4.358C46.291 4.358 46.733 4.31467 47.1577 4.228C47.591 4.13267 47.9074 4.033 48.1067 3.929C48.228 3.97233 48.319 4.05033 48.3797 4.163C48.449 4.267 48.4837 4.423 48.4837 4.631L46.6247 7.283ZM52.6047 8.115C52.6047 8.54833 52.6524 8.84733 52.7477 9.012C52.8517 9.168 53.0207 9.246 53.2547 9.246C53.298 9.35 53.324 9.467 53.3327 9.597C53.35 9.71833 53.3587 9.86567 53.3587 10.039C53.168 10.0303 52.921 10.0217 52.6177 10.013C52.323 10.0043 52.0327 10 51.7467 10C51.556 10 51.3394 10 51.0967 10C50.8627 10.0087 50.6374 10.013 50.4207 10.013C50.204 10.0217 50.0307 10.0303 49.9007 10.039C49.9007 9.883 49.905 9.74 49.9137 9.61C49.9224 9.48 49.9484 9.35867 49.9917 9.246C50.2344 9.246 50.4207 9.15933 50.5507 8.986C50.6807 8.81267 50.7457 8.49633 50.7457 8.037V6.62C50.7457 6.074 50.659 5.697 50.4857 5.489C50.3124 5.27233 50.0654 5.164 49.7447 5.164C49.5367 5.164 49.333 5.24633 49.1337 5.411C48.943 5.567 48.787 5.801 48.6657 6.113C48.5444 6.41633 48.4837 6.79767 48.4837 7.257V8.115C48.4837 8.557 48.54 8.856 48.6527 9.012C48.774 9.168 48.9647 9.246 49.2247 9.246C49.2767 9.36733 49.307 9.48867 49.3157 9.61C49.3244 9.73133 49.3287 9.87433 49.3287 10.039C49.2074 10.0303 49.0427 10.0217 48.8347 10.013C48.6267 10.013 48.41 10.0087 48.1847 10C47.968 10 47.76 10 47.5607 10C47.3614 10 47.1404 10 46.8977 10C46.655 10.0087 46.421 10.013 46.1957 10.013C45.9704 10.0217 45.7927 10.0303 45.6627 10.039C45.6627 9.87433 45.6714 9.72267 45.6887 9.584C45.706 9.44533 45.732 9.33267 45.7667 9.246C46.1047 9.246 46.33 9.168 46.4427 9.012C46.564 8.84733 46.6247 8.54833 46.6247 8.115V6.152L48.4837 4.631C48.4837 4.735 48.4707 4.85633 48.4447 4.995C48.4274 5.125 48.397 5.26367 48.3537 5.411C48.4057 5.307 48.4577 5.203 48.5097 5.099C48.5617 4.995 48.631 4.89533 48.7177 4.8C48.891 4.60067 49.1337 4.41867 49.4457 4.254C49.7577 4.08067 50.1174 3.994 50.5247 3.994C50.8887 3.994 51.2267 4.06333 51.5387 4.202C51.8594 4.34067 52.115 4.566 52.3057 4.878C52.505 5.19 52.6047 5.60167 52.6047 6.113V8.115Z'
        fill='#242526'
      />
    </svg>
  );
}
