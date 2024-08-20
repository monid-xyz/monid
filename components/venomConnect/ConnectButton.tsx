import React, { useEffect, useState } from "react";
import {
  Button,
  Box,
  useMediaQuery,
  Text,
  Center,
  Stack,
  useColorMode,
  LightMode,
  Menu,
  MenuButton,
  Flex,
  Avatar,
  MenuList,
  Tooltip,
  IconButton,
  useClipboard,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";
import NextLink from "next/link";

import { LinkIcon, Base, VenomScanIcon } from "components/logos";
import {
  AVATAR_API_URL,
  FAUCET_URL,
  ROOT_CONTRACT_ADDRESS,
  SIGN_MESSAGE,
  SITE_DESCRIPTION,
  SITE_LOGO_URL,
  SITE_TITLE,
  SITE_URL,
} from "core/utils/constants";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import VenomAbi from "abi/Collection.abi.json";
import RootAbi from "abi/Root.abi.json";
import OATCollectionABI from "abi/OATCollection.abi.json";
import {
  RiLogoutBoxRLine,
  RiFileCopyLine,
  RiCheckDoubleFill,
  RiRefund2Line,
} from "react-icons/ri";
import LogoIcon from "../logos/LogoIcon";
import {
  connectedAccountAtom,
  isConnectedAtom,
  networkAtom,
  primaryNameAtom,
} from "core/atoms";
import {
  AutoConnect,
  ConnectButton,
  darkTheme,
  lightTheme,
  useActiveAccount,
  useActiveWallet,
  useConnect,
  useConnectModal,
  useDisconnect,
  useWalletBalance,
} from "thirdweb/react";
import { createWallet, walletConnect, inAppWallet } from "thirdweb/wallets";
import { client, viemClient } from ".";
import { getAddressRecord, getName } from "@monadid/monjs/public";
import {
  addr,
  name,
} from "contracts/421614/0x7016f6bafd4ae35a30dd264ce8eeca16ab417fad";
import { node } from "contracts/421614/0xd05661277665e9fb85d5acb5cbb30de2d6076988";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { getContract } from "thirdweb";
import { arbitrumSepolia } from "thirdweb/chains";
import { truncAddress } from "core/utils";
import Link from "next/link";

const wallets = [
  createWallet("io.metamask"),
  //createWallet("com.coinbase.wallet"),
  walletConnect(),
  inAppWallet({
    auth: {
      options: ["email", "google", "apple", "facebook", "phone"],
    },
  }),
  //createWallet("com.trustwallet.app"),
  //createWallet("io.zerion.wallet"),
  //createWallet("me.rainbow"),
  //createWallet("app.phantom"),
];

export default function ConnectWalletButton() {
  const [notMobile] = useMediaQuery("(min-width: 800px)");
  const [small] = useMediaQuery("(min-width: 480px)");
  const lightMode = useColorMode().colorMode === "light";
  //const web3Name = createWeb3Name();
  const [network, setNetwork] = useAtom(networkAtom);
  const [isConnected, setIsConnected] = useAtom(isConnectedAtom);
  const [connectedAccount, setConnectedAccount] = useAtom(connectedAccountAtom);
  const [primaryName, setPrimary] = useAtom(primaryNameAtom);
  const { connect, isConnecting } = useConnectModal();
  const _connectedAccount = useActiveAccount()?.address;
  const { data, isLoading, isError } = useWalletBalance({
    client,
    chain: arbitrumSepolia,
    address: _connectedAccount,
  });
  const { onCopy, hasCopied } = useClipboard(String(connectedAccount));
  const { disconnect } = useDisconnect();
  const wallet = useActiveWallet();

  async function handleConnect() {
    const wallet = await connect({ client }); // opens the connect modal
    console.log("connected to", wallet);
    setIsConnected(true);
    setConnectedAccount(wallet.getAccount()?.address!);
    getEthPrimary();
  }
  //const ethAddress = useAtomValue(ethAtom);
  const [checkName, setCheckName] = useState(false);

  useEffect(() => {
    if (connectedAccount) {
      getEthPrimary();
    }
  }, [connectedAccount]);

  async function getEthPrimary() {
    try {
      const _node: any = await node({
        contract: getContract({
          client: client,
          address: "0xd05661277665E9FB85d5AcB5CBb30de2D6076988",
          chain: arbitrumSepolia,
        }),
        addr: connectedAccount as `0x${string}`,
      });

      console.log(_node);
      const _name: any = await name({
        contract: getContract({
          client: client,
          address: "0x7016f6BAfD4Ae35a30DD264Ce8EEcA16AB417fAD",
          chain: arbitrumSepolia,
        }),
        node: _node as `0x${string}`,
      });

      console.log("primary", _name);
      setPrimary(_name);
      console.log(AVATAR_API_URL + _name)
    } catch {
      (e: any) => {
        console.log("error in eth primary", e);
      };
    }
  }

  const switchAccount = async () => {
    await logout();
    await handleConnect();
    
  };

  const logout = async () => {
    wallet && disconnect(wallet);
    setConnectedAccount("");
    setIsConnected(false);
    setPrimary('');
  };

  const switchNetwork = async (_network: string) => {
    setNetwork(_network);
  };
  return (
    <>
      <Box>
        <AutoConnect
          wallets={wallets}
          client={client}
          onConnect={(wallet) => {
            setIsConnected(true);
            setConnectedAccount(String(wallet.getAccount()?.address));
            if(wallet.getChain() !== arbitrumSepolia){
              wallet.switchChain(arbitrumSepolia);
            }
            getEthPrimary();
          }}
          appMetadata={{
            logoUrl: SITE_LOGO_URL,
            name: SITE_TITLE,
            description: SITE_DESCRIPTION,
            url: SITE_URL,
          }}
        />
        {_connectedAccount ? (
          <>
            <Menu>
              <MenuButton
                as={Button}
                size={"lg"}
                rounded={"full"}
                w={["168px", "192px"]}
                px={0}
                colorScheme={lightMode ? "whiteAlpha" : "dark"}
                bgColor={lightMode ? "whiteAlpha.900" : "var(--dark)"}
                variant={lightMode ? "solid" : "outline"}
              >
                <Flex gap={2} align={"center"} key={primaryName ? `primary-avatar-box-${primaryName}` : 'wallet-avatar-box'}>
                  {primaryName !== "" ? (
                    <Avatar
                      color={!lightMode ? "var(--base)" : "var(--base)"}
                      icon={
                        <LinkIcon type="RiUserLine" size={22} color="#ffffff" />
                      }
                      bgColor={!lightMode ? "var(--base0)" : "var(--base0)"}
                      rounded={"full"}
                      src={AVATAR_API_URL + primaryName}
                      size={["md"]}
                    />
                  ) : (
                    <Box p={3} rounded={"full"} border={"1px #77777750 solid"}>
                      <LinkIcon type="RiUserLine" size={22} color="#7951e9" />
                    </Box>
                  )}
                  {/* <Stack gap={1} mx={1}> 
                        <Text
                          fontWeight={'semibold'}
                          textAlign={'left'}
                          my={'0 !important'}
                          fontSize="14px">
                          {account?.balance !== undefined
                            ? Math.round(Number(account?.balance) / 10e5) / 10e2
                            : 'Loading'}{' '}
                          {notMobile ? (account?.balance !== undefined ? 'VENOM' : '') : ''}
                        </Text>*/}
                  <Text
                    fontWeight={"semibold"}
                    textAlign={"left"}
                    fontSize={["md", "lg"]}
                    bgGradient={
                      lightMode
                        ? "linear(to-r, var(--base2), var(--base0))"
                        : "linear(to-r, var(--base00), var(--base0))"
                    }
                    bgClip="text"
                    my={"0 !important"}
                  >
                    {primaryName && primaryName !== ""
                      ? primaryName.length > (!small ? 8 : 10)
                        ? primaryName?.slice(0, !small ? 8 : 10) + "..."
                        : primaryName
                      : truncAddress(connectedAccount)}
                  </Text>
                  {/* </Stack> */}
                </Flex>
              </MenuButton>
              <MenuList
                width={320}
                mt={1}
                py={2}
                border={lightMode ? "none" : "1px #77777750 solid"}
                shadow={lightMode ? "md" : "none"}
                position={"relative"}
                zIndex={1500}
                rounded={"2xl"}
                bg={lightMode ? "var(--white)" : "var(--dark0)"}
              >
                <Flex p={5} alignItems="center" gap={2} key={primaryName ? `primary-name-box-${primaryName}` : 'wallet-name-box'}>
                  {primaryName !== "" ? (
                    <Avatar
                      color={!lightMode ? "var(--base)" : "var(--base)"}
                      icon={
                        <LinkIcon type="RiUserLine" size={22} color="#ffffff" />
                      }
                      bgColor={!lightMode ? "var(--base0)" : "var(--base0)"}
                      rounded={"full"}
                      src={AVATAR_API_URL + primaryName}
                      size={["md"]}
                    />
                  ) : (
                    <Box p={3} rounded={"full"} border={"1px #77777750 solid"}>
                      <LinkIcon type="RiUserLine" size={22} color="#7951e9" />
                    </Box>
                  )}
                  <Stack gap={0.5} mx={1} flexGrow={1}>
                    <Text
                      fontWeight={"semibold"}
                      textAlign={"left"}
                      fontFamily={"Poppins"}
                      fontSize="14px"
                      my={"0 !important"}
                    >
                      {primaryName !== ""
                        ? String(primaryName)
                        : truncAddress(connectedAccount)}
                    </Text>
                    <Text
                      fontWeight={"semibold"}
                      textAlign={"left"}
                      fontFamily={"Poppins"}
                      my={"0 !important"}
                      fontSize="14px"
                      color="gray.500"
                    >
                      {!isLoading && !isError && data
                        ? Number(data?.displayValue).toFixed(4)
                        : "Loading"}{" "}
                      {notMobile ? "ETH" : ""}
                    </Text>
                  </Stack>
                  <Tooltip
                    borderRadius={4}
                    label={<Text p={2}>Copy Address</Text>}
                    color={lightMode ? "white" : "black"}
                    bgColor={lightMode ? "black" : "white"}
                    placement="bottom"
                    hasArrow
                  >
                    <IconButton
                      onClick={onCopy}
                      variant="ghost"
                      aria-label="copy-venom-address"
                    >
                      {hasCopied ? (
                        <RiCheckDoubleFill size={22} />
                      ) : (
                        <RiFileCopyLine size={22} />
                      )}
                    </IconButton>
                  </Tooltip>
                  <Tooltip
                    borderRadius={4}
                    label={<Text p={2}>Disconnect Wallet</Text>}
                    hasArrow
                    placement="bottom-end"
                    color={lightMode ? "white" : "black"}
                    bgColor={lightMode ? "black" : "white"}
                  >
                    <IconButton
                      onClick={logout}
                      variant="ghost"
                      aria-label="disconnect-wallet"
                    >
                      <RiLogoutBoxRLine size={22} />
                    </IconButton>
                  </Tooltip>
                </Flex>
                <Stack gap={2} my={4} justify={"center"}>
                  {primaryName && (
                      <LinkBox px={5}>
                        <Link
                          href={"manage/" + primaryName}
                          passHref
                        >
                          <Button
                            borderColor={"gray.800"}
                            gap={2}
                            variant="outline"
                            width={"100%"}
                            size="md"
                          >
                            <LinkIcon type="RiUserLine" size={22} />
                            Profile
                          </Button>
                        </Link>
                      </LinkBox>
                    )}
                  {/* {isConnected && (
                    <LinkBox px={5}>
                      <Link href={"/settings"} passHref>
                        <Button
                          borderColor={"gray.800"}
                          gap={2}
                          variant="outline"
                          width={"100%"}
                          size="md"
                        >
                          <LinkIcon type="RiSettings4Line" size={22} />
                          Settings
                        </Button>
                      </Link>
                    </LinkBox>
                  )} */}

                <Box px={5}>
                  <Button
                    onClick={switchAccount}
                    borderColor={'gray.800'}
                    gap={2}
                    variant="outline"
                    width={'100%'}>
                    <LinkIcon type="RiShuffleLine" size={22} />
                    Switch Account
                  </Button>
                </Box>

                  <LinkBox px={5}>
                    <LinkOverlay href={FAUCET_URL} target="_blank">
                      <Button
                        borderColor={"gray.800"}
                        gap={2}
                        variant="outline"
                        width={"100%"}
                        size="md"
                      >
                        <RiRefund2Line size={22} />
                        Request Testnet Funds
                      </Button>
                    </LinkOverlay>
                  </LinkBox>
                </Stack>
              </MenuList>
            </Menu>
          </>
        ) : (
          <LightMode>
            <Button
              rounded={"full"}
              onClick={handleConnect}
              variant="solid"
              height={"47px"}
              fontSize={"medium"}
              colorScheme={"venom"}
              width={["168px", "192px"]}
            >
              Connect
            </Button>
          </LightMode>
        )}
        {/* <ConnectButton
          client={client}
          wallets={wallets}
          onConnect={(wallet) => {
            setIsConnected(true);
            setConnectedAccount(String(wallet.getAccount()?.address));
          }}
          onDisconnect={() => {
            setIsConnected(false);
            setConnectedAccount("");
          }}
          theme={lightTheme({
            colors: {
              accentText: "#7951e9",
              accentButtonBg: "#7951e9",
              modalBg: "#fdfcfd",
              dropdownBg: "#fdfcfd",
              primaryButtonBg: "#7951e9",
              primaryText: "#1a1523",
            } as any,
          })}
          connectButton={{
            label: "Connect",
            style: { fontWeight: "bold", borderRadius: "32px" },
          }}
          appMetadata={{
            logoUrl: SITE_LOGO_URL,
            name: SITE_TITLE,
            description: SITE_DESCRIPTION,
            url: SITE_URL,
          }}
          connectModal={{
            size: "wide",
            titleIcon: "https://monid.xyz/monidxyz.svg",
            welcomeScreen: {
              img: {
                src: "https://monid.xyz/monidxyz.svg",
                width: 150,
                height: 150,
              },
            },
            termsOfServiceUrl: "https://monid.xyz/terms",
            privacyPolicyUrl: "https://monid.xyz/privacy",
          }}
        /> */}
      </Box>
    </>
  );
}
