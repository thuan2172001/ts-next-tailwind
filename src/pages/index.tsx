/* eslint-disable @next/next/no-img-element */
import { Input } from 'antd';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';

// import Slider from "react-slick";
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
      <main className='mt-32'>
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

            <div className='flex justify-between'>
              <div className='font-bold text-3xl text-black'>
                Most interested
              </div>
              <div className='cursor-pointer text-primary-400'>View all</div>
            </div>

            <div className='bg-white'>
              <div className='max-w-2xl mx-auto px-4 py-4 sm:pb-24 sm:px-6 lg:max-w-7xl lg:px-8'>
                <h2 className='sr-only'>Products</h2>
                <div className='gap-x-6 gap-y-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 xl:grid-cols-4'>
                  {/* <Slider
                    infinite={false}
                    nextArrow={<div id="slide-next-icon" className="text-red">Next</div>}
                    prevArrow={<div id="slide-prev-icon" className="text-black">Prev</div>}
                    slidesPerRow={4}
                    rows={1}
                    speed={500}
                  > */}
                  {products.map((product: ProductProps) => (
                    <Product key={product.id} product={product} />
                  ))}
                  {/* </Slider> */}
                </div>
              </div>
            </div>

            <div className='bg bg-gray-200 mb-20 pb-12 pt-5'>
              <div className='mb-10 mx-auto text-3xl text-center w-full'>
                About us
              </div>
              <div className='gap-4 grid grid-cols-3'>
                {[
                  {
                    title: 'Title',
                    content:
                      'When you book and pay with Anygonow, you’re covered by our Happiness Guarantee. We’ll cover your projects up to full purchase price, plus limited damage protection.',
                  },
                  {
                    title: 'Title',
                    content:
                      'When you book and pay with Anygonow, you’re covered by our Happiness Guarantee. We’ll cover your projects up to full purchase price, plus limited damage protection.',
                  },
                  {
                    title: 'Title',
                    content:
                      'When you book and pay with Anygonow, you’re covered by our Happiness Guarantee. We’ll cover your projects up to full purchase price, plus limited damage protection.',
                  },
                ].map(
                  (item: { title: string; content: string }, index: number) => {
                    return (
                      <div className='mx-auto w-9/12' key={index}>
                        <div className='font-bold text-lg'>
                          {index + 1}. {item.title}
                        </div>
                        <div>{item.content}</div>
                      </div>
                    );
                  }
                )}
              </div>
            </div>

            <div className='items-center mb-20 mx-auto rounded-lg text-center'>
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
