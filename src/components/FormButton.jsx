export function FormButton({ type = 'submit', children, disabled, xyz }) {
  
  // function handleClick() {
  //   onClick()
  // }

  return (
    <button
      className="form-submit"
      type={type}
      disabled={disabled}
      onClick={xyz}
    >
      {children}
    </button>
  )
}
