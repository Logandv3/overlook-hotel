import domUpdates from '/src/domUpdates.js';
// import Bookings from './src/classes/Bookings.js';
// import Rooms from './src/classes/Rooms.js';

class Hotel {
  constructor(instantiatedBookings, instantiatedRooms) {
    this.allBookings = instantiatedBookings;
    this.allRooms = instantiatedRooms;
    this.roomAvailability = instantiatedRooms;
  };

  filterAvailableRooms(checkinDate, roomType, gridContainer, roomDisplayHeading, upcomingStaysBtn, noResultsMsg) {
    let date = checkinDate.replaceAll('-', '');
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
      this.filterByRoomType(roomType, noResultsMsg, gridContainer, roomDisplayHeading, upcomingStaysBtn);

    } else {
      domUpdates.populateFilteredRooms(this.roomAvailability, gridContainer, roomDisplayHeading, upcomingStaysBtn);
    };
  };

  filterByRoomType(type, noResultsMsg, gridContainer, roomDisplayHeading, upcomingStaysBtn) {
    let availableTypes = this.roomAvailability.filter((room) => room.roomType === type);
    if (!availableTypes.length) {
      domUpdates.show(noResultsMsg);
      // return `There are no ${type}'s available for the dates selected`
    };
    domUpdates.populateFilteredRooms(availableTypes,  gridContainer, roomDisplayHeading, upcomingStaysBtn);
  };
};

export default Hotel;
