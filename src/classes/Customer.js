class Customer {
  constructor(customerInfo, bookingInfo, roomInfo) {
    this.id = customerInfo.id;
    this.name = customerInfo.name;
    this.bookedStays = [];
    this.retrieveBookings = this.filterCustomerBookings(bookingInfo);
    this.totalSpent = 0;
    this.retrieveTotalSpent = this.calculateTotalSpent(roomInfo);
    // this.userName = `customer${this.id}`;
    // this.password = 'overlook2021';
  }
  filterCustomerBookings(bookingInfo) {
    this.bookedStays = bookingInfo.bookings.filter((booking) => this.id === booking['userID']);
  };

  calculateTotalSpent(roomInfo) {
    this.totalSpent = roomInfo.rooms.reduce((num, room) => {
      this.bookedStays.forEach((stay) => {
        if (room.number === stay.roomNumber) {
          num += room.costPerNight;
        }
      });
      return Math.round(num * 100)/100;
    }, 0);
  };
};

export default Customer;
