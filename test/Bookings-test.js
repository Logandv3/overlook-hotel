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
//     allBookings = {
//       bookings: [{
// id: "1632858762074",
// userID: 50,
// date: "2021/09/22",
// roomNumber: 24
// },
// {
// id: "1632866519259",
// userID: 11,
// date: "2021/09/22",
// roomNumber: 2
// },
// {
// id: "1632870007638",
// userID: 11,
// date: "2021/09/22",
// roomNumber: 25
// },
// {
// id: "1632870334837",
// userID: 11,
// date: "2021/09/22",
// roomNumber: 23
// },
// {
// id: "1632870778277",
// userID: 11,
// date: "2021/09/22",
// roomNumber: 6
// },
// {
// id: "1632870840979",
// userID: 11,
// date: "2021/09/22",
// roomNumber: 16
// },
// {
// id: "1632873474190",
// userID: 11,
// date: "2021/09/22",
// roomNumber: 3
// },
// {
// id: "1632873487552",
// userID: 11,
// date: "2021/09/22",
// roomNumber: 4
// },
// {
// id: "1632878566516",
// userID: 50,
// date: "2021/09/28",
// roomNumber: 3
// },
// {
// id: "1632885779474",
// userID: 11,
// date: "2021/09/29",
// roomNumber: 10
// },
// {
// id: "1632886401358",
// userID: 11,
// date: "2021/09/29",
// roomNumber: 2
// },
// {
// id: "1632886526392",
// userID: 11,
// date: "2021/10/01",
// roomNumber: 24
// },
// {
// id: "1632886744809",
// userID: 11,
// date: "2021/10/01",
// roomNumber: 10
// },
// {
// id: "1632932346114",
// userID: 5,
// date: "2021/09/29",
// roomNumber: 3
// }]
// };

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
    expect(booking.date).to.equal("2021/09/22");
    expect(booking.roomNumber).to.equal(24);
  });

  it('Should store other booking information as properties as well', () => {
    expect(booking.id).to.equal("1632858762074");
    expect(booking.userID).to.equal(50);
    expect(booking.date).to.equal("2021/09/22");
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
    expect(booking.date).to.equal("2021/09/22");
    expect(booking.roomNumber).to.equal(2);
  });
});
