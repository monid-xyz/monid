import React, { useEffect, useState } from "react";
import NextLink from "next/link";
import { Avatar } from "components/Profile";
import {
  Button,
  Container,
  Text,
  Stack,
  SimpleGrid,
  Box,
  Tooltip,
  Center,
  Flex,
  Link,
  useMediaQuery,
  useColorMode,
  Spinner,
  HStack,
  IconButton,
  Switch,
  useToast,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Badge,
} from "@chakra-ui/react";
import { useTranslate } from "core/lib/hooks/use-translate";
import Logo from "components/logos/Logo";
import { sleep } from "core/utils";
import { sql } from "@vercel/postgres";
import {
  primaryNameAtom,
  venomContractAtom,
  venomContractAddressAtom,
  manageListViewAtom,
  ipfsGatewayAtom,
  networkAtom,
  connectedAccountAtom,
  isConnectedAtom,
} from "core/atoms";
import { useAtom, useAtomValue } from "jotai";
import {
  ETHERSCAN_ADDRESS,
  METADATA_URL,
  OASIS_NFT,
  ROOT_CONTRACT_ADDRESS,
  SITE_PROFILE_URL,
  SITE_URL,
  VENOMART_NFT,
  VENOMSCAN_NFT,
  VENTORY_NFT,
  ZERO_ADDRESS,
} from "core/utils/constants";
import { RiMoreFill, RiRestartLine } from "react-icons/ri";
import { MdOutlinePreview, MdOutlineVisibility } from "react-icons/md";
import axios from "axios";
import VIDImage from "components/claiming/VIDImage";
import getNftsByAddress from "core/utils/getNftsByAddress";
import { useAddress } from "@thirdweb-dev/react";
import { createWeb3Name } from "@web3-name-sdk/core";
import { useRouter } from "next/router";
import { LinkIcon } from "components/logos";
import { formatDateDifference } from "core/utils/stringUtils";
import { client, ConnectWalletButton, viemClient } from "components/venomConnect";
import { TransactionButton, useActiveAccount } from "thirdweb/react";
import { getNamesForAddress } from "@ensdomains/ensjs/subgraph";
import { setName } from "contracts/421614/0xd05661277665e9fb85d5acb5cbb30de2d6076988";
import { getContract, prepareContractCall } from "thirdweb";
import { arbitrumSepolia } from "thirdweb/chains";
import { ReverseRegistrar } from "core/utils/contracts";

function ManageSection() {
  const connectedAccount = useAtomValue(connectedAccountAtom);
  const isConnected = useAtomValue(isConnectedAtom);

  const address = useActiveAccount()?.address;
  const [listIsEmpty, setListIsEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [names, setNames] = useState<string[]>();
  const [loaded, setLoaded] = useState(false);
  const [nftjsons, setNftJsons] = useState<any>(undefined);
  const network = useAtomValue(networkAtom);
  const [_network, _setNetwork] = useState(network);
  const { t } = useTranslate();
  const ipfsGateway = useAtomValue(ipfsGatewayAtom);
  const [primaryName, setPrimaryName] = useAtom(primaryNameAtom);
  const [notMobile] = useMediaQuery("(min-width: 800px)");
  const { colorMode } = useColorMode();
  const [nextPage, setNextPage] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const { pathname } = useRouter();
  const [page, setPage] = useState<string | undefined>();
  
  const loadEthNFTs = async () => {
    try {
      // Take a salted code
      // console.log('loading all nfts', account?.address);
      if (!address) return;
      setNftJsons([]);
      setIsLoading(true);
      setListIsEmpty(false);

      const nfts = await getNamesForAddress(viemClient, {
        address: address! as `0x${string}`,
      });
      console.log(nfts);

      const _nfts = await Promise.all(
        nfts.map(async (nft: any) => {
          try {
            //let r = await web3Name.getDomainRecord({name: nft});
            let _avatar = `${METADATA_URL}preview/${nft.labelName}.${nft.parentName}`;
            const options = { year: "numeric", month: "short", day: "numeric" };
            let _nftJson: any = {
              name: nft.labelName + "." + nft.parentName,
              avatar: _avatar ?? "",
              address: nft.id,
              init_time: nft.registrationDate.date,
              expire_date: nft.expiryDate.date.toLocaleString(
                "en-US",
                options as Intl.DateTimeFormatOptions
              ),
            };
            //_nftJson.ipfsData = _venomid;
            _nftJson.external_url = SITE_PROFILE_URL + "name/" + _nftJson.name;
            _nftJson.manageUrl = "/manage/" + _nftJson.name;
            console.log(_nftJson);
            return _nftJson;
            console.log(_nftJson);
          } catch (e: any) {
            return {};
            console.log("error getting venomid nft ", e);
          }
        })
      );
      setNftJsons(
        _nfts.filter((nft) => nft && nft.name && nft.name.length > 3)
      );

      setLoaded(true);
      setIsLoading(false);
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (nftjsons?.length === 0 && loaded) {
      setListIsEmpty(true);
    } else {
      setListIsEmpty(false);
    }
  }, [nftjsons]);

  useEffect(() => {
    async function getNfts() {
      if (connectedAccount && isConnected) {
        if (!loaded || network !== _network || page || page === "") {
          console.log(network);
          loadEthNFTs();

          _setNetwork(network);
        }
      }

      if (!isConnected) setNftJsons([]);
    }
    getNfts();
  }, [isConnected, network, address, page]);

  const reload = async () => {
    await loadEthNFTs();
  };

  return (
    <Box>
      <Container
        as="main"
        maxW="container.lg"
        display="grid"
        flexDir={"column"}
        minH={"90vh"}
        flexGrow={1}
      >
        <Box py={6} gap={2} width={"100%"} pb={12}>
          {isConnected && (
            <Stack gap={10} width={"100%"} my={4}>
              <Flex
                minWidth={["350px", "420px", "580px", "800px"]}
                align={"center"}
                height={"64px"}
                gap={3}
              >
                <Text
                  flexGrow={1}
                  fontWeight="bold"
                  fontSize={notMobile ? "4xl" : "2xl"}
                  my={notMobile ? 10 : 4}
                >
                  My Names
                </Text>

                <Button
                  aria-label="reload-nfts"
                  key={`reload-${network}-nfts`}
                  rounded={"full"}
                  size={"lg"}
                  onClick={reload}
                  gap={2}
                >
                  {notMobile ? "Reload" : ""} <RiRestartLine size={"24"} />
                </Button>
                <NextLink href={"/app"} passHref>
                  <Button size={"lg"} rounded={"full"}>
                    <LinkIcon type="RiAddLine" />
                  </Button>
                </NextLink>
              </Flex>
              {isLoading && (
                <Center width={"100%"} height={500}>
                  <Spinner size="lg" />
                </Center>
              )}
            </Stack>
          )}

          <Stack
            gap={2}
            width={"100%"}
            background={colorMode === "dark" ? "blackAlpha.300" : "white"}
            rounded={"2xl"}
          >
            {nftjsons?.map((nft: any, i: number) => (
              <Flex
                key={nft.name + "-manage-item"}
                flexDirection={"row"}
                gap={2}
                minWidth={["100%", "420px", "580px", "800px"]}
                height={["72px", "68px", "80px"]}
                alignItems={"center"}
                borderBottom={
                  i === nftjsons.length - 1 ? "none" : "1px solid #77777755"
                }
                p={2}
                rounded={"none"}
              >
                <Flex gap={3} w={"100%"} align={"center"}>
                  <Box
                    width={["48px", "48px", "56px"]}
                    key={nft.name + "-box-name"}
                  >
                    <Avatar
                      my={"0px"}
                      noanimate
                      nodrag
                      alt={nft.name}
                      shadow="none"
                      url={String(nft.avatar)}
                      shape="circle"
                    />
                  </Box>
                  <Stack gap={0}>
                    <Text
                      flexGrow={1}
                      fontWeight={"bold"}
                      fontSize={["xl", "xl", "2xl"]}
                    >
                      {String(nft.name).toLowerCase()}
                    </Text>
                    <Text
                      flexGrow={1}
                      fontWeight={"normal"}
                      fontSize={["md", "lg"]}
                      opacity={0.5}
                    >
                      expires in {String(nft.expire_date).toLowerCase()}
                    </Text>
                  </Stack>
                </Flex>

                <Flex gap={2} align={"center"}>
                  {primaryName.name === nft.name && (
                    <Tooltip
                      borderRadius={4}
                      label={<Text p={2}>Primary Name</Text>}
                      color="white"
                      bgColor={"black"}
                      hasArrow
                    >
                      <IconButton
                        variant={"ghost"}
                        aria-label={`copy-nft-address-icon`}
                      >
                        <LinkIcon type="RiUserStarLine" size={"24px"} />
                      </IconButton>
                    </Tooltip>
                  )}

                  {!nft.manageUrl?.includes("old") && (
                    <Menu>
                      <IconButton
                        size={"lg"}
                        rounded={"full"}
                        as={MenuButton}
                        aria-label="more-settings"
                        variant={"ghost"}
                        p={2}
                      >
                        <RiMoreFill size={32} />
                      </IconButton>
                      
                      <MenuList
                        p={0}
                        bgColor={
                          colorMode === "light" ? "white" : "var(--dark)"
                        }
                      >
                        <MenuItem
                        height={"48px"}
                        bgColor={
                          colorMode === "light"
                            ? "whiteAlpha.400"
                            : "blackAlpha.400"
                        }
                        sx={{
                          textDecoration: "none",
                          _hover: {
                            textDecoration: "none",
                            bgColor:
                              colorMode === "light"
                                ? "blackAlpha.200"
                                : "whiteAlpha.300",
                          },
                        }}
                        as={Link}
                        target="_blank"
                        href={String(nft.manageUrl)}
                        gap={2}
                        isDisabled
                        borderBottomRadius={0}
                      >
                        <LinkIcon type="RiSettings4Line" size={24} /> Customize
                      </MenuItem>
                        {primaryName.name !== nft.name && (
                          <TransactionButton
                          style={{ borderRadius: "0px", height:'48px' , width: '100%', justifyContent : 'start', display: 'flex', padding: 12}}
                          transaction={() => {
                            const tx = prepareContractCall({
                              contract: ReverseRegistrar,
                              method: "setName",
                              params: [nft.name],
                            });
                            return tx;
                          }}
                          onTransactionSent={(result) => {
                            console.log(
                              "Transaction submitted",
                              result.transactionHash
                            );
                            console.log(result);
                          }}
                          onTransactionConfirmed={(receipt) => {
                            console.log(
                              "Transaction confirmed",
                              receipt.transactionHash
                            );
                            setPrimaryName({name : nft.name});
                            reload();
                            
                          }}
                          onError={(error) => {
                            console.error("Transaction error", error);
                          }}
                          onClick={() => console.log('setting ', nft.name , ' as primary')}
                        ><Flex gap={2} align={'center'}><LinkIcon type="RiUserStarLine" size={'24px'}/><Text>
                          Set As Primary</Text></Flex>
                        </TransactionButton>
                        )}

                        <MenuItem
                          size={"lg"}
                          as={Link}
                          height={"48px"}
                          bgColor={
                            colorMode === "light"
                              ? "whiteAlpha.400"
                              : "blackAlpha.400"
                          }
                          sx={{
                            textDecoration: "none",
                            _hover: {
                              textDecoration: "none",
                              bgColor:
                                colorMode === "light"
                                  ? "blackAlpha.200"
                                  : "whiteAlpha.300",
                            },
                          }}
                          href={nft.external_url}
                          isDisabled
                          target="_blank"
                          icon={<MdOutlineVisibility size={24} />}
                        >
                          View Profile
                        </MenuItem>

                        <MenuItem
                          size={"lg"}
                          as={Link}
                          height={"48px"}
                          bgColor={
                            colorMode === "light"
                              ? "whiteAlpha.400"
                              : "blackAlpha.400"
                          }
                          sx={{
                            textDecoration: "none",
                            _hover: {
                              textDecoration: "none",
                              bgColor:
                                colorMode === "light"
                                  ? "blackAlpha.200"
                                  : "whiteAlpha.300",
                            },
                          }}
                          href={ETHERSCAN_ADDRESS + nft.address}
                          target="_blank"
                          icon={<LinkIcon type="venomscan" size={24} />}
                        >
                          View on EtherScan
                        </MenuItem>

                        {nft.network === "venom" &&
                          !nft.manageUrl?.includes("old") && (
                            <MenuItem
                              size={"lg"}
                              as={Link}
                              height={"48px"}
                              bgColor={
                                colorMode === "light"
                                  ? "whiteAlpha.400"
                                  : "blackAlpha.400"
                              }
                              sx={{
                                textDecoration: "none",
                                _hover: {
                                  textDecoration: "none",
                                  bgColor:
                                    colorMode === "light"
                                      ? "blackAlpha.200"
                                      : "whiteAlpha.300",
                                },
                              }}
                              href={VENOMART_NFT + nft.address}
                              target="_blank"
                              icon={
                                <LinkIcon
                                  type="https://ipfs.io/ipfs/QmVBqPuqcH8VKwFVwoSGFHXUdG6ePqjmhEoNaQMsfd2xau/venomart.jpg"
                                  size={"sm"}
                                />
                              }
                            >
                              Sell on Opensea
                            </MenuItem>
                          )}

                        {nft.network === "venom" &&
                          !nft.manageUrl?.includes("old") && (
                            <MenuItem
                              size={"lg"}
                              as={Link}
                              height={"48px"}
                              bgColor={
                                colorMode === "light"
                                  ? "whiteAlpha.400"
                                  : "blackAlpha.400"
                              }
                              sx={{
                                textDecoration: "none",
                                _hover: {
                                  textDecoration: "none",
                                  bgColor:
                                    colorMode === "light"
                                      ? "blackAlpha.200"
                                      : "whiteAlpha.300",
                                },
                              }}
                              href={VENTORY_NFT + nft.address}
                              target="_blank"
                              icon={
                                <LinkIcon
                                  type="https://ipfs.io/ipfs/QmawqexybALShCzreHJj9Akjg7o9xyeLrk65iJk3kuVGH2/VENTORY.svg"
                                  size={"sm"}
                                />
                              }
                            >
                              Sell on Ventory
                            </MenuItem>
                          )}

                        {nft.network === "venom" &&
                          !nft.manageUrl?.includes("old") && (
                            <MenuItem
                              size={"lg"}
                              as={Link}
                              height={"48px"}
                              bgColor={
                                colorMode === "light"
                                  ? "whiteAlpha.400"
                                  : "blackAlpha.400"
                              }
                              sx={{
                                textDecoration: "none",
                                _hover: {
                                  textDecoration: "none",
                                  bgColor:
                                    colorMode === "light"
                                      ? "blackAlpha.200"
                                      : "whiteAlpha.300",
                                },
                              }}
                              href={OASIS_NFT + nft.address}
                              target="_blank"
                              icon={
                                <LinkIcon
                                  type="https://ipfs.io/ipfs/QmNXPY57PSu72UZwoDyXsmHJT7UQ4M9EfPcyZwpi3xqMQV/oasisgallery.svg.svg"
                                  size={"sm"}
                                />
                              }
                            >
                              Sell on Oasis Gallery
                            </MenuItem>
                          )}
                        <MenuItem
                          size={"lg"}
                          as={Link}
                          height={"48px"}
                          bgColor={
                            colorMode === "light"
                              ? "whiteAlpha.400"
                              : "blackAlpha.400"
                          }
                          isDisabled
                          sx={{
                            textDecoration: "none",
                            _hover: {
                              textDecoration: "none",
                              bgColor:
                                colorMode === "light"
                                  ? "blackAlpha.200"
                                  : "whiteAlpha.300",
                            },
                          }}
                          icon={<LinkIcon type="RiExpandRightLine" size={24} />}
                        >
                          Extend
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  )}
                </Flex>
              </Flex>
            ))}
          </Stack>
          {nftjsons && nftjsons?.length > 0 && (
            <Flex align={"center"} py={8} gap={4} justify={"end"}>
              <Text fontSize={["xl"]} textAlign={"center"}>
                Page {pageNum}
              </Text>
              <Button
                rounded={"full"}
                isDisabled={page === undefined || page === "" || isLoading}
                colorScheme="venom"
                size={"lg"}
                onClick={() => {
                  setPageNum(1);
                  setPage("");
                }}
              >
                <LinkIcon type="RiArrowLeftDoubleFill" />
              </Button>
              <Button
                colorScheme="venom"
                rounded={"full"}
                isDisabled={
                  nextPage === undefined || nextPage === "" || isLoading
                }
                size={"lg"}
                onClick={() => {
                  setPageNum((y) => y + 1);
                  setPage(nextPage);
                }}
              >
                <LinkIcon type="RiArrowRightSLine" />
              </Button>
            </Flex>
          )}
          {listIsEmpty && !isLoading && (
            <Center display="flex" flexDirection="column" gap={4} minH={"75%"}>
              <Text fontSize="xl">
                You don't own any {pathname.includes("old") ? " old " : ""}{" "}
                Monad IDs
              </Text>
              <NextLink href={"/app"} passHref>
                <Button
                  variant="outline"
                  textAlign="left"
                  borderWidth={1}
                  gap={2}
                  borderColor="grey"
                >
                  Claim Your Monad ID
                </Button>
              </NextLink>
            </Center>
          )}
        </Box>
        {!isConnected && (
          <Center my={8} flexDirection="column" minH={"75vh"}>
            <ConnectWalletButton />
          </Center>
        )}
      </Container>
    </Box>
  );
}

export default ManageSection;
