document.getElementById("main").style.marginTop = "0";
// ----------- Slideshow -----------
let slideIndex = 1;
let slideInterval; // Declare the slideInterval variable outside any function
    function currentSlide(n) {
        showSlides(slideIndex = n);
        resetSlideshowTimer();
    }
    function resetSlideshowTimer() {
        clearInterval(slideInterval); // Clear the existing interval
        startSlideshow(); // Start a new interval
    }
    function plusSlides(n) {
        showSlides(slideIndex += n);
    }
    function showSlides(n) {
        let i;
        let slides = document.getElementsByClassName("slideshow-slide");
        let dots = document.getElementsByClassName("dot-slideshow");
        if (n > slides.length) { slideIndex = 1 }
        if (n < 1) { slideIndex = slides.length }
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].classList.remove("dot-active");
        }
        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].classList.add("dot-active");
    }
    function startSlideshow() {
        // Automatic slideshow
        slideInterval = setInterval(function () {
            plusSlides(1);
        }, 3500); // Set the initial interval (in milliseconds) as needed
    }
startSlideshow();
showSlides(slideIndex);
// ---------------------------------

// ------------ Calendar ------------
document.addEventListener('DOMContentLoaded', function () {
  const calendarContainer = document.getElementById('calendar');
  const currentDate = new Date();

  function generateCalendar(year, month) {
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const daysInMonth = lastDay.getDate();
      const daysOfWeek = ['Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne'];
      const monthsInCzech = ['Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen', 'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec'];

      let calendarHTML = '<div id="calendar-button-container"><button class="calendar-button" id="prevMonthBtn">&lt;</button><button class="calendar-button" id="nextMonthBtn">&gt;</button></div>';
      calendarHTML += '<h2>' + monthsInCzech[firstDay.getMonth()] + ' ' + firstDay.getFullYear() + '</h2>';
      calendarHTML += '<table><thead><tr>';

      for (const day of daysOfWeek) {
          calendarHTML += '<th>' + day + '</th>';
      }

      calendarHTML += '</tr></thead><tbody>';

      let startingDay = (firstDay.getDay() - 1 + 7) % 7;
      let dayCounter = 1;

      for (let i = 0; i < 6; i++) {
          calendarHTML += '<tr>';
          for (let j = 0; j < 7; j++) {
              const dateKey = formatDate(year, month, dayCounter);
              const isSpecialDate = specialDates[dateKey];

              if (i === 0 && j < startingDay) {
                  calendarHTML += '<td></td>';
              } else if (dayCounter > daysInMonth) {
                  calendarHTML += '<td></td>';
              } else {
                  const cellStyle = isSpecialDate ? 'style="background-color: ' + specialDates[dateKey].background + ';' + 'border: ' + (specialDates[dateKey].border || 'none') + '; text-decoration: underline; color: blue; cursor: pointer;"' : '';
                  const cellLink = isSpecialDate ? 'onclick="window.location.href=\'' + specialDates[dateKey].link + '\';"' : '';

                  calendarHTML += '<td ' + cellStyle + ' ' + cellLink + '>' + dayCounter + '</td>';
                  dayCounter++;
              }
          }
          calendarHTML += '</tr>';
      }

      calendarHTML += '</tbody></table>';
      calendarContainer.innerHTML = calendarHTML;

      // Select the buttons after they are added to the DOM
      const prevMonthButton = document.getElementById('prevMonthBtn');
      const nextMonthButton = document.getElementById('nextMonthBtn');

      // Buttons to navigate between months
      prevMonthButton.addEventListener('click', function () {
          currentDate.setMonth(currentDate.getMonth() - 1);
          updateCalendar();
      });

      nextMonthButton.addEventListener('click', function () {
          currentDate.setMonth(currentDate.getMonth() + 1);
          updateCalendar();
      });
  }

  function updateCalendar() {
      generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
  }

  const specialDates = {
      '2024-03-05': { background: '#E09DBB', border: '3px solid black', link: 'https://example.com/page1' },
      '2024-03-15': { background: '#E09DBB', border: '3px solid black', link: 'https://example.com/page2' },
      // Add more special dates as needed
  };

  function formatDate(year, month, day) {
      const formattedMonth = (month + 1).toString().padStart(2, '0');
      const formattedDay = day.toString().padStart(2, '0');
      return year + '-' + formattedMonth + '-' + formattedDay;
  }

  // Initial calendar display for the current month
  generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
});
// ---------------------------------