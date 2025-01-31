// Countdown Timer
const weddingDate = new Date("December 15, 2025 16:00:00").getTime();
const timerElement = document.getElementById("timer");

setInterval(() => {
    const now = new Date().getTime();
    const difference = weddingDate - now;

    if (difference <= 0) {
        timerElement.innerHTML = "The wedding has begun! 🎉";
        return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    timerElement.innerHTML = `${days} days, ${hours}h ${minutes}m ${seconds}s`;
}, 1000);

// RSVP Form Handling
document.getElementById("rsvp-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const name = document.getElementById("name").value;
    const guests = document.getElementById("guests").value;
    const message = document.getElementById("message").value;

    document.getElementById("rsvp-message").innerHTML = `Thank you, ${name}! We have received your RSVP for ${guests} guests.`;
    
    this.reset();
});