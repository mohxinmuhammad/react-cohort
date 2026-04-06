export function FormInput({
  id,
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  autoComplete,
}) {
  return (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
      />
    </div>
  )
}
