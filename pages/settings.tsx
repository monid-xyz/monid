import type { NextPage } from 'next';
import Head from 'next/head';
import { SITE_DESCRIPTION, SITE_URL, SITE_TITLE } from 'core/utils/constants';
import { Seo } from 'components/Layout/Seo';
import SettingsSection from 'components/sections/SettingsSection';

const Settings: NextPage = () => {
  const title = "Setings";
  const des = "MONID Management";
  return (
    <>
    <Seo title={title} description={des} />
      <Head>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={des} />
        <meta
          name="twitter:image"
          content={`${SITE_URL}/api/og?title=${title}&subtitle=${des}&w=30&image=${SITE_URL}logos/monidxyz.svg`}
        />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={des} />
        <meta
          name="og:image"
          content={`${SITE_URL}/api/og?title=${title}&subtitle=${des}&w=30&image=${SITE_URL}logos/monidxyz.svg`}
        />
        <link rel="icon" type="image/png" href="/logos/monid.png" />
      </Head>
      
      {/* <ClaimSection /> */}
      <SettingsSection />
    </>
  );
};

export default Settings;
