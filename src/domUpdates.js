let domUpdates = {
  populateUserInfo(customer) {
    userWelcome.innerText = `Welcome ${customer.name}!`;
    userTotalSpent.innerText = `Total Spent: ${customer.totalSpent}`;
  },

  populateUpcomingStays(customer) {
    gridContainer.innerHTML = ``;

    customer.bookedStays.forEach((stay) => {
      gridContainer.innerHTML += `
        <section class="grid-item" id="${stay.id}">
          <p>${stay.date}</p>
          <p>Room: ${stay.roomNumber}</p>
        </section>
      `;
    })
  },

  populateRoomTypeDropDwn(roomInfo) {
    let filteredRoomTypes = roomInfo.rooms.reduce((arr, room) => {
      if (!arr.includes(room.roomType)) {
        arr.push(room.roomType);
      }
      return arr;
    }, []);

    filteredRoomTypes.forEach((type) => {
      roomType.innerHTML += `
      <option value="${type}" id="${type}">${type}</option>
      `;
    });
  },

  populateFilteredRooms(roomsToDisplay, gridContainer) {
    gridContainer.innerHTML = '';

    roomsToDisplay.forEach((room) => {
      gridContainer.innerHTML += `
      <section class="grid-item" id="${room.number}">
        <p>${room.number}</p>
        <p>${room.roomType}</p>
        <p>Has bidet: ${room.bidet}</p>
        <p>Bed Size: ${room.bedSize}</p>
        <p>Number of Beds: ${room.numBeds}</p>
        <p>Cost Per Night: ${room.costPerNight}</p>
      </section>
      `;
    });
  },

  show(element) {
    element.classList.remove('hidden');
  },

  hide(element) {
    element.classList.add('hidden');
  }
};

export default domUpdates;
