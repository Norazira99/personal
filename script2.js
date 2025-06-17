// RSVP Form Submission     
document.getElementById('rsvpForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const successAlert = document.getElementById('successAlert');
    const failedAlert = document.getElementById('failedAlert');

    fetch(this.action, {
        method: 'POST',
        body: formData,
        mode: 'no-cors'
    }).then(() => {
        // Show and animate the success alert
        successAlert.style.display = 'block';
        successAlert.classList.add('show');

        // Reset form
        this.reset();

        // Refresh ucapan section after short delay
        setTimeout(() => {
            fetch(scriptURL)
              .then(res => res.json())
              .then(data => {
                  wishesData = data;
                  createSlider(); // recreate the updated slider
                  goToSlide(wishesData.length - 1); // scroll to last wish
              });
        }, 1500); // wait for Google Sheet to receive data

        // Scroll to Ucapan section
        document.getElementById('wishes').scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Auto-hide success alert
        setTimeout(() => {
            successAlert.classList.remove('show');
            setTimeout(() => {
                successAlert.style.display = 'none';
            }, 150); // Wait for fade out animation
        }, 5000);

    }).catch(() => {
        // Show error alert (form stays visible)
        failedAlert.style.display = 'block';
        failedAlert.classList.add('show');

        setTimeout(() => {
            failedAlert.classList.remove('show');
            setTimeout(() => {
                failedAlert.style.display = 'none';
            }, 150);
        }, 3000);
    });

    // Optional: log the submitted data
    console.log('RSVP Data:', Object.fromEntries(formData));
});

        
        
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
        
        // Add active class to navigation based on scroll position
        window.addEventListener('scroll', function() {
            const sections = document.querySelectorAll('.section');
            const navLinks = document.querySelectorAll('.nav-links a');
            
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        });


            // Wedding date 
        const weddingDate = new Date('2025-09-06T10:00:00').getTime();
        
        // Countdown timer function
        function updateCountdown() {
            const now = new Date().getTime();
            const timeLeft = weddingDate - now;
            
            if (timeLeft > 0) {
                const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
                
                document.getElementById('days').textContent = days.toString().padStart(2, '0');
                document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
                document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
                document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
            } else {
                // Wedding day has arrived!
                document.getElementById('days').textContent = '00';
                document.getElementById('hours').textContent = '00';
                document.getElementById('minutes').textContent = '00';
                document.getElementById('seconds').textContent = '00';
                
                // Could add special message here
                document.querySelector('.countdown-container').innerHTML = 
                    '<div class="text-center"><h3>🎉 Hari Bahagia Telah Tiba! 🎉</h3></div>';
            }
        }
        
        // Calendar functions
        function addToGoogleCalendar() {
            const startDate = '20250906T090000Z'; 
            const endDate = '20250906T230000Z';  
            const title = encodeURIComponent('Majlis Perkahwinan Azira & Nizam');
            const details = encodeURIComponent('Majlis Resepsi (10:00 AM)\\n\\nLokasi: Jalan Masjid, Pekan Sibu, Sarawak');
            const location = encodeURIComponent('Jalan Masjid, Pekan Sibu, 96000 Sibu, Sarawak');
            
            const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}`;
            window.open(googleUrl, '_blank');
        }
        
        function addToOutlookCalendar() {
            const startDate = '2025-09-06T10:00:00'; 
            const endDate = '2025-09-06T23:00:00';
            const title = encodeURIComponent('Majlis Perkahwinan Azira & Nizam');
            const body = encodeURIComponent('Majlis Resepsi (10:00 AM)\\n\\nLokasi: Jalan Masjid, Pekan Sibu, Sarawak');
            const location = encodeURIComponent('Jalan Masjid, Pekan Sibu, 96000 Sibu, Sarawak');
            
            const outlookUrl = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${title}&startdt=${startDate}&enddt=${endDate}&body=${body}&location=${location}`;
            window.open(outlookUrl, '_blank');
        }
        
        function downloadICS() {
            const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Wedding RSVP//Wedding Event//EN
BEGIN:VEVENT
UID:wedding-azira-nizam-2025@example.com
DTSTAMP:20250613T000000Z
DTSTART:20250906T010000Z
DTEND:20250906T150000Z
SUMMARY:Majlis Perkahwinan Azira & Nizam
DESCRIPTION:Majlis Resepsi (10:00 AM)\\n\\nDengan penuh kesyukuran\\, kami menjemput anda ke majlis perkahwinan kami.
LOCATION:Jalan Masjid\\, Pekan Sibu\\, 96000 Sibu\\, Sarawak
BEGIN:VALARM
TRIGGER:-P1D
ACTION:DISPLAY
DESCRIPTION:Majlis Perkahwinan Azira & Nizam esok!
END:VALARM
END:VEVENT
END:VCALENDAR`;
            
            const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'wedding-azira-nizam.ics';
            link.click();
        }
        
        // Start countdown timer
        updateCountdown();
        setInterval(updateCountdown, 1000);

        // Cancel button functionality
document.getElementById('cancelBtn').addEventListener('click', function() {
    // Clear the RSVP form
    document.getElementById('rsvpForm').reset();
    
    // Hide success alert if it's showing
    const successAlert = document.getElementById('successAlert');
    if (successAlert) {
        successAlert.style.display = 'none';
        successAlert.classList.remove('show');
    }
    
    // Smooth scroll to home section
    const homeSection = document.getElementById('home') || document.querySelector('.hero') || document.querySelector('section:first-of-type');
    if (homeSection) {
        homeSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    } else {
        // Fallback: scroll to top of page
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
});

// Modified JavaScript for auto-sliding carousel
const scriptURL = 'https://script.google.com/macros/s/AKfycbzLcsi5FS8xO6p4J_3dj8t3kfZi3KSomXgSjs_eMI-cylGJJ-M2zBNko0eeOHgHD5TN/exec';

let currentSlide = 0;
let wishesData = [];
let slideInterval;

fetch(scriptURL)
  .then(res => res.json())
  .then(data => {
    wishesData = data;
    if (wishesData.length > 0) {
      createSlider();
      startAutoSlide();
    }
  })
  .catch(err => console.error('Error loading RSVP:', err));

function createSlider() {
  let html = `
    <div class="wishes-slider">
      <div class="slider-container">
        ${wishesData.map((entry, index) => `
          <div class="wish-slide ${index === 0 ? 'active' : ''}">
            <div class="wish-card">
              <div class="wish-header">
                <h3 class="wish-title">wish us! :) </h3>
              </div>
              <div class="wish-content">
                <p class="wish-message">${entry.wish}</p>
                <p class="wish-name">@${entry.name}</p>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
      <div class="slider-dots">
        ${Array.from({ length: 5 }).map((_, index) => `
            <span class="dot ${index === 0 ? 'active' : ''}" onclick="goToGroup(${index})"></span>
        `).join('')}
      </div>
 
    </div>
  `;
  document.getElementById('rsvp-list').innerHTML = html;
}

function goToGroup(dotIndex) {
  const totalDots = 5;
  const groupSize = Math.ceil(wishesData.length / totalDots);
  const targetSlide = dotIndex * groupSize;

  goToSlide(targetSlide);
}

function goToSlide(slideIndex) {
  // Remove active class from current slide
  document.querySelector('.wish-slide.active').classList.remove('active');

  // Add active class to new slide
  document.querySelectorAll('.wish-slide')[slideIndex].classList.add('active');

  currentSlide = slideIndex;

  // Update dots based on groups
  const totalDots = 5;
  const groupSize = Math.ceil(wishesData.length / totalDots);
  const activeDotIndex = Math.floor(slideIndex / groupSize);

  // Update dot active status
  document.querySelectorAll('.dot').forEach(dot => dot.classList.remove('active'));
  const dots = document.querySelectorAll('.dot');
  if (dots[activeDotIndex]) {
    dots[activeDotIndex].classList.add('active');
  }
}

function nextSlide() {
  const nextIndex = (currentSlide + 1) % wishesData.length;
  goToSlide(nextIndex);
}

function startAutoSlide() {
  // Auto slide every 4 seconds
  slideInterval = setInterval(nextSlide, 3000);
}

function stopAutoSlide() {
  clearInterval(slideInterval);
}

// Pause auto-slide when hovering over the slider
document.addEventListener('DOMContentLoaded', function() {
  const slider = document.getElementById('rsvp-list');
  if (slider) {
    slider.addEventListener('mouseenter', stopAutoSlide);
    slider.addEventListener('mouseleave', startAutoSlide);
  }
});
