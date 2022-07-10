import Head from 'next/head';
import Link from 'next/link';
import Script from 'next/script';
import Image from 'next/image';

export default function FirstPost() {
  return (
    <>
      <Head>
        <title>First Post</title>
      </Head>
      <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        strategy="lazyOnload"
        onLoad={() => {
          console.log('script loaded correctly, window.FB has been populated');
        }}
      />
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
      <Image
        src="/images/profile.jpeg"
        width={200}
        height={200}
        alt="profile"
      />
    </>
  );
}
