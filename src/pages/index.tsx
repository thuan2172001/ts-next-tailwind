import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';

import Carousel from '@/components/Carousel';
import Layout from '@/components/layout/Layout';
import Product from '@/components/Product';
import Seo from '@/components/Seo';

import { ProductProps } from '@/config/interface';

import { items, leftItem, products, subHeader } from '../config/mockdata';

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
      <div className='container mx-auto px-6 py-3 sub-header'>
        <div className='-mx-3 flex overflow-x-auto scroll-hidden'>
          {subHeader.map((item, i: number) => {
            return (
              <a
                key={item.title + i}
                className='flex-none leading-5 px-3 text-gray-700 text-sm hover:text-blue-600'
              >
                {item.title}
              </a>
            );
          })}
        </div>
      </div>
      <Seo templateTitle='Home' />
      <main className='bg-gray-100'>
        <section className='bg-white layout'>
          <div className='gap-4 grid grid-flow-col h-min'>
            <Carousel className='col-span-5' items={items} />
            <Carousel className='col-span-3' items={leftItem} />
          </div>
          <div>
            <div className='ml-4 mt-4'>Gợi ý hôm nay</div>
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
