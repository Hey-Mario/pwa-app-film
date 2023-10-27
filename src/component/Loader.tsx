import React from 'react'

function LoaderComponent() {

  return (
    <div style={{ height:"100vh" }} className='d-flex text-center'>
        <div className="spinner-border m-auto" role="status">
          <span className="sr-only">Loading...</span>
        </div>
    </div>
  )
}

export default LoaderComponent