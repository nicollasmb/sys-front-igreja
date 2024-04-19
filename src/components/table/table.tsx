import { ComponentProps } from "react";

interface TableProps extends ComponentProps<"table"> {}

export function Table(props: TableProps) {
  return (
    <div className="rounded-lg shadow-mg">
      <table className="w-full" {...props} />
    </div>
  );
}
