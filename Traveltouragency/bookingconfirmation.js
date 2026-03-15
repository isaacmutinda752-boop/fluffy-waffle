

document.addEventListener('DOMContentLoaded', () => {
    const bookingData = JSON.parse(localStorage.getItem('bookingData'));

    if (bookingData) {
        // Generate random reference number
        const ref = 'WR-' + Math.floor(100000 + Math.random() * 900000);
        document.getElementById('booking-ref').textContent = ref;

        // Date and Time
        document.getElementById('booking-time').textContent = `${bookingData.date} at ${bookingData.time}`;

        // Customer Details
        const details = `
            <strong>Name:</strong> ${bookingData.name}<br>
            <strong>Phone:</strong> ${bookingData.phone}<br>
            <strong>Email:</strong> ${bookingData.email}<br>
            <strong>Vehicle:</strong> ${bookingData.vehicleType}<br>
            <strong>Route:</strong> ${bookingData.pickupLocation} to ${bookingData.dropoffLocation}
        `;
        document.getElementById('customer-details').innerHTML = details;

        // Payment Summary
        const pricePerPerson = 50; // Based on booking.html text
        const total = pricePerPerson * parseInt(bookingData.passengers);
        const payment = `
            <strong>Method:</strong> ${bookingData.paymentMethod}<br>
            <strong>Passengers:</strong> ${bookingData.passengers}<br>
            <strong>Total Cost:</strong> $${total}<br>
            <strong>Amount Entered:</strong> $${bookingData.amount}
        `;
        document.getElementById('payment-summary').innerHTML = payment;
    } else {
        // Redirect back if no data found (e.g., page accessed directly)
        window.location.href = 'booking.html';
    }
});

function generatePDF() {
    const bookingData = JSON.parse(localStorage.getItem('bookingData'));

    if (bookingData) {
        const pricePerPerson = 50; // Based on booking.html text
        const total = pricePerPerson * parseInt(bookingData.passengers);

        let docDefinition = {
            content: [
                { text: 'Booking Confirmation', style: 'header' },
                { text: 'Booking Reference NO.: ' + document.getElementById('booking-ref').textContent, style: 'subheader' },
                { text: 'Date and Time of Booking: ' + `${bookingData.date} at ${bookingData.time}`, style: 'subheader' },
                { text: 'Customer Details:', style: 'sectionHeader' },
                { text: `Name: ${bookingData.name}\nPhone: ${bookingData.phone}\nEmail: ${bookingData.email}\nVehicle: ${bookingData.vehicleType}\nRoute: ${bookingData.pickupLocation} to ${bookingData.dropoffLocation}` },
                { text: 'Payment Summary:', style: 'sectionHeader' },  
                { text: `Method: ${bookingData.paymentMethod}\nPassengers: ${bookingData.passengers}\nTotal Cost: $${total}\nAmount Entered: $${bookingData.amount}` }
            ],
            styles: {
                header: {
                    fontSize: 22,
                    bold: true,
                    marginBottom: 20
                },
                subheader: {
                    fontSize: 16,
                    marginBottom: 15
                },
                sectionHeader: {
                    fontSize: 18,
                    bold: true,
                    marginTop: 25,
                    marginBottom: 10
                },
                tableHeader: {
                    bold: true,
                    fontSize: 14,
                    color: '#2E8B57'

                }
            }
        };
        pdfMake.createPdf(docDefinition).download('booking_confirmation.pdf');
    }

}