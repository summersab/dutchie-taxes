import React, { SVGAttributes } from 'react';

export function NotoSans(props: SVGAttributes<unknown>): JSX.Element {
  return (
    <svg width='65' height='11' viewBox='0 0 65 11' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        d='M8.399 10H5.903L1.86 2.98H1.808C1.81667 3.19667 1.82533 3.41767 1.834 3.643C1.84267 3.85967 1.85133 4.08067 1.86 4.306C1.87733 4.52267 1.89033 4.74367 1.899 4.969C1.90767 5.18567 1.91633 5.40667 1.925 5.632V10H0.17V0.717999H2.653L6.683 7.673H6.722C6.71333 7.45633 6.70467 7.244 6.696 7.036C6.68733 6.81933 6.67867 6.607 6.67 6.399C6.67 6.18233 6.66567 5.97 6.657 5.762C6.64833 5.54533 6.63967 5.32867 6.631 5.112V0.717999H8.399V10ZM17.0372 6.438C17.0372 7.02733 16.9549 7.55167 16.7902 8.011C16.6342 8.47033 16.4045 8.86033 16.1012 9.181C15.8065 9.493 15.4469 9.73133 15.0222 9.896C14.5975 10.052 14.1165 10.13 13.5792 10.13C13.0852 10.13 12.6259 10.052 12.2012 9.896C11.7852 9.73133 11.4255 9.493 11.1222 9.181C10.8189 8.86033 10.5805 8.47033 10.4072 8.011C10.2425 7.55167 10.1602 7.02733 10.1602 6.438C10.1602 5.64933 10.2989 4.98633 10.5762 4.449C10.8535 3.903 11.2522 3.487 11.7722 3.201C12.2922 2.915 12.9075 2.772 13.6182 2.772C14.2855 2.772 14.8749 2.915 15.3862 3.201C15.8975 3.487 16.3005 3.903 16.5952 4.449C16.8899 4.98633 17.0372 5.64933 17.0372 6.438ZM12.1362 6.438C12.1362 6.906 12.1839 7.30033 12.2792 7.621C12.3832 7.933 12.5435 8.17133 12.7602 8.336C12.9769 8.492 13.2585 8.57 13.6052 8.57C13.9519 8.57 14.2292 8.492 14.4372 8.336C14.6539 8.17133 14.8099 7.933 14.9052 7.621C15.0092 7.30033 15.0612 6.906 15.0612 6.438C15.0612 5.97 15.0092 5.58 14.9052 5.268C14.8099 4.956 14.6539 4.722 14.4372 4.566C14.2205 4.41 13.9389 4.332 13.5922 4.332C13.0809 4.332 12.7082 4.50967 12.4742 4.865C12.2489 5.21167 12.1362 5.736 12.1362 6.438ZM21.628 8.583C21.8447 8.583 22.0527 8.56133 22.252 8.518C22.4514 8.47467 22.6507 8.42267 22.85 8.362V9.805C22.642 9.89167 22.382 9.96533 22.07 10.026C21.7667 10.0953 21.433 10.13 21.069 10.13C20.6444 10.13 20.263 10.0607 19.925 9.922C19.5957 9.78333 19.3314 9.545 19.132 9.207C18.9414 8.86033 18.846 8.38367 18.846 7.777V4.358H17.923V3.539L18.989 2.889L19.548 1.394H20.783V2.902H22.772V4.358H20.783V7.777C20.783 8.04567 20.861 8.24933 21.017 8.388C21.173 8.518 21.3767 8.583 21.628 8.583ZM30.7227 6.438C30.7227 7.02733 30.6404 7.55167 30.4757 8.011C30.3197 8.47033 30.0901 8.86033 29.7867 9.181C29.4921 9.493 29.1324 9.73133 28.7077 9.896C28.2831 10.052 27.8021 10.13 27.2647 10.13C26.7707 10.13 26.3114 10.052 25.8867 9.896C25.4707 9.73133 25.1111 9.493 24.8077 9.181C24.5044 8.86033 24.2661 8.47033 24.0927 8.011C23.9281 7.55167 23.8457 7.02733 23.8457 6.438C23.8457 5.64933 23.9844 4.98633 24.2617 4.449C24.5391 3.903 24.9377 3.487 25.4577 3.201C25.9777 2.915 26.5931 2.772 27.3037 2.772C27.9711 2.772 28.5604 2.915 29.0717 3.201C29.5831 3.487 29.9861 3.903 30.2807 4.449C30.5754 4.98633 30.7227 5.64933 30.7227 6.438ZM25.8217 6.438C25.8217 6.906 25.8694 7.30033 25.9647 7.621C26.0687 7.933 26.2291 8.17133 26.4457 8.336C26.6624 8.492 26.9441 8.57 27.2907 8.57C27.6374 8.57 27.9147 8.492 28.1227 8.336C28.3394 8.17133 28.4954 7.933 28.5907 7.621C28.6947 7.30033 28.7467 6.906 28.7467 6.438C28.7467 5.97 28.6947 5.58 28.5907 5.268C28.4954 4.956 28.3394 4.722 28.1227 4.566C27.9061 4.41 27.6244 4.332 27.2777 4.332C26.7664 4.332 26.3937 4.50967 26.1597 4.865C25.9344 5.21167 25.8217 5.736 25.8217 6.438ZM41.3295 7.426C41.3295 7.972 41.1952 8.44867 40.9265 8.856C40.6579 9.26333 40.2679 9.57967 39.7565 9.805C39.2539 10.0217 38.6385 10.13 37.9105 10.13C37.5899 10.13 37.2735 10.1083 36.9615 10.065C36.6582 10.0217 36.3635 9.961 36.0775 9.883C35.8002 9.79633 35.5359 9.69233 35.2845 9.571V7.738C35.7265 7.92867 36.1815 8.10633 36.6495 8.271C37.1262 8.427 37.5985 8.505 38.0665 8.505C38.3872 8.505 38.6429 8.46167 38.8335 8.375C39.0329 8.28833 39.1759 8.17133 39.2625 8.024C39.3579 7.87667 39.4055 7.70767 39.4055 7.517C39.4055 7.283 39.3232 7.08367 39.1585 6.919C39.0025 6.75433 38.7902 6.60267 38.5215 6.464C38.2529 6.31667 37.9452 6.16067 37.5985 5.996C37.3819 5.892 37.1479 5.77067 36.8965 5.632C36.6452 5.48467 36.4025 5.307 36.1685 5.099C35.9432 4.88233 35.7569 4.62233 35.6095 4.319C35.4622 4.01567 35.3885 3.65167 35.3885 3.227C35.3885 2.67233 35.5142 2.2 35.7655 1.81C36.0255 1.41133 36.3895 1.108 36.8575 0.899999C37.3342 0.691999 37.8932 0.588 38.5345 0.588C39.0199 0.588 39.4792 0.644333 39.9125 0.757C40.3545 0.869666 40.8139 1.03 41.2905 1.238L40.6535 2.772C40.2289 2.59867 39.8475 2.46433 39.5095 2.369C39.1715 2.27367 38.8249 2.226 38.4695 2.226C38.2269 2.226 38.0189 2.265 37.8455 2.343C37.6722 2.421 37.5379 2.52933 37.4425 2.668C37.3559 2.80667 37.3125 2.97133 37.3125 3.162C37.3125 3.37867 37.3775 3.565 37.5075 3.721C37.6375 3.86833 37.8325 4.01133 38.0925 4.15C38.3525 4.28867 38.6775 4.45333 39.0675 4.644C39.5442 4.86933 39.9472 5.10333 40.2765 5.346C40.6145 5.58867 40.8745 5.87467 41.0565 6.204C41.2385 6.53333 41.3295 6.94067 41.3295 7.426ZM45.7727 2.759C46.726 2.759 47.454 2.967 47.9567 3.383C48.468 3.79033 48.7237 4.41867 48.7237 5.268V10H47.3717L46.9947 9.038H46.9427C46.7433 9.28933 46.5353 9.49733 46.3187 9.662C46.1107 9.82667 45.868 9.94367 45.5907 10.013C45.322 10.091 44.9883 10.13 44.5897 10.13C44.1737 10.13 43.7967 10.052 43.4587 9.896C43.1293 9.73133 42.8693 9.48433 42.6787 9.155C42.488 8.817 42.3927 8.39233 42.3927 7.881C42.3927 7.127 42.657 6.57233 43.1857 6.217C43.7143 5.853 44.5073 5.65367 45.5647 5.619L46.7997 5.58V5.268C46.7997 4.89533 46.7 4.62233 46.5007 4.449C46.31 4.27567 46.0413 4.189 45.6947 4.189C45.348 4.189 45.01 4.241 44.6807 4.345C44.3513 4.44033 44.022 4.56167 43.6927 4.709L43.0557 3.396C43.437 3.19667 43.8573 3.04067 44.3167 2.928C44.7847 2.81533 45.27 2.759 45.7727 2.759ZM46.0457 6.737C45.4217 6.75433 44.9883 6.867 44.7457 7.075C44.503 7.283 44.3817 7.556 44.3817 7.894C44.3817 8.18867 44.4683 8.401 44.6417 8.531C44.815 8.65233 45.0403 8.713 45.3177 8.713C45.7337 8.713 46.0847 8.59167 46.3707 8.349C46.6567 8.09767 46.7997 7.74667 46.7997 7.296V6.711L46.0457 6.737ZM54.7364 2.772C55.499 2.772 56.11 2.98 56.5694 3.396C57.0287 3.80333 57.2584 4.462 57.2584 5.372V10H55.3214V5.853C55.3214 5.34167 55.2304 4.96033 55.0484 4.709C54.8664 4.449 54.576 4.319 54.1774 4.319C53.588 4.319 53.185 4.52267 52.9684 4.93C52.7517 5.32867 52.6434 5.905 52.6434 6.659V10H50.7064V2.902H52.1884L52.4484 3.812H52.5524C52.7084 3.56933 52.899 3.37433 53.1244 3.227C53.3497 3.071 53.601 2.95833 53.8784 2.889C54.1557 2.811 54.4417 2.772 54.7364 2.772ZM64.2033 7.894C64.2033 8.37067 64.0907 8.778 63.8653 9.116C63.64 9.44533 63.302 9.69667 62.8513 9.87C62.4007 10.0433 61.8417 10.13 61.1743 10.13C60.6803 10.13 60.2557 10.0953 59.9003 10.026C59.545 9.96533 59.1897 9.86133 58.8343 9.714V8.115C59.2157 8.28833 59.6273 8.43133 60.0693 8.544C60.5113 8.65667 60.9013 8.713 61.2393 8.713C61.6207 8.713 61.8893 8.65667 62.0453 8.544C62.21 8.43133 62.2923 8.284 62.2923 8.102C62.2923 7.98067 62.2577 7.87233 62.1883 7.777C62.1277 7.68167 61.989 7.57333 61.7723 7.452C61.5557 7.33067 61.2177 7.17467 60.7583 6.984C60.3163 6.79333 59.9523 6.607 59.6663 6.425C59.3803 6.23433 59.168 6.009 59.0293 5.749C58.8907 5.48033 58.8213 5.14667 58.8213 4.748C58.8213 4.08933 59.077 3.59533 59.5883 3.266C60.0997 2.93667 60.78 2.772 61.6293 2.772C62.0713 2.772 62.4917 2.81533 62.8903 2.902C63.289 2.98867 63.7007 3.13167 64.1253 3.331L63.5403 4.722C63.3063 4.618 63.081 4.527 62.8643 4.449C62.6477 4.371 62.4353 4.31033 62.2273 4.267C62.028 4.22367 61.82 4.202 61.6033 4.202C61.3173 4.202 61.1007 4.241 60.9533 4.319C60.8147 4.397 60.7453 4.514 60.7453 4.67C60.7453 4.78267 60.78 4.88667 60.8493 4.982C60.9273 5.06867 61.0703 5.164 61.2783 5.268C61.495 5.372 61.8113 5.51067 62.2273 5.684C62.6347 5.84867 62.9857 6.022 63.2803 6.204C63.575 6.37733 63.8003 6.59833 63.9563 6.867C64.121 7.127 64.2033 7.46933 64.2033 7.894Z'
        fill='#242526'
      />
    </svg>
  );
}