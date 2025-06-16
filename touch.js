// Touch navigation script for mobile devices
document.addEventListener('DOMContentLoaded', function() {
    // Debug function - add #debug to URL to see messages
    const debug = window.location.hash === '#debug';
    function log(msg) {
        if (debug) console.log('[Touch Nav] ' + msg);
    }
    
    log('Touch navigation script loaded');
    
    // Get navigation URLs from both arrow links and fallback to window.navigationData
    let prevUrl = null;
    let nextUrl = null;
    
    function updateNavigationUrls() {
        const prevLink = document.querySelector('.left-arrow a');
        const nextLink = document.querySelector('.right-arrow a');
        
        prevUrl = prevLink ? prevLink.getAttribute('href') : null;
        nextUrl = nextLink ? nextLink.getAttribute('href') : null;
        
        // Fallback to navigationData if available
        if (window.navigationData) {
            if (!prevUrl && window.navigationData.prevUrl) {
                prevUrl = window.navigationData.prevUrl;
            }
            if (!nextUrl && window.navigationData.nextUrl) {
                nextUrl = window.navigationData.nextUrl;
            }
        }
        
        log('Prev URL: ' + prevUrl);
        log('Next URL: ' + nextUrl);
    }
    
    updateNavigationUrls();
    
    // Navigation functions
    function goToPrevious() {
        if (prevUrl && prevUrl.length > 0) {
            log('Going to previous: ' + prevUrl);
            window.location.href = prevUrl;
        } else {
            log('No previous URL available');
        }
    }
    
    function goToNext() {
        if (nextUrl && nextUrl.length > 0) {
            log('Going to next: ' + nextUrl);
            window.location.href = nextUrl;
        } else {
            log('No next URL available');
        }
    }
    
    // Keyboard navigation (works on desktop)
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            goToPrevious();
        } else if (e.key === 'ArrowRight') {
            goToNext();
        }
    });
    
    // Touch/swipe detection - only for mobile
    let touchStartX = null;
    let touchStartY = null;
    let touchStartTime = null;
    const swipeThreshold = 75; // minimum distance for swipe
    const restraint = 100; // maximum perpendicular distance
    const allowedTime = 600; // maximum time for swipe
    
    // Only add touch events on mobile devices
    if (window.matchMedia('(max-width: 768px)').matches) {
        log('Mobile device detected - enabling touch navigation');
        
        document.addEventListener('touchstart', function(e) {
            const touch = e.touches[0];
            touchStartX = touch.clientX;
            touchStartY = touch.clientY;
            touchStartTime = Date.now();
            log('Touch start: ' + touchStartX + ',' + touchStartY);
        }, { passive: true });
        
        document.addEventListener('touchend', function(e) {
            if (touchStartX === null || touchStartY === null) return;
            
            const touch = e.changedTouches[0];
            const touchEndX = touch.clientX;
            const touchEndY = touch.clientY;
            const touchEndTime = Date.now();
            
            const distX = touchEndX - touchStartX;
            const distY = Math.abs(touchEndY - touchStartY);
            const elapsedTime = touchEndTime - touchStartTime;
            
            log('Touch end: ' + touchEndX + ',' + touchEndY + ', distX: ' + distX + ', distY: ' + distY + ', time: ' + elapsedTime);
            
            // Check if this qualifies as a swipe
            if (elapsedTime <= allowedTime && Math.abs(distX) >= swipeThreshold && distY <= restraint) {
                if (distX > 0) {
                    // Right swipe = previous image
                    log('Right swipe detected - going to previous');
                    goToPrevious();
                } else {
                    // Left swipe = next image
                    log('Left swipe detected - going to next');
                    goToNext();
                }
                
                // Prevent default behavior
                e.preventDefault();
            }
            
            // Reset touch tracking
            touchStartX = null;
            touchStartY = null;
            touchStartTime = null;
        }, { passive: false });
        
    } else {
        log('Desktop device - touch navigation disabled');
    }
});