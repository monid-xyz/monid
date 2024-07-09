import type { AppProps } from 'next/app';
import ThemeProvider from 'components/Provider/ThemeProvider';
import Layout from 'components/Layout';
import { useDirectionSetter } from 'core/lib/hooks/use-directionSetter';
import {
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  embeddedWallet,
  trustWallet,
  zerionWallet,
  rainbowWallet,
} from '@thirdweb-dev/react';
import { Base, BaseSepoliaTestnet } from '@thirdweb-dev/chains';
import { GoogleAnalytics } from '@next/third-parties/google';
//import { SpeedInsights } from "@vercel/speed-insights/next"
import '../styles/globals.css';
import 'intro.js/introjs.css';
import { motion } from 'framer-motion';

function MyApp({ Component, pageProps }: AppProps) {
  useDirectionSetter();

  return (
    <ThemeProvider>
        <ThirdwebProvider
          supportedChains={[Base, BaseSepoliaTestnet]}
          activeChain={'base'}
          supportedWallets={[
            embeddedWallet({
              auth: {
                options: ['email', 'google', 'apple', 'facebook'],
              },
            }),
            metamaskWallet({ recommended: true }),
            trustWallet(),
            rainbowWallet(),
            walletConnect(),
            zerionWallet(),
            coinbaseWallet(),
          ]}
          authConfig={{
            authUrl: '/api/auth',
            domain: process.env.NEXT_PUBLIC_SITE_URL || 'localhost:3000',
          }}
          clientId={process.env.NEXT_PUBLIC_THIRDWEB_ID}>
          <Layout>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}>
              <Component {...pageProps} />
            </motion.div>
            <GoogleAnalytics gaId={String(process.env.NEXT_PUBLIC_GA_ID)} />
          </Layout>
        </ThirdwebProvider>
    </ThemeProvider>
  );
}

export default MyApp;
