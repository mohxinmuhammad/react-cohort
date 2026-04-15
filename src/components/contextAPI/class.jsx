import Student from './student'
import collageContext, { collageFee } from '../../context/collageContext'
import { useState, useContext } from 'react'

function Class() {
    const [fee, setFee] = useState(1000);
    const initialFee = Number(useContext(collageFee));
    const handleFeeChange = (event) => {
        setFee(Number(event.target.value));
    }

    // setFee(initialFee);

    return (
      <>
      <div className="container" style={{ backgroundColor: 'green', border: '1px solid black', margin: '10px' }}>
        <h2>Class</h2>
        <collageFee.Provider value={fee}>
        {/* <h3>Fee: {fee}</h3> */}
            <input type="number" value={fee || initialFee} placeholder="Enter your fee" onChange={handleFeeChange} />
            <Student />
        </collageFee.Provider> 
      </div>
      </>
    )
  }
  
  export default Class
  