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
  ConnectButton ,
  darkTheme,
  lightTheme
} from "thirdweb/react";
import {
  createWallet,
  walletConnect,
  inAppWallet
} from "thirdweb/wallets";
import { createThirdwebClient } from "thirdweb";

const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_ID,
} as any);

const wallets = [
  createWallet("io.metamask"),
  //createWallet("com.coinbase.wallet"),
  walletConnect(),
  inAppWallet({
    auth: {
      options: [
        "email",
        "google",
        "apple",
        "facebook",
        "phone",
      ],
    },
  }),
  //createWallet("com.trustwallet.app"),
  //createWallet("io.zerion.wallet"),
  //createWallet("me.rainbow"),
  //createWallet("app.phantom"),
];

export default function ConnectWalletButton() {
  const [notMobile] = useMediaQuery('(min-width: 800px)');
  const [small] = useMediaQuery('(min-width: 480px)');
  const lightMode = useColorMode().colorMode === 'light';
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
      <ConnectButton
        client={client}
        wallets={wallets}
        theme={ lightMode ? lightTheme({
          colors: {
            accentText: "#7951e9",
            accentButtonBg: "#7951e9",
            modalBg: "#fdfcfd",
            dropdownBg: "#fdfcfd",
            primaryButtonBg: "#7951e9",
            primaryText: "#1a1523",
          } as any}) : darkTheme({
            colors: {
              accentText: "#946eff",
              secondaryText: '#999999',
              accentButtonBg: "#946eff",
              modalBg: "#322a4b",
              dropdownBg: "#322a4b",
              primaryButtonBg: "#ededef",
              primaryText: "#ededef",
              primaryButtonText: "#7951e9",
            },
          } as any)}
        connectButton={{ label: "Connect" }}
        connectModal={{
          size: "wide",
          titleIcon:
            "https://monid.xyz/monidxyz.svg",
          welcomeScreen: {
            img: {
              src: "https://monid.xyz/monidxyz.svg",
              width: 150,
              height: 150,
            },
          },
          termsOfServiceUrl:
            "https://monid.xyz/terms",
          privacyPolicyUrl:
            "https://monid.xyz/privacy",
        }}
      />
      {/* <ConnectWallet
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
              /> */}
      </Box>
    </>
  );
}
