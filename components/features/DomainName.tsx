import {
    Text,
    useColorMode,
    Flex,
    Avatar,
    Stack,
  } from '@chakra-ui/react';
import { LinkIcon } from 'components/logos';
  
  interface Props {
    name: string;
    avatar?: string;
    address?: string;
    size?: 'md' | 'lg' | 'xl' | string[];
  }
  export default function DomainName({ name, avatar , size = 'lg',address = undefined}: Props) {
    const { colorMode } = useColorMode();
    return (
        <Flex gap={3} align={'center'} border='3px solid black' position='relative' boxShadow='1px 1px 0px 0px black, 2px 2px 0px 0px black, 3px 3px 0px 0px black' rounded={'full'} bg={colorMode === 'light' ? 'white' : 'blackAlpha.500'}>
        <Avatar color='white' icon={<LinkIcon type='RiUserLine' size={22} color='#ffffff'/>} rounded={'full'} src={avatar} size={size}/>
        <Stack pr={6} gap={0}>
          <Text
            fontWeight={'semibold'}
            textAlign={'left'}
            cursor={'default'}
            pr={5}
            fontSize={size}
            bgGradient={
              colorMode === 'light'
                ? 'linear(to-r, var(--base2), var(--base00))'
                : 'linear(to-r, var(--base0), var(--base00))'
            }
            bgClip="text">
              {name}
          </Text>
          {address && <Text color={colorMode === 'light' ? '#00000099' : '#ffffff99'}>{address}</Text>}
          </Stack>
      </Flex>
    );
  }
  