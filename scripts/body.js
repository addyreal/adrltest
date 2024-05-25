let ping = false;
var currentUl = null;
var currentButton = null;
var buttons = document.querySelectorAll('nav button');

function closeAllDropdowns() {
    var ulsInside = document.querySelectorAll('nav ul ul');
    ulsInside.forEach(function(ul) {
      ul.style.display = 'none';
      var button = ul.previousElementSibling.previousElementSibling;
      if (button) {
          button.setAttribute('aria-expanded', 'false');
      }
    });
    currentUl = null;
    currentButton = null;
}

function handleDropdown() {    
    var nextSibling = this.nextElementSibling.nextElementSibling;
    // close the former dropdown and update aria-expanded
    if (currentUl && currentUl !== nextSibling) {
      currentUl.style.display = "none";
      if (currentButton) {
        currentButton.setAttribute("aria-expanded", "false");
      }
    }

    // if dropdown open, close it, update aria-expanded and remove from currentUl
    if (nextSibling.style.display === "block") {
      nextSibling.style.display = "none";
      this.setAttribute("aria-expanded", "false");
      currentUl = null;
    }
    // if dropdown closed, open it, update aria-expanded and store in currentUl
    else {
      nextSibling.style.display = "block";
      this.setAttribute("aria-expanded", "true");
      currentUl = nextSibling;
      currentButton = this;
    }
}

function handleMobNav() {
    var nav = document.querySelector('header>nav');

    //var navVisible = window.getComputedStyle(nav).display !== 'none';
    var navVisible = window.getComputedStyle(nav).right == '0px';

    const topLine = document.querySelector('header>button span:nth-child(1)');
    const middleLine = document.querySelector('header>button span:nth-child(2)');
    const bottomLine = document.querySelector('header>button span:nth-child(3)');
    if (!navVisible) {
      topLine.style.transform = 'translate(0, 13px)';
      bottomLine.style.transform = 'translate(0, -13px)';
      setTimeout(function() {
        middleLine.style.display = 'none';
        topLine.style.transform = 'translate(0, 13px) rotate(45deg)';
        bottomLine.style.transform = 'translate(0, -13px) rotate(-45deg)';
      }, 200);
      //nav.style.display = 'flex';
      nav.style.right = '0';
      nav.style.opacity = '1';
    }
    else {
      topLine.style.transform = 'translate(0, 13px) rotate(0)';
      bottomLine.style.transform = 'translate(0, -13px) rotate(0)';
      setTimeout(function() {
        middleLine.style.display = 'unset';
        topLine.style.transform = 'translate(0, 0) rotate(0)';
        bottomLine.style.transform = 'translate(0, 0) rotate(0)';
      }, 200);
      closeAllDropdowns();
      //nav.style.display = 'none';
      nav.style.right = '-' + window.getComputedStyle(nav).width;
      nav.style.opacity = '0';
  }
  this.setAttribute('aria-expanded', navVisible ? 'false' : 'true');
}

function pingResize() {
    const viewportWidth = window.innerWidth;
    const topLine = document.querySelector('header>button span:nth-child(1)');
    const middleLine = document.querySelector('header>button span:nth-child(2)');
    const bottomLine = document.querySelector('header>button span:nth-child(3)');
    
    if (viewportWidth <= 1050 && !ping) {
      // close all dropdowns, hide nav, update nav's aria-expanded
      ping = true;
      closeAllDropdowns();

      //document.querySelector('header>nav').style.display = 'none';
      document.querySelector('header>nav').style.right = '-' + window.getComputedStyle(document.querySelector('header>nav')).width;
      document.querySelector('header>nav').style.opacity = '0';

      document.querySelector('header>button').setAttribute('aria-expanded', 'false');
    } else if (viewportWidth > 1050 && ping) {
      // close all dropdowns, show nav, update nav's aria-expanded, reset burger
      ping = false;
      closeAllDropdowns();

      //document.querySelector('header>nav').style.display = 'flex';
      document.querySelector('header>nav').style.transition = 'width 0.3s, opacity 0.3s';
      document.querySelector('header>nav').style.right = 'unset';
      document.querySelector('header>nav').style.opacity = '1';
      document.querySelector('header>nav').style.transition = 'right 0.3s ease, width 0.3s, opacity 0.3s';

      document.querySelector('header>button').setAttribute('aria-expanded', 'true');
      middleLine.style.display = 'unset';
      topLine.style.transform = 'translate(0, 0) rotate(0)';
      bottomLine.style.transform = 'translate(0, 0) rotate(0)';
    }
}

document.querySelector("header>button").addEventListener("click", handleMobNav);
buttons.forEach(function(button, index) {
    button.addEventListener("click", handleDropdown);
});
pingResize();
window.addEventListener('resize', pingResize);

// initial aria-expanded
const navButtons = document.querySelectorAll('header button');
navButtons.forEach(button => {
    button.setAttribute('aria-expanded', 'false');
})
// initial and handle aria-hidden for mobile button
function hideMobNav() {
  const button = document.querySelector('header>button');
  if (window.innerWidth > 1050) {
    button.setAttribute('aria-hidden', 'true');
  } else {
    button.setAttribute('aria-hidden', 'false');
  }
}
hideMobNav();
window.addEventListener('resize', hideMobNav);

// slideshow
document.addEventListener("DOMContentLoaded", function () {
  let slides = document.querySelectorAll('.slide');
  let currentSlide = 0;
  let totalSlides = slides.length;
  let slideInterval;

  function showSlide(index) {
      slides.forEach(function (slide) {
          slide.classList.remove('active');
      });
      slides[index].classList.add('active');
  }

  function nextSlide() {
      currentSlide = (currentSlide + 1) % totalSlides;
      showSlide(currentSlide);
  }

  function prevSlide() {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      showSlide(currentSlide);
  }

  function startSlideInterval() {
      slideInterval = setInterval(nextSlide, 6000);
  }

  //start
  startSlideInterval();

  document.getElementById('slideshow-button-left').addEventListener('click', function (event) {
      event.preventDefault();
      clearInterval(slideInterval); //stop
      prevSlide();
      startSlideInterval(); //restart auto
  });

  document.getElementById('slideshow-button-right').addEventListener('click', function (event) {
      event.preventDefault();
      clearInterval(slideInterval); //stop
      nextSlide();
      startSlideInterval(); //restart auto
  });

  //show
  showSlide(currentSlide);
});

let pingScroll = false;
let scrollThreshold = 700;
window.onscroll = function() {
  if (!pingScroll && (document.body.scrollTop > scrollThreshold || document.documentElement.scrollTop > scrollThreshold)) {
    smoothTransition();
    pingScroll = true;
  } else if (pingScroll && (document.body.scrollTop <= scrollThreshold && document.documentElement.scrollTop <= scrollThreshold)) {
    smoothTransition();
    pingScroll = false;
  }
};

function smoothTransition() {
  const scrollButton = document.getElementById("scrollButton");
  scrollButton.style.transition = "bottom 0.3s, opacity 0.25s";
  
  if (pingScroll) {
    scrollButton.style.bottom = "-100px"; // Show button
  } else {
    scrollButton.style.bottom = "35px"; // Hide button
  }
}

function scrollToTop(scrollDuration) {
  var scrollStep = -window.scrollY / (scrollDuration / 15),
      scrollInterval = setInterval(function(){
      if ( window.scrollY != 0 ) {
          window.scrollBy( 0, scrollStep );
      }
      else clearInterval(scrollInterval); 
  },15);
}

// animation code
document.getElementById('scrollButton').addEventListener("click", function() {
  scrollToTop(200);
});

// removes insurance
document.addEventListener('DOMContentLoaded', function() {
  var stylesheet = document.getElementById('js-insurance');
  if (stylesheet) {
    stylesheet.parentNode.removeChild(stylesheet);
  }
});

// fixes cls for document imgs
window.onload = function() {
  var images = document.querySelectorAll('.loadedImage');
  images.forEach(function(img) {
      img.onload = function() {
          setImageHeight(img);
      };
      if (img.complete) {
          setImageHeight(img);
      }
  });
};

function setImageHeight(img) {
  img.style.aspectRatio = 'unset';
  img.style.width = 'unset';
}