/* eslint-disable @next/next/no-img-element */
import { StarIcon, UserIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import * as React from 'react';

import { ProductProps } from '@/config/interface';

export default function Product({
  className,
  style,
  product,
}: {
  className?: string;
  style?: React.CSSProperties;
  product: ProductProps;
}) {
  return (
    <a
      key={product.id}
      href={`/product/${product.id}`}
      className={clsx(className, 'group')}
      style={style}
    >
      <img
        src={product.imageSrc}
        alt={product.imageAlt}
        className='h-[132px] w-[270px] group-hover:opacity-75'
      />
      <div className='flex font-bold mt-4 text-black text-xl'>
        <img
          src='/images/service-icon/foam-service.svg'
          alt='foam'
          className='mr-3'
        />
        <span className='mt-1'>{product.service}</span>
      </div>
      <div className='flex font-medium justify-between mt-1 text-gray-900 text-lg'>
        <div className='truncated-p'>{product.name}</div>
        <div className='flex'>
          <UserIcon className='h-4 mr-1 mt-1.5 w-4' />
          <div className='mr-1'>124</div>
          {[0, 1, 2, 3, 4].map((rating) => (
            <StarIcon
              key={rating}
              className={clsx(
                4 > rating ? 'icon-yellow' : 'text-gray-200',
                'flex-shrink-0 h-5 mt-1 w-5'
              )}
              aria-hidden='true'
            />
          ))}
        </div>
      </div>
    </a>
  );
}
