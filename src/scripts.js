// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import Customer from './classes/Customer';
import Room from './classes/Rooms';
import { allCustomersPromise, singleCustomerPromise, roomPromise, bookingsPromise } from './apiCalls';
import domUpdates from './domUpdates';

const userWelcome = document.getElementById('userWelcome');
const userTotalSpent = document.getElementById('userTotalSpent');
const dateError = document.getElementById('dateError');
const checkinDate = document.getElementById('checkinDate');
const checkoutDate = document.getElementById('checkoutDate');
const roomTypeForm = document.getElementById('roomTypeForm');
const roomType = document.getElementById('roomType');
const searchRoomsBtn = document.getElementById('searchRoomsBtn');

const roomDisplayHeading = document.getElementById('roomDisplayHeading');
const roomDisplayArea = document.getElementById('roomDisplayArea');
const noResultsMsg = document.getElementById('noResultsMsg');

let separatedData;


window.addEventListener('load', getData);
searchRoomsBtn.addEventListener('click', filterAvailableRooms);
// roomType.addEventListener('click', getRoomTypeValue);

function getData() {
  gatherData();
};

function gatherData() {
  let apiCustomerInfo = singleCustomerPromise()
  .then(data => data)
  .catch(error => console.log(`API customer error: ${error.message}`))
  let apiRoomInfo = roomPromise()
  .then(data => data)
  .catch(error => console.log(`API room error: ${error.message}`))
  let apiBookingInfo = bookingsPromise()
  .then(data => data)
  .catch(error => console.log(`API bookings error: ${error.message}`))
  Promise.all([apiCustomerInfo, apiRoomInfo, apiBookingInfo])
  .then(data => initializeData(data))
};

function initializeData(data) {
  let customerInfo = data[0];
  let roomInfo = data[1];
  let bookingInfo = data[2];
  separatedData = [customerInfo, roomInfo, bookingInfo];

  let customer = new Customer(customerInfo, bookingInfo, roomInfo);
  domUpdates.populateUserInfo(customer);
  domUpdates.populateUpcomingStays(customer);
  domUpdates.populateRoomTypeDropDwn(roomInfo);
};

function createRooms(roomsToCreate) {
  let instantiatedRooms = roomsToCreate.map((room) => {
    let createdRoom = new Room(room);
    return createdRoom;
  });

    domUpdates.populateFilteredRooms(instantiatedRooms, gridContainer);
};

function filterAvailableRooms() {
  // This fcn will look at the info the user has entered and find which rooms
  // are available.  It will invoke another fcn that will display those rooms.

  // input: checkinDate(date as string), checkoutDate(date as string),
  //        roomType(string)

  // output: array with available rooms(objects)
  //         invoke fcn to show rooms.

  if (!checkinDate.value || !checkoutDate.value) {
    domUpdates.show(dateError);
    return
  };

  let allRoomInfo = separatedData[1];
  let allBookingInfo = separatedData[2];
  let roomNumbersAdded = [];
  let availableRooms = allRoomInfo.rooms.reduce((arr, room) => {
    allBookingInfo.bookings.forEach((booking) => {
      let parsedBookingDate = booking.date.replace(/\D/g, '');
      let parsedCheckinDate = checkinDate.value.replace(/\D/g, '');
      roomNumbersAdded;
      if (!roomNumbersAdded.includes(room.number) && booking.roomNumber === room.number && parsedCheckinDate !== parsedBookingDate) {
        arr.push(room);
        roomNumbersAdded.push(room.number);
      };
    });
    return arr;
  }, []);

  let identifier = 'filter';

  if (roomType.value !== 'All') {
    let filteredByType = availableRooms.filter((room) => room.roomType === roomType.value);
    createRooms(filteredByType);
    // domUpdates.populateFilteredRooms(filteredByType);

  } else if (roomType.value === 'All') {
    // domUpdates.populateFilteredRooms(availableRooms);
  };
};
