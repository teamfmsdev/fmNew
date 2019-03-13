function updateMode () {
  sapN.classList.remove('col-md-4')
  sapN.classList.add('col-md-3')
  Velocity(sapC, {}, { duration: 0, display: 'block' })

  // Hide save btn
  Velocity(
    saveBtn,
    { width: '0', opacity: '0' },
    { duration: 200, display: 'none' }
  )
  Velocity(
    resetBtn,
    { width: '0', opacity: '0' },
    { duration: 200, delay: 0, display: 'none' }
  )

  Velocity(
    resetBtn,
    { width: '150px', opacity: '1' },
    { duration: 200, delay: 0, display: 'block' }
  )
  Velocity(
    searchBtn,
    { width: '150px', opacity: '1' },
    { duration: 200, delay: 200, display: 'block' }
  )
  Velocity(
    editBtn,
    { width: '150px', opacity: '1' },
    { duration: 200, delay: 200, display: 'block' }
  )
}

function newMode (editClicked) {
  Velocity(sapC, {}, { duration: 0, display: 'none' })
  sapN.classList.remove('col-md-3')
  sapN.classList.add('col-md-4')

  if (editClicked) {
    Velocity(
      searchBtn,
      { width: '0', opacity: '0' },
      { duration: 200, delay: 0, display: 'none' }
    )

    Velocity(
      deleteBtn,
      { width: '0', opacity: '0' },
      { duration: 200, delay: 0, display: 'none' }
    )
    
    Velocity(scheduleBtn,{width:'0',opacity:'0'},
  { duration: 200, delay: 0, display: 'none' })
  } else {
    Velocity(
      resetBtn,
      { width: '0', opacity: '0' },
      { duration: 200, delay: 0, display: 'none' }
    )
    Velocity(
      searchBtn,
      { width: '0', opacity: '0' },
      { duration: 200, display: 'none' }
    )
    Velocity(
      editBtn,
      { width: '0', opacity: '0' },
      { duration: 200, display: 'none' }
    )

    Velocity(
      saveBtn,
      { width: '150px', opacity: '1' },
      { duration: 200, delay: 200, display: 'block' }
    )
    Velocity(
      resetBtn,
      { width: '150px', opacity: '1' },
      { duration: 200, delay: 0, display: 'block' }
    )
  }

  // console.log("CALLED");
  // sapC.classList.remove("col-md-1");
}

function displayMessage (msg) {
  alertMsg.innerText = msg
  Velocity(alertMsg, { opacity: 1 }, { duration: 300, display: 'block' })
  Velocity(alertMsg, { opacity: 0 }, { duration: 300, delay: 2000, display: 'none' })
}

function editClicked () {
  Velocity(
    editBtn,
    { width: '0', opacity: '0' },
    { duration: 200, delay: 0, display: 'none' }
  )

  Velocity(
    searchBtn,
    { width: '0', opacity: '0' },
    { duration: 200, delay: 0, display: 'none' }
  )

  Velocity(
    saveBtn,
    { width: '150px', opacity: '1' },
    { duration: 200, delay: 200, display: 'block' }
  )
  Velocity(
    deleteBtn,
    { width: '150px', opacity: '1' },
    { duration: 200, delay: 200, display: 'block' }
  )
  Velocity(scheduleBtn,{width:'150px',opacity:'1'},
  { duration: 200, delay: 200, display: 'block' })
}

function editReset () {
  Velocity(
    saveBtn,
    { width: '0', opacity: '0' },
    { duration: 200, delay: 0, display: 'none' }
  )
  Velocity(
    deleteBtn,
    { width: '0', opacity: '0' },
    { duration: 200, delay: 0, display: 'none' }
  )

  Velocity(scheduleBtn,{width:'0',opacity:'0'},
  { duration: 200, delay: 0, display: 'none' })

  Velocity(
    editBtn,
    { width: '150px', opacity: '1' },
    { duration: 200, delay: 200, display: 'block' }
  )
  Velocity(
    searchBtn,
    { width: '150px', opacity: '1' },
    { duration: 200, delay: 200, display: 'block' }
  )
}

export default { newMode, updateMode, displayMessage, editClicked, editReset }
