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

  const getColors = (): Array<string> => {
    switch (color) {
      case 'gray':
        return ['gray', 'white'];
      case 'red':
        return ['red', 'black'];
      case 'yellow':
        return ['yellow', 'black'];
      case 'green':
        return ['green', 'white'];
      case 'purple':
        return ['purple', 'white'];
      case 'orange':
        return ['orange', 'black'];
      case 'blue':
      default:
        return ['primary', 'white'];
    }
  };

  const [[mainColor, subColor], setValue] = React.useState(getColors());

  const initArgs = (): Array<string> => {
    switch (variant) {
      case 'primary':
        return [
          `bg-${mainColor}-400 text-${subColor}`,
          `hover:bg-${mainColor}-500 hover:text-${subColor}`,
          `active:bg-${mainColor}-600`,
          `disabled:bg-${mainColor}-600 disabled:hover:bg-${mainColor}-600`,
        ];
      case 'outline':
        return [
          `text-${mainColor}-500 border border-${mainColor}-500`,
          `hover:bg-${mainColor}-500 hover:text-${subColor}`,
          `active:bg-${mainColor}-600`,
          `disabled:bg-${mainColor}-600 disabled:hover:bg-${mainColor}-600`,
        ];
      default:
        return [];
    }
  };

  React.useEffect(() => {
    setValue(getColors());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color]);

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
            variant === 'primary' ? `text-${mainColor}` : `text-${subColor}`
          )}
        >
          <ImSpinner2 className='animate-spin' />
        </div>
      )}
      {children}
    </button>
  );
}
