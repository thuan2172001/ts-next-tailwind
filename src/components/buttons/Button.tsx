import clsx from 'clsx';
import * as React from 'react';
import { ImSpinner2 } from 'react-icons/im';

enum ButtonVariant {
  'primary',
  'outline',
}

enum ButtonColor {
  'red',
  'orange',
  'blue',
  'yellow',
  'gray',
  'purple',
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
  // color = "blue",
  ...rest
}: ButtonProps) {
  const disabled = isLoading || buttonDisabled;

  // danger (red - white)
  // alert (yellow - black)
  // info (gray - black)

  const initArgs = (): Array<string> => {
    switch (variant) {
      case 'primary':
        return [
          'bg-primary-400 text-white',
          'hover:bg-primary-500 hover:text-white',
          'active:bg-primary-600',
          'disabled:bg-primary-600 disabled:hover:bg-primary-600',
        ];
      case 'outline':
        return [
          'text-primary-500 border border-primary-500',
          'hover:bg-primary-500 hover:text-white',
          'active:bg-primary-600',
          'disabled:bg-primary-600 disabled:hover:bg-primary-600',
        ];
      default:
        return [];
    }
  };

  return (
    <button
      {...rest}
      disabled={disabled}
      className={clsx(
        className,
        'font-semibold items-center px-4 py-2 rounded',
        'focus:outline-none',
        'shadow-sm',
        'duration-75 transition-colors',
        initArgs(),
        'disabled:cursor-not-allowed',
        isLoading &&
          'relative !text-transparent hover:!text-transparent !cursor-wait !transition-none'
      )}
    >
      {isLoading && (
        <div
          className={clsx(
            '-translate-x-1/2 -translate-y-1/2 absolute left-1/2 top-1/2',
            {
              'text-white': variant === 'primary',
              'text-primary-500': variant === 'outline',
            }
          )}
        >
          <ImSpinner2 className='animate-spin' />
        </div>
      )}
      {children}
    </button>
  );
}
