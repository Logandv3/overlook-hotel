import { expect } from 'chai';
import Customer from '../src/classes/Customer.js'

describe('Customer', () => {
  let customer;
  let customerInfo;
  let customerBookings;
  let roomInfo;
  beforeEach(() => {
    customerInfo = {
    "id": 13,
    "name": "Christina Kulas"
    };
    customerBookings = [
    {
      "id": "5fwrgu4i7k55hl6xe",
      "userID": 7,
      "date": "2020/02/12",
      "roomNumber": 8,
      "roomServiceCharges": []
    },
    {
  "id": "5fwrgu4i7k55hl6te",
  "userID": 44,
  "date": "2020/01/19",
  "roomNumber": 8,
  "roomServiceCharges": []
    },
    {
    "id": "5fwrgu4i7k55hl6t6",
    "userID": 13,
    "date": "2020/01/10",
    "roomNumber": 12,
    "roomServiceCharges": []
  },
  {
    "id": "5fwrgu4i7k55hl6vh",
    "userID": 13,
    "date": "2020/02/19",
    "roomNumber": 1,
    "roomServiceCharges": []
  },
  {
    "id": "5fwrgu4i7k55hl6ww",
    "userID": 13,
    "date": "2020/01/19",
    "roomNumber": 20,
    "roomServiceCharges": []
  },
  {
  "id": "5fwrgu4i7k55hl6tl",
  "userID": 3,
  "date": "2020/01/10",
  "roomNumber": 8,
  "roomServiceCharges": []
},
  {
    "id": "5fwrgu4i7k55hl6xd",
    "userID": 13,
    "date": "2020/02/05",
    "roomNumber": 13,
    "roomServiceCharges": []
  }];
  roomInfo = [
    {
    "number": 1,
    "roomType": "residential suite",
    "bidet": true,
    "bedSize": "queen",
    "numBeds": 1,
    "costPerNight": 358.4
  },
  {
    "number": 2,
    "roomType": "suite",
    "bidet": false,
    "bedSize": "full",
    "numBeds": 2,
    "costPerNight": 477.38
  },
  {
    "number": 3,
    "roomType": "single room",
    "bidet": false,
    "bedSize": "king",
    "numBeds": 1,
    "costPerNight": 491.14
  },
  {
    "number": 4,
    "roomType": "single room",
    "bidet": false,
    "bedSize": "queen",
    "numBeds": 1,
    "costPerNight": 429.44
  },
  {
    "number": 5,
    "roomType": "single room",
    "bidet": true,
    "bedSize": "queen",
    "numBeds": 2,
    "costPerNight": 340.17
  },
  {
    "number": 6,
    "roomType": "junior suite",
    "bidet": true,
    "bedSize": "queen",
    "numBeds": 1,
    "costPerNight": 397.02
  },
  {
    "number": 7,
    "roomType": "single room",
    "bidet": false,
    "bedSize": "queen",
    "numBeds": 2,
    "costPerNight": 231.46
  },
  {
    "number": 8,
    "roomType": "junior suite",
    "bidet": false,
    "bedSize": "king",
    "numBeds": 1,
    "costPerNight": 261.26
  },
  {
    "number": 9,
    "roomType": "single room",
    "bidet": true,
    "bedSize": "queen",
    "numBeds": 1,
    "costPerNight": 200.39
  },
  {
    "number": 10,
    "roomType": "suite",
    "bidet": false,
    "bedSize": "twin",
    "numBeds": 1,
    "costPerNight": 497.64
  },
  {
    "number": 11,
    "roomType": "single room",
    "bidet": true,
    "bedSize": "twin",
    "numBeds": 2,
    "costPerNight": 207.24
  },
  {
    "number": 12,
    "roomType": "single room",
    "bidet": false,
    "bedSize": "twin",
    "numBeds": 2,
    "costPerNight": 172.09
  },
  {
    "number": 13,
    "roomType": "single room",
    "bidet": false,
    "bedSize": "queen",
    "numBeds": 2,
    "costPerNight": 423.92
  },
  {
    "number": 14,
    "roomType": "residential suite",
    "bidet": false,
    "bedSize": "twin",
    "numBeds": 1,
    "costPerNight": 457.88
  },
  {
  "number": 20,
  "roomType": "residential suite",
  "bidet": false,
  "bedSize": "queen",
  "numBeds": 1,
  "costPerNight": 343.95
}
  ];

    customer = new Customer(customerInfo, customerBookings, roomInfo);
  });

  it('Should be a function', () => {
    expect(Customer).to.be.a('function');
  });

  it('Should be an instance of Customer', () => {
    expect(customer).to.be.an.instanceof(Customer);
  });

  it('Should be instantiated with customer data', () => {
    expect(customer.id).to.equal(13);
    expect(customer.name).to.equal("Christina Kulas");
  });

  it('Should be able to filter stays that have been booked', () => {
    customer.filterCustomerBookings(customerBookings);
    expect(customer.bookedStays).to.deep.equal([
    {
    "id": "5fwrgu4i7k55hl6t6",
    "userID": 13,
    "date": "2020/01/10",
    "roomNumber": 12,
    "roomServiceCharges": []
  },
  {
    "id": "5fwrgu4i7k55hl6vh",
    "userID": 13,
    "date": "2020/02/19",
    "roomNumber": 1,
    "roomServiceCharges": []
  },
  {
    "id": "5fwrgu4i7k55hl6ww",
    "userID": 13,
    "date": "2020/01/19",
    "roomNumber": 20,
    "roomServiceCharges": []
  },
  {
    "id": "5fwrgu4i7k55hl6xd",
    "userID": 13,
    "date": "2020/02/05",
    "roomNumber": 13,
    "roomServiceCharges": []
  }]);
  });

  it('Should be able to calculate the total money spent on rooms so far', () => {
    customer.filterCustomerBookings(customerBookings);
    customer.calculateTotalSpent(roomInfo);
    expect(customer.totalSpent).to.equal(1298.36);
  });
});
