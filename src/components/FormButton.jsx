export function FormButton({
  type = 'submit',
  children,
  disabled,
  onClick,
}) {
  return (
    <button
      className="form-submit"
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
