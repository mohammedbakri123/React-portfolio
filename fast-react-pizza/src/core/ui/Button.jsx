function Button({
  children,
  disabled = false,
  onClick = () => {},
  onSubmit = () => {},
}) {
  return (
    <button
      className="w-full bg-yellow-500 text-stone-800 font-bold py-2 rounded-full hover:bg-amber-500 transition max-w-2xs"
      disabled={disabled}
      onClick={onClick}
      onSubmit={onSubmit}
    >
      {children}
    </button>
  );
}

export default Button;
