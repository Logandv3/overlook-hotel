class Customer {
  constructor(customerInfo, bookingInfo, roomInfo, currentDate) {
    this.id = customerInfo.id;
    this.name = customerInfo.name;
    this.bookedStays = [];
    this.pastStays = [];
    this.upcomingStays = [];
    this.retrieveBookings = this.getCustomerBookings(bookingInfo, currentDate);
    this.totalSpent = 0;
    this.retrieveTotalSpent = this.calculateTotalSpent(roomInfo);
  }

  getCustomerBookings(bookingInfo, currentDate) {
    this.bookedStays = bookingInfo.filter((booking) => this.id === booking['userID']);
    // this.upcomingStays = bookingInfo.bookings.filter((booking) => {
    //   if (this.id === booking['userID'] && booking['date'] > currentDate) {
    //     return booking;
    //   };
    // });
    // console.log('upcomingStays',this.upcomingStays)
  };

  calculateTotalSpent(roomInfo) {
    this.totalSpent = roomInfo.reduce((num, room) => {
      this.bookedStays.forEach((stay) => {
        if (room.number === stay.roomNumber) {
          num += room.costPerNight;
        };
      });
      return Math.round(num * 100)/100;
    }, 0);
  };

  // filterUpcomingStays() {
  //
  // };
};

export default Customer;
