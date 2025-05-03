// Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function() {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
    
    // Close menu when clicking a nav link (for mobile)
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', function() {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }
  
  // Animate sections when they come into view
  const animateOnScroll = function() {
    const sections = [
      document.querySelector('.about-content'),
      document.querySelector('.services-grid'),
      document.querySelector('.contact-content')
    ];
    
    sections.forEach(section => {
      if (!section) return;
      
      const sectionPosition = section.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;
      
      if (sectionPosition < screenPosition) {
        section.classList.add('visible');
      }
    });
  };
  
  // Run once on load
  animateOnScroll();
  
  // Run on scroll
  window.addEventListener('scroll', animateOnScroll);
  
  // Form submission handling
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(contactForm);
      const url = contactForm.getAttribute('action');
      console.log(formData.values)
      
      // Create status message element if it doesn't exist
      let formStatus = document.getElementById('form-status');
      if (!formStatus) {
        formStatus = document.createElement('div');
        formStatus.id = 'form-status';
        contactForm.appendChild(formStatus);
      }
      
      // Send form data to Formspree
      fetch(url, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data.ok) {
          // Success message
          // Show success message
          contactForm.reset();
          contactForm.innerHTML = `
          <div class="success-message">
            <h3>Thank you for your message!</h3>
            <p>We'll get back to you as soon as possible.</p>
          </div>
        `;
        } else {
          // Error message
          formStatus.innerHTML = "Oops! There was a problem sending your message.";
          formStatus.className = "error";
        }
        formStatus.style.display = "block";
        
        // Hide the status message after 5 seconds
        setTimeout(function() {
          formStatus.style.display = "none";
        }, 5000);
      })
      .catch(error => {
        formStatus.innerHTML = "Oops! There was a problem sending your message.";
        formStatus.className = "error";
        formStatus.style.display = "block";
        console.error('Error:', error);
      });
    });
  }
});