// Select elements
const form = document.querySelector(".booking-form");
const bookingsContainer = document.getElementById("bookings");

// Load bookings when page loads
document.addEventListener("DOMContentLoaded", displayBookings);

// Form submit event
form.addEventListener("submit", function (e) {
  e.preventDefault(); // Stop page refresh

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const location = document.getElementById("location").value;

  if (name === "" || email === "" || location === "Select a location") {
    alert("Please fill in all fields");
    return;
  }

  const booking = {
    name: name,
    email: email,
    location: location,
  };

  saveBooking(booking);
  displayBookings();
  form.reset();
});

// Save booking to localStorage
function saveBooking(booking) {
  let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  bookings.push(booking);
  localStorage.setItem("bookings", JSON.stringify(bookings));
}

// Display bookings
function displayBookings() {
  bookingsContainer.innerHTML = "";

  let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

  bookings.forEach(function (booking, index) {
    const card = document.createElement("div");
    card.classList.add("booking-card");

    card.innerHTML = `
      <h3>Safari Booking</h3>
      <p><strong>Name:</strong> ${booking.name}</p>
      <p><strong>Email:</strong> ${booking.email}</p>
      <p><strong>Location:</strong> ${booking.location}</p>
      <button onclick="deleteBooking(${index})">Delete</button>
    `;

    bookingsContainer.appendChild(card);
  });
}

// Delete booking
function deleteBooking(index) {
  let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  bookings.splice(index, 1);
  localStorage.setItem("bookings", JSON.stringify(bookings));
  displayBookings();
}
