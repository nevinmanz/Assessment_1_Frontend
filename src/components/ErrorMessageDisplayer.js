import React from 'react'

function ErrorMessageDisplayer(props) {
  return (
    <h6 className="text-start text-danger">
      {props.Item}     
    </h6>
  )
}
export default ErrorMessageDisplayer
