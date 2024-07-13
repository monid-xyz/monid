import ConnectWalletButton from './ConnectButton';
import { createThirdwebClient } from "thirdweb";

const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_ID,
} as any);

export { ConnectWalletButton, client }