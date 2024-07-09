import React, { useEffect, useState } from 'react';
import {
  Button,
  Box,
  useMediaQuery,
  Text,
  Center,
  Stack,
  useColorMode,
  IconButton,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  Tooltip,
  LinkBox,
  LinkOverlay,
  useClipboard,
  Avatar,
  Icon,
  MenuDivider,
} from '@chakra-ui/react';
import NextLink from 'next/link';

import { LinkIcon, Base, VenomScanIcon } from 'components/logos';
import {
  AVATAR_API_URL,
  ROOT_CONTRACT_ADDRESS,
  SIGN_MESSAGE,
  SITE_URL,
} from 'core/utils/constants';
import { sleep, truncAddress, capFirstLetter, isValidSignHash, getCurrentDateUnix } from 'core/utils';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import VenomAbi from 'abi/Collection.abi.json';
import RootAbi from 'abi/Root.abi.json';
import OATCollectionABI from 'abi/OATCollection.abi.json';
import {
  RiLogoutBoxRLine,
  RiFileCopyLine,
  RiCheckDoubleFill,
} from 'react-icons/ri';
import LogoIcon from '../logos/LogoIcon';
import {
  connectedAccountAtom,
  earlyAdopterContractAtom,
  ethAtom,
  ethPrimaryNameAtom,
  isConnectedAtom,
  networkAtom,
} from 'core/atoms';
import {
  ConnectWallet,
  useAddress,
  useBalance,
  useChain,
  useConnectionStatus,
  useSwitchChain,
} from '@thirdweb-dev/react';
import getVid from 'core/utils/getVid';
//import { createWeb3Name } from '@web3-name-sdk/core';
import Link from 'next/link';
//import { lookupName } from 'vid-sdk';

export default function ConnectButton() {
  const [notMobile] = useMediaQuery('(min-width: 800px)');
  const [small] = useMediaQuery('(min-width: 480px)');
  const colorMode = useColorMode().colorMode;
  //const web3Name = createWeb3Name();
  const [network, setNetwork] = useAtom(networkAtom);
  //const ethAddress = useAtomValue(ethAtom);
  //const ethAddress = useAddress();
  

  // async function getEthPrimary() {
  //   if (!ethAddress) return;
  //   //console.log(ethAddress);
  //   try {
  //     const _name = await web3Name.getDomainName({ address: ethAddress });
  //     setEthPrimaryName({ name: _name ?? '', nftAddress: '' });
  //   } catch {
  //     (e: any) => {
  //       console.log('error in eth primary', e);
  //     };
  //   }

  //   setEthPrimaryLoaded(true);
  // }

  useEffect(() => {
  }, [ network]);

  const switchAccount = async () => {
  };

  const logout = async () => {
    
  };

  const switchNetwork = async (_network: string) => {
    setNetwork(_network);
  };
  return (
    <>
      <Box>
      <ConnectWallet
                theme={colorMode}
                btnTitle="Connect"
                modalTitle="Connect Wallet"
                modalTitleIconUrl={`${SITE_URL}/logos/monidxyz.svg`}
                auth={{
                  loginOptional: false,
                  onLogin(token) {
                    console.log('network ', network);
                    console.log('network ', token);
                  },
                  onLogout() {
                  },
                }}
                switchToActiveChain
                style={{
                  backgroundColor: colorMode === 'light' ? 'var(--white)' : 'var(--dark)',
                  color: colorMode === 'dark' ? 'white' : 'black',
                  border: '1px solid #77777750',
                  margin: '0px 0px',
                  display: 'flex',
                  minWidth: '200px',
                  height: '54px',
                  position: 'relative',
                }}
                welcomeScreen={{
                  img: {
                    src: `${SITE_URL}/logos/monidxyz.svg`,
                    width: 150,
                    height: 150,
                  },
                  title: 'Decentralize your online identity',
                }}
                modalSize={notMobile ? 'wide' : 'compact'}
              />
      </Box>
    </>
  );
}
