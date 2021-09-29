import { expect } from 'chai';
import Hotel from '../src/classes/Hotel.js';
import Bookings from '../src/classes/Bookings.js';
import Rooms from '../src/classes/Rooms.js';

describe('Hotel', () => {
  let hotel;
  let allBookings;
  let instantiatedBookings;
  let booking;
  let allRooms;
  let instantiatedRooms;
  let room;

  beforeEach(() => {
    allRooms = {
rooms: [
{
number: 1,
roomType: "residential suite",
bidet: true,
bedSize: "queen",
numBeds: 1,
costPerNight: 358.4
},
{
number: 2,
roomType: "suite",
bidet: false,
bedSize: "full",
numBeds: 2,
costPerNight: 477.38
},
{
number: 3,
roomType: "single room",
bidet: false,
bedSize: "king",
numBeds: 1,
costPerNight: 491.14
},
{
number: 4,
roomType: "single room",
bidet: false,
bedSize: "queen",
numBeds: 1,
costPerNight: 429.44
},
{
number: 5,
roomType: "single room",
bidet: true,
bedSize: "queen",
numBeds: 2,
costPerNight: 340.17
},
{
number: 6,
roomType: "junior suite",
bidet: true,
bedSize: "queen",
numBeds: 1,
costPerNight: 397.02
},
{
number: 7,
roomType: "single room",
bidet: false,
bedSize: "queen",
numBeds: 2,
costPerNight: 231.46
},
{
number: 8,
roomType: "junior suite",
bidet: false,
bedSize: "king",
numBeds: 1,
costPerNight: 261.26
},
{
number: 9,
roomType: "single room",
bidet: true,
bedSize: "queen",
numBeds: 1,
costPerNight: 200.39
},
{
number: 10,
roomType: "suite",
bidet: false,
bedSize: "twin",
numBeds: 1,
costPerNight: 497.64
},
{
number: 11,
roomType: "single room",
bidet: true,
bedSize: "twin",
numBeds: 2,
costPerNight: 207.24
},
{
number: 12,
roomType: "single room",
bidet: false,
bedSize: "twin",
numBeds: 2,
costPerNight: 172.09
},
{
number: 13,
roomType: "single room",
bidet: false,
bedSize: "queen",
numBeds: 2,
costPerNight: 423.92
},
{
number: 14,
roomType: "residential suite",
bidet: false,
bedSize: "twin",
numBeds: 1,
costPerNight: 457.88
},
{
number: 15,
roomType: "residential suite",
bidet: false,
bedSize: "full",
numBeds: 1,
costPerNight: 294.56
},
{
number: 16,
roomType: "single room",
bidet: false,
bedSize: "full",
numBeds: 2,
costPerNight: 325.6
},
{
number: 17,
roomType: "junior suite",
bidet: false,
bedSize: "twin",
numBeds: 2,
costPerNight: 328.15
},
{
number: 18,
roomType: "junior suite",
bidet: false,
bedSize: "king",
numBeds: 2,
costPerNight: 496.41
},
{
number: 19,
roomType: "single room",
bidet: false,
bedSize: "queen",
numBeds: 1,
costPerNight: 374.67
},
{
number: 20,
roomType: "residential suite",
bidet: false,
bedSize: "queen",
numBeds: 1,
costPerNight: 343.95
},
{
number: 21,
roomType: "single room",
bidet: false,
bedSize: "full",
numBeds: 2,
costPerNight: 429.32
},
{
number: 22,
roomType: "single room",
bidet: false,
bedSize: "full",
numBeds: 2,
costPerNight: 350.31
},
{
number: 23,
roomType: "residential suite",
bidet: false,
bedSize: "queen",
numBeds: 2,
costPerNight: 176.36
},
{
number: 24,
roomType: "suite",
bidet: false,
bedSize: "queen",
numBeds: 1,
costPerNight: 327.24
},
{
number: 25,
roomType: "single room",
bidet: true,
bedSize: "queen",
numBeds: 1,
costPerNight: 305.85
}
]
};

  instantiatedRooms = [];

  allRooms.rooms.forEach((rm) => {
    room = new Rooms(rm);
    instantiatedRooms.push(room)
  });




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

    hotel = new Hotel(instantiatedBookings, instantiatedRooms);

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

  it('Should accept and store all rooms', () => {
    expect(hotel.allRooms).to.deep.equal([
       {
        number: 1,
        roomType: 'residential suite',
        bidet: true,
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 358.4,
        available: true
      },
       {
        number: 2,
        roomType: 'suite',
        bidet: false,
        bedSize: 'full',
        numBeds: 2,
        costPerNight: 477.38,
        available: true
      },
       {
        number: 3,
        roomType: 'single room',
        bidet: false,
        bedSize: 'king',
        numBeds: 1,
        costPerNight: 491.14,
        available: true
      },
       {
        number: 4,
        roomType: 'single room',
        bidet: false,
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 429.44,
        available: true
      },
       {
        number: 5,
        roomType: 'single room',
        bidet: true,
        bedSize: 'queen',
        numBeds: 2,
        costPerNight: 340.17,
        available: true
      },
       {
        number: 6,
        roomType: 'junior suite',
        bidet: true,
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 397.02,
        available: true
      },
       {
        number: 7,
        roomType: 'single room',
        bidet: false,
        bedSize: 'queen',
        numBeds: 2,
        costPerNight: 231.46,
        available: true
      },
       {
        number: 8,
        roomType: 'junior suite',
        bidet: false,
        bedSize: 'king',
        numBeds: 1,
        costPerNight: 261.26,
        available: true
      },
       {
        number: 9,
        roomType: 'single room',
        bidet: true,
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 200.39,
        available: true
      },
       {
        number: 10,
        roomType: 'suite',
        bidet: false,
        bedSize: 'twin',
        numBeds: 1,
        costPerNight: 497.64,
        available: true
      },
       {
        number: 11,
        roomType: 'single room',
        bidet: true,
        bedSize: 'twin',
        numBeds: 2,
        costPerNight: 207.24,
        available: true
      },
       {
        number: 12,
        roomType: 'single room',
        bidet: false,
        bedSize: 'twin',
        numBeds: 2,
        costPerNight: 172.09,
        available: true
      },
       {
        number: 13,
        roomType: 'single room',
        bidet: false,
        bedSize: 'queen',
        numBeds: 2,
        costPerNight: 423.92,
        available: true
      },
       {
        number: 14,
        roomType: 'residential suite',
        bidet: false,
        bedSize: 'twin',
        numBeds: 1,
        costPerNight: 457.88,
        available: true
      },
       {
        number: 15,
        roomType: 'residential suite',
        bidet: false,
        bedSize: 'full',
        numBeds: 1,
        costPerNight: 294.56,
        available: true
      },
       {
        number: 16,
        roomType: 'single room',
        bidet: false,
        bedSize: 'full',
        numBeds: 2,
        costPerNight: 325.6,
        available: true
      },
       {
        number: 17,
        roomType: 'junior suite',
        bidet: false,
        bedSize: 'twin',
        numBeds: 2,
        costPerNight: 328.15,
        available: true
      },
       {
        number: 18,
        roomType: 'junior suite',
        bidet: false,
        bedSize: 'king',
        numBeds: 2,
        costPerNight: 496.41,
        available: true
      },
       {
        number: 19,
        roomType: 'single room',
        bidet: false,
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 374.67,
        available: true
      },
       {
        number: 20,
        roomType: 'residential suite',
        bidet: false,
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 343.95,
        available: true
      },
       {
        number: 21,
        roomType: 'single room',
        bidet: false,
        bedSize: 'full',
        numBeds: 2,
        costPerNight: 429.32,
        available: true
      },
       {
        number: 22,
        roomType: 'single room',
        bidet: false,
        bedSize: 'full',
        numBeds: 2,
        costPerNight: 350.31,
        available: true
      },
       {
        number: 23,
        roomType: 'residential suite',
        bidet: false,
        bedSize: 'queen',
        numBeds: 2,
        costPerNight: 176.36,
        available: true
      },
       {
        number: 24,
        roomType: 'suite',
        bidet: false,
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 327.24,
        available: true
      },
       {
        number: 25,
        roomType: 'single room',
        bidet: true,
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 305.85,
        available: true
      }
    ])
  });

  it('Should be able to check which rooms are available for a certain date', () => {
    let date = '20211001';

    hotel.filterAvailableRooms(date);

    expect(hotel.roomAvailability).to.deep.equal([
       {
        number: 1,
        roomType: 'residential suite',
        bidet: true,
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 358.4,
        available: true
      },
       {
        number: 2,
        roomType: 'suite',
        bidet: false,
        bedSize: 'full',
        numBeds: 2,
        costPerNight: 477.38,
        available: true
      },
       {
        number: 3,
        roomType: 'single room',
        bidet: false,
        bedSize: 'king',
        numBeds: 1,
        costPerNight: 491.14,
        available: true
      },
       {
        number: 4,
        roomType: 'single room',
        bidet: false,
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 429.44,
        available: true
      },
       {
        number: 5,
        roomType: 'single room',
        bidet: true,
        bedSize: 'queen',
        numBeds: 2,
        costPerNight: 340.17,
        available: true
      },
       {
        number: 6,
        roomType: 'junior suite',
        bidet: true,
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 397.02,
        available: true
      },
       {
        number: 7,
        roomType: 'single room',
        bidet: false,
        bedSize: 'queen',
        numBeds: 2,
        costPerNight: 231.46,
        available: true
      },
       {
        number: 8,
        roomType: 'junior suite',
        bidet: false,
        bedSize: 'king',
        numBeds: 1,
        costPerNight: 261.26,
        available: true
      },
       {
        number: 9,
        roomType: 'single room',
        bidet: true,
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 200.39,
        available: true
      },
       {
        number: 11,
        roomType: 'single room',
        bidet: true,
        bedSize: 'twin',
        numBeds: 2,
        costPerNight: 207.24,
        available: true
      },
       {
        number: 12,
        roomType: 'single room',
        bidet: false,
        bedSize: 'twin',
        numBeds: 2,
        costPerNight: 172.09,
        available: true
      },
       {
        number: 13,
        roomType: 'single room',
        bidet: false,
        bedSize: 'queen',
        numBeds: 2,
        costPerNight: 423.92,
        available: true
      },
       {
        number: 14,
        roomType: 'residential suite',
        bidet: false,
        bedSize: 'twin',
        numBeds: 1,
        costPerNight: 457.88,
        available: true
      },
       {
        number: 15,
        roomType: 'residential suite',
        bidet: false,
        bedSize: 'full',
        numBeds: 1,
        costPerNight: 294.56,
        available: true
      },
       {
        number: 16,
        roomType: 'single room',
        bidet: false,
        bedSize: 'full',
        numBeds: 2,
        costPerNight: 325.6,
        available: true
      },
       {
        number: 17,
        roomType: 'junior suite',
        bidet: false,
        bedSize: 'twin',
        numBeds: 2,
        costPerNight: 328.15,
        available: true
      },
       {
        number: 18,
        roomType: 'junior suite',
        bidet: false,
        bedSize: 'king',
        numBeds: 2,
        costPerNight: 496.41,
        available: true
      },
       {
        number: 19,
        roomType: 'single room',
        bidet: false,
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 374.67,
        available: true
      },
       {
        number: 20,
        roomType: 'residential suite',
        bidet: false,
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 343.95,
        available: true
      },
       {
        number: 21,
        roomType: 'single room',
        bidet: false,
        bedSize: 'full',
        numBeds: 2,
        costPerNight: 429.32,
        available: true
      },
       {
        number: 22,
        roomType: 'single room',
        bidet: false,
        bedSize: 'full',
        numBeds: 2,
        costPerNight: 350.31,
        available: true
      },
       {
        number: 23,
        roomType: 'residential suite',
        bidet: false,
        bedSize: 'queen',
        numBeds: 2,
        costPerNight: 176.36,
        available: true
      },
       {
        number: 25,
        roomType: 'single room',
        bidet: true,
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 305.85,
        available: true
      }
    ]);
  });

  it('Should be able to check rooms available for a different date', () => {
    let date = '20210929';

    hotel.filterAvailableRooms(date);

    expect(hotel.roomAvailability).to.deep.equal([
       {
        number: 1,
        roomType: 'residential suite',
        bidet: true,
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 358.4,
        available: true
      },
       {
        number: 4,
        roomType: 'single room',
        bidet: false,
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 429.44,
        available: true
      },
       {
        number: 5,
        roomType: 'single room',
        bidet: true,
        bedSize: 'queen',
        numBeds: 2,
        costPerNight: 340.17,
        available: true
      },
       {
        number: 6,
        roomType: 'junior suite',
        bidet: true,
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 397.02,
        available: true
      },
       {
        number: 7,
        roomType: 'single room',
        bidet: false,
        bedSize: 'queen',
        numBeds: 2,
        costPerNight: 231.46,
        available: true
      },
       {
        number: 8,
        roomType: 'junior suite',
        bidet: false,
        bedSize: 'king',
        numBeds: 1,
        costPerNight: 261.26,
        available: true
      },
       {
        number: 9,
        roomType: 'single room',
        bidet: true,
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 200.39,
        available: true
      },
       {
        number: 11,
        roomType: 'single room',
        bidet: true,
        bedSize: 'twin',
        numBeds: 2,
        costPerNight: 207.24,
        available: true
      },
       {
        number: 12,
        roomType: 'single room',
        bidet: false,
        bedSize: 'twin',
        numBeds: 2,
        costPerNight: 172.09,
        available: true
      },
       {
        number: 13,
        roomType: 'single room',
        bidet: false,
        bedSize: 'queen',
        numBeds: 2,
        costPerNight: 423.92,
        available: true
      },
       {
        number: 14,
        roomType: 'residential suite',
        bidet: false,
        bedSize: 'twin',
        numBeds: 1,
        costPerNight: 457.88,
        available: true
      },
       {
        number: 15,
        roomType: 'residential suite',
        bidet: false,
        bedSize: 'full',
        numBeds: 1,
        costPerNight: 294.56,
        available: true
      },
       {
        number: 16,
        roomType: 'single room',
        bidet: false,
        bedSize: 'full',
        numBeds: 2,
        costPerNight: 325.6,
        available: true
      },
       {
        number: 17,
        roomType: 'junior suite',
        bidet: false,
        bedSize: 'twin',
        numBeds: 2,
        costPerNight: 328.15,
        available: true
      },
       {
        number: 18,
        roomType: 'junior suite',
        bidet: false,
        bedSize: 'king',
        numBeds: 2,
        costPerNight: 496.41,
        available: true
      },
       {
        number: 19,
        roomType: 'single room',
        bidet: false,
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 374.67,
        available: true
      },
       {
        number: 20,
        roomType: 'residential suite',
        bidet: false,
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 343.95,
        available: true
      },
       {
        number: 21,
        roomType: 'single room',
        bidet: false,
        bedSize: 'full',
        numBeds: 2,
        costPerNight: 429.32,
        available: true
      },
       {
        number: 22,
        roomType: 'single room',
        bidet: false,
        bedSize: 'full',
        numBeds: 2,
        costPerNight: 350.31,
        available: true
      },
       {
        number: 23,
        roomType: 'residential suite',
        bidet: false,
        bedSize: 'queen',
        numBeds: 2,
        costPerNight: 176.36,
        available: true
      },
       {
        number: 24,
        roomType: 'suite',
        bidet: false,
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 327.24,
        available: true
      },
       {
        number: 25,
        roomType: 'single room',
        bidet: true,
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 305.85,
        available: true
      }
    ]);
  });

  it('Should be able to filter available rooms by the room type', () => {
    let date = '20210929';

    hotel.filterAvailableRooms(date);

    expect(hotel.roomAvailability).to.deep.equal([
       {
        number: 1,
        roomType: 'residential suite',
        bidet: true,
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 358.4,
        available: true
      },
       {
        number: 4,
        roomType: 'single room',
        bidet: false,
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 429.44,
        available: true
      },
       {
        number: 5,
        roomType: 'single room',
        bidet: true,
        bedSize: 'queen',
        numBeds: 2,
        costPerNight: 340.17,
        available: true
      },
       {
        number: 6,
        roomType: 'junior suite',
        bidet: true,
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 397.02,
        available: true
      },
       {
        number: 7,
        roomType: 'single room',
        bidet: false,
        bedSize: 'queen',
        numBeds: 2,
        costPerNight: 231.46,
        available: true
      },
       {
        number: 8,
        roomType: 'junior suite',
        bidet: false,
        bedSize: 'king',
        numBeds: 1,
        costPerNight: 261.26,
        available: true
      },
       {
        number: 9,
        roomType: 'single room',
        bidet: true,
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 200.39,
        available: true
      },
       {
        number: 11,
        roomType: 'single room',
        bidet: true,
        bedSize: 'twin',
        numBeds: 2,
        costPerNight: 207.24,
        available: true
      },
       {
        number: 12,
        roomType: 'single room',
        bidet: false,
        bedSize: 'twin',
        numBeds: 2,
        costPerNight: 172.09,
        available: true
      },
       {
        number: 13,
        roomType: 'single room',
        bidet: false,
        bedSize: 'queen',
        numBeds: 2,
        costPerNight: 423.92,
        available: true
      },
       {
        number: 14,
        roomType: 'residential suite',
        bidet: false,
        bedSize: 'twin',
        numBeds: 1,
        costPerNight: 457.88,
        available: true
      },
       {
        number: 15,
        roomType: 'residential suite',
        bidet: false,
        bedSize: 'full',
        numBeds: 1,
        costPerNight: 294.56,
        available: true
      },
       {
        number: 16,
        roomType: 'single room',
        bidet: false,
        bedSize: 'full',
        numBeds: 2,
        costPerNight: 325.6,
        available: true
      },
       {
        number: 17,
        roomType: 'junior suite',
        bidet: false,
        bedSize: 'twin',
        numBeds: 2,
        costPerNight: 328.15,
        available: true
      },
       {
        number: 18,
        roomType: 'junior suite',
        bidet: false,
        bedSize: 'king',
        numBeds: 2,
        costPerNight: 496.41,
        available: true
      },
       {
        number: 19,
        roomType: 'single room',
        bidet: false,
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 374.67,
        available: true
      },
       {
        number: 20,
        roomType: 'residential suite',
        bidet: false,
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 343.95,
        available: true
      },
       {
        number: 21,
        roomType: 'single room',
        bidet: false,
        bedSize: 'full',
        numBeds: 2,
        costPerNight: 429.32,
        available: true
      },
       {
        number: 22,
        roomType: 'single room',
        bidet: false,
        bedSize: 'full',
        numBeds: 2,
        costPerNight: 350.31,
        available: true
      },
       {
        number: 23,
        roomType: 'residential suite',
        bidet: false,
        bedSize: 'queen',
        numBeds: 2,
        costPerNight: 176.36,
        available: true
      },
       {
        number: 24,
        roomType: 'suite',
        bidet: false,
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 327.24,
        available: true
      },
       {
        number: 25,
        roomType: 'single room',
        bidet: true,
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 305.85,
        available: true
      }
    ]);

    let type = 'residential suite';

    expect(hotel.filterByRoomType(type)).to.deep.equal([
       {
        number: 1,
        roomType: 'residential suite',
        bidet: true,
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 358.4,
        available: true
      },
       {
        number: 14,
        roomType: 'residential suite',
        bidet: false,
        bedSize: 'twin',
        numBeds: 1,
        costPerNight: 457.88,
        available: true
      },
       {
        number: 15,
        roomType: 'residential suite',
        bidet: false,
        bedSize: 'full',
        numBeds: 1,
        costPerNight: 294.56,
        available: true
      },
       {
        number: 20,
        roomType: 'residential suite',
        bidet: false,
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 343.95,
        available: true
      },
       {
        number: 23,
        roomType: 'residential suite',
        bidet: false,
        bedSize: 'queen',
        numBeds: 2,
        costPerNight: 176.36,
        available: true
      }
    ]);

  });
});
