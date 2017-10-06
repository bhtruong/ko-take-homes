import React from 'react'

import DropdownItem from './dropdown-item'

const Dropdown = (prop) => {
  let decades = prop.decades.map((decade) => {
    return (
      <DropdownItem
        key={decade}
        decade={decade}/>
    )
  })

  return (
    <div>
      <label>Decade:
        <select onChange={(event) => { handleChange(event, prop.onDecadeSelect) }}>
          <DropdownItem decade={''}/>
          { decades }
        </select>
      </label>
    </div>
  )
}

function handleChange(event, callback) {
  callback(event.target.value)
}

export default Dropdown