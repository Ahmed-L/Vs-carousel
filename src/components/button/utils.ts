export const BTN_BORDER_STYLES = {
  none: 'rounded-none',
  default: 'rounded-md',
  rounded: 'rounded-full',
};

export const BTN_TYPES = {
  solid: 'solid',
  outline: 'outline'
};

export const BTN_SIZES = {
  [BTN_TYPES.solid]: {
    sm: 'px-4 py-1.5 font-medium text-sm',
    md: 'px-6 py-2 font-medium text-md',
    lg: 'px-7 py-2.5 font-medium text-lg',
    xl: 'px-8 py-3 font-medium text-xl',
  },
  [BTN_TYPES.outline]: {
    sm: 'px-4 py-1 font-medium text-sm',
    md: 'px-6 py-1.5 font-medium text-md',
    lg: 'px-7 py-2 font-medium text-lg',
    xl: 'px-8 py-2.5 font-medium text-xl',
  }
};

export const BTN_COLORS = {
  [BTN_TYPES.solid]: {
    default: 'bg-default-500 text-white hover:bg-default-600',
    success: 'bg-green-500 text-white hover:bg-green-600',
    danger: 'bg-red-500 text-white hover:bg-red-600',
    warning: 'bg-yellow-500 text-white hover:bg-yellow-600',
    info: 'bg-blue-400 text-white hover:bg-blue-500',
    light: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
    dark: 'bg-gray-800 text-white hover:bg-gray-900'
  },
  [BTN_TYPES.outline]: {
    default: 'border-2 border-default-500 text-default-500 hover:bg-default-500 hover:text-white',
    success: 'border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white',
    danger: 'border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white',
    warning: 'border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white',
    info: 'border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white',
    light: 'border-2 border-gray-200 text-gray-500 hover:bg-gray-200 hover:text-gray-500',
    dark: 'border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white'
  }
};

export const loaderClass = (loadingText: string): string => {
  return loadingText ? 'mr-2' : 'absolute m-auto left-0 right-0 top-0 bottom-0';
};

export const DISABLED_CLASS = 'pointer-events-none opacity-80';
export const FULL_WIDE_CLASS = 'inline-block w-full';
