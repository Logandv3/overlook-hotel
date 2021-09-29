class Hotel {
  constructor(instantiatedBookings) {
    this.allBookings = instantiatedBookings;
    this.roomAvailability = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25];
  };
  filterAvailableRooms(date) {
    this.roomAvailability = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25];

    let unavailableRooms = this.allBookings.reduce((arr, room) => {
      if (room.date === date) {
        arr.push(room.roomNumber)
      }
      return arr;
    }, []);

    unavailableRooms.forEach((unavail) => {
      if (this.roomAvailability.includes(unavail)) {
        let index = this.roomAvailability.indexOf(unavail);
        this.roomAvailability.splice(index, 1);
      };
    });
  };
};

export default Hotel;
