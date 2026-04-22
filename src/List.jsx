import './App.css'

function List({ userData }) {

  return (
    <>
    <div className='row'>
        <table className='table'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {
                userData.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                  </tr>
                ))
              }
            </tbody>
        </table>
    </div>
    </>
  )
}

export default List
