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

  populateFilteredRooms(roomsToDisplay, gridContainer, roomDisplayHeading, upcomingStaysBtn) {
    domUpdates.show(upcomingStaysBtn);
    roomDisplayHeading.innerText = 'Available Rooms';
    gridContainer.innerHTML = '';

    roomsToDisplay.forEach((room) => {
      gridContainer.innerHTML += `
      <section class="grid-item" id="${room.number}">
        <p>Room Number: ${room.number}</p>
        <p>Room Type: ${room.roomType}</p>
        <p>Has bidet: ${room.bidet}</p>
        <p>Bed Size: ${room.bedSize}</p>
        <p>Number of Beds: ${room.numBeds}</p>
        <p>Cost Per Night: ${room.costPerNight}</p>
      </section>
      `;
    });
  },

  populateIndividualRoom(roomId, gridContainer, indRoom, roomsOnDashboard, backToResults) {
    domUpdates.hide(gridContainer);
    domUpdates.show(indRoom);
    domUpdates.show(backToResults);
    indRoom.innerHTML = ``;

    roomsOnDashboard.forEach((room) => {
      if (room.number === parseInt(roomId)) {
        indRoom.innerHTML += `
        <h3>${room.roomType} ${room.number}</h3>
        <div>
          <p>Has bidet: ${room.bidet}</p>
          <p>Bed Size: ${room.bedSize}</p>
          <p>Number of Beds: ${room.numBeds}</p>
          <p>Cost Per Night: ${room.costPerNight}</p>
          <button type="button" value="${room.number}" name="${room.number}" id="bookNow">Book Now</button>
        </div>
        `;
      };
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
