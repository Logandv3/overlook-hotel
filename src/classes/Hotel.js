import domUpdates from '/src/domUpdates.js';


class Hotel {
  constructor(instantiatedBookings, instantiatedRooms) {
    this.allBookings = instantiatedBookings;
    this.allRooms = instantiatedRooms;
    this.roomAvailability = instantiatedRooms;
  };


  filterAvailableRooms(checkinDate, checkoutDate, roomType, gridContainer, roomDisplayHeading, upcomingStaysBtn, noResultsMsg, dateError, pastStaysBtn) {
    if (!checkinDate.value || !checkoutDate.value) {
      return domUpdates.show(dateError);
    };

    let date = checkinDate.value.replaceAll('-', '');
    this.roomAvailability = this.allRooms;

    this.allBookings.forEach((booking) => {
      if (booking.date === date) {
        let roomNum = booking.roomNumber;
        this.roomAvailability.forEach((room) => {
          if (room.number === roomNum) {
            let index = this.roomAvailability.indexOf(room);
            this.roomAvailability.splice(index, 1);
          };
        });
      };
    });

    if (roomType !== 'all-room-types') {
      return this.filterByRoomType(roomType, noResultsMsg, gridContainer, roomDisplayHeading, upcomingStaysBtn, dateError, pastStaysBtn);
    };
      domUpdates.populateFilteredRooms(this.roomAvailability, gridContainer, roomDisplayHeading, upcomingStaysBtn, dateError, pastStaysBtn);
  };


  filterByRoomType(type, noResultsMsg, gridContainer, roomDisplayHeading, upcomingStaysBtn, dateError, pastStaysBtn) {
    let availableTypes = this.roomAvailability.filter((room) => room.roomType === type);

    if (!availableTypes.length) {
      return domUpdates.show(noResultsMsg);
    };
    domUpdates.populateFilteredRooms(availableTypes,  gridContainer, roomDisplayHeading, upcomingStaysBtn, dateError, pastStaysBtn);
  };
};

export default Hotel;
