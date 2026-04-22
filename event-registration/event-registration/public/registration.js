
let selectedPackage = null;
let packageCost = 0;
let selectedEvent = "5 km"; // Default event
let dietaryPreferences = "Not Available"; // Default dietary preferences

// Update navigation for the current step
function updateNavigation(step) {
    const currentStepElement = document.getElementById('current-step');
    const categoryStepElement = document.getElementById('category-step');

    if (step === 1) {
        currentStepElement.innerHTML = "Step 1: Select Event";
        categoryStepElement.innerHTML = "Category Event";
    } else if (step === 2) {
        currentStepElement.innerHTML = "Step 2: Select Package";
        categoryStepElement.innerHTML = "Category Event > Select Package";
    } else if (step === 3) {
        currentStepElement.innerHTML = "Step 3: Registration Form";
        categoryStepElement.innerHTML = "Category Event > Select Package > Register";
    } else if (step === 4) {
        currentStepElement.innerHTML = "Step 4: Order Summary";
        categoryStepElement.innerHTML = "Category Event > Select Package > Register > Order Summary";
    } else if (step === 5) {
        currentStepElement.innerHTML = "Step 5: Payment Checkout";
        categoryStepElement.innerHTML = "Category Event > Select Package > Register > Order Summary > Payment";
    } else if (step === 6) {
        currentStepElement.innerHTML = "Step 6: Confirmation";
        categoryStepElement.innerHTML = "Category Event > Select Package > Register > Order Summary > Payment > Confirmation";
    }

    previousStep = currentStep;  // Store the previous step
    currentStep = step;  // Update the current step
}

// Go to package selection page
function goToPackageSelection() {
    document.querySelector('.category-selection').style.display = 'none';
    document.querySelector('#package-selection').style.display = 'block';
    updateNavigation(2);
}


// Select a package
function selectPackage(packageName, cost) {
    selectedPackage = packageName;
    packageCost = cost;
    document.querySelector('#package-selection').style.display = 'none';
    document.querySelector('#registration-form').style.display = 'block';
    updateNavigation(3);
}

function goBackToCategory() {
    document.querySelector('.category-selection').style.display = 'block';
    document.querySelector('#package-selection').style.display = 'none';
    document.querySelector('#registration-form').style.display = 'none';
    document.querySelector('#payment-section').style.display = 'none';
    document.querySelector('#receipt-upload').style.display = 'none';
    document.querySelector('#confirmation').style.display = 'none';
    updateNavigation(1); // Update to Step 1
}

// Go back to package selection
function goBackToPackage() {
    document.querySelector('#package-selection').style.display = 'block';
    document.querySelector('#registration-form').style.display = 'none';
    document.querySelector('#payment-section').style.display = 'none';
    document.querySelector('#receipt-upload').style.display = 'none';
    document.querySelector('#confirmation').style.display = 'none';
    updateNavigation(2); // Update to Step 2
}

// Go back to registration form
function goBackToRegistration() {
    document.querySelector('#registration-form').style.display = 'block';
    document.querySelector('#payment-section').style.display = 'none';
    document.querySelector('#receipt-upload').style.display = 'none';
    document.querySelector('#confirmation').style.display = 'none';

    document.getElementById('dietary').value = ""; // Clear dietary field
    updateNavigation(3); // Update to Step 3
}

// Go back to payment section
function goBackToPayment() {
    document.querySelector('#payment-section').style.display = 'block';
    document.querySelector('#receipt-upload').style.display = 'none';
    document.querySelector('#confirmation').style.display = 'none';
    updateNavigation(4); // Update to Step 4
}

// Go back to package selection page
function goBackToPackage() {
    document.querySelector('#registration-form').style.display = 'none';
    document.querySelector('#package-selection').style.display = 'block';
    updateNavigation(2);
}

function updateImage() {
const eventCategory = document.getElementById("event-category").value;
const RouteImage = document.getElementById("route-image"); // Correct ID

// Update the route image based on the selected value
if (eventCategory === "5km") {
    RouteImage.src = "Route 5KM.png"; // 5 km route image
    RouteImage.alt = "5 km Route Image";
} else if (eventCategory === "7km") {
    RouteImage.src = "Route 7KM.png"; // 7 km route image
    RouteImage.alt = "7 km Route Image";
}
}

// Function to update the order summary with selected details
function updateOrderSummary() {

    var selectedEvent = document.getElementById("event-category").value;
    var selectedPackage = document.querySelector("button.selected-package").innerText;
    var selectedTshirtSize = document.getElementById("tshirt-size").value;
    var selectedDietary = document.getElementById("dietary").value || "N/A"; // Default to 'N/A' if empty
    var totalCost = calculateTotalCost(selectedPackage); // Assume a function to calculate total cost based on package

    // Update the order summary
    document.getElementById("selected-event").innerText = selectedEvent;
    document.getElementById("selected-package").innerText = selectedPackage;
    document.getElementById("selected-dietary").innerText = selectedDietary;
    document.getElementById("selected-tshirt-size").innerText = selectedTshirtSize || "Not Selected"; // Display the selected T-shirt size, or show "Not Selected" if empty
    document.getElementById("total-cost").innerText = "RM " + totalCost;
}

// Show Men Size Guide Modal
document.getElementById('men-size-guide-btn').onclick = function() {
    document.getElementById('men-size-guide-modal').style.display = "block";
}

// Show Women Size Guide Modal
document.getElementById('women-size-guide-btn').onclick = function() {
    document.getElementById('women-size-guide-modal').style.display = "block";
}

// Close the modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

// Go to payment page with validation
function goToPayment() {
    let valid = true;

    // Check required fields
    const requiredFields = document.querySelectorAll('.required');
    requiredFields.forEach(function(field) {
        if (field.value.trim() === "") {
            valid = false;
            field.style.border = "2px solid red";
        } else {
            field.style.border = "1px solid #D7FD35";
        }
    });

    // Validate email
    const email = document.getElementById('email').value;
    if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        valid = false;
    }

    // Validate phone number
    const phone = document.getElementById('phone').value;
    if (!validatePhoneNumber(phone)) {
        alert("Please enter a valid Malaysian phone number.");
        valid = false;
    }

    // If everything is valid, proceed to payment
    if (valid) {
        // Get dietary preferences value
        const dietaryInput = document.getElementById('dietary').value.trim();
        const dietaryPreferences = dietaryInput || "N/A"; // Default to "N/A" if empty

        // Update the Order Summary section
        document.getElementById('selected-dietary').innerText = dietaryPreferences;

        const totalCostElement = document.getElementById('total-cost');
        totalCostElement.innerText = `RM ${packageCost}`;

        document.querySelector('#registration-form').style.display = 'none';
        document.querySelector('#payment-section').style.display = 'block';
        updateNavigation(4);
    } else {
        alert('Please fill in all required fields.');
    }
}

// Process the payment (simulated)
function processPayment() {
    // Simulate payment processing
    document.querySelector('#payment-section').style.display = 'none';
    document.querySelector('#receipt-upload').style.display = 'block';
    updateNavigation(5);
}

// Submit the receipt (simulated)
// function submitReceipt() {
//     alert('Receipt submitted successfully!');
//     document.querySelector('#receipt-upload').style.display = 'none';
//     document.querySelector('#confirmation').style.display = 'block';
//     updateNavigation(6);
// }

// Submit the receipt only if the file is valid
function submitReceipt() {
    if (validateReceiptUpload()) {
        alert('Receipt submitted successfully!');
        document.querySelector('#receipt-upload').style.display = 'none';
        document.querySelector('#confirmation').style.display = 'block';
        updateNavigation(6);
    }
}


// Validate email format
function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
}

// Validate phone number (Malaysia: +60 or starting with 6011, 6012, etc.)
function validatePhoneNumber(phone) {
    const phoneRegex = /^(?:\+60|01)[0-9]{8,9}$/;
    return phoneRegex.test(phone);
}

// Validate the receipt upload before submitting
function validateReceiptUpload() {
    const receiptFileInput = document.getElementById('receipt-file');
    const file = receiptFileInput.files[0];

    // Check if the file is selected
    if (!file) {
        alert("Please select a receipt file to upload.");
        return false;
    }

    // Validate file extension (PDF, PNG, JPEG, JPG)
    const validExtensions = ['pdf', 'png', 'jpeg', 'jpg'];
    const fileName = file.name;
    const fileExtension = fileName.split('.').pop().toLowerCase();

    if (!validExtensions.includes(fileExtension)) {
        alert("Invalid file type. Please upload a PDF, PNG, JPEG, or JPG file.");
        return false;
    }

    // File size check (optional, e.g., maximum size 5MB)
    const maxFileSize = 5 * 1024 * 1024; // 5 MB
    if (file.size > maxFileSize) {
        alert("File size exceeds the maximum limit of 5MB.");
        return false;
    }

    // If everything is valid, return true
    return true;
}

// Validate file type for receipt upload (PDF, PNG, JPEG, JPG)
// function validateReceipt(fileInput) {
//     const validExtensions = ['pdf', 'png', 'jpeg', 'jpg'];
//     const fileName = fileInput.files[0].name;
//     const fileExtension = fileName.split('.').pop().toLowerCase();
//     return validExtensions.includes(fileExtension);
// }

document.addEventListener('DOMContentLoaded', function () {
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');
    const passwordFeedback = document.getElementById('password-feedback');
    const confirmPasswordFeedback = document.getElementById('confirm-password-feedback');

    function validatePassword() {
        const pwdValue = password.value;
        const pwdRequirements = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
        // At least 8 characters, 1 letter, 1 number, and 1 symbol
    
        if (!pwdRequirements.test(pwdValue)) {
            passwordFeedback.textContent = "Password must be at least 8 characters long and include a letter, a number, and a symbol.";
            return false;
        } else {
            passwordFeedback.textContent = "";
            return true;
        }
    }    

    function validateConfirmPassword() {
        if (password.value !== confirmPassword.value) {
            confirmPasswordFeedback.textContent = "Passwords do not match.";
            return false;
        } else {
            confirmPasswordFeedback.textContent = "";
            return true;
        }
    }

    password.addEventListener('input', validatePassword);
    confirmPassword.addEventListener('input', validateConfirmPassword);

    function validateForm() {
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();

        if (!isPasswordValid || !isConfirmPasswordValid) {
            alert("Please fix the password errors before proceeding.");
            return false;
        }

        // Proceed to the next step
        goToPayment();
    }

    document.getElementById("tshirt-size").addEventListener('change', function() {
        updateOrderSummary();  // This will update the order summary when the size is selected
    });    

    // Attach form validation to the "Next" button
    document.querySelector('.registration-form button[onclick="goToPayment()"]').addEventListener('click', function (e) {
        e.preventDefault(); // Prevent navigation until validation passes
        validateForm();
    });
});
