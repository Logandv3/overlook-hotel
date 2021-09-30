class Customer {
  constructor(customerInfo, bookingInfo, roomInfo, currentDate) {
    this.id = customerInfo.id;
    this.name = customerInfo.name;
    this.bookedStays = bookingInfo;
    this.pastStays = [];
    this.upcomingStays = [];
    this.retrieveBookings = this.getCustomerBookings(bookingInfo, currentDate);
    this.totalSpent = 0;
    this.retrieveTotalSpent = this.calculateTotalSpent(roomInfo);
  }

  getCustomerBookings(bookingInfo, currentDate) {
    this.upcomingStays = bookingInfo.filter((booking) => {
      if (this.id === booking.userID && parseInt(booking.date) >= currentDate) {
        return booking;

      } else if (this.id === booking.userID && parseInt(booking.date) < currentDate) {
        this.pastStays.push(booking);
        return
      };
    });
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
};

export default Customer;
