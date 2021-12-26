import { Tooltip } from 'antd';
import clsx from 'clsx';
import * as React from 'react';

export default function TextDisplay({
  className,
  text,
  style,
}: {
  className?: string;
  text: string;
  style?: React.CSSProperties;
}) {
  return (
    <Tooltip title={text}>
      <span style={style} className={clsx(className, 'truncated-p')}>
        {text}
      </span>
    </Tooltip>
  );
}
