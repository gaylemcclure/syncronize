
export function Resize({ toolType, colorWidth }) {
  return (
    <svg
      width="40%"
      height="%"
      viewBox="0 0 51 51"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.07125 10.3053C3.18066 10.3053 2.4173 10.3053 1.65394 10.3053C0.763359 10.3053 0.254453 9.79644 0.254453 8.77863C0.254453 6.36132 0.254453 3.94402 0.254453 1.39949C0.254453 0.508906 0.763359 0 1.65394 0C4.19847 0 6.61578 0 9.16031 0C10.0509 0 10.5598 0.508906 10.5598 1.39949C10.5598 2.16285 10.5598 2.92621 10.5598 3.68957V3.81679C20.3562 3.81679 30.1527 3.81679 39.9491 3.81679C39.9491 3.05344 39.9491 2.29008 39.9491 1.52672C39.9491 0.508906 40.458 0 41.4758 0C43.8931 0 46.3104 0 48.7277 0C49.7455 0 50.2545 0.508906 50.2545 1.52672C50.2545 3.94402 50.2545 6.36132 50.2545 8.77863C50.2545 9.79644 49.7455 10.3053 48.7277 10.3053C47.9644 10.3053 47.201 10.3053 46.4377 10.3053C46.4377 20.1018 46.4377 29.8982 46.4377 39.8219C47.201 39.8219 47.9644 39.8219 48.7277 39.8219C49.7455 39.8219 50.2545 40.3308 50.2545 41.3486C50.2545 43.7659 50.2545 46.056 50.2545 48.4733C50.2545 49.6183 49.7455 50 48.6005 50C46.1832 50 43.8931 50 41.4758 50C40.3308 50 39.9491 49.4911 39.8219 48.4733C39.8219 47.7099 39.8219 47.0738 39.8219 46.3104C30.0254 46.3104 20.229 46.3104 10.3053 46.3104C10.3053 47.0738 10.3053 47.8372 10.3053 48.6005C10.3053 49.6183 9.79644 50.1272 8.77863 50.1272C6.36132 50.1272 3.94402 50.1272 1.52672 50.1272C0.508906 50.1272 0 49.6183 0 48.6005C0 46.1832 0 43.7659 0 41.3486C0 40.3308 0.508906 39.8219 1.52672 39.8219C2.29008 39.8219 2.92621 39.8219 3.68957 39.8219H3.81679C4.07125 29.8982 4.07125 20.1018 4.07125 10.3053ZM10.5598 43.6387C20.3562 43.6387 30.1527 43.6387 40.0763 43.6387C40.0763 43.1298 40.0763 42.6209 40.0763 42.112C39.9491 40.2036 40.458 39.6947 42.3664 39.8219C42.8753 39.8219 43.3842 39.8219 44.0204 39.8219C44.0204 29.8982 44.0204 20.1018 44.0204 10.3053C43.257 10.3053 42.4936 10.3053 41.7303 10.3053C40.7125 10.3053 40.2036 9.79644 40.2036 8.77863C40.2036 8.01527 40.2036 7.25191 40.2036 6.48855C30.2799 6.48855 20.4835 6.48855 10.687 6.48855C10.687 6.99746 10.687 7.50636 10.687 8.01527C10.8142 9.79644 10.3053 10.4326 8.39695 10.3053C7.88804 10.3053 7.37913 10.3053 6.87023 10.3053C6.87023 20.229 6.87023 30.0254 6.87023 39.6947C6.99745 39.6947 6.99746 39.6947 6.99746 39.6947C7.63359 39.6947 8.26972 39.6947 9.03308 39.6947C10.3053 39.6947 10.687 40.0763 10.687 41.3486C10.5598 42.112 10.5598 42.8753 10.5598 43.6387Z"
        fill={toolType === "selection" ? "black" : "#5B5858"}
      />
    </svg>
  );
}

export function Line({ toolType, colorWidth }) {
  return (
    <svg
      width="40%"
      height="40%"
      viewBox="0 0 40 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M30.748 8.00092C29.91 6.24421 30.329 4.11767 31.7535 2.91571C33.2618 1.6213 35.3567 1.71376 36.7813 3.10063C38.122 4.4875 38.3734 6.61404 37.4516 8.37075C36.3623 10.2199 34.435 10.6822 32.0887 9.57271C24.1281 21.3149 16.2513 33.0571 8.37446 44.7068C9.21242 45.6314 9.7152 46.6485 9.6314 47.9429C9.5476 49.5147 8.87724 50.7166 7.6203 51.4563C6.44716 52.196 5.10642 52.196 3.93328 51.3638C1.75459 49.977 1.33561 46.9258 3.09532 44.9842C3.93328 44.0596 5.02263 43.5973 6.19577 43.7823C6.53095 43.7823 6.61475 43.6898 6.78234 43.5049C10.1342 38.6046 13.4022 33.7968 16.6703 28.9889C21.279 22.147 25.8878 15.3051 30.4966 8.37075C30.5804 8.27829 30.6642 8.18583 30.748 8.00092Z"
        fill={toolType === "line" ? colorWidth.hex : "#5B5858"}
        stroke={toolType === "line" ? colorWidth.hex : "#5B5858"}
        strokeWidth="4"
        strokeMiterlimit="10"
      />
    </svg>
  );
}

export function Circle({ toolType, colorWidth }) {
  return (
    <svg
      width="40%"
      height="40%"
      viewBox="0 0 54 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M26.9 53.9C11.9 53.9 0 41.9 0 26.8C0 12.1 12.1 0 26.9 0C41.8 0 53.9 12.1 53.9 27.1C53.8 41.9 41.8 53.9 26.9 53.9Z"
        fill={toolType === "circle" ? colorWidth.hex : "#5B5858"}
      />
    </svg>
  );
}
export function Rectangle({ toolType, colorWidth }) {
  return (
    <svg
      width="35%"
      height="35%"
      viewBox="0 0 53 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M26.6 0C34.3 0 42 0 49.7 0C53 0 53 0.0999999 53 3.5C53 14.7 53 25.8 53 37C53 39.4 52.6 39.8 50.2 39.8C34.4 39.8 18.6 39.8 2.8 39.8C0.5 39.8 0 39.4 0 37.1C0 25.6 0 14.1 0 2.7C0 0.3 0.3 0 2.8 0C10.7 0 18.6 0 26.6 0Z"
        fill={toolType === "rectangle" ? colorWidth.hex : "#5B5858"}
      />
    </svg>
  );
}
export function Triangle({ toolType, colorWidth }) {
  return (
    <svg
      width="40%"
      height="40%"
      viewBox="0 0 54 53"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M26.2822 52.8C18.3822 52.8 10.5822 52.8 2.68223 52.8C-0.117766 52.8 -0.617766 51.9 0.682234 49.4C8.58223 33.5 16.4822 17.6 24.4822 1.7C24.8822 1 25.7822 0 26.4822 0C27.1822 0 28.0822 1 28.4822 1.7C36.4822 17.6 44.3822 33.4 52.3822 49.3C53.6822 51.8 53.0822 52.7 50.3822 52.7C42.2822 52.8 34.2822 52.8 26.2822 52.8Z"
        fill={toolType === "triangle" ? colorWidth.hex : "#5B5858"}
      />
    </svg>
  );
}
export function Brush({ toolType, colorWidth }) {
  return (
    <svg
      width="40%"
      height="40%"
      viewBox="0 0 51 47"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.3 24.9C22.5 23.1 23.7 21.3 24.9 19.7C29.7 13.5 35.2 8 41.7 3.4C43.5 2.1 45.4 0.9 47.6 0.3C48 0.1 48.5 0 49 0C50 0 50.8 0.6 50.6 1.6C50.4 2.8 50 4 49.5 5.2C48.2 7.9 46.5 10.2 44.6 12.4C41.1 16.5 37.3 20.4 33.2 23.8C30.9 25.7 28.4 27.6 25.7 29C25.8 29.3 26 29.7 26 30C26.2 30.9 25.9 31.7 25.2 32.2C24.5 32.7 23.5 32.7 22.8 32.2C22.2 31.7 21.7 31.2 21.2 30.6C20.4 29.8 19.6 29 18.8 28.2C17.8 27.2 17.7 26.2 18.4 25.3C19 24.4 20.1 24.2 21.3 24.8C21.2 24.8 21.3 24.9 21.3 24.9Z"
        fill={toolType === "brush" ? colorWidth.hex : "#5B5858"}
      />
      <path
        d="M0 44.4C0.9 43.9 1.8 43.4 2.7 42.8C4.2 41.8 4.8 40.2 5.4 38.6C6 36.9 6.5 35.2 7.3 33.6C9 30.1 12.6 29.7 15.6 31C20.6 33.2 21.7 39.3 17.7 43C14.8 45.8 11.3 46.8 7.3 46.4C4.9 46.2 2.6 45.5 0.4 44.6C0.2 44.5 0.1 44.4 0 44.4Z"
        fill={toolType === "brush" ? colorWidth.hex : "#5B5858"}
      />
    </svg>
  );
}
export function Pencil({ toolType, colorWidth }) {
  return (
    <svg
      width={window.innerWidth <= 1024 ? "29%" : "50%"}
      height={window.innerWidth <= 1024 ? "29%" : "50%"}
      viewBox="0 0 11 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11 20.8718C11 26.6068 11 32.2479 11 37.9829C11 38.641 10.812 38.8291 10.1538 38.8291C7.05128 38.8291 3.94872 38.8291 0.846154 38.8291C0.282051 38.8291 0 38.735 0 38.0769C0.0940171 26.6068 0.0940171 15.2308 0.0940171 3.76068C0.0940171 1.41026 1.59829 0 3.8547 0C4.98291 0 6.01709 0 7.1453 0C9.49573 0 11 1.41026 11 3.8547C11 7.99145 11 12.0342 11 16.1709C11 17.7692 11 19.2735 11 20.8718Z"
        fill={toolType === "pencil" ? colorWidth.hex : "#5B5858"}
      />
      <path
        d="M1.31622 40.2393H9.58973C10.1538 40.2393 10.5299 40.8034 10.3419 41.2735C8.83759 45.5043 7.33332 49.735 5.82904 53.9658C5.73503 54.1539 5.45297 54.1539 5.35896 53.9658C3.85468 49.641 2.25639 45.3162 0.75212 40.9915C0.564086 40.6154 0.846137 40.2393 1.31622 40.2393Z"
        fill={toolType === "pencil" ? colorWidth.hex : "#5B5858"}
      />
    </svg>
  );
}
export function Fill({ toolType, colorWidth }) {
  return (
    <svg
      width="50%"
      height="50%"
      viewBox="0 0 18 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 32.9985C18 39.8258 18 46.6531 18 53.4804C18 54.2119 17.7158 54.6182 17.0526 54.8621C15.9158 55.1872 14.6842 55.6749 13.5474 55.7561C11.2737 55.9187 8.90526 56 6.63158 56C4.83158 56 2.93684 55.6749 1.23158 55.0246C0.378947 54.6995 0 54.2119 0 53.3178C0 39.7445 0 26.1712 0 12.6792C0 12.3541 0 11.9477 0.0947368 11.6226C0.378947 10.8098 1.04211 10.4034 1.98947 10.4034C6.63158 10.4034 11.2737 10.4034 15.9158 10.4034C17.0526 10.4034 17.8105 10.9724 17.9053 11.9477C17.9053 12.1915 17.9053 12.5166 17.9053 12.7605C18 19.5065 18 26.2525 18 32.9985Z"
        fill={toolType === "fill" ? colorWidth.hex : "#5B5858"}
      />
      <path
        d="M12.6 7.72134C13.1684 7.72134 13.5474 7.72134 14.021 7.72134C14.5895 7.72134 14.8737 7.88389 14.7789 8.37155C14.7789 8.85922 14.7789 9.34688 14.7789 9.91582C10.8947 9.91582 7.01052 9.91582 3.12631 9.91582C3.12631 9.34688 3.12631 8.77794 3.12631 8.209C3.12631 7.88389 3.41052 7.72134 3.78947 7.72134C4.26315 7.72134 4.73684 7.72134 5.4 7.72134C5.4 7.23367 5.4 6.90856 5.4 6.50218C5.4 4.95791 5.4 3.49492 5.4 1.95065C5.4 0.650218 6.15789 0 7.67368 0C8.62105 0 9.56842 0 10.5158 0C11.7474 0 12.5053 0.650218 12.5053 1.70682C12.5053 3.49492 12.5053 5.28302 12.5053 6.98984C12.6 7.23367 12.6 7.4775 12.6 7.72134ZM9 5.52685C10.421 5.52685 11.5579 4.55152 11.5579 3.41364C11.5579 2.27576 10.421 1.21916 9 1.21916C7.67368 1.21916 6.4421 2.19448 6.4421 3.41364C6.4421 4.47025 7.57894 5.52685 9 5.52685Z"
        fill={toolType === "fill" ? colorWidth.hex : "#5B5858"}
      />
      <path
        d="M8.99999 5.52685C7.57894 5.52685 6.44209 4.55152 6.44209 3.33236C6.44209 2.19448 7.67367 1.13788 8.99999 1.13788C10.3263 1.13788 11.5579 2.19448 11.5579 3.33236C11.4631 4.55152 10.3263 5.52685 8.99999 5.52685ZM8.99999 4.95791C10.0421 4.95791 10.8947 4.22641 10.8947 3.33236C10.8947 2.43831 10.0421 1.70682 8.99999 1.70682C7.95788 1.70682 7.10525 2.43831 7.10525 3.41364C7.10525 4.30769 7.86315 4.95791 8.99999 4.95791Z"
        fill="white"
      />
      <path
        d="M8.99999 4.95792C7.95789 4.95792 7.10526 4.3077 7.10526 3.33237C7.10526 2.35704 7.95789 1.62555 8.99999 1.62555C10.0421 1.62555 10.8947 2.35704 10.8947 3.25109C10.8947 4.22642 10.0421 4.95792 8.99999 4.95792Z"
        fill={toolType === "fill" ? colorWidth.hex : "#5B5858"}
      />
    </svg>
  );
}

export function Reset() {
  return (
    <svg
      width="40%"
      height="40%"
      viewBox="0 0 47 47"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M37.9948 13.2048C37.906 14.578 37.906 15.768 37.8171 17.0497C37.7283 18.1482 37.0174 18.8806 36.04 18.8806C35.0627 18.8806 34.263 18.0567 34.263 17.0497C34.3518 14.1202 34.4407 11.2823 34.6184 8.35291C34.7072 7.25438 35.5958 6.52202 36.5732 6.61356C39.2388 6.97974 41.8155 7.34592 44.4811 7.7121C45.4585 7.89519 46.0804 8.71909 45.9916 9.63454C45.9027 10.6415 45.1031 11.3739 44.1257 11.2823C43.5925 11.2823 43.0594 11.1908 42.5263 11.0993C41.9932 11.0077 41.4601 11.0077 40.8381 10.9162C41.1047 11.2823 41.2824 11.6485 41.5489 11.9232C44.3034 16.6835 45.4585 21.7185 44.5699 27.2111C43.4148 34.7178 39.5053 40.3021 33.019 43.8723C29.5538 45.7947 25.8219 46.6186 21.9124 46.344C17.0255 46.0694 12.6717 44.33 8.93986 41.126C4.85262 37.8303 2.36474 33.4362 1.38735 28.0351C0.232265 21.3523 1.65391 15.3103 5.74115 10.0007C9.38413 5.24039 14.1822 2.4025 20.0465 1.5786C21.0239 1.48705 21.9124 1.39551 22.8898 1.39551C23.8672 1.39551 24.6669 2.12787 24.6669 3.04331C24.7557 4.05031 24.1337 4.87421 23.0675 4.96576C21.8236 5.14885 20.5796 5.14885 19.3357 5.42348C14.1822 6.43047 10.1838 9.26836 7.34051 13.8456C2.809 21.1692 3.78639 30.7814 9.56184 37.0064C12.6717 40.3936 16.4924 42.316 20.935 42.7738C30.2646 43.7808 38.8833 37.3726 40.7493 27.9435C41.8155 22.817 40.927 17.9651 38.1725 13.571C38.0837 13.4794 38.0837 13.3879 37.9948 13.2963C38.0837 13.2963 38.0837 13.2963 37.9948 13.2048Z"
        fill="#5B5858"
        stroke="#5B5858"
        strokeMiterlimit="10"
      />
    </svg>
  );
}

export function Eraser({ toolType, colorWidth }) {
  return (
    <svg
      width="40%"
      height="40%"
      viewBox="0 0 45 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.3576 45.3955C15.7324 45.3955 14.2087 44.7862 12.8881 43.5675C9.12968 39.9115 5.47282 36.1539 1.71437 32.3964C-0.621964 30.0606 -0.520384 25.8968 1.71437 23.4595C2.12069 23.0533 2.52701 22.6471 2.93332 22.2408C9.536 15.6397 16.1387 9.03861 22.6398 2.53906C23.8587 1.21883 25.3824 0.507944 27.2109 0.406389C29.1409 0.304833 30.8677 0.914167 32.2898 2.23439C35.8451 5.78883 39.4004 9.34328 42.9557 12.9993C44.1747 14.2179 44.8857 15.6397 44.9873 17.2646C45.0889 18.9911 44.581 20.6159 43.4636 22.0377C43.1589 22.4439 42.8541 22.7486 42.4478 23.0533C35.8451 29.7559 29.1409 36.4586 22.4366 43.2628C21.0145 44.5831 19.3892 45.3955 17.3576 45.3955ZM15.9355 16.2491C12.3802 19.7019 8.92652 23.1548 5.47282 26.7093C5.26966 26.9124 5.0665 27.3186 4.96492 27.6233C4.76176 28.4357 5.0665 28.9435 5.67597 29.5528C9.12968 33.0057 12.5834 36.4586 16.0371 39.81C17.1545 40.9271 18.0687 40.9271 19.1861 39.81C22.4366 36.5602 25.7887 33.2088 29.0393 29.9591C29.1409 29.8575 29.2425 29.7559 29.344 29.6544C24.7729 25.0844 20.3034 20.6159 15.9355 16.2491Z"
        fill={toolType === "eraser" ? "black" : "#5B5858"}
      />
    </svg>
  );
}

export function Download() {
  return (
    <svg
      width="40%"
      height="40%"
      viewBox="0 0 45 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.5345 28.7234C20.5345 28.4328 20.5345 28.239 20.5345 28.0452C20.5345 19.471 20.5345 10.8967 20.5345 2.32242C20.5345 1.93489 20.5819 1.49891 20.7242 1.11137C21.0563 0.287851 21.9575 -0.148129 22.8113 0.0456395C23.6651 0.239408 24.2818 0.966042 24.2818 1.88644C24.2818 6.82755 24.2818 11.7687 24.2818 16.7098C24.2818 20.5367 24.2818 24.3152 24.2818 28.1421C24.2818 28.3359 24.2818 28.4812 24.2818 28.7719C24.4715 28.5781 24.5664 28.4812 24.7087 28.3843C27.7444 25.1872 30.7802 21.99 33.816 18.7928C34.3377 18.2599 34.9069 17.8724 35.7133 18.0661C36.994 18.3568 37.6107 19.7132 36.9466 20.8758C36.8517 21.0696 36.7094 21.2149 36.5671 21.4087C32.4404 25.7685 28.3136 30.1283 24.2343 34.4881C23.7126 35.0209 23.1908 35.4085 22.3844 35.4085C21.9101 35.4085 21.578 35.2147 21.246 34.8756C16.977 30.3705 12.7554 25.8169 8.48632 21.2633C7.72738 20.4398 7.72738 19.3256 8.48632 18.599C9.24526 17.8239 10.3837 17.8239 11.1426 18.6475C12.3285 19.9069 13.5143 21.1664 14.7001 22.4259C16.5975 24.4605 18.4474 26.4467 20.3448 28.4812C20.3448 28.5297 20.3922 28.5781 20.5345 28.7234Z"
        fill="#5B5858"
      />
      <path
        d="M22.4793 45C15.6963 45 8.86579 45 2.08275 45C0.991777 45 0.232836 44.4187 0.0431009 43.4983C-0.194068 42.2388 0.564873 41.2215 1.89302 41.1731C1.98789 41.1731 2.08275 41.1731 2.17762 41.1731C15.6963 41.1731 29.2623 41.1731 42.781 41.1731C43.4925 41.1731 44.1565 41.3184 44.6309 41.9481C45.0578 42.5294 45.1052 43.2076 44.8206 43.8858C44.536 44.564 43.9668 44.9516 43.2553 45C43.0656 45 42.8758 45 42.6861 45C35.9505 45 29.2149 45 22.4793 45Z"
        fill="#5B5858"
      />
    </svg>
  );
}

export function Minus() {
  return (
    <svg
      width="20%"
      height="20%"
      viewBox="0 0 36 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 0C22.9 0 27.8 0 32.7 0C34.9 0 35.9 1 35.9 3.2C35.9 5.7 35.9 8.1 35.9 10.6C35.9 12.7 34.9 13.8 32.8 13.8C22.9 13.8 13 13.8 3.1 13.8C1 13.8 0 12.8 0 10.7C0 8.2 0 5.8 0 3.3C0 1.1 1 0.1 3.2 0.1C8.1 3.7998e-07 13.1 0 18 0Z"
        fill="#5B5858"
      />
    </svg>
  );
}

export function Plus() {
  return (
    <svg
      width="30%"
      height="30%"
      viewBox="0 0 37 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M36.1 18.1C36.1 19.4 36.1 20.7 36.1 22C36.1 23.8 35 24.9 33.2 25C31.4 25 29.6 25 27.8 25C26 25 25 26 25 27.8C24.9 29.5 25 31.2 25 32.9C25 35.2 23.9 36.2 21.7 36.2C19.3 36.2 16.9 36.2 14.5 36.2C12.3 36.2 11.2 35.1 11.2 32.9C11.2 31.2 11.2 29.6 11.2 27.9C11 26.1 10 25 8.2 25C6.4 25 4.7 25 2.9 25C1.2 25 0 23.9 0 22.1C0 19.5 0 16.8 0 14.2C0 12.2 1 11.1 3.1 11.1C4.8 11.1 6.5 11.1 8.2 11.1C10.1 11.1 11.1 10.1 11.2 8.2C11.3 6.5 11.2 4.8 11.2 3.1C11.2 0.9 12.1 0 14.3 0C16.8 0 19.4 0 21.9 0C23.9 0 24.9 1 24.9 3C24.9 4.7 24.9 6.4 24.9 8.1C24.9 10 26 11.1 27.9 11.1C29.6 11.1 31.2 11.1 32.9 11.1C34.8 11.1 36.3 12.3 36 14.4C35.9 15.6 36.1 16.9 36.1 18.1Z"
        fill="#5B5858"
      />
    </svg>
  );
}
