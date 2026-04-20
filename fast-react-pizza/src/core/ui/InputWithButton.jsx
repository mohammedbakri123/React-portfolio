function InputWithButton({
  placeholder,
  customeStyles,
  name,
  id,
  isRequired,
  type = "text",
  defaultValue,
  value,
  onChange,
  disabled,
  onButtonClick,
  buttonText,
  disabledButton,
}) {
  return (
    <div className="relative flex items-center">
      <input
        className={`w-full p-3 pr-32 outline-none focus:ring-2 focus:ring-yellow-500 rounded-3xl transition-all ${customeStyles}`}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        required={isRequired}
        name={name}
        id={id}
        disabled={disabled}
      />
      {onButtonClick && (
        <span className="absolute right-1 z-10">
          <button
            type="button"
            disabled={disabledButton}
            onClick={onButtonClick}
            className="bg-yellow-400 hover:bg-yellow-500 text-stone-800 text-xs px-4 py-3 font-bold rounded-full transition-all disabled:bg-stone-200 disabled:text-stone-400 disabled:cursor-not-allowed"
          >
            {buttonText}
          </button>
        </span>
      )}
    </div>
  );
}

export default InputWithButton;
