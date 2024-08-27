import { BgColorItem, LinkType, BgImageItem } from 'types';
import { WINNERS_PUNKS_AVATAR_CHALLENGE, WINNERS_STAX_AVATAR_CHALLENGE } from './challenges';
import { capFirstLetter } from '.';

export const MINT_OPEN = true;
export const MINT_TOTAL_SUPPLY: number = 10000;
export const TLD = 'mon';
export const DOMAIN_REGISTER_FEE = 0.00001;
export const MINT_DATE = 'Feb 03, 2024 18:00 UTC';
export const MINT_MESSAGE = 'Final Phase of venom testnet minting will start on';
export const SITE_URL = 'https://monid.xyz/';
export const SITE_LOGO_URL = "https://monid.xyz/monidxyz.svg";
export const SITE_OGS_URL = 'https://monid.xyz/ogs/';
export const SITE_URL_SHORT = 'monid.xyz';
export const VID_IMAGE_API = 'https://img.monid.xyz/api/';
export const SITE_TITLE = 'Monad ID';
export const SITE_DESCRIPTION =
  'Monad Naming Service And Decentralized Link in bio Tool on Monad Blockchain';
export const SITE_FULL_DESCRIPTION =
  'Monad ID empowers you to build a personalized, decentralized page that showcases your links, content, and digital presence. Leveraging the power of the Monad Blockchain and .mon domains, monid offers a self-sovereign alternative to centralized link management tools.';
export const NFT_IMAGE_URL = 'https://ipfs.io/ipfs/QmUvfedgHDXdiMsq5nfLPGLQrR4QAYXHzR5SETBZQ6RGyd';
export const SITE_MANAGE_URL = 'https://monid.xyz/manage/';
export const METADATA_URL = 'https://metadata.monid.xyz/';
export const SITE_PROFILE_URL = 'https://monid.xyz/';
export const ZEALY_URL = 'https://zealy.io/c/monid_xyz/';
export const AVATAR_API_URL = 'https://metadata.monid.xyz/arbitrumSepolia/avatar/';
export const AVATAR_PREVIEW_URL = 'https://metadata.monid.xyz/preview/';
export const VENOMSCAN_NFT = 'https://venomscan.com/accounts/';
export const VENOMSCAN_TX = 'https://venomscan.com/transactions/';
export const VENTORY_NFT = 'https://ventory.gg/nft/';
export const VENOMART_NFT = 'https://venomart.io/nft/';
export const VENOMART_COLLECTION = 'https://venomart.io/collection/';
export const OASIS_COLLECTION = 'https://oasis.gallery/collection/';
export const OASIS_NFT = 'https://oasis.gallery/nft/';
export const BTCSCAN_ADDRESS = 'https://blockchair.com/bitcoin/';
export const ETHERSCAN_ADDRESS = 'https://sepolia.arbiscan.io/tx/';
export const CONTRACT_ADDRESS =
  '0:5ecadfe4afcf90452bc448b5dabffeca63939bfce866f248d9493f57e748aff3';
export const CONTRACT_ADDRESS_V1 =
  '0:0f158efd58c06ff2f84726425de63d3deb4037d2c621ccd552cec61d6b6ee5bd';
export const CONTRACT_ADDRESS_V2 =
  '0:2787ba200fd3e45c1a4854768f69310fe4e9566383761f27936aff61ad79c8ab';

export const ROOT_CONTRACT_ADDRESS =
  '0:2b353a0c36c4c86a48b0392c69017a109c8941066ed1747708fc63b1ac79e408';
export const TESTNET_ROOT_CONTRACT_ADDRESS =
  '0:72034dfba65f6d63b362e51add677c0549ff4e5a4e18c943acb54f953bb53660';
export const OLD_TESTNET_ROOT_CONTRACT_ADDRESS =
  '0:5475e9e7b9d178f4c35cd1136e83a100ca95e28b38c5c52d0689771372ba43ec';
export const MAX_NAME_LENGTH = 63;
export const MIN_NAME_LENGTH = 2;
export const MIN_FEE = 660000000;
export const EARLY_ADOPTERS_CONTRACT_ADDRESS =
  '0:9e0ea0f0fe6229aee6580a96fd9c62aabf6f2430830877c5b1ad700680ac0486';
export const RAFFLE_CONTRACT_ADDRESS =
  '0:2172fdf5a4091b90aeacc2003a61a82f27d743aa7b5426711d9fa48036b8f59e';
export const WRAPPED_VENOM_ADDRESS =
  '0:2c3a2ff6443af741ce653ae4ef2c85c2d52a9df84944bbe14d702c3131da3f14';
export const TOKEN_WALLET_ADDRESS =
  '0:2b5bbfe1d86e4df852a2ff33512495c7038c585f5c6c8c0a84f7af8997e2ff05';
export enum CertificateStatus {
  RESERVED,
  NEW,
  IN_ZERO_AUCTION,
  COMMON,
  EXPIRING,
  GRACE,
  EXPIRED,
}

export const DISPLAY_RECORD_ID = 10;
export const AVATAR_RECORD_ID = 11;
export const HEADER_RECORD_ID = 12;
export const LOCATION_RECORD_ID = 13;
export const URL_RECORD_ID = 14;
export const DESCRIPTION_RECORD_ID = 15;
export const NOTICE_RECORD_ID = 15;
export const COLOR_RECORD_ID = 16;
export const BG_RECORD_ID = 17;
export const TEXTCOLOR_RECORD_ID = 18;
export const STYLES_RECORD_ID = 19;

export const TWITTER_RECORD_ID = 20;

export const LINKS_RECORD_ID = 30;
export const IPFS_RECORD_ID = 33;

export const CertificateStatusNames = [
  'RESERVED',
  'NEW',
  'IN AUCTION',
  'COMMON',
  'EXPIRING',
  'GRACE',
  'EXPIRED',
  'AVAILABLE',
];

export const VENTORY_NFT_V1_ADDRESS =
  '0:7df675a3c099ed318d36c54e62282b1185f78fb05c21d19292699d6e200b0bb6';
export const VENTORY_NFT_V2_ADDRESS =
  '0:b248dc8f494e6e8f4ff355e9032cdfaf0108889b19b06e3f11861faa0780a06c';

export const ZERO_ADDRESS = '0:0000000000000000000000000000000000000000000000000000000000000000';

export const TWITTER_CALLBACK_URL = 'https://monid.xyz/api/twitter/callback';
//export const TWITTER_CALLBACK_URL = 'http://localhost:3000/api/twitter/callback';
export const TWITTER_ME = 'https://api.twitter.com/2/users/me';
export const TWITTER_SCOPES = ['tweet.read', 'users.read', 'offline.access'];
export const TWITTER_FOLLOW_URL = 'https://twitter.com/intent/user?screen_name=monid_xyz';
export const TWITTER_RETWEET_URL =
  '';
export const ZEALY_USERS_API = '';
export const IPFS_IO_URL = 'https://ipfs.io/ipfs/';

export const SOCIAL_TWITTER = 'monid_xyz';
export const TWITTER_URL = 'https://twitter.com/';
export const DISCORD_URL = 'https://discord.gg/eRD8PBVFaB';
export const GITHUB_URL = 'https://github.com/monid-xyz';
export const TELEGRAM_URL = 'https://t.me/monid_xyz';
export const DOCS_URL = 'https://docs.monid.xyz/developer-docs/overview';
export const ROADMAP_URL = 'https://docs.monid.xyz/overview/roadmap';
export const GUIDES_URL = 'https://docs.monid.xyz/guides/overview';
export const GRINDING_URL = '';
export const MEDIUM_URL = 'https://medium.com/@monid_xyz';
export const YLIDE_URL = '';
export const YOUTUBE_URL = 'https://www.youtube.com/@monid_xyz';
export const OPENSEA_URL = 'https://testnets.opensea.io/assets/arbitrum-sepolia/0x955357e06046c91186cf4571f4dd729157bfbcfb/';
export const FAUCET_URL = 'https://www.alchemy.com/faucets/arbitrum-sepolia';

export const MARKETPLACE_URLS_COLLECTION: any = {
  venomtestnet: 'https://testnet.ventory.gg/collection/',
  venom: 'https://testnet.ventory.gg/collection/',
  ethereum: 'https://opensea.io/assets/ethereum/',
  polygon: 'https://opensea.io/assets/matic/',
  arbitrum: 'https://opensea.io/assets/arbitrum/',
  optimism: 'https://opensea.io/assets/optimism/',
};

export const MARKETPLACE_URLS: any = {
  venomtestnet: 'https://testnet.ventory.gg/nft/',
  venom: 'https://testnet.ventory.gg/nft/',
  ethereum: 'https://opensea.io/assets/ethereum/',
  polygon: 'https://opensea.io/assets/matic/',
  arbitrum: 'https://opensea.io/assets/arbitrum/',
  optimism: 'https://opensea.io/assets/optimism/',
};

export const ETHERSCAN_URLS: any = {
  btc: 'https://blockchair.com/bitcoin/address/',
  trx: 'https://tronscan.org/#/address/',
  avax: 'https://snowtrace.io/address/',
  eth: 'https://etherscan.io/address/',
  matic: 'https://polygonscan.com/address/',
  bnb: 'https://bscscan.com/address/',
  sol: 'https://solscan.io/account/',
  arb1: 'https://arbiscan.io/address/',
  op: 'https://optimistic.etherscan.io/address/',
};

export const IPFS_IMAGE_URI = 'ipfs';
export const IMAGE_URI = 'http';

export const IPFS_URLS = [
  `https://${process.env.NEXT_PUBLIC_THIRDWEB_ID}.ipfscdn.io/ipfs/`,
  'https://cf-ipfs.com/ipfs/',
  'https://ipfs.io/ipfs/',
  'https://gateway.ipfs.io/',
  'https://gateway.pinata.cloud/ipfs/',
  'https://10.via0.com/ipfs/',
  'https://ipfs.cf-ipfs.com/',
];

export const SIGN_MESSAGE =
  'Welcome to Monad ID. By signing this message, you agree with our terms and conditions. timestamp=';

export const MAX_FILE_UPLOAD = 15728640;

export const DONATE_VALUES: any = {
  ethereum: ['0.001', '0.01', '0.1'],
  bitcoin: ['0.0001 BTC', '0.001 BTC', '0.005 BTC'],
  paypal: ['1 USD', '10 USD', '50 USD'],
};

// export const LINK_VALIDATION_REGEX =
//   '^(https?:\\/\\/)?' + // protocol
//   '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
//   '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
//   '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
//   '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
//   '(\\#[-a-z\\d_]*)?$';

export const LINK_VALIDATION_REGEX =
  '^(https?:\\/\\/)?' + // protocol
  '([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)' + // subdomain and domain name
  '(\\.[a-zA-Z]{2,})+' + // top-level domain
  '(\\:\\d+)?' + // port
  '(\\/[\\-a-zA-Z\\d%_.~+:]*)*' + // path (updated to include colon)
  '(\\?[;&a-zA-Z\\d%_.~+=-]*)?' + // query string
  '(\\#[-a-zA-Z\\d_]*)?$'; // fragment identifier

export const YOUTUBE_LINK_VALIDATION_REGEX =
  /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;

export const SOUNDCLOUD_LINK_REGEX =
  /https?:\/\/(?:w\.|www\.|)(?:soundcloud\.com\/)(?:(?:player\/\?url=https\%3A\/\/api.soundcloud.com\/tracks\/)|)(((\w|-)[^A-z]{7})|([A-Za-z0-9]+(?:[-_][A-Za-z0-9]+)*(?!\/sets(?:\/|$))(?:\/[A-Za-z0-9]+(?:[-_][A-Za-z0-9]+)*){1,2}))/;

export const TWITTER_STATUS_REGEX =
  /^https?:\/\/(?:www\.)?(?:twitter\.com|x\.com)\/(?:#!\/)?(\w+)\/status(?:es)?\/(\d+)$/;

export const EXAMPLE_SOCIAL_URLS: any = {
  twitter: 'https://twitter.com/exampleuser',
  linkedin: 'https://www.linkedin.com/in/exampleuser/',
  github: 'https://github.com/exampleuser',
  medium: 'https://medium.com/@exampleuser',
  youtube: 'https://www.youtube.com/@exampleuser',
  instagram: 'https://www.instagram.com/exampleuser',
  tiktok: 'https://www.tiktok.com/@exampleuser',
  twitch: 'https://www.twitch.tv/exampleuser',
  snapchat: 'https://www.snapchat.com/add/exampleuser',
  facebook: 'https://www.facebook.com/exampleuser',
  dribbble: 'https://dribbble.com/exampleuser',
  pinterest: 'https://www.pinterest.com/exampleuser',
  soundcloud: 'https://soundcloud.com/exampleuser',
  spotify: 'https://open.spotify.com/user/exampleuser',
  patreon: 'https://www.patreon.com/exampleuser',
  substack: 'https://exampleuser.substack.com',
  galxe: 'https://galxe.com/exampleuser',
  opensea: 'https://opensea.io/exampleuser',
  zealy: 'https://zealy.io/c/exampleuser',
  ylide: 'https://hub.ylide.io/project/exampleuser',
  amazon: 'https://www.amazon.com/gp/profile/exampleuser',
  playstore: 'https://play.google.com/store/apps/developer?id=Example+User',
  appstore: 'https://apps.apple.com/us/developer/example-user/id123456789',
  applemusic: 'https://music.apple.com/profile/exampleuser',
  clubhouse: 'https://www.joinclubhouse.com/@exampleuser',
  etsy: 'https://www.etsy.com/shop/exampleuser',
  discord: 'https://discord.gg/exampleuser',
  skype: 'exampleuser',
  slack: 'https://exampleuser.slack.com',
  telegram: 'https://t.me/exampleuser',
  whatsapp: '44234567890',
  phone: '44234567890',
  email: 'example@example.com',
};

export const EXAMPLE_LINK_URLS: any = {
  nftlink: 'https://yourlink.com',
  simplelink: 'https://yourlink.com',
  imagelink: 'https://yourlink.com',
  youtubevideo: 'https://www.youtube.com/watch?v=6Bq132cv_G0',
  soundcloudtrack: 'https://soundcloud.com/symbolico/im-free',
  tweet: 'https://x.com/SamyWalters/status/1720165257019073014',
};

export const EXAMPLE_WALLETS: any = {
  monad: '0xBFd210db795A9Ac48D0C3be2a74232BE44144E84',
  ethereum: '0xBFd210db795A9Ac48D0C3be2a74232BE44144E84',
  bitcoin: 'bc1qpvsvcfzvz59h02hcuvc8y8jj385r2mlhnkt654',
  polygon: '0xBFd210db795A9Ac48D0C3be2a74232BE44144E84',
  arbitrum: '0xBFd210db795A9Ac48D0C3be2a74232BE44144E84',
  binance: '0xBFd210db795A9Ac48D0C3be2a74232BE44144E84',
  avalanche: '0xBFd210db795A9Ac48D0C3be2a74232BE44144E84',
  optimism: '0xBFd210db795A9Ac48D0C3be2a74232BE44144E84',
  solana: 'BfiZDeHXzuz8pz5EGM6eUv1B1hLsGJQPRoxqYsBRKW3i',
  tron: 'TR22H7PLMm1BUaGfhmfnPY7VLEhG2U6y3t',
};

export const TARGET_VENOM_RECORD_ID = 0;
export const TARGET_ETH_RECORD_ID = 1;
export const TARGET_BTC_RECORD_ID = 2;
export const TARGET_MATIC_RECORD_ID = 3;
export const TARGET_ARB_RECORD_ID = 4;
export const TARGET_BNB_RECORD_ID = 5;
export const TARGET_AVAX_RECORD_ID = 6;
export const TARGET_OP_RECORD_ID = 7;
export const TARGET_SOL_RECORD_ID = 8;
export const TARGET_TRX_RECORD_ID = 9;

export const SOCIALS = [
  { key: 'Twitter', value: 'com.twitter' },
  { key: 'Linkedin', value: 'com.linkedin' },
  { key: 'Github', value: 'com.github' },
  { key: 'Medium', value: 'com.medium' },
  { key: 'Youtube', value: 'com.google.youtube' },
  { key: 'Instagram', value: 'com.instagram' },
  { key: 'TikTok', value: 'com.tiktok' },
  { key: 'Twitch', value: 'tv.twitch' },
  { key: 'Snapchat', value: 'com.snapchat' },
  { key: 'Facebook', value: 'com.facebook' },
  { key: 'Dribbble', value: 'com.dribbble' },
  { key: 'Pinterest', value: 'com.pinterest' },
  { key: 'Soundcloud', value: 'com.soundcloud' },
  { key: 'Spotify', value: 'com.spotify' },
  { key: 'Patreon', value: 'com.patreon' },
  { key: 'Substack', value: 'com.substack' },
  { key: 'Galxe', value: 'com.galxe' },
  { key: 'Opensea', value: 'com.opensea' },
  { key: 'Zealy', value: 'com.zealy' },
  { key: 'Ylide', value: 'com.ylide' },
  { key: 'Amazon', value: 'com.amazon' },
  { key: 'Play Store', value: 'com.google.play' },
  { key: 'App Store', value: 'com.apple.appstore' },
  { key: 'Apple Music', value: 'com.apple.music' },
  { key: 'Clubhouse', value: 'com.clubhouse' },
  { key: 'Etsy', value: 'com.etsy' },
  { key: 'Discord', value: 'com.discord' },
  { key: 'Skype', value: 'com.skype' },
  { key: 'Slack', value: 'com.slack' },
  { key: 'Reddit', value: 'org.reddit' },
  { key: 'Telegram', value: 'org.telegram' },
  { key: 'Whatsapp', value: 'com.whatsapp' },
  { key: 'Phone', value: 'phone' },
  { key: 'Email', value: 'email' },
];

export function getSocialUrlScheme(platform: string): string {
  const socialItem = SOCIALS.find((item) => item.key.toLowerCase() === platform.toLowerCase());
  return socialItem ? socialItem.value : `com.${platform.toLowerCase()}`;
}

export function getSocialTitle(value: string): string | undefined {
  const socialItem = SOCIALS.find((item) => item.value.toLowerCase() === value.toLowerCase());
  return socialItem ? socialItem.key : undefined;
}

// export function getWalletName(platform: string): string | undefined {
//   const socialItem = SOCIALS.find((item) => item.key.toLowerCase() === platform.toLowerCase());
//   return socialItem?.value;
// }

export const WALLETS = [
  'Monad',
  'Ethereum',
  'Bitcoin',
  'Polygon',
  'Arbitrum',
  'Binance',
  'Avalanche',
  'Optimism',
  'Solana',
  'Tron',
];

export const BG_COLORS: BgColorItem[] = [
  { color: 'var(--darkGradient)', lightMode: false },
  { color: 'var(--dark)', lightMode: false },
  { color: 'var(--darkGradient0)', lightMode: false },
  { color: 'var(--lightGradient)', lightMode: true },
  { color: 'var(--grayGradient)', lightMode: true },
  { color: 'var(--lightGreyGradient)', lightMode: true },
  { color: 'var(--baseGradient)', lightMode: false },
  { color: 'var(--purpleGradient)', lightMode: false },
  { color: 'var(--redGradient)', lightMode: false },
  { color: 'var(--blueGradient)', lightMode: true },
  { color: 'var(--orangeGradient)', lightMode: true },
  { color: 'var(--yellowGradient)', lightMode: true },
];

export const BG_IMAGES: BgImageItem[] = [
  { bg: 'var(--bg1Gradient)', lightMode: false },
  { bg: 'var(--bg3Gradient)', lightMode: false },
  { bg: 'var(--bg2Gradient)', lightMode: true },
  { bg: 'var(--bg4Gradient)', lightMode: false },
  { bg: 'var(--bg5Gradient)', lightMode: false },
  { bg: 'var(--bg6Gradient)', lightMode: false },
  { bg: 'var(--bg7Gradient)', lightMode: false },
  { bg: 'var(--bg8Gradient)', lightMode: false },
  { bg: 'var(--bg9Gradient)', lightMode: false },
  // {
  //   bg: 'url(https://ipfs.io/ipfs/QmedReDFjSXa9fuNppt2ubDftwL4sfttwENUySHrNEdhKL/stax4.webp)',
  //   lightMode: false,
  // },
];

export const AVAILABLE_LINKS: LinkType[] = [
  { type: 'heading', av: true, reg: '' },
  { type: 'text paragraph', av: true, reg: '' },
  { type: 'nft link', av: true, reg: '' },
  //{ type: 'wallet button', av: true, reg: '' },
  { type: 'simple link', av: true, reg: LINK_VALIDATION_REGEX },
  { type: 'image link', av: true, reg: LINK_VALIDATION_REGEX },
  { type: 'tweet', av: true, reg: TWITTER_STATUS_REGEX },
  { type: 'ipfs image', av: true, reg: '' },
  { type: 'youtube video', av: true, reg: YOUTUBE_LINK_VALIDATION_REGEX },
  { type: 'soundcloud track', av: true, reg: SOUNDCLOUD_LINK_REGEX },
  { type: 'pdf document', av: true, reg: LINK_VALIDATION_REGEX },
  { type: 'donate button', av: true, reg: '' },
  { type: 'payment button', av: true, reg: '' },
  { type: 'nft gallery', av: false, reg: '' },
  { type: 'nft collection', av: false, reg: '' },
  { type: 'token link', av: false, reg: '' },
  { type: 'typeform', av: false, reg: '' },
  { type: 'contact form', av: false, reg: '' },
  { type: 'contact info', av: false, reg: '' },
];

export function isLink(value: string): boolean {
  const _isLink = AVAILABLE_LINKS.filter((item) => value.toLowerCase().includes(item.type.toLowerCase().replace(' ','.')));
  return _isLink.length > 0;
}

export const BUTTON_BG_COLORS = [
  'dark',
  'light',
  'gray',
  'red',
  'orange',
  'yellow',
  'green',
  'teal',
  'blue',
  'cyan',
  'purple',
  'pink',
];
export const BUTTON_ROUNDS = ['none', 'md', 'full'];
export const BUTTON_VARIANTS = ['solid', 'outline', 'pop', 'border', 'border2', 'fill'];
export const FONTS = ['Montserrat','DM Sans','Poppins', 'Lato', 'Pixelify Sans', 'Space Mono', 'Playfair Display', 'Amatic SC'];

export const VARIATIONS = [
  {
    avatar:
      'https://ipfs.io/ipfs/QmNpdhihDxWCykpci1EJPA4VJTo7TTKH4NnZJStbN1MVqC/pun.mon.svg',
    avatarShape: 'hex',
    bg: BG_IMAGES[7].bg,
    lightMode: BG_IMAGES[7].lightMode,
    buttonBg: BUTTON_BG_COLORS[1],
    variant: BUTTON_VARIANTS[2],
    round: BUTTON_ROUNDS[1],
    font: FONTS[0],
    title: 'Jonathan',
    WalletButtons: true,
    subtitle: 'Investigator',
    vid: 'jonathan.mon',
  },
  {
    avatar: 'https://ipfs.io/ipfs/QmNpdhihDxWCykpci1EJPA4VJTo7TTKH4NnZJStbN1MVqC/sam.mon.svg',
    avatarShape: 'circle',
    bg: BG_IMAGES[1].bg,
    lightMode: BG_IMAGES[3].lightMode,
    buttonBg: BUTTON_BG_COLORS[1],
    variant: BUTTON_VARIANTS[1],
    round: BUTTON_ROUNDS[2],
    font: FONTS[3],
    WalletButtons: true,
    title: 'Crypto Explorer',
    vid: 'samoel.mon',
  },
  {
    avatar:
      'https://ipfs.io/ipfs/QmNpdhihDxWCykpci1EJPA4VJTo7TTKH4NnZJStbN1MVqC/anony.mon.svg',
    avatarShape: 'circle',
    bg: BG_IMAGES[6].bg,
    lightMode: BG_IMAGES[8].lightMode,
    buttonBg: BUTTON_BG_COLORS[1],
    variant: BUTTON_VARIANTS[5],
    round: BUTTON_ROUNDS[2],
    font: FONTS[0],
    title: 'Joe',
    WalletButtons: true,
    subtitle: 'Community Mod',
    vid: 'mod.mon',
  },
  {
    avatar:
      'https://ipfs.io/ipfs/QmNpdhihDxWCykpci1EJPA4VJTo7TTKH4NnZJStbN1MVqC/anon.mon.svg',
    avatarShape: 'hex',
    bg: BG_IMAGES[5].bg,
    lightMode: BG_IMAGES[5].lightMode,
    buttonBg: BUTTON_BG_COLORS[1],
    variant: BUTTON_VARIANTS[2],
    round: BUTTON_ROUNDS[1],
    font: FONTS[2],
    title: '0xLuc',
    subtitle: 'Crypto Enthusiast',
    WalletButtons: true,
    socialButtons: false,
    vid: '0xluc.mon',
  },
  {
    avatar:
      'https://ipfs.io/ipfs/QmNpdhihDxWCykpci1EJPA4VJTo7TTKH4NnZJStbN1MVqC/rain.mon.svg',
    avatarShape: 'round',
    bg: BG_COLORS[7].color,
    lightMode: BG_COLORS[7].lightMode,
    buttonBg: BUTTON_BG_COLORS[1],
    variant: BUTTON_VARIANTS[3],
    round: BUTTON_ROUNDS[0],
    font: FONTS[2],
    title: 'Sam',
    subtitle: 'Blockchain Dev',
    vid: 'sam.mon',
    WalletButtons: true,
  },
  {
    avatar:
      'https://ipfs.io/ipfs/QmNpdhihDxWCykpci1EJPA4VJTo7TTKH4NnZJStbN1MVqC/col.mon.svg',
    avatarShape: 'round',
    bg: BG_IMAGES[4].bg,
    lightMode: BG_IMAGES[4].lightMode,
    buttonBg: BUTTON_BG_COLORS[1],
    variant: BUTTON_VARIANTS[0],
    round: BUTTON_ROUNDS[1],
    font: FONTS[0],
    title: 'Alice',
    subtitle: 'Domains on Monad',
    WalletButtons: true,
    vid: 'alice.mon',
  },
];

export const VARIATIONS_VIDS = [
  {
    avatar: 'https://ipfs.io/ipfs/QmNpdhihDxWCykpci1EJPA4VJTo7TTKH4NnZJStbN1MVqC/anon.mon.svg',
    vid: 'boo.mon',
    address: '0xD2D....001CE',
  },
  {
    avatar: 'https://ipfs.io/ipfs/QmNpdhihDxWCykpci1EJPA4VJTo7TTKH4NnZJStbN1MVqC/luc.mon.svg',
    address: '0xD2D....01ED2',
    vid: 'luc.mon',
  },
  {
    avatar: 'https://ipfs.io/ipfs/QmNpdhihDxWCykpci1EJPA4VJTo7TTKH4NnZJStbN1MVqC/john.mon.svg',
    address: '0xD2D....01ECE',
    vid: 'john.mon',
  },
  {
    avatar: 'https://ipfs.io/ipfs/QmNpdhihDxWCykpci1EJPA4VJTo7TTKH4NnZJStbN1MVqC/anony.mon.svg',
    address: '0xD2D....00101C',
    vid: 'alice.mon',
  },
  {
    avatar: 'https://ipfs.io/ipfs/QmNpdhihDxWCykpci1EJPA4VJTo7TTKH4NnZJStbN1MVqC/dark.mon.svg',
    address: '0xD2D....001CE',
    vid: 'alex.mon',
  },
  {
    avatar: 'https://ipfs.io/ipfs/QmNpdhihDxWCykpci1EJPA4VJTo7TTKH4NnZJStbN1MVqC/col.mon.svg',
    address: '0xD2D....00112',
    vid: 'sara.mon',
  },
  {
    avatar: 'https://ipfs.io/ipfs/QmNpdhihDxWCykpci1EJPA4VJTo7TTKH4NnZJStbN1MVqC/pun.mon.svg',
    address: '0xD2D....D212E',
    vid: 'mary.mon',
  },
  {
    avatar: 'https://ipfs.io/ipfs/QmNpdhihDxWCykpci1EJPA4VJTo7TTKH4NnZJStbN1MVqC/joe.mon.svg',
    address: '0xD2D....D2D12',
    vid: 'joe.mon',
  },
  {
    avatar: 'https://ipfs.io/ipfs/QmNpdhihDxWCykpci1EJPA4VJTo7TTKH4NnZJStbN1MVqC/dark.mon.svg',
    address: '0xD2D....001CE',
    vid: 'dark.mon',
  },
  {
    avatar: 'https://ipfs.io/ipfs/QmNpdhihDxWCykpci1EJPA4VJTo7TTKH4NnZJStbN1MVqC/sam.mon.svg',
    address: '0xD2D....D21CE',
    vid: 'sam.mon',
  },
  {
    avatar: 'https://ipfs.io/ipfs/QmTQqf3ge2SvpgeBAucDtfxExE3zMci6hfMrqZmLJXVCm6/ben.mon.svg',
    address: '0xD2D....D2EF3',
    vid: 'ben.mon',
  },
];

export const LINK_VARIATIONS = [
  [
    {
      type: 'tweet',
      title: 'tweet',
      styles: {
        size: 'sm',
      },
      url: 'https://x.com/monad_xyz/status/1819352362198118522',
    },
  ],
  [
    {
        type: 'donate button',
        title: 'buy me a coffee',
        styles: {
          size: 'sm',
          eth: '0xBFd210db795A9Ac48D0C3be2a74232BE44144E84'
        },
        url: 'https://soundcloud.com/sam-walters-715497925/sets/trippy',
      },
  ],
  [
    {
      type: 'simple link',
      title: 'Youtube Channel',
      url: 'https://www.youtube.com/@monid_xyz',
      styles: {
        icon: 'RiYoutubeFill',
        size: 'md',
      },
    },
  ],
  [
    {
      type: 'simple link',
      title: 'Telegram Bot',
      url: 'https://t.me/@monid_xyz_bot',
      styles: {
        icon: 'RiTelegramFill',
        size: 'md',
      },
    },
  ],
  [
    {
      type: 'pdf document',
      title: 'My Old CV',
      url: '',
      image: 'https://ipfs.io/ipfs/QmUeSvTQtZiBoa344JvfA8ekeKFH8pRMk8sY3tBjDEG3d9/CV.pdf',
      content: '',
      styles: {
        size: 'sm',
      },
    },
    {
      type: 'nft link',
      title: 'Bear Market Builder NFT',
      url: 'https://opensea.io/assets/polygon/0x3C29F6B19bcbeB85d26460bB2f7Bd4cd065cE28E/0',
      image: 'https://nft-cdn.alchemy.com/matic-mainnet/2e664665ea294c94798de67894c608ac',
      content:
        '{"address":"0x3C29F6B19bcbeB85d26460bB2f7Bd4cd065cE28E/0","metadata":{"image":"ipfs://QmTNi5umYXWV2THy65WDUMszTdHvuQRsZ9RuUmR7GEJyFx/bear-market-builder.png","external_url":"","animation_url":"ipfs://QmTNi5umYXWV2THy65WDUMszTdHvuQRsZ9RuUmR7GEJyFx/bear-market-builder.mp4","background_color":"","name":"Bear Market Builder NFT","description":"","attributes":[{"value":"common","trait_type":"rarity"}],"supply":"98477"}}',
      styles: {
        size: 'sm',
        scanLink: false,
        network: 'polygon',
        type: 'complex',
      },
    },
  ],
  [
    {
      type: 'soundcloud track',
      title: 'music',
      styles: {
        size: 'sm',
      },
      url: 'https://soundcloud.com/sam-walters-715497925/sets/trippy',
    },
  ],
];

export const SOCIALS_VARIATIONS = [
  {
    'com.discord': '#',
    'email': '#',
    'com.twitter': '#',
    'org.telegram': '#',
    'com.whatsapp': '#',
  },
  {
    'com.twitter': 'https://twitter.com/monid_xyz',
    'com.ylide': '',
    'com.medium': 'https://medium.com/@monid_xyz',
    'com.zealy': 'https://zealy.io/c/#',
    'org.telegram': 'https://t.me/monid_xyz',
  },
  {
    'com.soundcloud': '#',
    'com.opensea': '#',
    'com.patreon': '#',
    'com.twitter': '#',
    'com.spotify': '#',
  },
  {
    'org.telegram': 'https://t.me/monid_xyz',
    'com.zealy': 'https://zealy.io/c/#',
    'com.github': 'https://github.com/sam-shariat/monid_xyz',
    'com.google.youtube': '#',
  },
  {
    'com.facebook': '#',
    'tv.twitch': '#',
    'com.snapchat': '#',
    'com.tiktok': '#',
  },
  {
    'com.pinterest': '#',
    'com.slack': '#',
    'com.skype': '#',
    'com.dribbble': '#',
    'com.twitter': '#',
  },
];

export const WALLETS_VARIATIONS = [
  {
    btc: 'tb1qshvfpzfa0p46gztp00jwccf0c4kdfac72lmuz7',
  },
  {
    eth: '0xBFd210db795A9Ac48D0C3be2a74232BE44144E84',
  },
  {
    sol: 'BfiZDeHXzuz8pz5EGM6eUv1B1hLsGJQPRoxqYsBRKW3i',
  },
  {
    arb1: '0x424c939664F9e007aaF30180fD2f1824a44334D7',
  },
  {
    trx: 'TR22H7PLMm1BUaGfhmfnPY7VLEhG2U6y3t',
  },
  {
    bnb: '0xCDbab7630551d069DBdF0050E4a53D8C5ED2482b',
  },
];

export const TOUR_STEPS = [
  {
    element: '.title',
    intro: `Please provide a title for your Monad ID by entering your name or brand name, for example: John Doe.`,
  },
  {
    element: '.subtitle',
    intro: `Please enter a subtitle for your Monad ID, for example: Content Manager.`,
  },
  {
    element: '.avatar',
    intro: `Upload an avatar image for your Monad ID or choose one from your NFTs.`,
  },
  {
    element: '.bio',
    intro: `Please enter a short description for your Monad ID Profile, for example: I love Blockchain and AI/ML technologies and currently am learning how to read and write smart contracts.`,
  },
  {
    element: '.wallets',
    intro: `Your Monad wallet address is added to your Monad ID, You can add your wallet addresses from another chains, for example: Ethereum, BTC, Solana and More`,
  },
  {
    element: '.links',
    intro: `Add your resources like Headings, Texts, Links, Images, NFTs, Youtube Video, Soundcloud Track, Donate or Payment Button and More`,
  },
  {
    element: '.socials',
    intro: `Add a social media link to your Monad ID, for example: Twitter, Instagram, LinkedIn, Github and More`,
  },
  {
    element: '.add',
    intro: `Add your resources like wallet addresses, social media links, Headings, Texts, Links, Images, NFTs, Youtube Video, Soundcloud Track, Donate or Payment Button and More`,
  },
  {
    element: '.design',
    intro: `Design your Monad ID the way you like it! change the background color, customize the buttons style and font. change the layout and other settings`,
  },
  {
    element: '.save',
    intro: `Save your changes to the blockchain`,
  },
  {
    element: '.share',
    intro: `Share your Monad ID with the world`,
  },

  // ...
];

export const EARLY_ADOPTER_IMAGES: any = {
  explorer: {
    src: 'https://ipfs.io/ipfs/QmRdewFUw4jxTWnoVMSVLyQ7WmahWUMxDrCVYEwL7TuUDq/crypto-explorer.svg',
    type: 'image/svg+xml',
  },
  pioneer: {
    src: 'https://ipfs.io/ipfs/QmQ98JMocRupVnixhGcVupmDdmuMxXdsq1ozPyNhskzqEh/venom-id-pioneer.svg',
    type: 'image/svg+xml',
  },
  family: {
    src: 'https://ipfs.io/ipfs/QmSoTZi3B6FXLRVBXhsTCwfYPnWMCUHpBc6HiVrGpuBU6o/monadid-family.gif',
    type: 'image/gif',
  },
  geek: {
    src: 'https://ipfs.io/ipfs/QmPgY5KJ25cBmG4H4HkF6DTgxQ4gaUtzfChS8wS8EXScgH/monadid-geek.gif',
    type: 'image/gif',
  },
  identorian: {
    src: 'https://ipfs.io/ipfs/QmYK9CchybNS3HxrgvgxnKGHCzeRVwNZV1cmiLGf4qpx4m/identorian.svg',
    type: 'image/svg+xml',
  },
  maverick: {
    src: 'https://ipfs.io/ipfs/QmQt3CTiZEwDdrAW7ebSM7QX7ZLYts6nWfjfh36xB4iWM7/monadid-maverick.gif',
    type: 'image/gif',
  },
  champion: {
    src: 'https://ipfs.io/ipfs/QmSdjoBfigMQu2yGpMj5Fhd1xFQFYoTUVTLjUZjGcpnmee/monadid-champions.gif',
    type: 'image/gif',
  },
  earlier: {
    src: 'https://ipfs.io/ipfs/Qmb1huuaLMpA3JodFysEqpWc65vy4NkXfuix5mYkvaBkJE/earlier.svg',
    type: 'image/svg+xml',
  },
  catalyst: {
    src: 'https://ipfs.io/ipfs/QmUYe2xS43JB9d7qNB4KyU9ptGCJ9KG5bJcPj7rkdmfqxg/monadid-countdown-catalyst_nft.jpg',
    type: 'image/jpeg',
  },
  spring: {
    src: 'https://ipfs.io/ipfs/QmNt4zMpdSUtZ8p9ZQPWZy3U4anh9Pb6BxvUZzpFwkEWyk/monadid-springburst-nft.jpg',
    type: 'image/jpeg',
  },
};

export const RAFFLE_IMAGES = [
  'https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(4).png',
  'https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(12).png',
  'https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(39).png',
  'https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(58).png',
  'https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(80).png',
  'https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(119).png',
  'https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(139).png',
  'https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(153).png',
  'https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(192).png',
  'https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(197).png',
  'https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(204).png',
  'https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(230).png',
  'https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(260).png',
];

export const RAFFLE_IMAGES2 = [
  'https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(3).png',
  'https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(11).png',
  'https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(38).png',
  'https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(57).png',
  'https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(79).png',
  'https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(118).png',
  'https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(138).png',
  'https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(152).png',
  'https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(191).png',
  'https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(196).png',
  'https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(203).png',
  'https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(229).png',
  'https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(259).png',
];


export const SOCIAL_URLS: any = {
  twitter: 'twitter.com/',
  linkedin: 'linkedin.com/in/',
  github: 'github.com/',
  medium: 'medium.com/',
  youtube: 'youtube.com/',
  instagram: 'instagram.com/',
  tiktok: 'tiktok.com/',
  twitch: 'twitch.tv/',
  snapchat: 'snapchat.com/add/',
  facebook: 'facebook.com/',
  dribbble: 'dribbble.com/',
  pinterest: 'pinterest.com/',
  soundcloud: 'soundcloud.com/',
  spotify: 'open.spotify.com/user/',
  patreon: 'patreon.com/',
  substack: 'substack.com/',
  galxe: 'galxe.com/',
  opensea: 'opensea.io/',
  zealy: 'zealy.io/c/',
  ylide: 'hub.ylide.io/project/',
  amazon: 'amazon.com/gp/profile/eampleuser/',
  playstore: 'play.google.com/store/apps/developer?id=',
  appstore: 'apps.apple.com/us/developer/',
  applemusic: 'music.apple.com/profile/',
  clubhouse: 'joinclubhouse.com/',
  etsy: 'etsy.com/shop/',
  discord: 'discord:',
  skype: 'skype:',
  slack: 'slack.com/',
  telegram: 't.me/',
  whatsapp: 'wa.me/',
  phone: 'tel:',
  email: 'mailto:',
};
