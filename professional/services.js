// services.js
$(document).ready(() => {
    $('#serviceForm').submit((e) => {
      e.preventDefault();
  
      const formData = new FormData($('#serviceForm')[0]);
  
      $.ajax({
        type: 'POST',
        url: 'http://localhost:4000/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: (data) => {
          console.log(data);
          $('#serviceSummary').html('Form submitted successfully!');
        },
        error: (xhr, status, error) => {
          console.log(xhr.responseText);
          $('#serviceSummary').html('Error submitting form!');
        }
      });
    });


    $('#serviceForm2').on('submit', function(event) {
      event.preventDefault(); // Prevent the form from refreshing the page

      // Capture form data
      var serviceType = $('#serviceType').val();
      var email = $('#email').val();
      var quantity = parseInt($('#quantity').val());
      var contactMethod = $('input[name="contactMethod"]:checked').val();
      var newsletter = $('#newsletter').is(':checked') ? 'Yes' : 'No';
      var date = $('#date').val();
      var category = $('#category').val();
      var details = $('#details').val();

      // Example calculation (e.g., price based on quantity and category)
      var basePrice = 100; // Example base price
      var categoryMultiplier = {
          'consulting': 1.5,
          'development': 2,
          'design': 1.2
      };
      var price = basePrice * quantity * categoryMultiplier[category];

      // Create summary content
      var summaryHtml = `
          <h3>Order Summary</h3>
          <p><strong>Service Type:</strong> ${serviceType}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Quantity:</strong> ${quantity}</p>
          <p><strong>Preferred Contact Method:</strong> ${contactMethod}</p>
          <p><strong>Subscribe to Newsletter:</strong> ${newsletter}</p>
          <p><strong>Preferred Date:</strong> ${date}</p>
          <p><strong>Category:</strong> ${category}</p>
          <p><strong>Details:</strong> ${details}</p>
          <h4>Total Quotation: $${price.toFixed(2)}</h4>
      `;

      // Display the summary
      $('#serviceSummary').html(summaryHtml);
  });
  });