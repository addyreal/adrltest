
// introduce #partners
function showFillers() {
  const fillerLeft = document.querySelector('#filler-item div:nth-child(1)');
  const fillerRight = document.querySelector('#filler-item div:nth-child(2)');
  fillerLeft.style.transform = 'translateX(0)';
  fillerLeft.style.opacity = '1';
  fillerRight.style.transform = 'translateX(0)';
  fillerRight.style.opacity = '1';
}

// hide #partners
function hideFillers() {
  const fillerLeft = document.querySelector('#filler-item div:nth-child(1)');
  const fillerRight = document.querySelector('#filler-item div:nth-child(2)');
  fillerLeft.style.transform = 'translateX(-50px)';
  fillerLeft.style.opacity = '0';
  fillerRight.style.transform = 'translateX(50px)';
  fillerRight.style.opacity = '0';
}

// detect scroll events
window.addEventListener('scroll', function() {
  // get the bounding rectangle of #filler-wrap
  const fillerContainer = document.getElementById('filler-wrap').getBoundingClientRect();
  // check if #filler-wrap is out of viewport
  if (fillerContainer.bottom < 0) {
    hideFillers();
  }
  else if (fillerContainer.top > window.innerHeight) {
    // check if #filler-wrap is entirely out of the viewport (below it, this time)
    // this is added in case the user scrolls quickly back and forth, avoiding constant toggling of the visibility
    hideFillers();
  }
});

// create a new intersection observer
const observer2 = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    // check for intersection
    if (entry.isIntersecting) {
      // calculate the visible height of #filler-wrap
      const visibleHeight = entry.intersectionRect.height;
      const targetHeight = entry.boundingClientRect.height;
      const visiblePercentage = visibleHeight / targetHeight;
      if (visiblePercentage >= 0.3) {
        showFillers();
      }
    }
  });
}, { threshold: 0.3 });

observer2.observe(document.querySelector('#filler-wrap'));