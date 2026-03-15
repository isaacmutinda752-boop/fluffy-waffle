document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const paymentSelect = document.getElementById('payment-method');
    const paymentInstructions = document.getElementById('payment-instructions');
    const amountContainer = document.getElementById('amount-container');

    const instructions = {
        'cash': 'Please prepare the exact amount in USD or KES. You will pay the driver directly upon pickup.',
        'credit-card': 'You will be redirected to our secure payment gateway after clicking "Confirm Booking".',
        'bank-transfer': 'Please transfer the total amount to: Webrayz Ltd, Acc: 1234567890, Bank: KCB. Use your name as reference.'
    };

    if (paymentSelect && paymentInstructions) {
        paymentSelect.addEventListener('change', function() {
            const selectedMethod = this.value;
            if (instructions[selectedMethod]) {
                paymentInstructions.textContent = instructions[selectedMethod];
                paymentInstructions.style.display = 'block';
                if (amountContainer) amountContainer.style.display = 'block';
            } else {
                paymentInstructions.style.display = 'none';
                paymentInstructions.textContent = '';
                if (amountContainer) amountContainer.style.display = 'none';
            }
        });
    }

    form.addEventListener('submit', (event) => {
        // Prevent the form from submitting to a server
        event.preventDefault();

        // If validation passes, show a success message and reset
        if (validateForm()) {
            const bookingData = {
                pickupLocation: document.getElementById('pick-up-location').value,
                dropoffLocation: document.getElementById('drop-off-location').value,
                date: document.getElementById('date').value,
                time: document.getElementById('time').value,
                passengers: document.getElementById('number-of-passengers').value,
                vehicleType: document.getElementById('vehicle-type').value,
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                paymentMethod: document.getElementById('payment-method').value,
                amount: document.getElementById('amount').value
            };

            localStorage.setItem('bookingData', JSON.stringify(bookingData));
            window.location.href = 'bookingconfirmation.html';
        }
    });

    const validateForm = () => {
        let isValid = true;
        // Clear all previous errors before re-validating
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
        document.querySelectorAll('.invalid').forEach(el => el.classList.remove('invalid'));

        // --- Check each required field ---
        isValid = checkRequired('pick-up-location', 'Pick-up Location is required.') && isValid;
        isValid = checkRequired('drop-off-location', 'Drop-off Location is required.') && isValid;
        isValid = checkRequired('date', 'Date is required.') && isValid;
        isValid = checkRequired('time', 'Time is required.') && isValid;
        isValid = checkRequired('name', 'Full Name is required.') && isValid;
        isValid = checkRequired('phone', 'Phone Number is required.') && isValid;
        isValid = checkRequired('vehicle-type', 'Please select a vehicle type.') && isValid;
        isValid = checkRequired('payment-method', 'Please select a payment method.') && isValid;

        // --- Check amount if visible ---
        if (amountContainer && amountContainer.style.display !== 'none') {
            isValid = checkRequired('amount', 'Please enter the amount.') && isValid;
        }

        // --- Special validation for email ---
        const email = document.getElementById('email');
        if (email.value.trim() === '') {
            showError(email, 'Email is required.');
            isValid = false;
        } else if (!isValidEmail(email.value)) {
            showError(email, 'Please enter a valid email address.');
            isValid = false;
        }

        // --- Special validation for number of passengers ---
        const passengers = document.getElementById('number-of-passengers');
        if (passengers.value === '' || parseInt(passengers.value, 10) < 1) {
            showError(passengers, 'Please enter at least 1 passenger.');
            isValid = false;
        }

        return isValid;
    };

    const checkRequired = (fieldId, message) => {
        const field = document.getElementById(fieldId);
        if (field.value.trim() === '') {
            showError(field, message);
            return false;
        }
        return true;
    };

    const showError = (inputElement, message) => {
        inputElement.classList.add('invalid');
        const errorElement = inputElement.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.textContent = message;
        }
    };

    const isValidEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };
});