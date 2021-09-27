export const allCustomersPromise = () => {
  return fetch('http://localhost:3001/api/v1/customers')
  .then(response => response.json())
};

export const singleCustomerPromise = () => {
  return fetch('http://localhost:3001/api/v1/customers/<id>')
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
