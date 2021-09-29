class Hotel {
  constructor(instantiatedBookings, instantiatedRooms) {
    this.allBookings = instantiatedBookings;
    this.allRooms = instantiatedRooms;
    this.roomAvailability = instantiatedRooms;
  };

  filterAvailableRooms(date) {
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
  };

  filterByRoomType(type) {
    let availableTypes = this.roomAvailability.filter((room) => room.roomType === type);

    if (!availableTypes.length) {
      return `There are no ${type}'s available for the dates selected`
    }
    return availableTypes;
  };
};

export default Hotel;
