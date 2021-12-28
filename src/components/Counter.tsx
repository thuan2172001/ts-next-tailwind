/* eslint-disable @next/next/no-img-element */
import clsx from 'clsx';
import * as React from 'react';

export default function Counter({
  className,
  style,
  minValue,
  maxValue,
  onChangeValue,
}: {
  className?: string;
  style?: React.CSSProperties;
  minValue: number;
  maxValue: number;
  onChangeValue?: (e: number) => void;
}) {
  const [value, setValue] = React.useState<number>(minValue);
  const changeValue = (value: number) => {
    if (value > maxValue || value < minValue) {
      return;
    }
    onChangeValue && onChangeValue(value);
    setValue(value);
  };
  return (
    <div className={clsx(className, 'input-counter')} style={style}>
      <div
        className='operator unselectable'
        onClick={() => changeValue(value - 1)}
      >
        −
      </div>
      <input type='text' value={value} className='counter' />
      <div
        className='operator unselectable'
        onClick={() => changeValue(value + 1)}
      >
        +
      </div>
    </div>
  );
}
