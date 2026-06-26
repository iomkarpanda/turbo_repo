'use client';
import React, { forwardRef } from 'react';
import { createInput } from '@gluestack-ui/core/input/creator';
import {
  tva,
  withStyleContext,
  useStyleContext,
  type VariantProps,
} from '@gluestack-ui/utils/nativewind-utils';
import { cssInterop } from 'nativewind';
import { TextInput, Pressable, View } from 'react-native';
import { PrimitiveIcon, UIIcon } from '@gluestack-ui/core/icon/creator';

const SCOPE = 'INPUT';

const Root = withStyleContext(View, SCOPE);

const UIInput = createInput({
  Root: Root,
  Icon: UIIcon,
  Slot: Pressable,
  Input: TextInput,
});

cssInterop(PrimitiveIcon, {
  className: {
    target: 'style',
    nativeStyleToProp: {
      height: true,
      width: true,
      fill: true,
      color: 'classNameColor',
      stroke: true,
    },
  },
});

const inputFieldStyle = tva({
  base: 'flex-1 text-typography-900 font-normal web:outline-none web:cursor-text web:data-[disabled=true]:cursor-not-allowed web:data-[disabled=true]:opacity-40 web:bg-transparent web:border-0',
  variants: {
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
    },
  },
});

const inputRootStyle = tva({
  base: 'flex-row items-center border border-background-300 rounded-md data-[hover=true]:border-background-400 data-[focus=true]:border-indicator-info data-[focus=true]:web:ring-1 data-[focus=true]:web:ring-indicator-info data-[focus=true]:data-[focus-visible=true]:web:ring-2 data-[invalid=true]:border-error-500 data-[invalid=true]:data-[hover=true]:border-error-600 data-[invalid=true]:data-[focus=true]:border-error-500 data-[disabled=true]:opacity-40 data-[disabled=true]:web:cursor-not-allowed gap-2',
  variants: {
    size: {
      xs: 'px-2 h-8',
      sm: 'px-3 h-9',
      md: 'px-3 h-10',
      lg: 'px-4 h-11',
      xl: 'px-5 h-12',
    },
    variant: {
      outline: '',
      underlined: 'border-0 border-b rounded-none',
      rounded: 'rounded-full',
    },
  },
});

const inputSlotStyle = tva({
  base: 'justify-center items-center web:cursor-default',
  parentVariants: {
    size: {
      xs: 'h-4 w-4',
      sm: 'h-4 w-4',
      md: 'h-[18px] w-[18px]',
      lg: 'h-[18px] w-[18px]',
      xl: 'h-5 w-5',
    },
  },
});

const inputIconStyle = tva({
  base: 'text-background-400 fill-none',
  parentVariants: {
    size: {
      xs: 'h-4 w-4',
      sm: 'h-4 w-4',
      md: 'h-[18px] w-[18px]',
      lg: 'h-[18px] w-[18px]',
      xl: 'h-5 w-5',
    },
  },
});

type IInputProps = React.ComponentPropsWithoutRef<typeof UIInput> &
  VariantProps<typeof inputRootStyle> & { className?: string };

const Input = forwardRef<React.ElementRef<typeof UIInput>, IInputProps>(
  ({ className, size = 'md', variant = 'outline', ...props }, ref) => {
    return (
      <UIInput
        ref={ref}
        {...props}
        className={inputRootStyle({ size, variant, class: className })}
        context={{ size, variant }}
      />
    );
  }
);

type IInputFieldProps = React.ComponentPropsWithoutRef<typeof UIInput.Input> &
  VariantProps<typeof inputFieldStyle> & { className?: string };

const InputField = forwardRef<
  React.ElementRef<typeof UIInput.Input>,
  IInputFieldProps
>(({ className, ...props }, ref) => {
  const { size: parentSize } = useStyleContext(SCOPE);

  return (
    <UIInput.Input
      ref={ref}
      {...props}
      placeholderTextColor="#71717A"
      className={inputFieldStyle({ size: parentSize, class: className })}
    />
  );
});

type IInputSlotProps = React.ComponentPropsWithoutRef<typeof UIInput.Slot> &
  VariantProps<typeof inputSlotStyle> & { className?: string };

const InputSlot = forwardRef<
  React.ElementRef<typeof UIInput.Slot>,
  IInputSlotProps
>(({ className, ...props }, ref) => {
  const { size: parentSize } = useStyleContext(SCOPE);

  return (
    <UIInput.Slot
      ref={ref}
      {...props}
      className={inputSlotStyle({
        parentVariants: { size: parentSize },
        class: className,
      })}
    />
  );
});

type IInputIconProps = React.ComponentPropsWithoutRef<typeof UIInput.Icon> &
  VariantProps<typeof inputIconStyle> & {
    className?: string;
    as?: React.ElementType;
  };

const InputIcon = forwardRef<
  React.ElementRef<typeof UIInput.Icon>,
  IInputIconProps
>(({ className, size, ...props }, ref) => {
  const { size: parentSize } = useStyleContext(SCOPE);

  if (typeof size === 'number') {
    return (
      <UIInput.Icon
        ref={ref}
        {...props}
        className={inputIconStyle({ class: className })}
        size={size}
      />
    );
  }
  return (
    <UIInput.Icon
      ref={ref}
      {...props}
      className={inputIconStyle({
        parentVariants: { size: parentSize },
        class: className,
      })}
    />
  );
});

Input.displayName = 'Input';
InputField.displayName = 'InputField';
InputSlot.displayName = 'InputSlot';
InputIcon.displayName = 'InputIcon';

export { Input, InputField, InputSlot, InputIcon };
