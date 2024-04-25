import { ComponentProps } from "react";

interface TableProps extends ComponentProps<"table"> {}

export function Table(props: TableProps) {
  return (
    <div className="rounded-lg shadow-mg bg-white/50 mt-4">
      <table className="w-full" {...props} />
    </div>
  );
}
