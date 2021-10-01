class Rooms {
  constructor(roomInfo) {
    this.number = roomInfo.number;
    this.roomType = roomInfo.roomType;
    this.bidet = roomInfo.bidet;
    this.bedSize = roomInfo.bedSize;
    this.numBeds = roomInfo.numBeds;
    this.costPerNight = roomInfo.costPerNight;
    this.available = true;
  };
};

export default Rooms;
