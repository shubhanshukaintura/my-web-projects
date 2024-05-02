import React from 'react'

function Input(
    data, editDisable=false
) {
  return (
    <div>
        <input
            value = {data}
            disabled = {editDisable}
        />
    </div>
  )
}

export default Input