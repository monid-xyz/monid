import ConnectWalletButton from './ConnectButton';
import { createThirdwebClient } from "thirdweb";
import { FleekSdk, ApplicationAccessTokenService } from '@fleek-platform/sdk';
import { createPublicClient, http } from "viem";
import { addEnsContracts, createEnsPublicClient } from "@monadid/monjs";
import { arbitrumSepolia } from "viem/chains";

const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_ID,
} as any);

const applicationService = new ApplicationAccessTokenService({
  clientId: process.env.NEXT_PUBLIC_FLEEK_AAT || '',
});

const fleekSdk = new FleekSdk({
  accessTokenService: applicationService
});

const viemClient = createEnsPublicClient({
  chain: addEnsContracts(arbitrumSepolia),
  transport: http(),
});

export { ConnectWalletButton, client, fleekSdk, viemClient }