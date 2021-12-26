/* eslint-disable @next/next/no-img-element */
import * as React from 'react';
import { Carousel as ReactCarousel } from 'react-responsive-carousel';

import { CarouselItem } from '@/config/interface';

export default function Carousel({
  className,
  items,
}: {
  className?: string;
  items: CarouselItem[];
}) {
  return (
    <ReactCarousel
      className={className}
      autoPlay
      showThumbs={false}
      showStatus={false}
      showArrows={false}
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
