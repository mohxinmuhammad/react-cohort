import Class from './class'
import collageContext, {collageFee } from '../../context/collageContext'
import { useContext } from 'react'
function Course() {
  const collageName = useContext(collageContext);
  const fee = useContext(collageFee);
  return (
    <>
    <div className="container" style={{ backgroundColor: 'pink', border: '1px solid black', margin: '10px' }}>
      <h2>Course</h2>
      <h3>Collage Name: {collageName}</h3>
      <h3>Collage Fee: {fee}</h3>
    </div>
    </>
  )
}

export default Course
