// Import files
import './css/base.scss';
import Customer from '../src/classes/Customer';
import Rooms from '../src/classes/Rooms';
import Bookings from '../src/classes/Bookings';
import Hotel from '../src/classes/Hotel';
import { allCustomersPromise, singleCustomerPromise, roomPromise, bookingsPromise, bookUserStay } from './apiCalls';
import domUpdates from './domUpdates';


// Login Selectors
const loginContainer = document.getElementById('loginContainer');
const loginError = document.getElementById('loginError');
const loginError2 = document.getElementById('loginError2');
const username = document.getElementById('username');
const password = document.getElementById('password');
const loginBtn = document.getElementById('loginBtn');


// User & Navigation Selectors
const userInfoContainer = document.getElementById('userInfoContainer');
const userWelcome = document.getElementById('userWelcome');
const userTotalSpent = document.getElementById('userTotalSpent');
const navigation = document.getElementById('navigation');
const dateError = document.getElementById('dateError');
const checkinDate = document.getElementById('checkinDate');
const checkoutDate = document.getElementById('checkoutDate');
const searchRoomsBtn = document.getElementById('searchRoomsBtn');
const roomTypeForm = document.getElementById('roomTypeForm');
const roomType = document.getElementById('roomType');


// Room & Stay Information Selectors
const roomDisplayHeading = document.getElementById('roomDisplayHeading');
const roomDisplayArea = document.getElementById('roomDisplayArea');
const backToResults = document.getElementById('backToResults');
const upcomingStaysBtn = document.getElementById('upcomingStaysBtn');
const pastStaysBtn = document.getElementById('pastStaysBtn');
const noResultsMsg = document.getElementById('noResultsMsg');
const indRoom = document.getElementById('indRoom');


// Global variables/ Data Model
let separatedData;
let roomsOnDashboard;
let customer;
let hotel;


// Event Listeners
searchRoomsBtn.addEventListener('click', function() {
  hotel.filterAvailableRooms(checkinDate, checkoutDate, roomType.value, gridContainer, roomDisplayHeading, upcomingStaysBtn, noResultsMsg, dateError, pastStaysBtn)
});
gridContainer.addEventListener('click', findRoom);
backToResults.addEventListener('click', hideView);
indRoom.addEventListener('click', bookRoom);
upcomingStaysBtn.addEventListener('click', hideView);
pastStaysBtn.addEventListener('click', function() {
  domUpdates.determineTypeOfStay(customer, pastStaysBtn, upcomingStaysBtn, event)
});
loginBtn.addEventListener('click', checkLoginInfo);


// Data Aquisition & Organization
function getData(singleCustomer, event) {
  let updateSignal = null;
  gatherData(singleCustomer, updateSignal, event);
};


export const updateData = (event) => {
  let updateSignal = 1;
  gatherData(customer.id, updateSignal, event);
  hideView(event);
};


function gatherData(singleCustomer, updateSignal, event) {
  let apiRoomInfo = roomPromise()
  .then(data => data)
  .catch(error => console.log(`API room error: ${error.message}`))
  let apiBookingInfo = bookingsPromise()
  .then(data => data)
  .catch(error => console.log(`API bookings error: ${error.message}`))

  if (updateSignal === null) {
    let apiCustomerInfo = singleCustomer;
    Promise.all([apiRoomInfo, apiBookingInfo])
    .then(data => organizeData(data, apiCustomerInfo, event))

  } else {
    let apiCustomerInfo = singleCustomerPromise(singleCustomer)
    .then(data => data)
    .catch(error => console.log(`API customer error: ${error.message}`))
    Promise.all([apiCustomerInfo, apiRoomInfo, apiBookingInfo])
    .then(data => organizeData(data))
  };
};


function organizeData(data, apiCustomerInfo, event) {
  if (!apiCustomerInfo) {
    let customerInfo = data[0];
    let roomInfo = data[1];
    let bookingInfo = data[2];

    initializeData(customerInfo, roomInfo, bookingInfo);

  } else if (apiCustomerInfo) {
    let customerInfo = apiCustomerInfo;
    let roomInfo = data[0];
    let bookingInfo = data[1];

    initializeData(customerInfo, roomInfo, bookingInfo, event);
  };
};


// Create Objects/ Data Model
function instantiateClasses(customerInfo, roomInfo, bookingInfo) {
  let currentDate = getCurrentDate();

  let instantiatedRooms = [];
  roomInfo.rooms.forEach((rm) => {
    let room = new Rooms(rm);
    instantiatedRooms.push(room)
  });


  let instantiatedBookings = [];
  bookingInfo.bookings.forEach((bookedStay) => {
    let booking = new Bookings(bookedStay);
    instantiatedBookings.push(booking)
  });

  customer = new Customer(customerInfo, instantiatedBookings, instantiatedRooms, currentDate);
  hotel = new Hotel(instantiatedBookings, instantiatedRooms);
};


function getCurrentDate() {
  let date = new Date()
  let day = String(date.getDate()+1).padStart(2, "0");
  let year = date.getFullYear();
  let month = String(date.getMonth()+1).padStart(2, "0");


  let completeDate = `${year}${month}${day}`;
  return parseInt(completeDate);
};


function initializeData(customerInfo, roomInfo, bookingInfo, event) {
  separatedData = [customerInfo, roomInfo, bookingInfo];

  instantiateClasses(customerInfo, roomInfo, bookingInfo);

  domUpdates.populateUserInfo(customer);
  domUpdates.determineTypeOfStay(customer, pastStaysBtn, upcomingStaysBtn, event);
  domUpdates.populateRoomTypeDropDwn(roomInfo);
};


// Customer Login Verification
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
    getData(result, event);
    hideView(event);

  } else {
    domUpdates.show(loginError2);
  }
};


// Navigate DOM
function findRoom(event) {
  if (event.target.id !== 'gridContainer' && roomDisplayHeading.innerText === 'Available Rooms') {
    let roomId = event.target.parentNode.id;
    domUpdates.populateIndividualRoom(roomId, gridContainer, indRoom, hotel.allRooms, backToResults);
  };
};


function hideView(event) {
  if (event.target.id === 'upcomingStaysBtn') {
    domUpdates.hide(backToResults);
    domUpdates.hide(indRoom);
    domUpdates.hide(upcomingStaysBtn);
    domUpdates.show(pastStaysBtn);
    domUpdates.show(gridContainer);
    domUpdates.determineTypeOfStay(customer, pastStaysBtn, upcomingStaysBtn, event);

  } else if (event.target.id === 'loginBtn') {
    domUpdates.hide(upcomingStaysBtn);
    domUpdates.show(pastStaysBtn);
    domUpdates.hide(loginContainer);
    domUpdates.show(gridContainer);
    domUpdates.show(userInfoContainer);
    domUpdates.show(navigation);
    domUpdates.show(roomDisplayHeading);
    domUpdates.show(roomDisplayArea);

  } else {
    domUpdates.hide(indRoom);
    domUpdates.hide(backToResults);
    domUpdates.show(gridContainer);
  };
};


// Update Data Model/ API
function bookRoom(event) {
  if (event.target.id === 'bookNow') {
    let newDate = checkinDate.value.replaceAll('-', '/')
    let parsedRoomNumber = parseInt(event.target.value);

     let newBooking = {
       userID: customer.id,
       date: newDate,
       roomNumber: parsedRoomNumber
     };
     bookUserStay(newBooking, event);
  };
};
