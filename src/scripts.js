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
const checkinDate = document.getElementById('checkinDate');
const checkoutDate = document.getElementById('checkoutDate');
const roomType = document.getElementById('roomType');

const roomDisplayHeading = document.getElementById('roomDisplayHeading');
const roomDisplayArea = document.getElementById('roomDisplayArea');
const noResultsMsg = document.getElementById('noResultsMsg');


window.addEventListener('load', getData);

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
  let customer = new Customer(customerInfo, bookingInfo, roomInfo);
  console.log(customer);
}
