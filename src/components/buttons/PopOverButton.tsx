import { Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import { Fragment } from 'react';

import { PopUpItemsProps } from '@/config/interface';

export const PopOverButton = ({
  items,
  title,
  callsToAction,
  showDropIcon = true,
  className,
  size,
}: {
  items: PopUpItemsProps[];
  title: string | JSX.Element;
  callsToAction: PopUpItemsProps[];
  showDropIcon?: boolean;
  className?: string;
  size?: string;
}) => {
  return (
    <Popover className={clsx('relative', className)}>
      {() => (
        <>
          <Popover.Button
            className={clsx(
              'group inline-flex items-center rounded-md text-base'
            )}
          >
            {title}
            {showDropIcon && (
              <ChevronDownIcon className={clsx('h-5 w-5')} aria-hidden='true' />
            )}
          </Popover.Button>

          <Transition
            as={Fragment}
            enter='transition ease-out duration-200'
            enterFrom='opacity-0 translate-y-1'
            enterTo='opacity-100 translate-y-0'
            leave='transition ease-in duration-150'
            leaveFrom='opacity-100 translate-y-0'
            leaveTo='opacity-0 translate-y-1'
          >
            <Popover.Panel
              style={{ left: `${size === 'sm' && '-215px'}` }}
              className={clsx(
                size === 'sm'
                  ? ''
                  : 'lg:-translate-x-1/2 lg:left-1/2 lg:ml-0 max-w-md w-screen',
                '-ml-4 absolute mt-3 px-2 transform z-10 sm:px-0'
              )}
            >
              <div className='overflow-hidden ring-1 ring-black ring-opacity-5 rounded-lg shadow-lg'>
                <div className='bg-white gap-6 grid px-5 py-6 relative sm:gap-8 sm:p-8'>
                  {items.map((item: PopUpItemsProps) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className='-m-3 flex items-start p-3 rounded-lg hover:bg-gray-50'
                    >
                      <item.icon
                        className='flex-shrink-0 h-6 text-indigo-600 w-6'
                        aria-hidden='true'
                      />
                      <div className='ml-4'>
                        <p className='text-base text-gray-900'>{item.name}</p>
                        <p className='mt-1 text-gray-500 text-sm'>
                          {item.description}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
                <div className='bg-gray-50 grid grid-cols-2 px-5 py-5 space-y-6 sm:px-8 sm:space-x-10 sm:space-y-0'>
                  {callsToAction.map((item) => (
                    <div
                      key={item.name}
                      className='col-auto flow-root'
                      onClick={(e) => item.onClick && item?.onClick(e)}
                    >
                      <a
                        href={item.href}
                        className='-m-3 flex items-center p-3 rounded-md text-base text-gray-900 hover:bg-gray-100'
                      >
                        <item.icon
                          className='flex-shrink-0 h-6 text-gray-400 w-6'
                          aria-hidden='true'
                        />
                        <span className='ml-3'>{item.name}</span>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};
