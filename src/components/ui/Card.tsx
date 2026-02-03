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
    glass:
      "bg-white/80 border border-black/10 backdrop-blur-md shadow-[var(--shadow-soft)]",
    solid: "bg-white border border-black/10 shadow-[var(--shadow-crisp)]",
    plain: "bg-transparent border border-transparent shadow-none",
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
