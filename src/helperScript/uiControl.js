function updateMode() {
  sapN.classList.remove("col-md-4");
  sapN.classList.add("col-md-3");
  Velocity(sapC, { display: "block" }, { duration: 0 });

  // Hide save btn
  Velocity(
    saveBtn,
    { width: "0", opacity: "0", display: "none" },
    { duration: 200 }
  );
  Velocity(
    resetBtn,
    { width: "0", opacity: "0", display: "none" },
    { duration: 200, delay: 0 }
  );

  Velocity(
    resetBtn,
    { width: "150px", opacity: "1", display: "block" },
    { duration: 200, delay: 0 }
  );
  Velocity(
    searchBtn,
    { width: "150px", opacity: "1", display: "block" },
    { duration: 200, delay: 200 }
  );
  Velocity(
    editBtn,
    { width: "150px", opacity: "1", display: "block" },
    { duration: 200, delay: 200 }
  );
}

function newMode(editClicked) {
  Velocity(sapC, { display: "none" }, { duration: 0 });
  sapN.classList.remove("col-md-3");
  sapN.classList.add("col-md-4");

  if (editClicked) {
    Velocity(
      searchBtn,
      { width: "0", opacity: "0", display: "none" },
      { duration: 200, delay: 0 }
    );

    Velocity(
      deleteBtn,
      { width: "0", opacity: "0", display: "none" },
      { duration: 200, delay: 0 }
    );

    Velocity(
      scheduleBtn,
      { width: "0", opacity: "0", display: "none" },
      { duration: 200, delay: 0 }
    );
  } else {
    Velocity(
      resetBtn,
      { width: "0", opacity: "0", display: "none" },
      { duration: 200, delay: 0 }
    );
    Velocity(
      searchBtn,
      { width: "0", opacity: "0", display: "none" },
      { duration: 200 }
    );
    Velocity(
      editBtn,
      { width: "0", opacity: "0", display: "none" },
      { duration: 200 }
    );

    Velocity(
      saveBtn,
      { width: "150px", opacity: "1", display: "block" },
      { duration: 200, delay: 200 }
    );
    Velocity(
      resetBtn,
      { width: "150px", opacity: "1", display: "block" },
      { duration: 200, delay: 0 }
    );
  }

  // console.log("CALLED");
  // sapC.classList.remove("col-md-1");
}

function displayMessage(msg) {
  alertMsg.innerText = msg;
  Velocity(alertMsg, { opacity: 1, display: "block" }, { duration: 300 });
  Velocity(
    alertMsg,
    { opacity: 0, display: "none" },
    { duration: 300, delay: 2000 }
  );
}

function editClicked() {
  Velocity(
    editBtn,
    { width: "0", opacity: "0", display: "none" },
    { duration: 200, delay: 0 }
  );

  Velocity(
    searchBtn,
    { width: "0", opacity: "0", display: "none" },
    { duration: 200, delay: 0 }
  );

  Velocity(
    saveBtn,
    { width: "150px", opacity: "1", display: "block" },
    { duration: 200, delay: 200 }
  );
  Velocity(
    deleteBtn,
    { width: "150px", opacity: "1", display: "block" },
    { duration: 200, delay: 200 }
  );
  Velocity(
    scheduleBtn,
    { width: "150px", opacity: "1", display: "block" },
    { duration: 200, delay: 200 }
  );
}

function editReset() {
  Velocity(
    saveBtn,
    { width: "0", opacity: "0", display: "none" },
    { duration: 200, delay: 0 }
  );
  Velocity(
    deleteBtn,
    { width: "0", opacity: "0", display: "none" },
    { duration: 200, delay: 0 }
  );

  Velocity(
    scheduleBtn,
    { width: "0", opacity: "0", display: "none" },
    { duration: 200, delay: 0 }
  );

  Velocity(
    editBtn,
    { width: "150px", opacity: "1", display: "block" },
    { duration: 200, delay: 200 }
  );
  Velocity(
    searchBtn,
    { width: "150px", opacity: "1", display: "block" },
    { duration: 200, delay: 200 }
  );
}

export default { newMode, updateMode, displayMessage, editClicked, editReset };
