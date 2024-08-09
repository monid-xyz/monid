import {
  Button,
  Flex,
  useMediaQuery,
  useColorMode,
  Stack,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useColorModeValue,
  Link,
} from '@chakra-ui/react';
import { LinkIcon } from 'components/logos';
import { EARLY_ADOPTERS_CONTRACT_ADDRESS, EARLY_ADOPTER_IMAGES, ETHERSCAN_URLS } from 'core/utils/constants';
import React, { useEffect, useState } from 'react';

export default function InfoModal() {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex gap={4} direction={['column','column']}>
      <Button
        w={'100%'}
        height={'68px'}
        gap={4}
        onClick={onOpen}
        rounded={'full'}
        bgGradient={
          colorMode === 'light'
            ? 'linear(to-r, var(--base1), var(--base2))'
            : 'linear(to-r, var(--base2), var(--bluevenom2))'
        }>
        <LinkIcon type="RiInformationLine" size={'28px'} />
        <Stack>
          <Text>Details</Text>
        </Stack>
      </Button>
      <Button
        w={'100%'}
        as={Link}
        href={ETHERSCAN_URLS['venom']+EARLY_ADOPTERS_CONTRACT_ADDRESS} target='_blank'
        height={'68px'}
        gap={4}
        rounded={'full'}
        bgGradient={
          colorMode === 'light'
            ? 'linear(to-r, var(--base1), var(--base2))'
            : 'linear(to-r, var(--base2), var(--bluevenom2))'
        }>
        <LinkIcon type="venomscan" size={'28px'} />
        <Stack>
          <Text>Collection on VenomScan</Text>
        </Stack>
      </Button>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose} size={['full','full','4xl']}>
        <ModalOverlay bg="blackAlpha.700" backdropFilter="auto" backdropBlur={'6px'} />
        <ModalContent bg={colorMode === 'dark' ? 'var(--dark1)' : 'var(--white)'}>
          <ModalHeader display={'flex'} gap={3}><LinkIcon type="RiInformationLine" size={'28px'} /> Details of the Early Adopters Program</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack gap={2}>

            <Stack my={6} p={4} border={'1px solid #77777777'} rounded={'2xl'} gap={4}>
                <Text fontWeight={'bold'} fontSize={'xl'}>Why Become an Early Adopter?</Text>
                <li ><strong>Earlier Access to Register on Mainnet: </strong><br/>By joining the Monad ID Early Adopter Program, you will gain priority access to register your Monad ID domain on mainnet.</li>
                <li ><strong>Utility on the Platform: </strong><br/>As an early adopter, you will have the privilege of utilizing the cutting-edge features and functionalities of Monad ID.</li>
                <li ><strong>More Benefits to Come: </strong><br/>Exciting surprises and exclusive perks await our esteemed early adopters. We have plans in store!</li>
            </Stack>

            <Text fontWeight={'bold'}>Eligibility Details for each OAT :</Text>

            <Flex
              align={'center'}
              bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
              p={4}
              gap={4}
              rounded={'lg'}>
                <LinkIcon
                  type={EARLY_ADOPTER_IMAGES['explorer'].src}
                  size={["lg","lg",'xl']}
                />
              <Stack gap={0}>
                <Text fontWeight={'bold'}>Crypto Explorer OAT</Text>
                <Text>- Follow us on twitter</Text>
              </Stack>
            </Flex>

            <Flex
              align={'center'}
              bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
              p={4}
              gap={4}
              rounded={'lg'}>
                <LinkIcon
                  type={EARLY_ADOPTER_IMAGES['identorian'].src}
                  size={["lg","lg",'xl']}
                />
              <Stack gap={0}>
                <Text fontWeight={'bold'}>Monad ID Identorian OAT</Text>
                <Text>- You Own at least one Ventory x Monad ID NFT</Text>
              </Stack>
            </Flex>

            <Flex
              align={'center'}
              bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
              p={4}
              gap={4}
              rounded={'lg'}>
                <LinkIcon
                  type={EARLY_ADOPTER_IMAGES['catalyst'].src}
                  size={["lg","lg",'xl']}
                  rounded='full'
                />
              <Stack gap={0}>
                <Text fontWeight={'bold'}>Monad ID Countdown Catalyst NFT</Text>
                <Text>- You Own the Monad ID Countdown Catalyst NFT</Text>
              </Stack>
            </Flex>

            <Flex
              align={'center'}
              bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
              p={4}
              gap={4}
              rounded={'lg'}>
                <LinkIcon
                  type={EARLY_ADOPTER_IMAGES['spring'].src}
                  size={["lg","lg",'xl']}
                  rounded='full'
                />
              <Stack gap={0}>
                <Text fontWeight={'bold'}>Monad ID Spring Burst NFT</Text>
                <Text>- You Own the Monad ID Spring Burst NFT</Text>
              </Stack>
            </Flex>

            <Flex
              align={'center'}
              bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
              p={4}
              gap={4}
              rounded={'lg'}>
                <LinkIcon
                  type={EARLY_ADOPTER_IMAGES['family'].src}
                  size={["lg","lg",'xl']}
                />
              <Stack gap={0}>
                <Text fontWeight={'bold'}>Monad ID Family OAT</Text>
                <Text>- You have Registered at least one Monad ID Domain</Text>
              </Stack>
            </Flex>

            

            <Flex
              align={'center'}
              bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
              p={4}
              gap={4}
              rounded={'lg'}>
                <LinkIcon
                  type={EARLY_ADOPTER_IMAGES['pioneer'].src}
                  size={["lg","lg",'xl']}
                />
              <Stack gap={0}>
                <Text fontWeight={'bold'}>Monad ID Pioneer OAT</Text>
                <Text>- You Are a Zealy Member with atleast 195 xps</Text>
                <Text>- OR You Have Registered at least one Monad ID Domain before 2024 and at least one Monad ID Domain after 2024</Text>
              </Stack>
            </Flex>

            <Flex
              align={'center'}
              bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
              p={4}
              gap={4}
              rounded={'lg'}>
                <LinkIcon
                  type={EARLY_ADOPTER_IMAGES['maverick'].src}
                  size={["lg","lg",'xl']}
                />
              <Stack gap={0}>
                <Text fontWeight={'bold'}>Monad ID Maverick OAT</Text>
                
                <Text>- You Have Registered more than one Monad ID Domain before 2024 (at different dates) and at least one Monad ID Domain after 2024</Text>
                <Text>- OR You Are a Zealy Member with atleast 500 xps</Text>
              </Stack>
            </Flex>

            <Flex
              align={'center'}
              bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
              p={4}
              gap={4}
              rounded={'lg'}>
                <LinkIcon
                  type={EARLY_ADOPTER_IMAGES['earlier'].src}
                  size={["lg","lg",'xl']}
                />
              <Stack gap={0}>
                <Text fontWeight={'bold'}>Monad ID Earlier Adopter OAT</Text>
                <Text> - You Have Migrated Your Monad ID from old contract (before 2024) to the new contract </Text>
              </Stack>
            </Flex>

            <Flex
              align={'center'}
              bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
              p={4}
              gap={4}
              rounded={'lg'}>
                <LinkIcon
                  type={EARLY_ADOPTER_IMAGES['champion'].src}
                  size={["lg","lg",'xl']}
                />
              <Stack gap={0}>
                <Text fontWeight={'bold'}>Monad ID Champion OAT</Text>
                
                <Text>- You Have Registered at least one Monad ID Domain before 2024 (at different dates) and at least one Monad ID Domain after 2024</Text>
                <Text>- AND You Are a Zealy Member with atleast 1500 xps</Text>
              </Stack>
            </Flex>

            <Text fontWeight={'bold'} my={4}>Upcoming OATS</Text>
            <Flex
              align={'center'}
              bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
              p={4}
              gap={4}
              rounded={'lg'}>
                <LinkIcon
                  type={EARLY_ADOPTER_IMAGES['geek'].src}
                  size={["lg","lg",'xl']}
                />
              <Stack gap={0}>
                <Text fontWeight={'bold'}>Monad ID GEEKS OAT (mainnet)</Text>
                
                <Text>- You Have Registered at least one Monad ID Domain on mainnet</Text>
                <Text>- AND You Have Completed your profile for at least one Monad ID Domain on mainnet</Text>
              </Stack>
            </Flex>

            

            

            </Stack>
          </ModalBody>
          <ModalFooter justifyContent={'center'} fontSize={'xs'}></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
