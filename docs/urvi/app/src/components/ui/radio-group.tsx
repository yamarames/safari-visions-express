import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "@/lib/utils";

const RadioGroup = React.forwardRef<
  React.ComponentRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Root ref={ref} className={cn(className)} {...props} />
));
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

/** Card-shaped radio: the whole card is the control, so no dot is rendered here. */
const RadioGroupCard = React.forwardRef<
  React.ComponentRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <RadioGroupPrimitive.Item
    ref={ref}
    className={cn(
      "absolute text-left outline-none transition-colors duration-140",
      "focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2",
      "disabled:cursor-not-allowed disabled:opacity-40",
      className,
    )}
    {...props}
  >
    {children}
  </RadioGroupPrimitive.Item>
));
RadioGroupCard.displayName = "RadioGroupCard";

export { RadioGroup, RadioGroupCard };
