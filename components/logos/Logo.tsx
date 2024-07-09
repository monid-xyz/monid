import * as React from 'react';
import { Box } from '@chakra-ui/react';

interface Props {
  w?: number | string;
  h?: number | string;
}
function Logo({w,h} : Props) {
  return (
    <Box width={w ?? '38px'} height={h ?? '30px'}>
      <svg width="100%" height="100%" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_14_925)">
        <path d="M478 116H125v371h353V116z" fill="#fff" />
        <path
          d="M320.572 229.333h-39.455v263.855h39.455V229.333z"
          fill="#836EF9"
        />
        <path
          d="M202.207 281.117v39.455h197.275v-39.455H202.207z"
          fill="#836EF9"
        />
        <path
          d="M245.122 217.173l-27.948 27.948L356.912 384.86l27.948-27.948-139.738-139.739z"
          fill="#836EF9"
        />
        <path
          d="M384.86 245.122l-27.948-27.948-139.738 139.738 27.947 27.948L384.86 245.122z"
          fill="#836EF9"
        />
        <path
          d="M320.572 202.207h-39.455v197.275h39.455V202.207z"
          fill="#836EF9"
        />
        <path
          d="M300.002 0C213.368 0 0 213.361 0 299.998 0 386.636 213.368 600 300.002 600c86.634 0 300.005-213.368 300.005-300.002C600.007 213.364 386.639 0 300.002 0zm-46.751 471.548c-36.532-9.955-134.753-181.768-124.797-218.3 9.957-36.534 181.768-134.752 218.3-124.796 36.534 9.956 134.755 181.764 124.799 218.299-9.957 36.534-181.769 134.753-218.302 124.797z"
          fill="#836EF9"
        />
      </g>
      <defs>
        <clipPath id="clip0_14_925">
          <path fill="#fff" d="M0 0H600V600H0z" />
        </clipPath>
      </defs>
</svg>
    </Box>
  );
}

export default Logo;
