import { HeartIcon } from '@heroicons/react/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/solid';
import clsx from 'clsx';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';

import Button from '@/components/buttons/Button';
import Carousel from '@/components/Carousel';
import Counter from '@/components/Counter';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import { items } from '@/config/mockdata';
export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common'])),
    },
  };
};
export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <Layout>
      <Seo templateTitle={`Product ${id}`} />

      <main>
        <section className=''>
          <div className='layout min-h-screen py-20'>
            <div className='grid grid-cols-5 h-min'>
              <Carousel
                className='col-span-2'
                showArrows
                showStatus
                showThumbs
                items={items}
              />
              <div className='col-span-3 mx-8'>
                Combo Nước Giặt ARIEL Matic Đậm Đặc 4.1KGx2/ Hương Downy 3.9KGx2
                {/* Reviews */}
                <div className='mt-6'>
                  <h4 className='sr-only'>Reviews</h4>
                  <div className='flex items-center'>
                    <div className='flex items-center'>
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIconSolid
                          key={rating}
                          className={clsx(
                            4 > rating ? 'icon-yellow' : 'text-gray-200',
                            'flex-shrink-0 h-5 w-5'
                          )}
                          aria-hidden='true'
                        />
                      ))}
                    </div>
                    <p className='sr-only'>{5} out of 5 stars</p>
                    <a
                      href='#'
                      className='font-medium ml-3 text-indigo-600 text-sm hover:text-indigo-500'
                    >
                      {137} đánh giá
                    </a>
                    <a
                      href='#'
                      className='font-medium ml-1 text-indigo-600 text-sm hover:text-indigo-500'
                    >
                      | {1327} đã bán
                    </a>
                  </div>
                </div>
                <div className='grid grid-cols-8 mt-10'>
                  <div className='col-span-7'>
                    <span className='old-price'>500.000 đ</span>
                    <span className='new-price'>356.000 đ</span>
                  </div>
                  <span className='col-start-8'>
                    <HeartIcon className='h-6 w-6' />
                  </span>
                </div>
                <div className='mt-10 text-sm'>
                  <span className='mb-10'>Số lượng</span>
                  <Counter className='mt-2' minValue={0} maxValue={10} />
                </div>
                <div className='mt-10'>
                  Giao đến{' '}
                  <span
                    style={{ textDecoration: 'underline', fontWeight: 'bold' }}
                  >
                    H. Đông Anh, TT Đông Anh, Hà Nội
                  </span>
                  <span className='cursor-pointer ml-2 text-primary-500'>
                    - Đổi địa chỉ
                  </span>
                </div>
                <div className='mt-10'></div>
                <div className='gap-4 grid grid-cols-8 mt-10'>
                  <Button className='col-span-4' color='blue'>
                    Chọn mua
                  </Button>
                  <Button
                    variant='outline'
                    color='blue'
                    className='col-span-4 sm:text-sm'
                  >
                    Chat{' '}
                    <span className='hidden md:inline-block'>
                      với người bán
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
