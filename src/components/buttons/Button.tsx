import clsx from 'clsx';
import * as React from 'react';
import { ImSpinner2 } from 'react-icons/im';

enum ButtonVariant {
  'primary',
  'outline',
  'linear',
}

enum ButtonColor {
  'red',
  'orange',
  'blue',
  'yellow',
  'gray',
  'green',
}

type ButtonProps = {
  isLoading?: boolean;
  variant?: keyof typeof ButtonVariant;
  color?: keyof typeof ButtonColor;
} & React.ComponentPropsWithoutRef<'button'>;

export default function Button({
  children,
  className,
  disabled: buttonDisabled,
  isLoading,
  variant = 'primary',
  color = 'blue',
  ...rest
}: ButtonProps) {
  const disabled = isLoading || buttonDisabled;
  // eslint-disable-next-line prefer-const
  let overrideClassNames: string[] = [];

  const getColors = (): Array<string> => {
    switch (color) {
      case 'orange':
        return ['orange', 'black'];
      case 'red':
        return ['red', 'black'];
      case 'yellow':
        return ['yellow', 'black'];
      case 'green':
        return ['green', 'white'];
      case 'gray':
        return ['gray', 'white'];
      case 'blue':
      default:
        return ['primary', 'white'];
    }
  };

  const [mainColor, subColor] = getColors();

  const initArgs = () => {
    switch (variant) {
      case 'primary':
        switch (color) {
          case 'green':
            overrideClassNames.push(
              `bg-green-400 text-white`,
              `hover:bg-green-500 hover:text-white`,
              `active:bg-green-600`,
              `disabled:bg-green-600 disabled:hover:bg-white-600`
            );
            break;
          case 'blue':
            overrideClassNames.push(
              `bg-primary-400 text-white`,
              `hover:bg-primary-500 hover:text-white`,
              `active:bg-primary-600`,
              `disabled:bg-primary-600 disabled:hover:bg-white-600`
            );
            break;
          case 'gray':
            overrideClassNames.push(
              `bg-gray-400 text-white`,
              `hover:bg-gray-500 hover:text-white`,
              `active:bg-gray-600`,
              `disabled:bg-gray-600 disabled:hover:bg-white-600`
            );
            break;
          case 'red':
            overrideClassNames.push(
              `bg-red-400 text-black`,
              `hover:bg-red-500 hover:text-black`,
              `active:bg-red-600`,
              `disabled:bg-red-600 disabled:hover:bg-black-600`
            );
            break;
          case 'orange':
            overrideClassNames.push(
              `bg-orange-400 text-black`,
              `hover:bg-orange-500 hover:text-black`,
              `active:bg-orange-600`,
              `disabled:bg-orange-600 disabled:hover:bg-black-600`
            );
            break;
          case 'yellow':
            overrideClassNames.push(
              `bg-yellow-400 text-black`,
              `hover:bg-yellow-500 hover:text-black`,
              `active:bg-yellow-600`,
              `disabled:bg-yellow-600 disabled:hover:bg-black-600`
            );
            break;
        }
        break;
      case 'outline':
        switch (color) {
          case 'gray':
            overrideClassNames.push(
              `text-gray-500 border border-gray-500`,
              `hover:bg-gray-500 hover:text-white`,
              `active:bg-gray-600`,
              `disabled:bg-gray-600 disabled:hover:bg-gray-600`
            );
            break;
          case 'blue':
            overrideClassNames.push(
              `text-primary-500 border border-primary-500`,
              `hover:bg-primary-500 hover:text-white`,
              `active:bg-primary-600`,
              `disabled:bg-primary-600 disabled:hover:bg-primary-600`
            );
            break;
          case 'green':
            overrideClassNames.push(
              `text-green-500 border border-green-500`,
              `hover:bg-green-500 hover:text-white`,
              `active:bg-green-600`,
              `disabled:bg-green-600 disabled:hover:bg-green-600`
            );
            break;
          case 'red':
            overrideClassNames.push(
              `text-red-500 border border-red-500`,
              `hover:bg-red-500 hover:text-black`,
              `active:bg-red-600`,
              `disabled:bg-red-600 disabled:hover:bg-red-600`
            );
            break;
          case 'orange':
            overrideClassNames.push(
              `text-orange-500 border border-orange-500`,
              `hover:bg-orange-500 hover:text-black`,
              `active:bg-orange-600`,
              `disabled:bg-orange-600 disabled:hover:bg-orange-600`
            );
            break;
          case 'yellow':
            overrideClassNames.push(
              `text-yellow-500 border border-yellow-500`,
              `hover:bg-yellow-500 hover:text-black`,
              `active:bg-yellow-600`,
              `disabled:bg-yellow-600 disabled:hover:bg-yellow-600`
            );
            break;
        }
        break;
      case 'linear':
        switch (color) {
          case 'blue':
            overrideClassNames.push(`text-white bg-blue-linear`);
        }
        break;
      default:
        break;
    }
  };

  initArgs();

  return (
    <button
      {...rest}
      disabled={disabled}
      className={clsx(
        className,
        'w-full',
        'font-semibold items-center px-4 py-3 rounded-xl',
        'focus:outline-none',
        'shadow-sm',
        'duration-75 transition-colors',
        overrideClassNames,
        'disabled:cursor-not-allowed',
        isLoading &&
          'relative !text-transparent hover:!text-transparent !cursor-wait !transition-none',
        `${mainColor}`
      )}
    >
      {isLoading && (
        <div
          className={clsx(
            '-translate-x-1/2 -translate-y-1/2 absolute left-1/2 top-1/2',
            variant === 'primary' ? `text-${subColor}` : `text-${subColor}`
          )}
        >
          <ImSpinner2 className='animate-spin' />
        </div>
      )}
      {children}
    </button>
  );
}
