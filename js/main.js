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
      
      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      
      // In a real application, you would send this data to a server
      // For now, we'll just log it and show a success message
      console.log('Form submitted:', { name, email, message });
      
      // Show success message
      contactForm.innerHTML = `
        <div class="success-message">
          <h3>Thank you for your message!</h3>
          <p>We'll get back to you as soon as possible.</p>
        </div>
      `;
    });
  }
});