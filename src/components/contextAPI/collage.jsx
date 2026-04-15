import Class from './class'
import collageContext from '../../context/collageContext'
function Collage() {
  return (
    <>
    <div className="container" style={{ backgroundColor: 'gray', border: '1px solid black', margin: '10px' }}>
      <h2>Collage</h2>
      <collageContext.Provider value="Zargham University">
        {/* <h3>Collage Name: {collageName}</h3> */}
        <Class />
      </collageContext.Provider>
    </div>
    </>
  )
}

export default Collage
