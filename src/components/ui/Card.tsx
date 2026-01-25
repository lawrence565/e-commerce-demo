import { ElementType, forwardRef, ComponentPropsWithoutRef } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type CardVariant = "glass" | "solid" | "plain";

interface CardBaseProps {
  variant?: CardVariant;
  as?: ElementType;
}

type CardProps<T extends ElementType> = CardBaseProps &
  ComponentPropsWithoutRef<T>;

const Card = forwardRef(<T extends ElementType = "div">(
  { className, variant = "glass", as, ...props }: CardProps<T>,
  ref: React.Ref<Element>
) => {
  const Component = as || "div";
  
  const variants = {
    glass: "bg-white/75 border border-clay/60 backdrop-blur-md shadow-soft",
    solid: "bg-white border border-clay/20 shadow-crisp",
    plain: "bg-transparent border-none shadow-none",
  };

  return (
    <Component
      ref={ref}
      className={cn(
        "rounded-xl overflow-hidden",
        variants[variant],
        className
      )}
      {...props}
    />
  );
});

Card.displayName = "Card";

export { Card };
