/* eslint-disable @next/next/no-img-element */
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';

import Layout from '@/components/layout/Layout';
import Product from '@/components/Product';
import Seo from '@/components/Seo';

import { ProductProps } from '@/config/interface';

import { products } from '../config/mockdata';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common'])),
    },
  };
};

export default function HomePage() {
  return (
    <Layout>
      <Seo templateTitle='Home' />
      <main className=''>
        <section className='bg-white layout'>
          <div className='grid grid-cols-2'>
            <div className='items-center justify-center my-auto'>
              <div className='items-center justify-center text-7xl text-bold w-11/12'>
                <div>Make your</div> dream home 🏠 a reality.
              </div>
            </div>
            <div>
              <img src='/images/default-image.webp' alt='default' />
            </div>
          </div>

          <div>
            <div className='font-medium ml-4 mt-4 text-3xl text-black'>
              Profession Near You
            </div>
            <div className='bg-white'>
              <div className='max-w-2xl mx-auto px-4 py-4 sm:pb-24 sm:px-6 lg:max-w-7xl lg:px-8'>
                <h2 className='sr-only'>Products</h2>
                <div className='gap-x-6 gap-y-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 xl:grid-cols-4'>
                  {products.map((product: ProductProps) => (
                    <Product key={product.id} product={product} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
