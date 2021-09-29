import { expect } from 'chai';
import Bookings from '../src/classes/Bookings.js';

describe('Bookings', () => {
  let bookedStay;
  let booking;

  beforeEach(() => {
    bookedStay = {
    id: "1632858762074",
    userID: 50,
    date: "2021/09/22",
    roomNumber: 24
  };

  booking = new Bookings(bookedStay);
  });

  it('Should be a function', () => {
    expect(Bookings).to.be.a('function');
  });

  it('Should be an instance of Bookings', () => {
    expect(booking).to.be.an.instanceof(Bookings);
  });

  it('Should store the booking information as properties', () => {
    expect(booking.id).to.equal("1632858762074");
    expect(booking.userID).to.equal(50);
    expect(booking.date).to.equal("20210922");
    expect(booking.roomNumber).to.equal(24);
  });

  it('Should store other booking information as properties as well', () => {
    expect(booking.id).to.equal("1632858762074");
    expect(booking.userID).to.equal(50);
    expect(booking.date).to.equal("20210922");
    expect(booking.roomNumber).to.equal(24);

    let newInfo = {
    id: "1632866519259",
    userID: 11,
    date: "2021/09/22",
    roomNumber: 2
  };

    booking = new Bookings(newInfo);

    expect(booking.id).to.equal("1632866519259");
    expect(booking.userID).to.equal(11);
    expect(booking.date).to.equal("20210922");
    expect(booking.roomNumber).to.equal(2);
  });

  it('Should remove non-numbers from the date', () => {
    expect(booking.date).to.equal('20210922');
  })
});
