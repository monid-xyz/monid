import {
  useDisclosure,
  Button,
  Flex,
  useMediaQuery,
  useColorMode,
  Text,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Drawer,
  SimpleGrid,
  Center,
  Box,
  Spinner,
  Stack,
  HStack,
  Tooltip,
  Image,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  addLinkContentAtom,
  addLinkImageAtom,
  addLinkStylesAtom,
  addLinkTitleAtom,
  addLinkTypeAtom,
  addLinkUrlAtom,
  avatarAtom,
  avatarNftAtom,
  avatarShapeAtom,
  editingAvatarAtom,
  ethAtom,
  nftsNetworkAtom,
  nftSmallerViewAtom,
  nftTypeAtom,
  openAddLinkAtom,
  openAddNftAtom,
  socialsArrayAtom,
  editingAvatarFileAtom,
} from "core/atoms";
import { capFirstLetter, getAvatarUrl, sleep, truncAddress } from "core/utils";
import { LinkIcon } from "components/logos";
import {
  AVATAR_API_URL,
  OPENSEA_URL,
  VENOMART_NFT,
  VENTORY_NFT,
  ZERO_ADDRESS,
} from "core/utils/constants";
import { Avatar } from "components/Profile";
import {
  RiCloseLine,
  RiGridFill,
  RiGridLine,
  RiLayoutGridLine,
  RiRestartLine,
} from "react-icons/ri";
import axios from "axios";
import NetworkModal from "./NetworkModal";
import ReactPlayer from "react-player";
import { useActiveAccount } from "thirdweb/react";

interface Props {
  defaultType: string;
  key?: string;
}

export default function AddNFTAvatar({ defaultType, key }: Props) {
  const { colorMode } = useColorMode();
  const [notMobile] = useMediaQuery("(min-width: 800px)");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [_open, _setOpen] = useAtom(openAddNftAtom);
  const [type, setType] = useAtom(nftTypeAtom);
  const _setAddLinkOpen = useSetAtom(openAddLinkAtom);
  const _setTitle = useSetAtom(addLinkTitleAtom);
  const _setType = useSetAtom(addLinkTypeAtom);
  const _setImage = useSetAtom(addLinkImageAtom);
  const _setUrl = useSetAtom(addLinkUrlAtom);
  const _setContent = useSetAtom(addLinkContentAtom);
  const _setStyles = useSetAtom(addLinkStylesAtom);
  const [listIsEmpty, setListIsEmpty] = useState(false);
  const [listView, setListView] = useAtom(nftSmallerViewAtom);
  const [isLoading, setIsLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [network, setNetwork] = useAtom(nftsNetworkAtom);
  const [currentNetwork, setCurrentNetwork] = useState(network);
  const [nftjsons, setNftJsons] = useState<any[] | undefined>(undefined);
  const [editingAvatar, setEditingAvatar] = useAtom(editingAvatarAtom);
  const setEditingAvatarFile = useSetAtom(editingAvatarFileAtom);
  const [avatarNft, setAvatarNft] = useAtom(avatarNftAtom);
  const avatarShape = useAtomValue(avatarShapeAtom);

  const eth = useActiveAccount()?.address;
  const [avatar, setAvatar] = useAtom(avatarAtom);

  useEffect(() => {
    if (_open) {
      onOpen();
    }
  }, [_open]);

  useEffect(() => {
    _setOpen(isOpen);
  }, [isOpen]);

  async function setAsAvatar(index: number) {
    if (!nftjsons) return;
    let nft = nftjsons[index];
    if (!nft) return;
    let avatarURL = nft.files
      ? !nft?.files[0]?.mimetype.includes("metadata") ||
        !nft?.files[0]?.mimetype.includes("json")
        ? nft.files[0].source
        : nft.preview?.source
      : nft.preview?.source;

    setAvatar(String(avatarURL));
    //setEditingAvatarFile(undefined);
    setAvatarNft(String(nft.address));
    onClose();
  }

  async function addAsLink(index: number) {
    if (!nftjsons) return;
    let nft = nftjsons[index];
    if (!nft) return;
    let avatarURL = nft.files
      ? !nft?.files[0]?.mimetype.includes("metadata") ||
        !nft?.files[0]?.mimetype.includes("json")
        ? nft.files[0].source
        : nft.preview?.source
      : nft.preview?.source;

    let _styleType;

    _setType("nft link");
    _setTitle(String(nft.name));
    _setImage(String(avatarURL));
    
      _setUrl(
        OPENSEA_URL +
          String(nft.network) +
          "/" +
          String(nft.address) +
          "/" +
          String(nft.tokenId)
      );
      _setContent(
        JSON.stringify({
          address: String(nft.address) + "/" + String(nft.tokenId),
          metadata: nft.metadata,
        })
      );
      if (
        (nft.metadata && nft.metadata?.animation_url) ||
        String(nft.preview?.mimetype).includes("mp4") ||
        String(nft.preview?.mimetype).includes("mp3")
      ) {
        _styleType = "complex";
      } else {
        _styleType = "normal";
      }
    

    _setStyles({
      size: "md",
      network: nft.network,
      scanLink: false,
      type: _styleType,
    });
    _setAddLinkOpen(true);
    onClose();
  }

  const loadNFTs = async () => {
    try {
      // Take a salted code
      //// console.log('loading all nfts', account?.address);

      setNftJsons([]);
      setIsLoading(true);
      setListIsEmpty(false);
      const options = {
        method: "GET",
        headers: { accept: "application/json" },
      };
      await fetch(
        "https://eth-mainnet.g.alchemy.com/nft/v3/k1sdbc-1ghcYlc8lhbbDu1e3j7kPMC74/getNFTsForOwner?owner=" +
          eth +
          "&withMetadata=true&pageSize=100",
        options
      )
        .then((response) => response.json())
        .then((response) => {
          //// console.log(response);
          response?.ownedNfts.map((nft: any) => {
            let thumbnailUrl = nft.image.thumbnailUrl
              ? nft.image.thumbnailUrl
              : nft.image.cachedUrl;
            const _nftJson = {
              name: nft.name,
              tokenId: nft.tokenId,
              collectionName: nft.contract.name,
              address: nft.contract.address,
              network: "ethereum",
              metadata: nft.raw.metadata,
              preview: {
                source: thumbnailUrl,
                mimetype: nft.image.contentType,
              },
              files: [
                {
                  source: nft.image.cachedUrl,
                  mimetype: nft.image.contentType,
                },
              ],
            };
            nft.name !== null &&
              setNftJsons((nfts) => [...(nfts ? nfts : []), _nftJson]);
          });
        })
        .catch((err) => console.error(err));

      await fetch(
        "https://arb-sepolia.g.alchemy.com/v2/k1sdbc-1ghcYlc8lhbbDu1e3j7kPMC74/getNFTsForOwner?owner=" +
          eth +
          "&withMetadata=true&pageSize=100",
        options
      )
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          response?.ownedNfts.map((nft: any) => {
            let thumbnailUrl = nft.media.length > 0 ? nft.media[0].thumbnail : nft.media[0].raw;
            const _nftJson = {
              name: nft.name,
              tokenId: nft.tokenId,
              collectionName: nft.contract.name,
              address: nft.contract.address,
              network: "arbitrum",
              metadata: nft.metadata,
              preview: {
                source: thumbnailUrl,
                mimetype: nft.media[0].format,
              },
              files: [
                {
                  source: nft.media[0].raw,
                  mimetype:  nft.media[0].format,
                },
              ],
            };
            nft.name !== null &&
              setNftJsons((nfts) => [...(nfts ? nfts : []), _nftJson]);
          });
        })
        .catch((err) => console.error(err));

      await fetch(
        "https://polygon-mainnet.g.alchemy.com/nft/v3/k1sdbc-1ghcYlc8lhbbDu1e3j7kPMC74/getNFTsForOwner?owner=" +
          eth +
          "&withMetadata=true&pageSize=100",
        options
      )
        .then((response) => response.json())
        .then((response) => {
          response?.ownedNfts.map((nft: any) => {
            let thumbnailUrl = nft.image.thumbnailUrl
              ? nft.image.thumbnailUrl
              : nft.image.cachedUrl;
            const _nftJson = {
              name: nft.name,
              tokenId: nft.tokenId,
              collectionName: nft.contract.name,
              address: nft.contract.address,
              network: "polygon",
              metadata: nft.raw.metadata,
              preview: {
                source: thumbnailUrl,
                mimetype: nft.image.contentType,
              },
              files: [
                {
                  source: nft.image.cachedUrl,
                  mimetype: nft.image.contentType,
                },
              ],
            };
            nft.name !== null &&
              setNftJsons((nfts) => [...(nfts ? nfts : []), _nftJson]);
          });
        })
        .catch((err) => console.error(err));

      await fetch(
        "https://opt-mainnet.g.alchemy.com/nft/v3/k1sdbc-1ghcYlc8lhbbDu1e3j7kPMC74/getNFTsForOwner?owner=" +
          eth +
          "&withMetadata=true&pageSize=100",
        options
      )
        .then((response) => response.json())
        .then((response) => {
          response?.ownedNfts.map((nft: any) => {
            let thumbnailUrl = nft.image.thumbnailUrl
              ? nft.image.thumbnailUrl
              : nft.image.cachedUrl;
            const _nftJson = {
              name: nft.name,
              tokenId: nft.tokenId,
              collectionName: nft.contract.name,
              address: nft.contract.address,
              network: "optimism",
              metadata: nft.raw.metadata,
              preview: {
                source: thumbnailUrl,
                mimetype: nft.image.contentType,
              },
              files: [
                {
                  source: nft.image.cachedUrl,
                  mimetype: nft.image.contentType,
                },
              ],
            };
            nft.name !== null &&
              setNftJsons((nfts) => [...(nfts ? nfts : []), _nftJson]);
          });
        })
        .catch((err) => console.error(err));
      nftjsons?.length === 0 && setListIsEmpty(true);

      setLoaded(true);
      setIsLoading(false);
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    async function getNfts() {
      if (isOpen && !loaded) {
        loadNFTs();
      }

      if (isOpen && network !== currentNetwork) {
        setCurrentNetwork(network);
        loadNFTs();
      }
    }
    if (isOpen) {
      getNfts();
    }
  }, [isOpen, network]);

  return (
    <>
      <Button
        key={key}
        colorScheme="purple"
        variant={"border"}
        rounded={"xl"}
        onClick={() => {
          _setAddLinkOpen(false);
          setType(defaultType);
          _setOpen(true);
          onOpen();
        }}
      >
        {defaultType === "avatar" ? "Pick Avatar" : "Pick NFT"}
      </Button>
      <Drawer
        key={key}
        onClose={onClose}
        isOpen={_open}
        size={"full"}
        placement="bottom"
      >
        <DrawerOverlay />
        <DrawerContent
          bg={colorMode === "dark" ? "var(--dark1)" : "var(--white)"}
          py={4}
        >
          <DrawerHeader
            gap={3}
            display={"flex"}
            flexDirection={notMobile ? "row" : "column"}
          >
            <HStack gap={2} flexGrow={1}>
              <Text flexGrow={1}>
                Pick {type === "avatar" ? "Avatar" : "NFT"}
              </Text>

              <Button
                aria-label="change-view"
                onClick={() => setListView(!listView)}
                gap={2}
                variant={"border"}
                rounded={"xl"}
              >
                {notMobile ? (listView ? "Bigger" : "Smaller") : ""}{" "}
                {listView ? (
                  <RiLayoutGridLine size={"24"} />
                ) : (
                  <RiGridLine size={"24"} />
                )}
              </Button>
              <Button
                aria-label="reload-nfts"
                onClick={loadNFTs}
                gap={2}
                variant={"border"}
                rounded={"xl"}
              >
                {notMobile ? "Reload" : ""} <RiRestartLine size={"24"} />
              </Button>
              {/* {notMobile && <NetworkModal />} */}
              <Button
                aria-label="close-nfts-modal"
                onClick={onClose}
                gap={2}
                variant={"border"}
                rounded={"xl"}
              >
                <RiCloseLine size={"24"} />
              </Button>
            </HStack>
            {/* {!notMobile && <NetworkModal />} */}
          </DrawerHeader>
          <DrawerBody>
            <Box
              w="100%"
              maxW="1920px"
              mx="auto"
              sx={{
                columnCount: [
                  listView ? 2 : 1,
                  nftjsons && nftjsons?.length > 1 ? (listView ? 3 : 2) : 1,
                  nftjsons && nftjsons?.length > 1 ? (listView ? 4 : 3) : 1,
                  nftjsons && nftjsons?.length > 1 ? (listView ? 5 : 3) : 1,
                  nftjsons && nftjsons?.length > 1 ? (listView ? 6 : 3) : 1,
                ],
                columnGap: "16px",
              }}
            >
              {nftjsons?.map((nft, index) => (
                <Button
                  onClick={() =>
                    type === "avatar" ? setAsAvatar(index) : addAsLink(index)
                  }
                  key={"nft-" + index}
                  borderRadius={12}
                  width={"100%"}
                  p={0}
                  h={"auto"}
                  minH={"200px"}
                  mb={4}
                >
                  <Center
                    width={"100%"}
                    key={"nft-div-" + index}
                    flexDirection={"column"}
                    gap={2}
                    background={
                      colorMode === "dark" ? "blackAlpha.300" : "blackAlpha.100"
                    }
                    borderRadius={12}
                  >
                    <Box
                      position={"absolute"}
                      right={3}
                      top={3}
                      opacity={0.5}
                      zIndex={900}
                    >
                      <LinkIcon type={String(nft.network)} line />
                    </Box>
                    <Flex
                      key={nft.name + " name" + index}
                      gap={2}
                      flexDirection={"column"}
                      alignItems={"center"}
                      justifyContent={"center"}
                    >
                      <Box>
                        {String(nft.preview?.mimetype).includes("mp4") ? (
                          <Center>
                            <ReactPlayer
                              url={nft?.preview?.source}
                              width={"100%"}
                              loop
                              muted
                              playing
                              height={230}
                            />
                          </Center>
                        ) : (
                          <Image
                            borderRadius={12}
                            position={"relative"}
                            width={"100%"}
                            height={"auto"}
                            transition={"ease"}
                            transitionDuration={"1000"}
                            alt={nft.name}
                            textAlign={"center"}
                            src={
                              String(nft.name).slice(-4).toLowerCase() ===
                              ".vid"
                                ? AVATAR_API_URL +
                                  String(nft.name).slice(0, -4).toLowerCase() +
                                  "&var=" +
                                  Math.round(Math.random() * 10000)
                                : nft.files && nft.files[0]?.source !== ""
                                ? String(nft.files[0]?.source)
                                : String(nft.preview?.source)
                            }
                          />
                        )}
                      </Box>
                      {/* <Text
                        fontWeight={'bold'}
                        fontSize={
                          listView
                            ? String(nft.name).length > 15
                              ? String(nft.name).length > 18
                                ? 'xs'
                                : 'sm'
                              : 'md'
                            : 'lg'
                        }>
                        {listView
                          ? String(nft.name).length > 18
                            ? String(nft.name).slice(0, 18) + '...'
                            : String(nft.name)
                          : String(nft.name).length > 23
                          ? String(nft.name).slice(0, 23) + '...'
                          : String(nft.name)}
                      </Text> */}
                    </Flex>
                  </Center>
                </Button>
              ))}
            </Box>
            {isLoading && (
              <Center width={"100%"} height={200}>
                <Spinner size="lg" />
              </Center>
            )}

            {listIsEmpty && !isLoading && (
              <Center display="flex" flexDirection="column" gap={4} minH={200}>
                <Text fontSize="xl">
                  Looks like You don't own any NFTs on {capFirstLetter(network)}
                </Text>
              </Center>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
