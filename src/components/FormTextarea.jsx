export function FormTextarea({
  id,
  label = 'Message',
  name,
  value,
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
        // onChange={onChange}
        placeholder={placeholder}
        rows={rows}
      />
    </div>
  )
}


// export function FormTextarea(props) {
//   return (
//     <div className="form-field">
//       <label htmlFor={props.id}>{props.label || 'Message'}</label>
//       <textarea
//         id={props.id}
//         name={props.name}
//         value={props.value}
//         // onChange={onChange}
//         placeholder={props.placeholder}
//         rows={props.rows}
//       />
//     </div>
//   )
// }
