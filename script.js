document.addEventListener("DOMContentLoaded", function() {
  // Console debug function
  function debug(msg) {
    if (window.location.hash === '#debug') {
      console.log(msg);
    }
  }
  
  debug('Script loaded');
  
  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
      goToPrevious();
    } else if (e.key === 'ArrowRight') {
      goToNext();
    }
  });

  // Simple swipe detector
  let touchArea = document.querySelector('.image-container') || document.body;
  let startX, startY, startTime;
  let threshold = 50; // minimum distance to be considered a swipe
  let restraint = 100; // maximum perpendicular distance allowed
  let allowedTime = 500; // maximum time allowed for the swipe
  
  debug('Touch area: ' + (touchArea === document.body ? 'body' : '.image-container'));
  
  // Add touch event listeners
  touchArea.addEventListener('touchstart', function(e) {
    debug('Touch start detected');
    startX = e.changedTouches[0].pageX;
    startY = e.changedTouches[0].pageY;
    startTime = new Date().getTime();
    e.preventDefault(); // prevent default behavior
  }, { passive: false });
  
  touchArea.addEventListener('touchend', function(e) {
    debug('Touch end detected');
    let distX = e.changedTouches[0].pageX - startX;
    let distY = Math.abs(e.changedTouches[0].pageY - startY);
    let elapsedTime = new Date().getTime() - startTime;
    
    debug('Swipe data: distX=' + distX + ', distY=' + distY + ', time=' + elapsedTime);
    
    // Check if the swipe meets the criteria
    if (elapsedTime <= allowedTime && Math.abs(distX) >= threshold && distY <= restraint) {
      if (distX < 0) {
        // Swipe left - next image
        debug('Swipe LEFT detected - going to next');
        goToNext();
      } else {
        // Swipe right - previous image
        debug('Swipe RIGHT detected - going to previous');
        goToPrevious();
      }
    }
    
    e.preventDefault(); // prevent default behavior
  }, { passive: false });
  
  // Navigation functions
  function goToPrevious() {
    debug('Navigation: previous');
    // Try to get URL from navigation data
    if (window.navigationData && window.navigationData.prevUrl) {
      if (window.navigationData.prevUrl.length > 0) {
        debug('Using navigationData.prevUrl: ' + window.navigationData.prevUrl);
        window.location.href = window.navigationData.prevUrl;
        return;
      }
    }
    
    // Fallback to DOM elements
    const prevLink = document.querySelector('.left-arrow a');
    if (prevLink && !prevLink.classList.contains('disabled')) {
      debug('Using DOM link: ' + prevLink.getAttribute('href'));
      window.location.href = prevLink.getAttribute('href');
    } else {
      debug('No previous link found');
    }
  }
  
  function goToNext() {
    debug('Navigation: next');
    // Try to get URL from navigation data
    if (window.navigationData && window.navigationData.nextUrl) {
      if (window.navigationData.nextUrl.length > 0) {
        debug('Using navigationData.nextUrl: ' + window.navigationData.nextUrl);
        window.location.href = window.navigationData.nextUrl;
        return;
      }
    }
    
    // Fallback to DOM elements
    const nextLink = document.querySelector('.right-arrow a');
    if (nextLink && !nextLink.classList.contains('disabled')) {
      debug('Using DOM link: ' + nextLink.getAttribute('href'));
      window.location.href = nextLink.getAttribute('href');
    } else {
      debug('No next link found');
    }
  }
});
