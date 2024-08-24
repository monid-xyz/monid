import {
  Button,
  Container,
  Heading,
  Text,
  InputGroup,
  Input,
  InputLeftAddon,
  Stack,
  SimpleGrid,
  Box,
  useMediaQuery,
  useColorMode,
  Flex,
  useToast,
  useColorModeValue,
  Center,
  Spinner,
  InputRightAddon,
  InputRightElement,
  SkeletonCircle,
  SkeletonText,
  Skeleton,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import DomainAbi from 'abi/Domain.abi.json';
import TokenWalletAbi from 'abi/TokenWallet.abi.json';
import {
  nameAtom,
  venomContractAtom,
  venomContractAddressAtom,
  primaryNameAtom,
  localeAtom,
  venomContractAtomV1,
  venomContractAtomV2,
  mintOpenAtom,
  isConnectedAtom,
  claimingNameAtom,
  rootContractAtom,
  pathAtom,
  signMessageAtom,
  venomProviderAtom,
  connectedAccountAtom,
  openRegisterAtom,
  walletsArrayAtom,
  socialsArrayAtom,
  linksArrayAtom,
  avatarAtom,
  titleAtom,
  subtitleAtom,
} from 'core/atoms';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useTranslate } from 'core/lib/hooks/use-translate';
import {
  MINT_DATE,
  MINT_MESSAGE,
  MIN_NAME_LENGTH,
  OASIS_COLLECTION,
  ROOT_CONTRACT_ADDRESS,
  SIGN_MESSAGE,
  TLD,
  VARIATIONS_VIDS,
  VENOMART_COLLECTION,
} from 'core/utils/constants';
import { invalidUsernameMessage, isValidUsername, sleep } from 'core/utils';
import { LinkIcon, Logo, LogoIcon } from 'components/logos';
import Link from 'next/link';
import RegisterModal from 'components/claiming/RegisterModal';
import AnimateOpacity from 'components/animate/AnimateOpacity';
import { ETHRegistrarController } from 'core/utils/contracts';
import { available } from 'contracts/421614/0x89c108a78ef261a9f9e977e566b310cb3518e714';
import { bytesToString, namehash, stringToBytes } from 'viem';
import { BytesLike, formatBytes32String, parseBytes32String } from 'ethers/lib/utils';

interface Message {
  type: any;
  title: string;
  msg: string;
  link?: string;
}

interface Fee {
  value0: number;
}

const ClaimSection = () => {
  let timer: any;
  const { t } = useTranslate();
  const connected = useAtomValue(isConnectedAtom);
  const connectedAccount = useAtomValue(connectedAccountAtom);
  const provider = useAtomValue(venomProviderAtom);
  const { colorMode } = useColorMode();
  const lightMode = colorMode === 'light';
  const rootContract = useAtomValue(rootContractAtom);
  const [fee, setFee] = useState<number | null>();
  const [typing, setTyping] = useState<boolean>(false);
  const [mintedOnTestnet, setMintedOnTestnet] = useState(0);
  const [earlyLoading, setEarlyLoading] = useState(true);
  const [feeIsLoading, setFeeIsLoading] = useState(false);
  const [nameExists, setNameExists] = useState(false);
  const [nameStatus, setNameStatus] = useState<number | null>();
  const [reload, setReload] = useState(false);
  const [totalSupply, setTotalSupply] = useState<number | null>(null);
  const VenomContractAddress = useAtomValue(venomContractAddressAtom);
  const [mintOpen, setMintOpen] = useAtom(mintOpenAtom);
  const setWallets = useSetAtom(walletsArrayAtom);
  const setSocials = useSetAtom(socialsArrayAtom);
  const setLinks = useSetAtom(linksArrayAtom);
  const setTitle = useSetAtom(titleAtom);
  const setSubtitle = useSetAtom(subtitleAtom);
  const setAvatar = useSetAtom(avatarAtom);
  //const [venomContract, setVenomContract] = useState<any>(undefined);

  const [name, setName] = useAtom(claimingNameAtom);
  const [openRegister, setOpenRegister] = useAtom(openRegisterAtom);
  const [path, setPath] = useAtom(pathAtom);
  //const [vidUrl, setVidUrl] = useState('');
  const [primaryName, setPrimaryName] = useAtom(primaryNameAtom);
  const toast = useToast({containerStyle : {
    gap : 2,
  }});

  async function inputChange() {
    if (path === '') return;
    window.clearTimeout(timer);
    clearTimeout(timer);

    if (!isValidUsername(path)) {
      toast.closeAll();
      toast({
        status: 'info',
        colorScheme: colorMode === 'dark' ? 'light' : 'dark',
        title: t('invalidName'),
        description: invalidUsernameMessage(path),
        isClosable: true,
        duration: 6000,
      });
      setFee(null);
      return;
    }

    if (
      ETHRegistrarController &&
      path.length > MIN_NAME_LENGTH 
    ) {
      try {
        setFeeIsLoading(true);
        setTyping(false);
        toast.closeAll();
        //@ts-ignore: Unreachable code error
        console.log('fetching')
        try {
          // @ts-ignore: Unreachable code error
          const result = await available({
            contract: ETHRegistrarController,
            name : path
          });
          console.log(result);
          setNameExists(!result);
          setName(path);
        } catch (e) {
          console.log(e);
          setNameExists(false);
          setName('');
        }

        //setFee(_fee);
        //setFee(sumUint128(_fee ,minFee));
        //console.log(sumUint128(_fee ,minFee))
        setFeeIsLoading(false);
      } catch (er) {
        console.log(er);
        return;
      }
    } else if (ETHRegistrarController === undefined) {
      toast({
        status: 'warning',
        title: t('contractConnection'),
        description: t('contractConnectionMsg'),
        isClosable: true,
      });
      return;
    }
  }
  

  useEffect(() => {
    
    window.clearTimeout(timer);
    clearTimeout(timer);
    setTyping(true);
    timer = window.setTimeout(inputChange, 1400);

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [path]);

  useEffect(() => {
    async function checkActive() {
      
      // setTotalSupply(null);
      
      
      //   const configs = await getRootConfigs(connectedAccount);
      //   if(configs.status === 200){
      //     let _total = configs.data.total.count;
      //     console.log(configs.data);
      //     setTotalSupply(_total);
      //   } else {
      //     console.log('error fetching total registered')
      //     console.log(configs);
      //   }
      
    }

    clear();
    checkActive();
    
  }, [connectedAccount, reload]);

  const registerClicked = async ()=> {
    if(connected){
      setOpenRegister(true)
    } else {
      toast.closeAll();
        toast({
          status: 'info',
          title: t('connectWallet'),
          description: t('walletConnectMsg'),
          duration: 5000,
          isClosable: true,
        });
        return;
    }
  }

  const clear = ()=> {
    setAvatar('');
    setLinks([]);
    setWallets([]);
    setSocials([]);
    setTitle('');
    setSubtitle('');
  }

  const [notMobile] = useMediaQuery('(min-width: 992px)');

  return (
    <Box id="claim">
      <Container
        as="main"
        width={'100%'}
        display="grid"
        placeContent="center"
        placeItems="center"
        minH="100vh"
        p={[4]}
        py={16}>
        <Box gap={4} width={'100%'}>
          <SimpleGrid
            columns={[1]}
            //spacing={['64px', '64px', '32px']}
            gap={[6,6,12]}
            py={8}
            alignItems={'center'}
            minWidth={['100%', '100%', '100%', 'container.md', 'container.lg']}>
            <Flex flexDirection="column" gap={4}>
              <AnimateOpacity delay={0}>
                <Center alignItems={'flex-start'}>
                  
                  <Heading
                    h={'2'}
                    textAlign={['center', 'center']}
                    fontWeight="bold"
                    fontSize={['2xl','3xl','4xl']}
                    height={['60px']}
                    bgGradient={
                      lightMode
                        ? 'linear(to-r, var(--base1), var(--base2))'
                        : 'linear(to-r, var(--base000), var(--base0))'
                    }
                    bgClip="text">
                    {t('description')}
                  </Heading>
                </Center>
              </AnimateOpacity>
              <AnimateOpacity delay={0.3}>
                <Text textAlign={['center', 'center']} fontSize={['lg', 'lg', 'xl']}>
                  {t('claimDescription')}
                </Text>
              </AnimateOpacity>
            </Flex>
          </SimpleGrid>

          {/* {totalSupply ? ( */}
          <AnimateOpacity delay={0.6}>
            <Stack py={[4,6,8]} w={'100%'} align={'center'} gap={4}>
              {mintOpen ? (
                <Flex direction={'column'} w={'100%'} align={'center'}>
                  <InputGroup size="lg">
                    <Input
                      height={['60px','70px','80px']}
                      placeholder="Enter Domain Name"
                      variant={'filled'}
                      value={path}
                      fontSize={['xl','2xl']}
                      borderWidth="1px"
                      borderColor={'whiteAlpha.500'}
                      rounded={'full'}
                      _focus={{
                        borderColor: 'whiteAlpha.800',
                        bg: colorMode === 'dark' ? 'blackAlpha.400' : 'white',
                      }}
                      _hover={{
                        borderColor: 'whiteAlpha.700',
                        bg: colorMode === 'dark' ? 'blackAlpha.400' : 'white',
                      }}
                      px={[6]}
                      onChange={(e) => setPath(e.target.value.toLowerCase())}
                      bg={colorMode === 'dark' ? 'blackAlpha.300' : 'whiteAlpha.700'}
                      isDisabled={openRegister}
                    />
                  </InputGroup>
                </Flex>
              ) : (
                <>
                  <Flex direction={'column'} gap={4} w={'100%'}>
                    <Text
                      my={2}
                      w={'100%'}
                      textAlign={'center'}
                      fontSize={['lg', 'lg', 'xl', '2xl']}>
                      {MINT_MESSAGE} <strong>{MINT_DATE}</strong>
                    </Text>
                  </Flex>
                </>
              )}
            </Stack>
          </AnimateOpacity>

          {/* ) : (
            <Center width={'100%'} gap={8} height={160} bg={colorMode === 'light' ? 'var(--base1)':'var(--base)'} rounded={'xl'}>
              
              {isConnected ? <><Spinner size="lg" />
              <Text fontSize={'xl'}>Loading Contracts Data</Text></> : <Text fontSize={'xl'}>{t('walletConnectMsg')}</Text>}

            </Center>
          )} */}

          {path.length > MIN_NAME_LENGTH && ETHRegistrarController && (
            <AnimateOpacity delay={0}>
              <Flex
                minWidth={['100%', 'md', 'xl', 'container.md', 'container.lg']}
                borderColor={'whiteAlpha.200'}
                borderWidth={1}
                rounded={['3xl', '3xl', 'full']}
                gap={2}
                justifyContent={'space-between'}
                alignItems={'center'}
                p={5}
                bgColor={colorMode === 'light' ? 'whiteAlpha.700' : 'blackAlpha.200'}>
                {typing ? (
                  <>
                    <Flex
                      gap={4}
                      align={'center'}
                      direction={['column', 'column', 'row']}
                      w={'100%'}>
                      <Flex gap={2} align={'center'} w={'100%'}>
                        <SkeletonCircle w={'64px'} h={'64px'} />
                        <Stack gap={2}>
                          <Skeleton w={'160px'} h={'30px'} />
                          <Skeleton w={'210px'} h={'28px'} />
                        </Stack>
                      </Flex>
                      <Skeleton w={['100%', '100%', 150]} h={66} rounded={'full'} />
                    </Flex>
                  </>
                ) : (
                  <>
                    {!feeIsLoading ? (
                      <Flex
                        direction={['column', 'column', 'row']}
                        gap={4}
                        w={'100%'}
                        align={'center'}>
                        <Flex gap={2} align={'center'} w={'100%'}>
                          <LinkIcon
                            type={nameExists ? 'RiCloseCircleLine' : 'RiCheckboxCircleLine'}
                            color={nameExists ? 'var(--red)' : 'var(--venom1)'}
                            size={64}
                          />
                          <Stack gap={0}>
                            <Text
                              fontSize={['xl', '2xl']}
                              fontWeight={'bold'}>
                              {path + '.' + TLD}
                            </Text>
                            <Text
                              fontSize={'xl'}
                              textAlign={'left'}
                              fontWeight={'bold'}
                              color={nameExists ? 'var(--red1)' : 'var(--venom1)'}>
                              {nameExists ? t('taken') : t('available')}
                            </Text>
                          </Stack>
                        </Flex>
                        <Button
                          minWidth={['100%', '100%', 'fit-content']}
                          colorScheme="venom"
                          size="lg"
                          gap={2}
                          fontSize={'xl'}
                          rounded={'full'}
                          variant={'border'}
                          height={['66px']}
                          isDisabled={
                            !isValidUsername(path) || nameExists || typing //|| mintedOnTestnet === 0
                          }
                          //onClick={(e) => claimVid(e.currentTarget.value)}>
                          onClick={registerClicked}>
                          {!typing && nameStatus !== -1 ? (
                            'Register'
                          ) : (
                            <>
                              {notMobile ? 'Search' : ''}
                              <LinkIcon type="RiSearchLine" />
                            </>
                          )}
                        </Button>
                      </Flex>
                    ) : (
                      <Flex
                        gap={4}
                        align={'center'}
                        direction={['column', 'column', 'row']}
                        w={'100%'}>
                        <Flex gap={2} align={'center'} w={'100%'}>
                          <Box w={'64px'}>
                            <Spinner size={'xl'} />
                          </Box>
                          <Stack gap={0}>
                            <Text
                              fontSize={['xl', '2xl']}
                              fontWeight={colorMode === 'light' ? 'bold' : 'normal'}>
                              {path + '.' + TLD}
                            </Text>
                            <Text
                              fontSize={'xl'}
                              fontWeight={colorMode === 'light' ? 'bold' : 'light'}>
                              {' '}
                              {t('availability')}
                            </Text>
                          </Stack>
                        </Flex>
                        <Skeleton w={['100%', '100%', 150]} h={66} rounded={'full'} />
                      </Flex>
                    )}
                  </>
                )}
              </Flex>
            </AnimateOpacity>
          )}

          {/* <Flex gap={[4,4,2,6]} justify={'center'} direction={['column','column','row']} pt={[8,8,24]}>
            <AnimateScale delay={1}>
              <Button p={4} rounded={'2xl'} h={'100px'} display={'flex'} flexDir={'column'} gap={2} w={['100%','100%','auto']} onClick={()=> setReload((r)=> !r)}>
                <Text>Registered Domains</Text>
                {totalSupply ? <Text fontSize={['2xl','2xl','2xl','4xl']}>{totalSupply}</Text> : <Center minH={'44px'}><Spinner size={'md'}/></Center>}
              </Button>
            </AnimateScale>
            <AnimateScale delay={1.3}>
            <Button as={Link} target='_blank' href={VENOMART_COLLECTION + ROOT_CONTRACT_ADDRESS} p={4} rounded={'2xl'} h={'100px'} display={'flex'} flexDir={'column'} gap={2} w={['100%','100%','auto']}>
                <Flex gap={4} align={'center'}><LinkIcon type={!lightMode ? 'https://ipfs.io/ipfs/QmXd1mZJerqR8SbgwLpBkFeMPwRx2DWP67EGX4TYXHg1Dx/S5ZuI6i9_400x400.jpg' : 'https://ipfs.io/ipfs/QmVBqPuqcH8VKwFVwoSGFHXUdG6ePqjmhEoNaQMsfd2xau/venomart.jpg'} size={'lg'}/><Stack gap={0}><Text textAlign={'left'}>Collection On</Text><Text fontSize={['2xl','2xl','2xl']} fontWeight={'light'}><strong>VENOM</strong> ART</Text></Stack></Flex>
              </Button>
            </AnimateScale>
            <AnimateScale delay={1.6}>
            <Button as={Link} target='_blank' href={OASIS_COLLECTION + ROOT_CONTRACT_ADDRESS} p={4} rounded={'2xl'} h={'100px'} display={'flex'} flexDir={'column'} gap={2} w={['100%','100%','auto']}>
                <Flex gap={4} align={'center'}><LinkIcon type={'https://ipfs.io/ipfs/QmNXPY57PSu72UZwoDyXsmHJT7UQ4M9EfPcyZwpi3xqMQV/oasisgallery.svg.svg'} size={'lg'}/><Stack gap={0}><Text textAlign={'left'}>Collection On</Text><Text fontSize={['2xl','2xl','2xl']} fontWeight={'light'}>Oasis Gallery</Text></Stack></Flex>
              </Button>
            </AnimateScale>
          </Flex> */}

          <RegisterModal />
          {/* <Text fontWeight="light" fontSize={'xl'} py={6}>
            {t('claimDescription')}
          </Text> */}
          {/* <Flex gap={2} alignItems={'center'} flexDirection={notMobile ? 'row':'column'}>
            <Button height={100} colorScheme='twitter' variant={'outline'}>
              <RiTwitterFill size={'60px'} />
            </Button> */}
        </Box>
      </Container>
    </Box>
  );
};

export default ClaimSection;
