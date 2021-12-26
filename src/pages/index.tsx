import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';

import Carousel from '@/components/Carousel';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common'])),
    },
  };
};

const items = [
  {
    src: 'https://www.wallpaperup.com/uploads/wallpapers/2014/01/12/225293/cd89bd1f8168a20c4d6284036a00a45b-1400.jpg',
  },
  {
    src: 'https://www.wallpaperup.com/uploads/wallpapers/2013/04/09/73143/d2c0f4c5943c94fccdad2866782ded2f-1400.jpg',
  },
  {
    src: 'https://www.wallpaperup.com/uploads/wallpapers/2013/12/16/197406/54df26048323f74b219da0dca522e1cb-1400.jpg',
  },
  {
    src: 'https://www.wallpaperup.com/uploads/wallpapers/2013/12/16/197422/9a9368fc2861cc8318013ceaf78c4f5e-1000.jpg',
  },
  {
    src: 'https://images.pexels.com/photos/844297/pexels-photo-844297.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  },
  {
    src: 'https://images.pexels.com/photos/624015/pexels-photo-624015.jpeg?cs=srgb&dl=pexels-frans-van-heerden-624015.jpg&fm=jpg',
  },
  {
    src: 'https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?cs=srgb&dl=pexels-aleksandar-pasaric-325185.jpg&fm=jpg',
  },
  { src: 'https://images6.alphacoders.com/310/310221.jpg' },
  { src: 'https://images8.alphacoders.com/957/957090.jpg' },
];

export default function HomePage() {
  return (
    <Layout>
      <Seo templateTitle='Home' />
      <main>
        <section className='bg-white h-screen'>
          <div className='h-min'>
            <Carousel items={items} />
          </div>
        </section>
      </main>
    </Layout>
  );
}
