import {
  Button,
  useColorMode,
  Text,
  useDisclosure,
  Flex,
  Link,
  Select,
  useColorModeValue,
  Stack,
  Input,
  useToast,
  Container,
  Box,
  Collapse,
  Heading,
  useMediaQuery,
  Center,
  AvatarGroup,
  Avatar,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import {
  RiCheckboxCircleFill,
  RiQuestionFill,
  RiShakeHandsLine,
  RiUploadCloudLine,
} from 'react-icons/ri';
import { useTranslate } from 'core/lib/hooks/use-translate';
import { useAtomValue } from 'jotai';
import { connectedAccountAtom, primaryNameAtom } from 'core/atoms';
import { useStorageUpload } from '@thirdweb-dev/react';
import { LinkIcon } from 'components/logos';
import { isValidEmail, truncAddress } from 'core/utils';
import { render } from '@react-email/render';
import ContributionsMail from 'components/mail/Contribution';
import sendEmail from 'core/utils/sendEmail';
import ShareButtons from 'components/Profile/ShareButtons';
import { DISCORD_URL, SITE_URL, TELEGRAM_URL, VARIATIONS_VIDS, YLIDE_URL, ZEALY_URL } from 'core/utils/constants';
import WaitlistMail from 'components/mail/Waitlist';
import ImageBox from 'components/claiming/ImageBox';
import EarlyAdopters from 'components/early/EarlyAdopters';
import ContributionSection from 'components/contribution/ContributionSection';
import MintNft from 'components/early/MintNft';
import NextLink from 'next/link';

export default function CommunitySection() {
  const { colorMode } = useColorMode();
  const [role, setRole] = useState('Graphic Designer');
  const toast = useToast();
  const [notMobile] = useMediaQuery('(min-width: 768px)');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const connectedAccount = useAtomValue(connectedAccountAtom);
  const primary = useAtomValue(primaryNameAtom);
  const { t } = useTranslate();

  const openWindow = (url: string, e: any) => {
    window.open(url, 'newwindow', 'width=420,height=800');
    e !== null && e.preventDefault();
  };

  return (
    <>
      <Box>
        <Container
          as="main"
          maxW="container.md"
          display="grid"
          flexDir={'column'}
          justifyContent={'center'}
          alignContent={'center'}
          minH={'84vh'}
          flexGrow={1}>
          <Box py={6} gap={20} width={'100%'}>
            <Flex
              align={'center'}
              justify={'center'}
              gap={12}
              my={20}
              flexDir={['column', 'column', 'column']}>
              <Stack>
                <Heading
                  fontSize={['4xl', '5xl', '6xl']}
                  fontWeight={'bold'}
                  textAlign={['center', 'center', 'center']}>
                  {t('MONID Community')}
                </Heading>
                <Text
                  fontSize={['xl', '2xl', '3xl']}
                  textAlign={['center', 'center', 'center']}>
                  synergize. progress. and earn
                </Text>
              </Stack>
              
            </Flex>

            <Flex flexDirection={'column'} w={'100%'} gap={6} my={12}>
              {/* <MintNft /> */}
                           
              <EarlyAdopters />
              <Button
                w={'100%'}
                h={['220px', '220px', '160px']}
                size={'lg'}
                as={Link}
                style={{ textDecoration: 'none' }}
                href={DISCORD_URL}
                target="_blank"
                gap={6}
                variant={'border'}
                rounded={'xl'}
                colorScheme={colorMode === 'light' ? 'venomAlpha' : 'venom'}
                flexDir={['column', 'column', 'row']}
                justifyContent={['center', 'center', 'start']}>
                <Flex align={'center'} gap={4}>
                  <LinkIcon type="discord" size={notMobile ? '70' : '40'} />
                  <Text display={['block', 'block', 'none']} fontSize={'xl'}>
                    Discord Community
                  </Text>
                </Flex>
                <Flex flexDirection={'column'} align={['center', 'center', 'start']} gap={2}>
                  <Text display={['none', 'none', 'block']} fontSize={'xl'}>
                    Discord Community
                  </Text>
                  <Flex
                    fontWeight={'normal'}
                    flexDirection={['column', 'column', 'row']}
                    gap={2}
                    align={['center', 'center', 'start']}>
                    <Text>Say gMonad to the fam. </Text>
                    <Text>Get Support, Ask Questions</Text>
                  </Flex>
                  <Text fontWeight={'normal'}> Get early access to perks!</Text>
                </Flex>
              </Button>
              {/* <Button
                w={'100%'}
                h={['220px', '220px', '160px']}
                size={'lg'}
                as={Link}
                style={{ textDecoration: 'none' }}
                href={YLIDE_URL}
                target="_blank"
                gap={6}
                flexDir={['column', 'column', 'row']}
                justifyContent={['center', 'center', 'start']}>
                <Flex align={'center'} gap={4}>
                  <LinkIcon type="ylide" size={notMobile ? '70' : '40'} />
                  <Text display={['block', 'block', 'none']} fontSize={'xl'}>
                    Ylide Community
                  </Text>
                </Flex>
                <Flex flexDirection={'column'} align={['center', 'center', 'start']} gap={2}>
                  <Text display={['none', 'none', 'block']} fontSize={'xl'}>
                    Ylide Community
                  </Text>
                  <Flex
                    fontWeight={'normal'}
                    flexDirection={['column', 'column', 'row']}
                    gap={2}
                    align={['center', 'center', 'start']}>
                    <Text>Say Hello To Ylide Community! </Text>
                    <Text>Suggest new Features and Ideas</Text>
                  </Flex>
                  <Text fontWeight={'normal'}> We care about every message!</Text>
                </Flex>
              </Button> */}

              <Button
                w={'100%'}
                h={['220px', '220px', '160px']}
                size={'lg'}
                gap={6}
                as={Link}
                href={TELEGRAM_URL}
                style={{ textDecoration: 'none' }}
                target="_blank"
                variant={'border'}
                rounded={'xl'}
                colorScheme={colorMode === 'light' ? 'telegram' : 'telegram'}
                flexDir={['column', 'column', 'row']}
                justifyContent={['center', 'center', 'start']}>
                <Flex align={'center'} gap={4}>
                  <LinkIcon type="telegram" size={notMobile ? '70' : '40'} />
                  <Text display={['block', 'block', 'none']} fontSize={'xl'}>
                    Telegram Bot
                  </Text>
                </Flex>
                <Flex flexDirection={'column'} align={['center', 'center', 'start']} gap={2} >
                  <Text display={['none', 'none', 'block']} fontSize={'xl'}>
                    Telegram Bot ( Soon )
                  </Text>
                  <Flex
                    fontWeight={'normal'}
                    flexDirection={['column', 'column', 'row']}
                    gap={2}
                    align={['center', 'center', 'start']}>
                    <Text>Explore our simple Quests!</Text>
                    <Text>Stay Active on the community!</Text>
                  </Flex>
                  <Text fontWeight={'normal'}>Earn Rewards As you Go!</Text>
                </Flex>
              </Button>

              {/* <ContributionSection /> */}

            </Flex>
          </Box>
        </Container>
      </Box>
    </>
  );
}
