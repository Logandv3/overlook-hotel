import { expect } from 'chai';
import Room from '../src/classes/Rooms.js';

describe('Room', () => {
  let room;
  let roomInfo;

  beforeEach(() => {
    roomInfo =   {
    "number": 1,
    "roomType": "residential suite",
    "bidet": true,
    "bedSize": "queen",
    "numBeds": 1,
    "costPerNight": 358.4
    };

    room = new Room(roomInfo);
  });

  it('Should be a function', () => {
    expect(Room).to.be.a('function');
  });

  it('Should be an instance of Room', () => {
    expect(room).to.be.an.instanceof(Room);
  });

  it('Should instantiate with room information', () => {
    expect(room.number).to.equal(1);
    expect(room.roomType).to.equal('residential suite');
    expect(room.bidet).to.equal(true);
    expect(room.bedSize).to.equal('queen');
    expect(room.numBeds).to.equal(1);
    expect(room.costPerNight).to.equal(358.4);
  });
});
