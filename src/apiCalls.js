import { updateData } from './scripts.js';

export const allCustomersPromise = () => {
  return fetch('http://localhost:3001/api/v1/customers')
  .then(response => response.json())
};

export const singleCustomerPromise = () => {
  return fetch(`http://localhost:3001/api/v1/customers/1`)
  .then(response => response.json())
};

export const roomPromise = () => {
  return fetch('http://localhost:3001/api/v1/rooms')
  .then(response => response.json())
};

export const bookingsPromise = () => {
  return fetch('http://localhost:3001/api/v1/bookings')
  .then(response => response.json())
};

export const bookUserStay = (newStay) => {
  fetch('http://localhost:3001/api/v1/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newStay),
  })
  .then(response => response.json())
  .then(stay => updateData())
  .catch(err => console.log(`POST ERROR ${err}`))
}
