import React, { SVGAttributes } from 'react';

export function FiraSans(props: SVGAttributes<unknown>): JSX.Element {
  return (
    <svg width='53' height='12' viewBox='0 0 53 12' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        d='M0.845 11V1.991H6.214L5.993 3.512H2.977V5.904H5.603V7.425H2.977V11H0.845ZM8.8141 4.097V11H6.7601V4.097H8.8141ZM7.7741 0.456999C8.12943 0.456999 8.41977 0.569666 8.6451 0.795C8.8791 1.01167 8.9961 1.289 8.9961 1.627C8.9961 1.965 8.8791 2.24667 8.6451 2.472C8.41977 2.68867 8.12943 2.797 7.7741 2.797C7.41877 2.797 7.12843 2.68867 6.9031 2.472C6.67777 2.24667 6.5651 1.965 6.5651 1.627C6.5651 1.289 6.67777 1.01167 6.9031 0.795C7.12843 0.569666 7.41877 0.456999 7.7741 0.456999ZM14.173 3.902C14.4244 3.902 14.654 3.93233 14.862 3.993L14.537 5.982C14.277 5.92133 14.069 5.891 13.913 5.891C13.5057 5.891 13.1937 6.034 12.977 6.32C12.769 6.59733 12.6044 7.01767 12.483 7.581V11H10.429V4.097H12.223L12.392 5.436C12.548 4.95933 12.782 4.58667 13.094 4.318C13.4147 4.04067 13.7744 3.902 14.173 3.902ZM20.6758 8.998C20.6758 9.258 20.7105 9.44867 20.7798 9.57C20.8578 9.69133 20.9791 9.78233 21.1438 9.843L20.7148 11.182C20.2901 11.1473 19.9435 11.0563 19.6748 10.909C19.4061 10.753 19.1981 10.5103 19.0508 10.181C18.6001 10.8743 17.9068 11.221 16.9708 11.221C16.2861 11.221 15.7401 11.0217 15.3328 10.623C14.9255 10.2243 14.7218 9.70433 14.7218 9.063C14.7218 8.309 14.9991 7.73267 15.5538 7.334C16.1085 6.93533 16.9101 6.736 17.9588 6.736H18.6608V6.437C18.6608 6.02967 18.5741 5.75233 18.4008 5.605C18.2275 5.449 17.9241 5.371 17.4908 5.371C17.2655 5.371 16.9925 5.40567 16.6718 5.475C16.3511 5.53567 16.0218 5.62233 15.6838 5.735L15.2158 4.383C15.6491 4.21833 16.0911 4.09267 16.5418 4.006C17.0011 3.91933 17.4258 3.876 17.8158 3.876C18.8038 3.876 19.5275 4.07967 19.9868 4.487C20.4461 4.89433 20.6758 5.50533 20.6758 6.32V8.998ZM17.5688 9.752C18.0368 9.752 18.4008 9.531 18.6608 9.089V7.867H18.1538C17.6858 7.867 17.3348 7.94933 17.1008 8.114C16.8755 8.27867 16.7628 8.53433 16.7628 8.881C16.7628 9.15833 16.8321 9.375 16.9708 9.531C17.1181 9.67833 17.3175 9.752 17.5688 9.752ZM28.3348 1.77C29.0108 1.77 29.5958 1.86533 30.0898 2.056C30.5925 2.24667 31.0475 2.537 31.4548 2.927L30.4668 4.084C29.8515 3.58133 29.1928 3.33 28.4908 3.33C28.1182 3.33 27.8235 3.408 27.6068 3.564C27.3902 3.71133 27.2818 3.928 27.2818 4.214C27.2818 4.41333 27.3295 4.578 27.4248 4.708C27.5202 4.82933 27.6892 4.94633 27.9318 5.059C28.1745 5.17167 28.5385 5.306 29.0238 5.462C29.9425 5.75667 30.6185 6.12067 31.0518 6.554C31.4852 6.97867 31.7018 7.58533 31.7018 8.374C31.7018 8.93733 31.5588 9.43567 31.2728 9.869C30.9868 10.2937 30.5752 10.6273 30.0378 10.87C29.5005 11.104 28.8635 11.221 28.1268 11.221C27.3902 11.221 26.7358 11.104 26.1638 10.87C25.6005 10.636 25.1152 10.324 24.7078 9.934L25.7868 8.751C26.1335 9.04567 26.4888 9.26667 26.8528 9.414C27.2255 9.56133 27.6285 9.635 28.0618 9.635C28.5038 9.635 28.8505 9.53967 29.1018 9.349C29.3618 9.14967 29.4918 8.87667 29.4918 8.53C29.4918 8.30467 29.4442 8.11833 29.3488 7.971C29.2535 7.815 29.0888 7.67633 28.8548 7.555C28.6208 7.43367 28.2828 7.30367 27.8408 7.165C26.8442 6.86167 26.1335 6.489 25.7088 6.047C25.2928 5.605 25.0848 5.046 25.0848 4.37C25.0848 3.85 25.2235 3.395 25.5008 3.005C25.7782 2.60633 26.1638 2.303 26.6578 2.095C27.1518 1.87833 27.7108 1.77 28.3348 1.77ZM38.3223 8.998C38.3223 9.258 38.3569 9.44867 38.4263 9.57C38.5043 9.69133 38.6256 9.78233 38.7903 9.843L38.3613 11.182C37.9366 11.1473 37.5899 11.0563 37.3213 10.909C37.0526 10.753 36.8446 10.5103 36.6973 10.181C36.2466 10.8743 35.5533 11.221 34.6173 11.221C33.9326 11.221 33.3866 11.0217 32.9793 10.623C32.5719 10.2243 32.3683 9.70433 32.3683 9.063C32.3683 8.309 32.6456 7.73267 33.2003 7.334C33.7549 6.93533 34.5566 6.736 35.6053 6.736H36.3073V6.437C36.3073 6.02967 36.2206 5.75233 36.0473 5.605C35.8739 5.449 35.5706 5.371 35.1373 5.371C34.9119 5.371 34.6389 5.40567 34.3183 5.475C33.9976 5.53567 33.6683 5.62233 33.3303 5.735L32.8623 4.383C33.2956 4.21833 33.7376 4.09267 34.1883 4.006C34.6476 3.91933 35.0723 3.876 35.4623 3.876C36.4503 3.876 37.1739 4.07967 37.6333 4.487C38.0926 4.89433 38.3223 5.50533 38.3223 6.32V8.998ZM35.2153 9.752C35.6833 9.752 36.0473 9.531 36.3073 9.089V7.867H35.8003C35.3323 7.867 34.9813 7.94933 34.7473 8.114C34.5219 8.27867 34.4093 8.53433 34.4093 8.881C34.4093 9.15833 34.4786 9.375 34.6173 9.531C34.7646 9.67833 34.9639 9.752 35.2153 9.752ZM44.0013 3.876C44.5993 3.876 45.0673 4.058 45.4053 4.422C45.7433 4.786 45.9123 5.29733 45.9123 5.956V11H43.8583V6.307C43.8583 5.96033 43.802 5.722 43.6893 5.592C43.5853 5.45333 43.425 5.384 43.2083 5.384C42.7923 5.384 42.3937 5.683 42.0123 6.281V11H39.9583V4.097H41.7523L41.8953 4.916C42.19 4.56933 42.5063 4.30933 42.8443 4.136C43.191 3.96267 43.5767 3.876 44.0013 3.876ZM49.8923 3.876C50.3863 3.876 50.8499 3.94967 51.2833 4.097C51.7166 4.24433 52.0979 4.45233 52.4273 4.721L51.6733 5.878C51.1099 5.52267 50.5423 5.345 49.9703 5.345C49.7016 5.345 49.4936 5.39267 49.3463 5.488C49.2076 5.57467 49.1383 5.70033 49.1383 5.865C49.1383 5.995 49.1686 6.10333 49.2293 6.19C49.2986 6.268 49.4329 6.35033 49.6323 6.437C49.8316 6.52367 50.1393 6.62767 50.5553 6.749C51.2746 6.957 51.8076 7.23 52.1543 7.568C52.5096 7.89733 52.6873 8.35667 52.6873 8.946C52.6873 9.414 52.5529 9.82133 52.2843 10.168C52.0156 10.506 51.6473 10.766 51.1793 10.948C50.7113 11.13 50.1913 11.221 49.6193 11.221C49.0386 11.221 48.4969 11.13 47.9943 10.948C47.5003 10.766 47.0799 10.5147 46.7333 10.194L47.7343 9.076C48.3149 9.52667 48.9259 9.752 49.5673 9.752C49.8793 9.752 50.1219 9.69567 50.2953 9.583C50.4773 9.47033 50.5683 9.31 50.5683 9.102C50.5683 8.93733 50.5336 8.80733 50.4643 8.712C50.3949 8.61667 50.2606 8.53 50.0613 8.452C49.8619 8.36533 49.5456 8.26133 49.1123 8.14C48.4276 7.94067 47.9163 7.66333 47.5783 7.308C47.2403 6.95267 47.0713 6.51067 47.0713 5.982C47.0713 5.58333 47.1839 5.228 47.4093 4.916C47.6433 4.59533 47.9726 4.344 48.3973 4.162C48.8306 3.97133 49.3289 3.876 49.8923 3.876Z'
        fill='#242526'
      />
    </svg>
  );
}