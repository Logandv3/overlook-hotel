class Bookings {
  constructor(bookedStay) {
    this.id = bookedStay.id;
    this.userID = bookedStay.userID;
    this.date = bookedStay.date;
    this.roomNumber = bookedStay.roomNumber;
  };
};

export default Bookings;
