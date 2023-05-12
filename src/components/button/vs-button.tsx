import React, { HTMLAttributes } from 'react';
import clsx from 'clsx';
import {
  BTN_BORDER_STYLES,
  BTN_COLORS,
  BTN_SIZES,
  BTN_TYPES,
  DISABLED_CLASS,
  FULL_WIDE_CLASS,
  loaderClass
} from './utils';
import VsSpinner from '../spinner';

export interface BtnProps extends HTMLAttributes<HTMLButtonElement> {
  btnBorderStyle?: 'default' | 'none' | 'rounded',
  btnType?: 'solid' | 'outline',
  btnColor?: 'default' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark',
  btnSize?: 'sm' | 'md' | 'lg' | 'xl',
  fullWidth?: boolean,
  disabled?: boolean,
  loading?: boolean,
  loadingText?: string,
  classNames?: string,
  children?: React.ReactNode
}

export const VsButton = React.forwardRef<HTMLButtonElement, BtnProps>(
  (props, ref) => {
    const {
      btnBorderStyle = 'default',
      btnType = 'solid',
      btnColor = 'default',
      btnSize = 'md',
      fullWidth,
      disabled,
      loading,
      loadingText = '',
      classNames = '',
      children,
      ...restProps
    } = props;

    const isDisabled = disabled || loading;
    const buttonType = BTN_TYPES[btnType];

    const classes = clsx(
      BTN_SIZES[buttonType][btnSize],
      BTN_COLORS[buttonType][btnColor],
      BTN_BORDER_STYLES[btnBorderStyle],
      isDisabled ? DISABLED_CLASS : '',
      fullWidth ? FULL_WIDE_CLASS : '',
      'transition duration-150 ease-in-out relative',
      classNames
    );

    return(
      <button
        ref={ref}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        className={classes}
        {...restProps}
      >
        {loading ?
          <>
            <VsSpinner size={btnSize} classNames={clsx('inline', loaderClass(loadingText))} />
            {loadingText ?
              <span>{loadingText}</span>
              : <span className="opacity-0">{children}</span>}
          </>
          : children
        }
      </button>
    );
  });