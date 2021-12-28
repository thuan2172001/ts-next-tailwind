/* eslint-disable @next/next/no-img-element */
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
      <div className='aspect-h-1 aspect-w-1 bg-gray-200 overflow-hidden rounded-lg w-full xl:aspect-h-8 xl:aspect-w-7'>
        <img
          src={product.imageSrc}
          alt={product.imageAlt}
          className='h-full object-center object-cover w-full group-hover:opacity-75'
        />
      </div>
      <h3 className='mt-4 text-gray-700 text-sm'>{product.name}</h3>
      <p className='font-medium mt-1 text-gray-900 text-lg'>{product.price}</p>
    </a>
  );
}
