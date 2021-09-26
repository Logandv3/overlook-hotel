class Customer {
  constructor(customerInfo, customerBookings, roomInfo) {
    this.id = customerInfo.id;
    this.name = customerInfo.name;
    this.bookedStays = [];
    // this.retrieveBookings = filterCustomerBookings(customerBookings);
    this.totalSpent = 0;
    // this.retrieveTotalSpent = calculateTotalSpent(roomInfo);
    // this.userName = `customer${this.id}`;
    // this.password = 'overlook2021';
  }
  filterCustomerBookings(customerBookings) {
    this.bookedStays = customerBookings.filter((booking) => this.id === booking['userID']);
  };

  calculateTotalSpent(roomInfo) {
    this.totalSpent = roomInfo.reduce((num, room) => {
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
