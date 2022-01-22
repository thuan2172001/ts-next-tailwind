/* eslint-disable @next/next/no-img-element */
import { Input } from 'antd';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';

import Button from '@/components/buttons/Button';
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
              <div className='flex gap-4 mt-6 w-full'>
                <div className='md:w-2/3'>
                  <Input
                    className='py-3'
                    placeholder='What’s on your to-do list'
                  />
                </div>
                <div className='md:w-1/6'>
                  <Button
                    type='submit'
                    className='py-3.5'
                    color='blue'
                    variant='linear'
                  >
                    Search
                  </Button>
                </div>
              </div>
            </div>
            <div>
              <img src='/images/default-image.webp' alt='default' />
            </div>
          </div>

          <div>
            <div className='flex justify-between mt-10'>
              <div className='font-bold text-3xl text-black'>
                Professionals Near You
              </div>
              <div className='cursor-pointer text-primary-400'>View all</div>
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

            <div className='items-center mb-20 mx-auto rounded-lg text-center'>
              <Button
                color='blue'
                variant='primary'
                className='h-[48px] mb-6 w-[149px]'
              >
                Learn more
              </Button>
              <img
                src='/images/banner/download-banner.webp'
                className='mx-0 primary-box-shadow px-0 w-full'
                alt='banner'
              />
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
