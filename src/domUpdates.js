let domUpdates = {
  populateUserInfo(customer) {
    userWelcome.innerText = `Welcome ${customer.name}!`;
    userTotalSpent.innerText = `Total Spent: ${customer.totalSpent}`;
  },

  populateUpcomingStays(customer) {
    gridContainer.innerHTML = ``;

    customer.bookedStays.forEach((stay) => {
      gridContainer.innerHTML += `
        <section class="grid-item" id="${stay.id}">
          <p>${stay.date}</p>
          <p>Room: ${stay.roomNumber}</p>
        </section>
      `;
    })
  }
};

export default domUpdates;
