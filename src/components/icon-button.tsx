import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface IconButtonProps extends ComponentProps<"button"> {
  transparent?: boolean;
}

export function IconButton({ transparent, ...props }: IconButtonProps) {
  return (
    <button
      {...props}
      className={twMerge(
        "border-2 border-gray-900 rounded-md p-1.5",
        transparent ? "bg-black/20" : "bg-brancofundo border-",
        props.disabled ? "opacity-50" : null
      )}
    />
  );
}
