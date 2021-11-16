import { updateData } from './scripts.js';
// import Hotel from './src/classes/Hotel.js';
// import Bookings from './src/classes/Bookings.js';

export const allCustomersPromise = () => {
  return fetch('https://overlookdata.herokuapp.com/api/v1/customers')
  .then(response => response.json())
};


export const singleCustomerPromise = (customerUsername) => {
  return fetch(`https://overlookdata.herokuapp.com/api/v1/customers/${customerUsername}`)
  .then(response => response.json())
};


export const roomPromise = () => {
  return fetch('https://overlookdata.herokuapp.com/api/v1/rooms')
  .then(response => response.json())
};


export const bookingsPromise = () => {
  return fetch('https://overlookdata.herokuapp.com/api/v1/bookings')
  .then(response => response.json())
};


export const bookUserStay = (newStay, event) => {
  fetch('https://overlookdata.herokuapp.com/api/v1/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newStay),
  })
  .then(response => response.json())
  .then(stay => updateData(event))
  .catch(err => console.log(`POST ERROR ${err}`))
}
