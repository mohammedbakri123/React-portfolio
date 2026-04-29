import { type ReactNode } from "react";

interface RowProps {
  children?: ReactNode;
  type?: "horizontal" | "vertical";
}

function Row({ children, type = "horizontal" }: RowProps) {
  return (
    <div className={type === "horizontal" ? "row" : "row--vertical"}>
      {children}
    </div>
  );
}

export default Row;