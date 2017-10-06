import React from 'react'

const DropdownItem = (prop) => {
  return (
    <option value={prop.decade}>
      {prop.decade}
    </option>
  )
}

export default DropdownItem