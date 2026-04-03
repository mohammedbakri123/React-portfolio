import { useState } from "react";

export default function TextExpander({
  children,
  expendButtonText = "Show less",
  collapsebuttonText = "Show more",
  ButtonColor = "yellow",
  collapseNumWord = 25,
  ClassName,
  Expended = true,
}) {
  const [isExpended, setIsExpended] = useState(Expended);

  const text = function () {
    return isExpended
      ? children
      : `${children.split(" ").slice(0, collapseNumWord)}...`;
  };

  return (
    <div className={ClassName}>
      <span>{text()}</span>
      <button
        style={{ color: ButtonColor }}
        onClick={() => setIsExpended((e) => !e)}
      >
        {isExpended ? expendButtonText : collapsebuttonText}
      </button>
    </div>
  );
}
