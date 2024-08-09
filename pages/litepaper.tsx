import type { NextPage } from 'next';
import Head from 'next/head';
import { SITE_DESCRIPTION, SITE_URL, SITE_TITLE, SITE_OGS_URL } from 'core/utils/constants';
import { Seo } from 'components/Layout/Seo';
import LitepaperSection from 'components/sections/LitepaperSection';

const Litepaper: NextPage = () => {
  const title = "Monad ID Litepaper";
  const des = "Everything about the Monad ID Project";
  return (
    <>
      <Seo title={title} description={des} />
      <Head>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={des} />
        <meta
          name="twitter:image"
          content={`${SITE_OGS_URL}litepaper.jpg`}
        />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={des} />
        <meta
          name="og:image"
          content={`${SITE_OGS_URL}litepaper.jpg`}
        />
        <link rel="icon" type="image/png" href="/logos/monid.png" />
      </Head>

      {/* <ClaimSection /> */}
      <LitepaperSection />
    </>
  );
};

export default Litepaper;
