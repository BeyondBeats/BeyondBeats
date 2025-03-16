document.addEventListener("DOMContentLoaded", function () {
    emailjs.init("cWwCbkdm2Eki6yw0H"); // Replace with your EmailJS Public Key
    });
    
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Set the minimum date to today
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
        const message = document.getElementById('message').value.trim();

        

        if (!name || !phone || !eventDate) {
            alert("Please fill all the required fields.");
            return false;
        }

        // Email Validation
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            return false;
        }

        // Regular expression to check 10-digit phone number
        const phonePattern = /^\d{10}$/;
        if (!phonePattern.test(phone)) {
            alert("Please enter a valid 10-digit phone number.");
            return false;
        }

        // Check if the event date is in the future
        const selectedDate = new Date(eventDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Remove time part for accurate comparison

        if (selectedDate <= today) {
            alert("Please select a future event date.");
            return false;
        }

        // Confirmation alert before form submission
        const confirmation = confirm(
            `Please confirm your details before submitting:\n\n` +
            `Name: ${name}\n` +
            `Email: ${email}\n` +
            `Phone: ${countryCode} ${phone}\n` +
            `Event Date: ${eventDate}\n\n` +
            `Click "OK" to submit or "Cancel" to go back.`
        );

        if (!confirmation) {
            return false; // Stop form submission if the user cancels
        }
        

        // Send email using EmailJS
        emailjs.send("service_lhwf9yl", "template_ylwq3rs", {
            name: name,
            email: email,
            phone: ""+countryCode+" "+phone,
            event_date: eventDate,
            message: message
        }).then(function (response) {
                console.log("SUCCESS!", response.status, response.text);
                alert("Successfully sent!");
            }, function (error) {
                console.log("FAILED...", error);
                alert("Failed to send. Try again later! \n", error);
            });
    /*console.log("Form Data:", {
    from_name: name,
    from_email: email,
    phone: phone,
    event_date: eventDate, // Check this in the console
    message: message
});*/
    location.reload();
    return true;
    }