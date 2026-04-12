export function FormTextarea({
  id,
  label = 'Message',
  name,
  value,
  onChange,
  placeholder,
  rows = 4,
}) {
  return (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
      />
    </div>
  )
}
