import { RotatingLines } from 'react-loader-spinner'

function Loader() {
  return (
    <div className="Container">
      <RotatingLines
        strokeColor={'#3f51b5'}
        strokeWidth="5"
        animationDuration="0.75"
        width="196"
        visible={true}
      />
    </div>
  )
}

export default Loader