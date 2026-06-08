import * as React from "react";
import { Slider as SliderPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}) {
  const _values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : [min, max],
    [value, defaultValue, min, max],
  );

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        "relative flex w-full touch-none items-center select-none data-disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className="
          relative
          grow
          overflow-hidden
          rounded-full
          bg-pink-100
          data-horizontal:h-1.5
          data-horizontal:w-full
        "
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className="
            absolute
            bg-pink-600
            data-horizontal:h-full
          "
        />
      </SliderPrimitive.Track>

      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          key={index}
          data-slot="slider-thumb"
          className="
            block
            size-3.5
            rounded-full
            border-2
            border-pink-600
            bg-white
            shadow-sm
            transition-all
            hover:shadow-md
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-pink-300
            disabled:pointer-events-none
            disabled:opacity-50
          "
        />
      ))}
    </SliderPrimitive.Root>
  );
}

export { Slider };
