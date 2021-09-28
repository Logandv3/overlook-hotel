// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import Customer from './classes/Customer';
import Room from './classes/Rooms';
import { allCustomersPromise, singleCustomerPromise, roomPromise, bookingsPromise, bookUserStay } from './apiCalls';
import domUpdates from './domUpdates';

const loginContainer = document.getElementById('loginContainer');
const username = document.getElementById('username');
const password = document.getElementById('password');
const loginBtn = document.getElementById('loginBtn');
const navigation = document.getElementById('navigation');
const loginError = document.getElementById('loginError');
const loginError2 = document.getElementById('loginError2');

const userInfoContainer = document.getElementById('userInfoContainer');
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
const backToResults = document.getElementById('backToResults');
const upcomingStaysBtn = document.getElementById('upcomingStaysBtn');
const noResultsMsg = document.getElementById('noResultsMsg');
const indRoom = document.getElementById('indRoom');

let separatedData;
let roomsOnDashboard;
let customer;


// window.addEventListener('load', getData);
searchRoomsBtn.addEventListener('click', filterAvailableRooms);
gridContainer.addEventListener('click', findRoom);
backToResults.addEventListener('click', hideView);
indRoom.addEventListener('click', bookRoom);
upcomingStaysBtn.addEventListener('click', hideView);
loginBtn.addEventListener('click', checkLoginInfo);

function getData(singleCustomer) {
  gatherData(singleCustomer);
};

export const updateData = () => {
  let updateSignal = 1;
  gatherData(customer.id, updateSignal);
  hideView();
};

function gatherData(singleCustomer, updateSignal) {
  let apiRoomInfo = roomPromise()
  .then(data => data)
  .catch(error => console.log(`API room error: ${error.message}`))
  let apiBookingInfo = bookingsPromise()
  .then(data => data)
  .catch(error => console.log(`API bookings error: ${error.message}`))

  if (!updateSignal) {
    let apiCustomerInfo = singleCustomer;
    Promise.all([apiRoomInfo, apiBookingInfo])
    .then(data => organizeData(data, apiCustomerInfo))

  } else {
    let apiCustomerInfo = singleCustomerPromise(singleCustomer)
    .then(data => data)
    .catch(error => console.log(`API customer error: ${error.message}`))
    Promise.all([apiCustomerInfo, apiRoomInfo, apiBookingInfo])
    .then(data => organizeData(data))
  };
};

function organizeData(data, apiCustomerInfo) {
  if (!apiCustomerInfo) {
    let customerInfo = data[0];
    let roomInfo = data[1];
    let bookingInfo = data[2];

    initializeData(customerInfo, roomInfo, bookingInfo);
  } else if (apiCustomerInfo) {
    let customerInfo = apiCustomerInfo;
    let roomInfo = data[0];
    let bookingInfo = data[1];

    initializeData(customerInfo, roomInfo, bookingInfo);
  };
};

function initializeData(customerInfo, roomInfo, bookingInfo) {
  separatedData = [customerInfo, roomInfo, bookingInfo];

  customer = new Customer(customerInfo, bookingInfo, roomInfo);

  domUpdates.populateUserInfo(customer);
  domUpdates.populateUpcomingStays(customer);
  domUpdates.populateRoomTypeDropDwn(roomInfo);
};

function createRooms(roomsToCreate) {
  let instantiatedRooms = roomsToCreate.map((room) => {
    let createdRoom = new Room(room);
    return createdRoom;
  });

    domUpdates.populateFilteredRooms(instantiatedRooms, gridContainer, roomDisplayHeading, upcomingStaysBtn);
    roomsOnDashboard = instantiatedRooms;
};

function filterAvailableRooms() {
if (!checkinDate.value || !checkoutDate.value) {
    domUpdates.show(dateError);
    return
  };

  let allRoomInfo = separatedData[1];
  let allBookingInfo = separatedData[2];
  let roomNumbersAdded = [];

  let availableRooms = allRoomInfo.rooms.reduce((arr, room) => {
    allBookingInfo.bookings.forEach((booking) => {
      let parsedBookingDate = booking.date.replaceAll('/', '');
      let parsedCheckinDate = checkinDate.value.replaceAll('-', '');
      roomNumbersAdded;
      if (!roomNumbersAdded.includes(room.number) && booking.roomNumber === room.number && parsedCheckinDate !== parsedBookingDate) {
        arr.push(room);
        roomNumbersAdded.push(room.number);
      };
    });
    return arr;
  }, []);

  if (roomType.value !== 'All') {
    let filteredByType = availableRooms.filter((room) => room.roomType === roomType.value);
    if (!filteredByType.length) {
      domUpdates.show(noResultsMsg);
    }
    createRooms(filteredByType);

  } else if (roomType.value === 'All') {
    if (!availableRooms.length) {
      domUpdates.show(noResultsMsg);
    }
    createRooms(availableRooms);
  };
};

function findRoom(event) {
  if (event.target.id !== 'gridContainer') {
    let roomId = event.target.id;
    domUpdates.populateIndividualRoom(roomId, gridContainer, indRoom, roomsOnDashboard, backToResults);
  };
};

function hideView(event) {
  if (event.target.id === 'upcomingStaysBtn') {
      domUpdates.hide(backToResults);
      domUpdates.hide(indRoom);
      domUpdates.hide(upcomingStaysBtn);
      domUpdates.show(gridContainer);
      domUpdates.populateUpcomingStays(customer);
  };
    domUpdates.hide(indRoom);
    domUpdates.hide(backToResults);
    domUpdates.hide(loginContainer);
    domUpdates.show(gridContainer);
    domUpdates.show(userInfoContainer);
    domUpdates.show(navigation);
    domUpdates.show(roomDisplayHeading);
    domUpdates.show(roomDisplayArea);
};

function bookRoom() {
  if (event.target.id === 'bookNow') {
    let newDate = checkinDate.value.replaceAll('-', '/')
    let parsedRoomNumber = parseInt(event.target.name);
    console.log(parsedRoomNumber)
    console.log(typeof parsedRoomNumber)
     let newBooking = {
       userID: customer.id,
       date: newDate,
       roomNumber: parsedRoomNumber
     }
     bookUserStay(newBooking);
  };
};

function checkLoginInfo(event) {
  if (username.value && password.value) {
    event.preventDefault();
    collectUserInfo(username.value, password.value, event);

  } else if (!username.value || !password.value) {
    event.preventDefault();
    domUpdates.show(loginError);
  };
};

async function collectUserInfo(customerUsername, customerPassword, event) {
  if (customerPassword !== 'overlook2021') {
    domUpdates.show(loginError2);
  } else if (customerPassword === 'overlook2021') {
      customerUsername = customerUsername.replace(/\D/g, '');
      let custPromise = singleCustomerPromise(customerUsername);
      let result = await custPromise;

      verifyUser(result, customerUsername, event);
  };
};

function verifyUser(result, customerUsername, event) {
  if (result.id === parseInt(customerUsername)) {
    getData(result);
    hideView(event);
  } else {
    domUpdates.show(loginError2);
  }
};
