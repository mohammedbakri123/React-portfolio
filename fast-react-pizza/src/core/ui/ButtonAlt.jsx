function ButtonAlt({
  children,
  disabled = false,
  onClick = () => {},
  onSubmit = () => {},
}) {
  return (
    <button
      className="w-full border border-stone-200 text-stone-700 py-2 rounded-full hover:bg-stone-100 transition max-w-2xs"
      disabled={disabled}
      onClick={onClick}
      onSubmit={onSubmit}
    >
      {children}
    </button>
  );
}

export default ButtonAlt;
