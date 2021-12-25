import React from 'react';

import { MediaIcon } from '../icons';

export default function Footer() {
  return (
    <div>
      <footer className='bg-white'>
        {/* eslint-disable-next-line max-len */}
        <div className='max-w-7xl mx-auto px-4 py-12 sm:px-6 md:flex md:items-center md:justify-between lg:px-8'>
          <div className='flex justify-center space-x-6 md:order-2'>
            <a
              href='https://github.com/thuan2172001'
              target='_blank'
              rel='noopener noreferrer'
              className='text-gray-400 hover:text-gray-500'
            >
              <span className='sr-only'>GitHub</span>
              <MediaIcon type='github' />
            </a>
          </div>
          <div className='mt-8 md:mt-0 md:order-1'>
            <p className='text-base text-center text-gray-400'>
              &copy;{' '}
              {`${new Date().getFullYear()} Trinh Van Thuan. All rights reserved.`}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
