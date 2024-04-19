import { ComponentProps } from "react";

interface TableRowProps extends ComponentProps<"tr"> {}

export function TableRow(props: TableRowProps) {
  return <tr className="border border-gray-500 hover:bg-black/5" {...props} />;
}
