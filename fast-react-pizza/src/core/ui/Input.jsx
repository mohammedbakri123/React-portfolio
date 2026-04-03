function InputTxt({
  placeholder,
  customeStyles,
  name,
  id,
  isRequired,
  type = "text",
  defaultValue,
  value,
  onChange,
}) {
  return (
    <input
      className={`w-full p-3 outline-none focus:ring-2 focus:ring-yellow-500 rounded-xl transition-all ${customeStyles}`}
      type={type}
      placeholder={placeholder}
      defaultValue={defaultValue}
      value={value}
      onChange={onChange ? (e) => onChange(e.target.value) : undefined}
      required={isRequired}
      name={name}
      id={id}
    />
  );
}

export default InputTxt;
