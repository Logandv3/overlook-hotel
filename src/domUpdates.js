import Bookings from '../src/classes/Bookings.js';
import Rooms from '../src/classes/Rooms.js';
import Hotel from '../src/classes/Hotel.js';
import Customer from '../src/classes/Customer.js';

let domUpdates = {
  populateUserInfo(customer) {
    userWelcome.innerText = `Welcome ${customer.name}!`;
    userTotalSpent.innerText = `Total Spent: ${customer.totalSpent}`;
  },

  populateUpcomingStays(customer) {
    gridContainer.innerHTML = ``;

    customer.bookedStays.forEach((stay) => {
      gridContainer.innerHTML += `
        <section class="grid-item" tabindex="0" id="${stay.id}">
          <p>Date of Stay: ${stay.date}</p>
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
      <section class="grid-item" tabindex="0">
        <div class="room-info-container" id="${room.number}">
          <div class="ind-card-head" id="${room.number}">
            <p>Room Number: ${room.number}</p>
            <p>Room Type: ${room.roomType}</p>
          </div>
          <p>Has bidet: ${room.bidet}</p>
          <p>Bed Size: ${room.bedSize}</p>
          <p>Number of Beds: ${room.numBeds}</p>
          <p>Cost Per Night: ${room.costPerNight}</p>
        </div>
      </section>
      `;
    });
  },

  populateIndividualRoom(roomId, gridContainer, indRoom, roomsOnDashboard, backToResults) {
    console.log(roomId);
    domUpdates.hide(gridContainer);
    domUpdates.show(indRoom);
    domUpdates.show(backToResults);
    indRoom.innerHTML = ``;

    roomsOnDashboard.forEach((room) => {
      if (room.number === parseInt(roomId)) {
        indRoom.innerHTML += `
        <h3>${room.roomType} ${room.number}</h3>
        <div class="ind-room-info">
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
