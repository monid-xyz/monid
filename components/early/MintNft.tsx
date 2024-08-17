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
    Link,
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
    Spinner,
    Center,
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
  import { getTwitterAuthUrl, refreshAccessToken } from 'core/utils/twitterUtils';
  import { getZealyByTwitterId } from 'core/utils/zealyUtils';
  import { useAtom, useAtomValue } from 'jotai';
  import { useEffect, useState } from 'react';
  import { sleep } from 'core/utils';
  import InfoModal from './InfoModal';
  
  export default function MintNft() {
    const { colorMode } = useColorMode();
    const [notMobile] = useMediaQuery('(min-width: 768px)');
    const [small] = useMediaQuery('(min-width: 375px)');
    const [minteds, setMinteds] = useState<any[] | undefined>(undefined);
    const [mintedStrings, setMintedStrings] = useState<string[] | undefined>(undefined);
    const connectedAccount = useAtomValue(connectedAccountAtom);
    const [isLoading, setIsLoading] = useState(true);
    const [isMinting, setIsMinting] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);
  
    return (
      <Accordion
        allowToggle
        allowMultiple={false}
        defaultIndex={[0]}
        className="bio"
        borderRadius={10}
        minWidth={'100%'}
        size="lg"
        backgroundColor={colorMode === 'dark' ? 'whiteAlpha.100' : 'blackAlpha.100'}
        display={'flex'}>
        <AccordionItem border={0} borderRadius={10} width={'100%'}>
          <AccordionButton
            width={'100%'}
            as={Button}
            color={'white'}
            justifyContent={'center'}
            bgGradient={useColorModeValue(
              'linear(to-r, var(--base1), var(--base2))',
              'linear(to-r, var(--base2), var(--bluevenom2))'
            )}
            _expanded={{
              bgGradient: useColorModeValue(
                'linear(to-r, var(--base1), var(--base2))',
                'linear(to-r, var(--base2), var(--bluevenom2))'
              ),
              borderBottomRadius: 0,
            }}
            _hover={{
              bgGradient: useColorModeValue(
                'linear(to-r, var(--base0), var(--bluevenom0))',
                'linear(to-r, var(--base0), var(--bluevenom0))'
              ),
            }}
            h={'120px'}>
            <Flex gap={[3, 4]} alignItems={'center'} justify={'center'}>
              <LinkIcon type="RiPlantLine" size={small ? '46' : '36'} />
              <Stack gap={1}>
              <Text fontWeight={'bold'} display={'flex'} flex={1} fontSize={['xl', '2xl']}>
              Spring Burst NFT
              </Text>
              <Text fontWeight={'light'} textAlign={'left'}>Live till March 21, 23:59 UTC</Text>

              </Stack>
              
            </Flex>
          </AccordionButton>
          <AccordionPanel py={4} minWidth="100%">
            {connectedAccount.length > 60 ? <Stack gap={4} fontSize={['md', 'lg']}>
            {!notMobile && <Flex
              align={'center'}
              bg={colorMode === 'light' ? 'blackAlpha.100' : 'whiteAlpha.100'}
              p={4}
              direction={'column'}
              gap={2}
              rounded={'lg'}
              fontSize={['lg','xl']}>
              <Text>➡️ For an smooth experience during mint we recommend using a desktop 💻</Text><Text>If not possible, <Link href="https://oneart.digital/en" fontWeight={'bold'} target='_blank' color={colorMode === 'dark' ? 'venom.300' : 'venom.700'} >OneArt Wallet</Link> is the preferred option as it performs best in the process.</Text>

            </Flex>}
              {!isLoading ? (
                <Flex
                  align={'center'}
                  //bg={useColorModeValue('blackAlpha.100', 'blackAlpha.100')}
                  p={4}
                  rounded={'lg'}
                  justify={'center'}>
                      <Flex justify={'center'} gap={8} align={'center'} w={'100%'} flexDirection={['column','column','row']}>
                        <ImageBox srcUrl={EARLY_ADOPTER_IMAGES['spring'].src} size={[240]} rounded='lg' />
                        <Stack gap={4}>
                        <Text>Monad ID Spring Burst NFT</Text>
                        {mintedStrings?.includes('Monad ID Spring Burst NFT') && <Badge colorScheme='green' zIndex={1000} rounded={'lg'} display={'flex'} gap={2} p={2} justifyContent={'center'} alignItems={'center'}><LinkIcon type="RiVerifiedBadgeFill" size={'24'} />Minted</Badge>}
                        <Button
                          w={'100%'}
                          isDisabled={isMinting || isConfirming}
                          isLoading={isMinting || isConfirming}
                          loadingText={
                            isMinting
                              ? 'Minting ...'
                              : isConfirming
                              ? 'Confirming ...'
                              : 'Loading ...'
                          }
                          rounded={'full'}
                          bgGradient={
                            colorMode === 'light'
                              ? 'linear(to-r, var(--base1), var(--base2))'
                              : 'linear(to-r, var(--base2), var(--bluevenom2))'
                          }>
                          {mintedStrings?.includes('Monad ID Spring Burst NFT')
                            ? 'Minted. View on explorer'
                            : 'Mint'}
                        </Button>
                        </Stack>
                      </Flex>
                </Flex>
              ) : (<Center minH={'100px'}><Spinner size={'lg'} /></Center>)}
            </Stack> : <Center gap={4} p={4}><Text>Connect Your Wallet</Text></Center>}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    );
  }
  