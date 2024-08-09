import { Button, Flex, Text, useColorMode, useMediaQuery } from '@chakra-ui/react';
import { Logo } from 'components/logos';
import NextLink from 'next/link';


export default function LogoLink() {
  const lightMode = useColorMode().colorMode === 'light';
  const [small] = useMediaQuery('(min-width: 460px)');
  return (
    <Flex flexGrow={1} width={'100%'}>
    <NextLink href="/" passHref>
      <Button
        id="monidlogo"
        fontWeight="bold"
        variant="ghost"
        p={[1,4]}
        gap={2}
        fontSize={'xl'}
        size={'lg'}
        rounded={'full'}>
        <Logo />
        {small && (
          <Text
            bgGradient={
              lightMode
                ? 'linear(to-r, var(--base2), var(--base00))'
                : 'linear(to-r, var(--base0), var(--base00))'
            }
            bgClip="text">
            Monad ID
          </Text>
        )}
      </Button>
    </NextLink>
    </Flex>
  );
}
