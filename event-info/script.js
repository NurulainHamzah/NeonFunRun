const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.forEach(link => link.classList.remove('active'));
        link.classList.add('active');
    });
});

// Set the date we're counting down to
const countDownDate = new Date("December 28, 2024 20:00:00").getTime();

// Update the countdown every 1 second
const countdownFunction = setInterval(function() {

    // Get today's date and time
    const now = new Date().getTime();

    // Calculate the distance between now and the countdown date
    const distance = countDownDate - now;

    // Time calculations for days, hours, minutes, and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the respective elements
    document.getElementById("days").innerHTML = days + "<span>Days</span>";
    document.getElementById("hours").innerHTML = hours + "<span>Hours</span>";
    document.getElementById("minutes").innerHTML = minutes + "<span>Minutes</span>";
    document.getElementById("seconds").innerHTML = seconds + "<span>Seconds</span>";

    // If the countdown is over, display a message
    if (distance < 0) {
        clearInterval(countdownFunction);
        document.getElementById("countdown").innerHTML = "The event has started!";
    }
}, 1000);

// Contact Form Submission
document.getElementById("contactForm").onsubmit = function(event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    showModal(`Thank you ${name}, your message has been sent successfully! We will contact you later.`);
    this.reset(); // Reset the form after submission
};

// Show Modal Function
function showModal(message) {
    const modal = document.createElement('div');
    modal.className = 'modal fade show';
    modal.style.display = 'block';
    modal.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Message</h5>
                    <button type="button" class="close" onclick="closeModal(this)">
                        <span>&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p>${message}</p>
                </div>
            </div>
        </div>

    `;
    document.body.appendChild(modal);
}

// Close Modal Function
function closeModal(button) {
    const modal = button.closest('.modal');
    modal.remove();
}

// Open Image Modal
function openModal(imageSrc) {
    document.getElementById('modalImage').src = imageSrc;
    $('#imageModal').modal('show');
}

// Select required DOM elements
const images = document.querySelectorAll('.clickable-image');
const viewer = document.getElementById('image-viewer');
const fullImage = document.getElementById('full-image');
const closeBtn = document.getElementById('close-btn');

// Function to open the fullscreen viewer
images.forEach((image) => {
    image.addEventListener('click', () => {
        fullImage.src = image.src; // Set the source of the image
        viewer.classList.add('visible'); // Show the viewer
    });
});

// Function to close the fullscreen viewer
const closeViewer = () => {
    viewer.classList.remove('visible');
};

// Close when the close button is clicked
closeBtn.addEventListener('click', closeViewer);

// Close when clicking outside the image
viewer.addEventListener('click', (e) => {
    if (e.target !== fullImage) {
        closeViewer();
    }
});

// Scroll to Countdown
function scrollToCountdown() {
    document.getElementById('event-details').scrollIntoView({ behavior: 'smooth' });
}

// Show or hide the button based on scroll position
window.onscroll = function() {
    const backToTopButton = document.getElementById("backToTop");
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        backToTopButton.style.display = "flex"; // Show button
    } else {
        backToTopButton.style.display = "none"; // Hide button
    }
};

// Scroll to the top of the document
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Smooth scroll effect
    });
}


