// Smooth Scroll
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Set the minimum date for event date input
document.addEventListener("DOMContentLoaded", function () {
    const eventDateInput = document.getElementById("event-date");
    const today = new Date().toISOString().split("T")[0];
    eventDateInput.setAttribute("min", today);
});

// Form Validation
function validateForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById('phone').value.trim();
    const countryCode = document.getElementById('country-code').value;
    const eventDate = document.getElementById('event-date').value;
    const message = document.getElementById('message').trim();


    if (!name || !phone || !eventDate) {
        alert("Please fill all the required fields.");
        return false;
    }
    if (!message){
        message = "No special request"
    }
    // Email Validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    // Phone Number Validation
    const phonePattern = /^\d{10}$/;
    if (!phonePattern.test(phone)) {
        alert("Please enter a valid 10-digit phone number.");
        return false;
    }

    sendEmail(name,email,countryCode,phone,eventDate,message);
    return true;
}


// Send email 
function sendEmail(name,email,countryCode,phone,eventDate,message){
    let params = {
        name: `${name}`,
        email: `${email}`,
        phone: `${countryCode}${phone}`,
        eventDate: `${eventDate}`,
        message: `${message}`
    }
    emailjs.send("service_lhwf9yl","template_prz12ek",params).then(alert(`Form submitted successfully! \nName: ${name} \nEmail: ${email} \nPhone: ${countryCode} ${phone} \nEvent Date: ${eventDate}`));
}

