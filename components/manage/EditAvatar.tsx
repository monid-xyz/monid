import {
  Button,
  Stack,
  Flex,
  Box,
  useMediaQuery,
  Menu,
  MenuList,
  MenuButton,
  ButtonGroup,
  Heading,
  useColorMode,
  Text,
  Badge,
  useColorModeValue,
} from '@chakra-ui/react';
import { Avatar } from 'components/Profile';
import { avatarAtom, avatarNftAtom, avatarShapeAtom, editingAvatarAtom, editingAvatarFileAtom, jsonAtom, nameAtom, nftJsonAtom } from 'core/atoms';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useState } from 'react';
import AddNFTAvatar from './AddNFTAvatar';

interface Props {
    onClick?: () => void;
    saveButton?: boolean;
}

export default function EditAvatar({ onClick, saveButton = false } : Props) {
  const [avatarUploading, setAvatarUploading] = useState(false);
  const { colorMode } = useColorMode();
  const name = useAtomValue(nameAtom);
  const avatarShape = useAtomValue(avatarShapeAtom);
  const [avatar, setAvatar] = useAtom(avatarAtom);
  const setEditingAvatar = useSetAtom(editingAvatarAtom);
  const setEditingAvatarFile = useSetAtom(editingAvatarFileAtom);
  const [notMobile] = useMediaQuery('(min-width: 992px)');


  function buildFileSelector() {
    if (process.browser) {
      const fileSelector = document.createElement('input');
      fileSelector.type = 'file';
      fileSelector.multiple = false;
      fileSelector.onchange = async (e: any) => {
        setEditingAvatar(URL.createObjectURL(e.target.files[0]))
        setEditingAvatarFile(e.target.files[0])
        //sendproFileToIPFS(e.target.files[0]);
      };
      fileSelector.accept = 'image/x-png,image/gif,image/jpeg';
      return fileSelector;
    }
  }

  const imageFileSelect = buildFileSelector();

  return (
    <Flex gap={[3,4,6]} px={[6]} alignItems={['center']} className='avatar' rounded={'lg'} justify={'center'} w={'100%'} minH={'140px'}>
      <Box w={['92px','104px']} key={avatar}>
        <Avatar maxH={'104'} url={avatar} shape={avatarShape} nodrag noanimate />
      </Box>
      <Stack gap={3}>
            <AddNFTAvatar defaultType="avatar" />
            <Button
              isLoading={avatarUploading}
              rounded={'xl'}
              variant={'border'}
              colorScheme={colorMode === 'light' ? 'dark' : 'light'}
              onClick={() => imageFileSelect !== undefined && imageFileSelect.click()}>
              Upload
            </Button>
      </Stack>
      {saveButton && <Button onClick={onClick} bgGradient={useColorModeValue(
            'linear(to-r, var(--base1), var(--base2))',
            'linear(to-r, var(--base2), var(--bluevenom2))'
          )}
          
          _hover={{
            bgGradient: useColorModeValue(
              'linear(to-r, var(--base0), var(--bluevenom0))',
              'linear(to-r, var(--base0), var(--bluevenom0))'
            ),
          }}
          color={'white'} isDisabled={avatar === ''} display={['flex','flex']} variant={'outline'} flexDirection={'column'} gap={2} height={'88px'}><Text>Save</Text><Text>Avatar</Text></Button>}
    </Flex>
  );
}
