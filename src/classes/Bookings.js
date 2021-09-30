// import Hotel from '/src/classes/Hotel.js';
// import Rooms from '/src/classes/Rooms.js';
// import domUpdates from '../src/domUpdates.js';

class Bookings {
  constructor(bookedStay) {
    this.id = bookedStay.id;
    this.userID = bookedStay.userID;
    this.date = bookedStay.date.replaceAll('/', '');
    this.roomNumber = bookedStay.roomNumber;
  };
};

export default Bookings;
