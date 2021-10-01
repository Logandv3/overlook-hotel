class Customer {
  constructor(customerInfo, bookingInfo, roomInfo, currentDate) {
    this.id = customerInfo.id;
    this.name = customerInfo.name;
    this.allBookedStays = [];
    this.pastStays = [];
    this.upcomingStays = [];
    this.retrieveBookings = this.getCustomerBookings(bookingInfo, currentDate);
    this.totalSpent = 0;
    this.retrieveTotalSpent = this.calculateTotalSpent(roomInfo);
    // this.reformatDate = this.reformatDate();
  }

  getCustomerBookings(bookingInfo, currentDate) {
    this.allBookedStays = bookingInfo.filter((booking) => this.id === booking.userID);

    this.allBookedStays.forEach((booking) => {
      if (parseInt(booking.date) >= currentDate) {
        this.upcomingStays.push(booking);

      } else if (parseInt(booking.date) < currentDate){
        this.pastStays.push(booking);
      };
    });
  };


  calculateTotalSpent(roomInfo) {
    this.totalSpent = roomInfo.reduce((num, room) => {
      this.allBookedStays.forEach((stay) => {
        if (room.number === stay.roomNumber) {
          num += room.costPerNight;
        };
      });
      return Math.round(num * 100)/100;
    }, 0);
  };


  // reformatDate() {
  //   let formattedStays = [];
  //   let dash = '/';
  //   let position1 = 4;
  //   let position2 = 7;
  //
  //   this.upcomingStays.forEach((stay) => {
  //     let result1 = [stay.date.slice(0, position1), dash, stay.date.slice(position1)].join('');
  //     let result2 = [result1.slice(0, position2), dash, result1.slice(position2)].join('');
  //     stay.date = result2;
  //     formattedStays.push(stay);
  //   });
  //
  //   this.upcomingStays = formattedStays;
  // };
};

export default Customer;
