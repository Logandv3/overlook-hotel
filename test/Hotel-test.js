import { expect } from 'chai';
import Hotel from '../src/classes/Hotel.js';
import Bookings from '../src/classes/Bookings.js';

describe('Hotel', () => {
  let hotel;
  let allBookings;
  let instantiatedBookings;
  let booking;

  beforeEach(() => {

    allBookings = {
      bookings: [{
    id: "1632858762074",
    userID: 50,
    date: "2021/09/22",
    roomNumber: 24
    },
    {
    id: "1632866519259",
    userID: 11,
    date: "2021/09/22",
    roomNumber: 2
    },
    {
    id: "1632870007638",
    userID: 11,
    date: "2021/09/22",
    roomNumber: 25
    },
    {
    id: "1632870334837",
    userID: 11,
    date: "2021/09/22",
    roomNumber: 23
    },
    {
    id: "1632870778277",
    userID: 11,
    date: "2021/09/22",
    roomNumber: 6
    },
    {
    id: "1632870840979",
    userID: 11,
    date: "2021/09/22",
    roomNumber: 16
    },
    {
    id: "1632873474190",
    userID: 11,
    date: "2021/09/22",
    roomNumber: 3
    },
    {
    id: "1632873487552",
    userID: 11,
    date: "2021/09/22",
    roomNumber: 4
    },
    {
    id: "1632878566516",
    userID: 50,
    date: "2021/09/28",
    roomNumber: 3
    },
    {
    id: "1632885779474",
    userID: 11,
    date: "2021/09/29",
    roomNumber: 10
    },
    {
    id: "1632886401358",
    userID: 11,
    date: "2021/09/29",
    roomNumber: 2
    },
    {
    id: "1632886526392",
    userID: 11,
    date: "2021/10/01",
    roomNumber: 24
    },
    {
    id: "1632886744809",
    userID: 11,
    date: "2021/10/01",
    roomNumber: 10
    },
    {
    id: "1632932346114",
    userID: 5,
    date: "2021/09/29",
    roomNumber: 3
    }]
  };
    instantiatedBookings = [];

    allBookings.bookings.forEach((bookedStay) => {
      booking = new Bookings(bookedStay);
      instantiatedBookings.push(booking)
    });

    hotel = new Hotel(instantiatedBookings);

  });

  it('Should be a function', () => {
    expect(Hotel).to.be.a('function');
  });

  it('Should be an instance of Hotel', () => {
    expect(hotel).to.be.an.instanceOf(Hotel);
  });

  it('Should accept and store all bookings made', () => {
    expect(hotel.allBookings).to.deep.equal([{
id: "1632858762074",
userID: 50,
date: "20210922",
roomNumber: 24
},
{
id: "1632866519259",
userID: 11,
date: "20210922",
roomNumber: 2
},
{
id: "1632870007638",
userID: 11,
date: "20210922",
roomNumber: 25
},
{
id: "1632870334837",
userID: 11,
date: "20210922",
roomNumber: 23
},
{
id: "1632870778277",
userID: 11,
date: "20210922",
roomNumber: 6
},
{
id: "1632870840979",
userID: 11,
date: "20210922",
roomNumber: 16
},
{
id: "1632873474190",
userID: 11,
date: "20210922",
roomNumber: 3
},
{
id: "1632873487552",
userID: 11,
date: "20210922",
roomNumber: 4
},
{
id: "1632878566516",
userID: 50,
date: "20210928",
roomNumber: 3
},
{
id: "1632885779474",
userID: 11,
date: "20210929",
roomNumber: 10
},
{
id: "1632886401358",
userID: 11,
date: "20210929",
roomNumber: 2
},
{
id: "1632886526392",
userID: 11,
date: "20211001",
roomNumber: 24
},
{
id: "1632886744809",
userID: 11,
date: "20211001",
roomNumber: 10
},
{
id: "1632932346114",
userID: 5,
date: "20210929",
roomNumber: 3
}]);
  });

  it('Should be able to check which rooms are available for a certain date', () => {
    let date = '20211001';

    hotel.filterAvailableRooms(date);

    expect(hotel.roomAvailability).to.deep.equal([1,2,3,4,5,6,7,8,9,11,12,13,14,15,16,17,18,19,20,21,22,23,25]);
  });

  it('Should be able to check rooms available for a different date', () => {
    let date = '20210929';

    hotel.filterAvailableRooms(date);

    expect(hotel.roomAvailability).to.deep.equal([1,4,5,6,7,8,9,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25]);
  });
});
