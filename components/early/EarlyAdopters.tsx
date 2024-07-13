import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  Flex,
  Stack,
  Textarea,
  Text,
  useColorMode,
  useMediaQuery,
  useDisclosure,
  useColorModeValue,
  HStack,
  Box,
  useToast,
  Badge,
  SimpleGrid,
  Link,
  Center,
  Spinner,
} from '@chakra-ui/react';
import axios from 'axios';
import ImageBox from 'components/claiming/ImageBox';
import { LinkIcon } from 'components/logos';
import {
  bioAtom,
  connectedAccountAtom,
  earlyAdopterContractAtom,
  twitterAuthAtom,
  twitterFollowedAtom,
  twitterRetweetedAtom,
  twitterVerifiedAtom,
  venomProviderAtom,
} from 'core/atoms';
import { useTranslate } from 'core/lib/hooks/use-translate';
import {
  CONTRACT_ADDRESS,
  CONTRACT_ADDRESS_V1,
  EARLY_ADOPTERS_CONTRACT_ADDRESS,
  EARLY_ADOPTER_IMAGES,
  ETHERSCAN_URLS,
  MARKETPLACE_URLS,
  MARKETPLACE_URLS_COLLECTION,
  ROOT_CONTRACT_ADDRESS,
  SITE_URL,
  TWITTER_FOLLOW_URL,
  TWITTER_RETWEET_URL,
  VENTORY_NFT_V1_ADDRESS,
  VENTORY_NFT_V2_ADDRESS,
  ZEALY_URL,
} from 'core/utils/constants';
import getNftsByAddress from 'core/utils/getNftsByAddress';
import { getTwitterAuthUrl, refreshAccessToken } from 'core/utils/twitterUtils';
import { getZealyByTwitterId } from 'core/utils/zealyUtils';
import { useAtom, useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { sleep } from 'core/utils';
import InfoModal from './InfoModal';

export default function EarlyAdopters() {
  const { colorMode } = useColorMode();
  const [notMobile] = useMediaQuery('(min-width: 768px)');
  const [small] = useMediaQuery('(min-width: 375px)');
  const [minteds, setMinteds] = useState<any[] | undefined>(undefined);
  const [unMinteds, setUnMinteds] = useState<any[] | undefined>(undefined);
  const [mintedStrings, setMintedStrings] = useState<string[] | undefined>(undefined);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [twitterAuthUrl, setTwitterAuthUrl] = useState('');
  const connectedAccount = useAtomValue(connectedAccountAtom);
  const [twitterAuth, setTwitterAuth] = useAtom(twitterAuthAtom);
  const [twitterFollowed, setTwitterFollowed] = useAtom(twitterFollowedAtom);
  const [totalSupply, setTotalSupply] = useState<number>(0);
  const [twitterUser, setTwitterUser] = useState({ id: '', name: '', username: '' });
  const [twitterVerified, setTwitterVerified] = useState(false);
  const [twitterLoading, setTwitterLoading] = useState(false);
  const [zealyLoading, setZealyLoading] = useState(false);
  const [zealyVerified, setZealyVerified] = useState(false);
  const [zealyUser, setZealyUser] = useState<any>({ id: '', xp: 0, rank: 0 });
  const [ownVidChecked, setOwnVidChecked] = useState(false);
  const [ownVid, setOwnVid] = useState(false);
  const [reload, setReload] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMinting, setIsMinting] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [ownVid1, setOwnVid1] = useState(false);
  const [ownVid2, setOwnVid2] = useState(false);
  const [ownVids, setOwnVids] = useState(0);
  const [ownVidLoading, setOwnVidLoading] = useState(false);
  const [ownVidVen, setOwnVidVen] = useState(false);
  const [ownVidVenChecked, setOwnVidVenChecked] = useState(false);
  const [ownVidVenLoading, setOwnVidVenLoading] = useState(false);
  const earlyAdopterContract = useAtomValue(earlyAdopterContractAtom);
  const toast = useToast();
  const { t } = useTranslate();
  const provider = useAtomValue(venomProviderAtom);

  const getJson = (name: string, image: string, imageType: string = 'image/svg') => {
    const _json = {
      type: 'OAT',
      name: name,
      description:
        name +
        ' OAT (On-Chain Achievement Token) is a badge to record your on-chain and off-chain activities from the MONID Early Adopter Program Collection',
      preview: {
        source: image,
        mimetype: imageType,
      },
      files: [
        {
          source: image,
          mimetype: imageType,
        },
      ],
      external_url: SITE_URL,
    };

    console.log(_json);
    return _json;
  };

  

  const openWindow = (url: string, e: any) => {
    window.open(url, 'newwindow', 'width=420,height=800');
    e !== null && e.preventDefault();
  };

  useEffect(() => {
    async function getTwitterUrl() {
      if (connectedAccount === '') return;
      const _urlData = await getTwitterAuthUrl(btoa(connectedAccount));
      if (_urlData.data.status === 'ok') {
        setTwitterAuthUrl(_urlData.data.auth);
      }
    }

    getTwitterUrl();
  }, [connectedAccount]);

  useEffect(() => {
    async function validateTwitter() {
      setTwitterLoading(true);
      const _auth = Buffer.from(twitterAuth, 'base64').toString();
      const _authJson = JSON.parse(_auth);
      //console.log(_authJson);
      if (_authJson.status === 'ok') {
        try {
          const _token = Buffer.from(_authJson.token, 'base64').toString();
          const token = JSON.parse(_token);
          //console.log(token);
          const isValidToken = (token.ex - new Date().getTime()) / 1000 / 60 > 0;
          //console.log((token.ex - new Date().getTime()) / 1000 / 60);
          if (isValidToken) {
            const _user = Buffer.from(_authJson.u, 'base64').toString();
            const user = JSON.parse(_user);
            setTwitterUser(user.data);
            setTwitterLoading(false);
          } else {
            const refresh = await refreshAccessToken(token.refresh);
            if (refresh.data.status === 'ok') {
              setTwitterAuth(btoa(JSON.stringify(refresh.data)));
            }
            setTwitterLoading(false);
          }

          //setTwitterVerified(true);
        } catch (error) {
          console.log('error in validating twitter auth');
          setTwitterLoading(false);
        }
      } else {
        setTwitterLoading(false);
      }
    }

    if (twitterAuth.length > 20) {
      validateTwitter();
    }
  }, [twitterAuth]);

  useEffect(() => {
    if (twitterFollowed && twitterUser.id !== '') {
      if (twitterUser.id !== '') {
      setTwitterVerified(true);
    } else {
      setTwitterVerified(false);
    }
  }
}, [twitterFollowed, twitterUser]);

  const _validateZealy = async () => {
    setZealyLoading(true);
    const _zealyUser = await getZealyByTwitterId(twitterUser.id);
    //console.log(_zealyUser.data);
    if (_zealyUser) {
      const zealyUser_ = _zealyUser.data.data;
      if (_zealyUser.status === 200 && zealyUser_) {
        setZealyUser(zealyUser_);
        if (zealyUser_.xp > 195) {
          setZealyVerified(true);
        } else {
          setZealyVerified(false);
        }
      }
    }
    setZealyLoading(false);
  };

  useEffect(() => {
    async function validateZealy() {
      await _validateZealy();
    }

    if (twitterUser.id !== '') {
      validateZealy();
    }
  }, [twitterUser]);

  const handleTwitter = async () => {
    if (twitterUser.id === '') {
      if (twitterAuthUrl.length > 10) {
        setTwitterLoading(true);
        window.open(twitterAuthUrl, 'self', 'width=420,height=800');
      } else {
        toast.closeAll();
        toast({
          status: 'info',
          title: t('connectWallet'),
          description: t('venomWalletConnect'),
          duration: 3000,
          isClosable: true,
        });
        return;
      }
    } else {
       if (twitterFollowed.length > 10) {
      //   if (twitterRetweeted.length > 10) {
          setTwitterVerified(true);
          setTwitterLoading(false);
          return;
      //   } else {
      //     setTwitterLoading(true);
      //     window.open(TWITTER_RETWEET_URL, 'self', 'width=420,height=800');
      //     setTimeout(() => {
      //       setTwitterRetweeted(Buffer.from(`retweeted-on-${Date.now()}`).toString('base64'));
      //       setTwitterLoading(false);
      //     }, 3000);
      //   }
       } else {
         setTwitterLoading(true);
         window.open(TWITTER_FOLLOW_URL, 'self', 'width=420,height=800');
         setTimeout(() => {
           setTwitterFollowed(Buffer.from(`followed-on-${Date.now()}`).toString('base64'));
           setTwitterLoading(false);
         }, 5000);
       }
    }
  };

  const loadByContract = async (_contractAddress: string) => {
    
  };

  const loadMinteds = async () => {
    
  };

  useEffect(() => {
    let _unMinteds = [];
    if (twitterVerified) {
      if (mintedStrings?.includes('Crypto Explorer')) {
        console.log('Explorer already minted');
      } else {
        _unMinteds.push(
          getJson(
            'Crypto Explorer',
            EARLY_ADOPTER_IMAGES['explorer'].src,
            EARLY_ADOPTER_IMAGES['explorer'].type
          )
        );
      }
    }

    if (zealyVerified || ownVids > 1) {
      if (mintedStrings?.includes('MONID Pioneer')) {
        console.log('Pioneer already minted');
      } else {
        _unMinteds.push(
          getJson(
            'MONID Pioneer',
            EARLY_ADOPTER_IMAGES['pioneer'].src,
            EARLY_ADOPTER_IMAGES['pioneer'].type
          )
        );
      }
    }

    if (ownVidVen) {
      if (mintedStrings?.includes('MONID Identorian')) {
        console.log('Identorian already minted');
      } else {
        _unMinteds.push(
          getJson(
            'MONID Identorian',
            EARLY_ADOPTER_IMAGES['identorian'].src,
            EARLY_ADOPTER_IMAGES['identorian'].type
          )
        );
      }
    }

    if (ownVids > 0) {
      if (mintedStrings?.includes('MONID Family')) {
        console.log('Family already minted');
      } else {
        _unMinteds.push(
          getJson(
            'MONID Family',
            EARLY_ADOPTER_IMAGES['family'].src,
            EARLY_ADOPTER_IMAGES['family'].type
          )
        );
      }
    }

    if (
      (ownVids > 2 && zealyVerified) ||
      (zealyVerified && zealyUser.xp > 500 && zealyUser.rank < 201)
    ) {
      if (mintedStrings?.includes('MONID Maverick')) {
        console.log('Maverick already minted');
      } else {
        _unMinteds.push(
          getJson(
            'MONID Maverick',
            EARLY_ADOPTER_IMAGES['maverick'].src,
            EARLY_ADOPTER_IMAGES['maverick'].type
          )
        );
      }
    }

    if (
      twitterVerified &&
      ownVids > 1 &&
      zealyVerified &&
      zealyUser.xp > 1000 &&
      zealyUser.rank < 50
    ) {
      if (mintedStrings?.includes('MONID Champion')) {
        console.log('Champion already minted');
      } else {
        _unMinteds.push(
          getJson(
            'MONID Champion',
            EARLY_ADOPTER_IMAGES['champion'].src,
            EARLY_ADOPTER_IMAGES['champion'].type
          )
        );
      }
    }

    console.log('unMinteds');
    console.log(_unMinteds);
    if (_unMinteds.length > 0) {
      setUnMinteds(_unMinteds);
    } else {
      setUnMinteds([]);
    }
    setReload(false);
  }, [mintedStrings, twitterVerified, zealyVerified, ownVids, ownVidVen, reload]);

  const loadByDb = async () => {
    const result = (await getNftsByAddress(String(connectedAccount))).data;
    //console.log(result);
    //console.log(rows[0]);
    if (result.nfts) {
      return result.nfts.length;
    } else {
      return 0;
    }
  };

  const _checkOwnVid = async () => {
    setOwnVidLoading(true);
    const v0nfts = await loadByContract(ROOT_CONTRACT_ADDRESS);
    const v1nfts = await loadByContract(CONTRACT_ADDRESS);
    const v2nfts = await loadByContract(CONTRACT_ADDRESS_V1);
    //const v3nfts = await loadByDb();

    //console.log(v1nfts, v2nfts, v3nfts);
    let _no = 0;
    if (Number(v0nfts) > 0) {
      _no += 1;
    };

    if (Number(v1nfts) > 0) {
      setOwnVid(true);
      _no += 1;
    } else {
      setOwnVid(false);
    }
    if (Number(v2nfts) > 0) {
      setOwnVid1(true);
      _no += 1;
    } else {
      setOwnVid1(false);
    }

    // if (Number(v3nfts) > 0) {
    //   setOwnVid2(true);
    //   _no += 1;
    // } else {
    //   setOwnVid2(false);
    // }

    //console.log(v0nfts,v1nfts, v2nfts, v3nfts);

    setOwnVidChecked(true);
    setOwnVidLoading(false);
    setOwnVids(_no);
  };

  const _checkOwnVidVen = async () => {
    setOwnVidVenLoading(true);
    

    setOwnVidVenChecked(true);
    setOwnVidVenLoading(false);
  };

  useEffect(() => {
    const checkOwnVid = async () => {
      await _checkOwnVid();
    };

    const checkOwnVidVen = async () => {
      await _checkOwnVidVen();
    };

    const checkMinteds = async () => {
      await loadMinteds();
    };

    if (!provider || !provider.isInitialized) return;
    if (!connectedAccount || connectedAccount === '') return;
    //if (!isOpen) return;

    //checkOwnVid();
    //checkOwnVidVen();
    //checkMinteds();
  }, [provider, connectedAccount]);

  return (
    <Accordion
      //allowToggle
      allowMultiple={false}
      defaultIndex={[0]}
      // onChange={(e) => {
      //   if(e === 0){
      //     onOpen();
      //   } else {
      //     onClose();
      //   }
      // }}
      className="bio"
      borderRadius={10}
      minWidth={'100%'}
      size="lg"
      backgroundColor={colorMode === 'dark' ? 'whiteAlpha.100' : 'blackAlpha.100'}
      display={'flex'}>
      <AccordionItem border={0} borderRadius={10} width={'100%'}>
        <AccordionButton
          //width={'100%'}
          as={Button}
          justifyContent={'center'}
          // bgGradient={useColorModeValue(
          //   'linear(to-r, var(--base1), var(--base2))',
          //   'linear(to-r, var(--base2), var(--bluevenom2))'
          // )}
          // _expanded={{
          //   bgGradient: useColorModeValue(
          //     'linear(to-r, var(--base1), var(--base2))',
          //     'linear(to-r, var(--base2), var(--bluevenom2))'
          //   ),
          //   borderBottomRadius: 0,
          // }}
          // _hover={{
          //   bgGradient: useColorModeValue(
          //     'linear(to-r, var(--base0), var(--bluevenom0))',
          //     'linear(to-r, var(--base0), var(--bluevenom0))'
          //   ),
          // }}
          //color={'white'}
          rounded={'2xl'}
          variant={'border'}
          colorScheme={colorMode === 'light' ? 'light' : 'light'}
          h={'120px'}>
          <Flex gap={[3, 4]} alignItems={'center'} justify={'center'}>
            <LinkIcon type="RiUserStarLine" size={small ? '46' : '36'} />
            <Stack gap={1} justify={'left'}>
            <Text fontWeight={'bold'} display={'flex'} flex={1} fontSize={['xl', '2xl']}>
              Early Adopters Program
            </Text>
            {totalSupply > 0 && <Text fontSize={'2xl'} fontWeight={'light'} textAlign={'left'} >{totalSupply} total mints</Text>}
            </Stack>
          </Flex>
        </AccordionButton>
        <AccordionPanel py={4} minWidth="100%">
          <Stack gap={6} fontSize={['md', 'lg']} textAlign={'center'}>
            {/* <Flex
              align={'center'}
              bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
              p={4}
              gap={4}
              rounded={'lg'}
              justify={'space-between'}>
              <HStack gap={4}>
                <LinkIcon type="x" size={notMobile ? '48' : '32'} />
                <Box>
                  Follow us on twitter
                  <Text color={useColorModeValue('var(--blue3)', 'var(--blue0)')}>
                    <a
                      href={TWITTER_FOLLOW_URL}
                      onClick={(e) => {
                        openWindow(TWITTER_FOLLOW_URL, e);
                      }}
                      target="_blank"
                      rel="noreferrer">
                      @monid_xyz
                    </a>
                  </Text>
                </Box>
              </HStack>
              <Button
                size={['md', 'lg']}
                variant={'pop'}
                colorScheme={twitterVerified ? 'green' : 'darker'}
                color={'white'}
                isLoading={twitterLoading}
                loadingText={'Checking'}
                rounded={'full'}
                isDisabled={twitterVerified}
                gap={1}
                h={'56px'}
                onClick={handleTwitter}>
                {twitterUser.id === ''
                  ? 'Login' : !twitterFollowed ? 'Follow'
                  : 'Done'}
              </Button>
            </Flex>
            <Flex
              align={'center'}
              bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
              p={4}
              gap={2}
              rounded={'lg'}
              justify={'space-between'}>
              <HStack gap={4}>
                <LinkIcon type="zealy" size={notMobile ? '48' : '32'} />
                <Box>
                  Zealy Member (Min 195 XP)
                  <Text color={useColorModeValue('var(--blue3)', 'var(--blue0)')}>
                    <a
                      href={ZEALY_URL}
                      onClick={(e) => {
                        openWindow(ZEALY_URL, e);
                      }}
                      target="_blank"
                      rel="noreferrer">
                      Earn Xps
                    </a>
                  </Text>
                </Box>
              </HStack>
              <Button
                size="lg"
                variant={'pop'}
                isLoading={zealyLoading}
                loadingText={'Checking'}
                colorScheme={zealyVerified ? 'green' : 'darker'}
                color={'white'}
                rounded={'full'}
                h={'56px'}
                onClick={twitterUser.id === '' ? handleTwitter : _validateZealy}>
                {zealyUser.id !== '' ? `${zealyUser.xp} XP` : 'Login'}{' '}
                {zealyUser.xp > 500 && zealyUser.rank < 101 && (
                  <Badge
                    color={'white'}
                    bg={'var(--redGradient)'}
                    position={'absolute'}
                    mt={-12}
                    p={1}
                    px={2}
                    rounded={'full'}>
                    {' '}
                    {zealyUser.rank < 11 ? `Top 1%` : `Top 10%`}
                  </Badge>
                )}
                {zealyUser.rank > 0 && zealyUser.xp > 0 && (
                  <Badge
                    color={'white'}
                    bg={'var(--baseGradient)'}
                    position={'absolute'}
                    mb={-12}
                    p={1}
                    px={2}
                    rounded={'full'}>
                    {' '}
                    {`Rank ${zealyUser.rank}`}
                  </Badge>
                )}
              </Button>
            </Flex>
            <Flex
              align={'center'}
              bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
              p={4}
              gap={2}
              rounded={'lg'}
              justify={'space-between'}>
              <HStack gap={4}>
                <LinkIcon
                  type="https://ipfs.io/ipfs/Qmejr9qRtG3YYxqRCEVmjD1bW17mgQio8W1TjXjNSJn3DL"
                  size="md"
                />
                <Text>Own MONID NFT</Text>
              </HStack>
              <Button
                size="lg"
                variant={'pop'}
                colorScheme={ownVids > 0 ? 'green' : 'darker'}
                color={'white'}
                isLoading={ownVidLoading}
                loadingText={'Checking'}
                rounded={'full'}
                onClick={_checkOwnVid}>
                {ownVidChecked ? (ownVids > 0 ? 'Yes' : 'No') : 'Check'}
                {ownVids > 1 && (
                  <Badge
                    color={'white'}
                    bg={'var(--baseGradient)'}
                    position={'absolute'}
                    mb={-12}
                    p={1}
                    px={2}
                    rounded={'full'}>
                    {ownVids === 2
                      ? `Pioneer`
                      : zealyVerified && twitterVerified
                      ? `Maverick`
                      : zealyVerified || twitterVerified
                      ? `Pioneer`
                      : `Family`}
                  </Badge>
                )}
              </Button>
            </Flex>
            <Flex
              align={'center'}
              bg={colorMode === 'light' ? 'blackAlpha.100' : 'whiteAlpha.100'}
              p={4}
              gap={2}
              rounded={'lg'}
              justify={'space-between'}>
              <HStack gap={4}>
                <LinkIcon
                  type="https://ipfs.io/ipfs/QmPYnkNSK1TzqzxAEsK1DXNRsk1wuMgzncEUJgMauMC423/3dgifmaker60629.gif"
                  size="md"
                />
                <Box>
                  Own MONID x Ventory NFT
                  <Text color={colorMode === 'light' ? 'var(--blue3)' : 'var(--blue0)'}>
                    <a
                      href={MARKETPLACE_URLS_COLLECTION['venom'] + VENTORY_NFT_V2_ADDRESS}
                      onClick={(e) => {
                        openWindow(
                          MARKETPLACE_URLS_COLLECTION['venom'] + VENTORY_NFT_V2_ADDRESS,
                          e
                        );
                      }}
                      target="_blank"
                      rel="noreferrer">
                      View Collection
                    </a>
                  </Text>
                </Box>
              </HStack>
              <Button
                size="lg"
                variant={'pop'}
                colorScheme={ownVidVen ? 'green' : 'darker'}
                isLoading={ownVidVenLoading}
                loadingText={'Checking'}
                color={'white'}
                rounded={'full'}
                onClick={_checkOwnVidVen}>
                {ownVidVenChecked ? (ownVidVen ? 'Yes' : 'No') : 'Check'}
              </Button>
            </Flex> */}

            <Flex
              align={'center'}
              //bg={colorMode === 'light' ? 'blackAlpha.100' : 'whiteAlpha.100'}
              p={4}
              textAlign={'center'}
              w={'100%'}
              gap={2}
              rounded={'lg'}
              fontSize={'xl'}>
                <Text textAlign={'center'} w={'100%'}>
              The first 5000 registered .mon domain owners will be guaranteed a Unique Avatar NFT with future utility!
              </Text>
            </Flex>
             {/* {minteds && minteds?.length > 0 && <Text textAlign={'center'} fontSize={'xl'} fontWeight={'bold'}>Your OAT(s)</Text>}
            {earlyAdopterContract?.methods && <>
            {!isLoading ? (
              <Flex
                align={'center'}
                //bg={useColorModeValue('blackAlpha.100', 'blackAlpha.100')}
                p={4}
                rounded={'lg'}
                justify={'center'}>
                <SimpleGrid gap={8} columns={[1, 1, 2, 3]} spacing={'32px'}>

                  {minteds?.map((nft)  => <Flex key={nft.name+'-badge-flex'} flexDir={'column'} justify={'center'} gap={4} align={'center'} p={4}>
                      
                      <ImageBox srcUrl={String(nft.preview?.source)} size={200} rounded='full'/>
                      <Text textAlign={'center'}>{nft.name}</Text>
                      <Button
                        w={'100%'}
                        color={'white'}
                        isDisabled={isMinting || isConfirming}
                        isLoading={isMinting || isConfirming}
                        loadingText={
                          isMinting
                            ? 'Minting ...'
                            : isConfirming
                            ? 'Confirming ...'
                            : 'Loading ...'
                        }
                        onClick={()=> openWindow(
                                ETHERSCAN_URLS['venom'] +
                                  nft.address,
                                null
                              )
                        }
                        rounded={'full'}
                        bgGradient={
                          colorMode === 'light'
                            ? 'linear(to-r, var(--base1), var(--base2))'
                            : 'linear(to-r, var(--base2), var(--bluevenom2))'
                        }>View on Explorer
                      </Button>
                    </Flex>)} */}
                  {/* {twitterVerified && (
                    <Flex flexDir={'column'} justify={'center'} gap={4} align={'center'}>
                      {mintedStrings?.includes('Crypto Explorer') && <Badge position={'absolute'} colorScheme='green' zIndex={1000} mt={'-320px'} ml={'-200px'} rounded={'lg'} display={'flex'} gap={2} p={2} justifyContent={'center'} alignItems={'center'}><LinkIcon type="RiVerifiedBadgeFill" size={'24'} />Minted</Badge>}
                      
                      <ImageBox srcUrl={EARLY_ADOPTER_IMAGES['explorer'].src} size={250} />
                      <Text>Crypto Explorer OAT</Text>
                      <Button
                        w={'100%'}
                        color={'white'}
                        isDisabled={isMinting || isConfirming}
                        isLoading={isMinting || isConfirming}
                        loadingText={
                          isMinting
                            ? 'Minting ...'
                            : isConfirming
                            ? 'Confirming ...'
                            : 'Loading ...'
                        }
                        onClick={() =>
                          mintedStrings?.includes('Crypto Explorer')
                            ? openWindow(
                                ETHERSCAN_URLS['venom'] +
                                  minteds?.filter((m) => m.name === 'Crypto Explorer')[0].address,
                                null
                              )
                            : mintBadge(
                                'Crypto Explorer',
                                EARLY_ADOPTER_IMAGES['explorer'].src,
                                EARLY_ADOPTER_IMAGES['explorer'].type
                              )
                        }
                        rounded={'full'}
                        bgGradient={
                          colorMode === 'light'
                            ? 'linear(to-r, var(--base1), var(--base2))'
                            : 'linear(to-r, var(--base2), var(--bluevenom2))'
                        }>
                        {mintedStrings?.includes('Crypto Explorer')
                          ? 'Minted. View on explorer'
                          : 'Mint'}
                      </Button>
                    </Flex>
                  )}
                  {(zealyVerified || ownVids > 1) && (
                    <Flex flexDir={'column'} justify={'center'} gap={4} align={'center'} p={4}>
                      {mintedStrings?.includes('MONID Pioneer') && <Badge position={'absolute'} colorScheme='green' zIndex={1000} mt={'-320px'} ml={'-200px'} rounded={'lg'} display={'flex'} gap={2} p={2} justifyContent={'center'} alignItems={'center'}><LinkIcon type="RiVerifiedBadgeFill" size={'24'} />Minted</Badge>}
                      <ImageBox srcUrl={EARLY_ADOPTER_IMAGES['pioneer'].src} size={250} />
                      <Text>MONID Pioneer OAT</Text>
                      <Button
                        w={'100%'}
                        color={'white'}
                        isDisabled={isMinting || isConfirming}
                        isLoading={isMinting || isConfirming}
                        loadingText={
                          isMinting
                            ? 'Minting ...'
                            : isConfirming
                            ? 'Confirming ...'
                            : 'Loading ...'
                        }
                        onClick={() =>
                          mintedStrings?.includes('MONID Pioneer')
                            ? openWindow(
                                ETHERSCAN_URLS['venom'] +
                                  minteds?.filter((m) => m.name === 'MONID Pioneer')[0].address,
                                null
                              )
                            : mintBadge(
                                'MONID Pioneer',
                                EARLY_ADOPTER_IMAGES['pioneer'].src,
                                EARLY_ADOPTER_IMAGES['pioneer'].type
                              )
                        }
                        rounded={'full'}
                        bgGradient={
                          colorMode === 'light'
                            ? 'linear(to-r, var(--base1), var(--base2))'
                            : 'linear(to-r, var(--base2), var(--bluevenom2))'
                        }>
                        {mintedStrings?.includes('MONID Pioneer')
                          ? 'Minted. View on explorer'
                          : 'Mint'}
                      </Button>
                    </Flex>
                  )}

                  {ownVidVen && (
                    <Flex flexDir={'column'} justify={'center'} gap={4} align={'center'} p={4}>
                      {mintedStrings?.includes('MONID Identorian') && <Badge position={'absolute'} colorScheme='green' zIndex={1000} mt={'-320px'} ml={'-200px'} rounded={'lg'} display={'flex'} gap={2} p={2} justifyContent={'center'} alignItems={'center'}><LinkIcon type="RiVerifiedBadgeFill" size={'24'} />Minted</Badge>}
                      <ImageBox srcUrl={EARLY_ADOPTER_IMAGES['identorian'].src} size={250} />
                      <Text>MONID Identorian OAT</Text>
                      <Button
                        w={'100%'}
                        color={'white'}
                        isDisabled={isMinting || isConfirming}
                        isLoading={isMinting || isConfirming}
                        loadingText={
                          isMinting
                            ? 'Minting ...'
                            : isConfirming
                            ? 'Confirming ...'
                            : 'Loading ...'
                        }
                        onClick={() =>
                          mintedStrings?.includes('MONID Identorian')
                            ? openWindow(
                                ETHERSCAN_URLS['venom'] +
                                  minteds?.filter((m) => m.name === 'MONID Identorian')[0]
                                    .address,
                                null
                              )
                            : mintBadge(
                                'MONID Identorian',
                                EARLY_ADOPTER_IMAGES['identorian'].src,
                                EARLY_ADOPTER_IMAGES['identorian'].type
                              )
                        }
                        rounded={'full'}
                        bgGradient={
                          colorMode === 'light'
                            ? 'linear(to-r, var(--base1), var(--base2))'
                            : 'linear(to-r, var(--base2), var(--bluevenom2))'
                        }>
                        {mintedStrings?.includes('MONID Identorian')
                          ? 'Minted. View on explorer'
                          : 'Mint'}
                      </Button>
                    </Flex>
                  )}

                  {ownVids > 0 && (
                    <Flex flexDir={'column'} justify={'center'} gap={4} align={'center'} p={4}>
                      {mintedStrings?.includes('MONID Family') && <Badge position={'absolute'} colorScheme='green' zIndex={1000} mt={'-320px'} ml={'-200px'} rounded={'lg'} display={'flex'} gap={2} p={2} justifyContent={'center'} alignItems={'center'}><LinkIcon type="RiVerifiedBadgeFill" size={'24'} />Minted</Badge>}
                      <ImageBox srcUrl={EARLY_ADOPTER_IMAGES['family'].src} size={250} />
                      <Text>MONID Family OAT</Text>
                      <Button
                        w={'100%'}
                        color={'white'}
                        isDisabled={isMinting || isConfirming}
                        isLoading={isMinting || isConfirming}
                        loadingText={
                          isMinting
                            ? 'Minting ...'
                            : isConfirming
                            ? 'Confirming ...'
                            : 'Loading ...'
                        }
                        onClick={() =>
                          mintedStrings?.includes('MONID Family')
                            ? openWindow(
                                ETHERSCAN_URLS['venom'] +
                                  minteds?.filter((m) => m.name === 'MONID Family')[0].address,
                                null
                              )
                            : mintBadge(
                                'MONID Family',
                                EARLY_ADOPTER_IMAGES['family'].src,
                                EARLY_ADOPTER_IMAGES['family'].type
                              )
                        }
                        rounded={'full'}
                        bgGradient={
                          colorMode === 'light'
                            ? 'linear(to-r, var(--base1), var(--base2))'
                            : 'linear(to-r, var(--base2), var(--bluevenom2))'
                        }>
                        {mintedStrings?.includes('MONID Family')
                          ? 'Minted. View on explorer'
                          : 'Mint'}
                      </Button>
                    </Flex>
                  )}

                  {((ownVids > 2 && zealyVerified) ||
                    (zealyVerified && zealyUser.xp >= 500 && zealyUser.rank < 201)) && (
                      <Flex flexDir={'column'} justify={'center'} gap={4} align={'center'} p={4}>
                      {mintedStrings?.includes('MONID Maverick') && <Badge position={'absolute'} colorScheme='green' zIndex={1000} mt={'-320px'} ml={'-200px'} rounded={'lg'} display={'flex'} gap={2} p={2} justifyContent={'center'} alignItems={'center'}><LinkIcon type="RiVerifiedBadgeFill" size={'24'} />Minted</Badge>}
                        <ImageBox srcUrl={EARLY_ADOPTER_IMAGES['maverick'].src} size={250} />
                        <Text>MONID Maverick OAT</Text>
                        <Button
                          w={'100%'}
                          color={'white'}
                          isDisabled={isMinting || isConfirming}
                          isLoading={isMinting || isConfirming}
                          loadingText={
                            isMinting
                              ? 'Minting ...'
                              : isConfirming
                              ? 'Confirming ...'
                              : 'Loading ...'
                          }
                          onClick={() =>
                            mintedStrings?.includes('MONID Maverick')
                              ? openWindow(
                                  ETHERSCAN_URLS['venom'] +
                                    minteds?.filter((m) => m.name === 'MONID Maverick')[0]
                                      .address,
                                  null
                                )
                              : mintBadge(
                                  'MONID Maverick',
                                  EARLY_ADOPTER_IMAGES['maverick'].src,
                                  EARLY_ADOPTER_IMAGES['maverick'].type
                                )
                          }
                          rounded={'full'}
                          bgGradient={
                            colorMode === 'light'
                              ? 'linear(to-r, var(--base1), var(--base2))'
                              : 'linear(to-r, var(--base2), var(--bluevenom2))'
                          }>
                          {mintedStrings?.includes('MONID Maverick')
                            ? 'Minted. View on explorer'
                            : 'Mint'}
                        </Button>
                      </Flex>
                    )}
                  {twitterVerified && ownVids > 1 && zealyUser.xp > 1500 && zealyUser.rank < 50 && (
                    <Flex flexDir={'column'} justify={'center'} gap={4} align={'center'} p={4}>
                      {mintedStrings?.includes('MONID Champion') && <Badge position={'absolute'} colorScheme='green' zIndex={1000} mt={'-320px'} ml={'-200px'} rounded={'lg'} display={'flex'} gap={2} p={2} justifyContent={'center'} alignItems={'center'}><LinkIcon type="RiVerifiedBadgeFill" size={'24'} />Minted</Badge>}
                      <ImageBox srcUrl={EARLY_ADOPTER_IMAGES['champion'].src} size={250} />
                      <Text>MONID Champion OAT</Text>
                      <Button
                        w={'100%'}
                        color={'white'}
                        isDisabled={isMinting || isConfirming}
                        isLoading={isMinting || isConfirming}
                        loadingText={
                          isMinting
                            ? 'Minting ...'
                            : isConfirming
                            ? 'Confirming ...'
                            : 'Loading ...'
                        }
                        onClick={() =>
                          mintedStrings?.includes('MONID Champion')
                            ? openWindow(
                                ETHERSCAN_URLS['venom'] +
                                  minteds?.filter((m) => m.name === 'MONID Champion')[0].address,
                                null
                              )
                            : mintBadge(
                                'MONID Champion',
                                EARLY_ADOPTER_IMAGES['champion'].src,
                                EARLY_ADOPTER_IMAGES['champion'].type
                              )
                        }
                        rounded={'full'}
                        bgGradient={
                          colorMode === 'light'
                            ? 'linear(to-r, var(--base1), var(--base2))'
                            : 'linear(to-r, var(--base2), var(--bluevenom2))'
                        }>
                        {mintedStrings?.includes('MONID Champion')
                          ? 'Minted. View on explorer'
                          : 'Mint'}
                      </Button>
                    </Flex>
                  )} */}
{/*                   


                </SimpleGrid>
              </Flex>
            ) : (<Center minH={'100px'}><Spinner size={'lg'} /></Center>)} */}
            
            {/* <InfoModal /> */}
          </Stack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
