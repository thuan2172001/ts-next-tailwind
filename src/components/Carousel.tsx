/* eslint-disable @next/next/no-img-element */
import * as React from 'react';
import {
  Carousel as ReactCarousel,
  CarouselProps,
} from 'react-responsive-carousel';

import { CarouselItem } from '@/config/interface';

export default function Carousel({
  className,
  items,
  ...props
}: {
  className?: string;
  items: CarouselItem[];
  props?: CarouselProps;
}) {
  return (
    <ReactCarousel
      className={className}
      autoPlay
      showThumbs={false}
      showStatus={false}
      showArrows={false}
      showIndicators={items.length > 1}
      {...props}
      infiniteLoop
    >
      {items.map((item: CarouselItem, index: number) => {
        return (
          <div key={index}>
            <img
              src={item.src}
              alt={`carousel-${index}`}
              style={{ height: '25em', objectFit: 'cover' }}
            />
          </div>
        );
      })}
    </ReactCarousel>
  );
}
