// Ultra-simple touch navigation script
document.addEventListener('DOMContentLoaded', function() {
    // Debug function - add #debug to URL to see messages
    const debug = window.location.hash === '#debug';
    function log(msg) {
        if (debug) console.log('[Nav] ' + msg);
    }
    
    log('Navigation script loaded');
    
    // Get navigation URLs
    const prevLink = document.querySelector('.left-arrow a');
    const nextLink = document.querySelector('.right-arrow a');
    
    const prevUrl = prevLink ? prevLink.getAttribute('href') : null;
    const nextUrl = nextLink ? nextLink.getAttribute('href') : null;
    
    log('Prev URL: ' + prevUrl);
    log('Next URL: ' + nextUrl);
    
    // Navigation functions
    function goToPrevious() {
        if (prevUrl) {
            log('Going to previous: ' + prevUrl);
            window.location.href = prevUrl;
        }
    }
    
    function goToNext() {
        if (nextUrl) {
            log('Going to next: ' + nextUrl);
            window.location.href = nextUrl;
        }
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            goToPrevious();
        } else if (e.key === 'ArrowRight') {
            goToNext();
        }
    });
    
    // Simple swipe detection
    let startX, startY;
    
    document.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        log('Touch start: ' + startX + ',' + startY);
    });
    
    document.addEventListener('touchend', function(e) {
        if (!startX || !startY) return;
        
        let endX = e.changedTouches[0].clientX;
        let endY = e.changedTouches[0].clientY;
        log('Touch end: ' + endX + ',' + endY);
        
        let diffX = endX - startX;
        let diffY = Math.abs(endY - startY);
        
        // If horizontal swipe is dominant and exceeds threshold
        if (Math.abs(diffX) > 50 && Math.abs(diffX) > diffY) {
            if (diffX > 0) {
                // Right swipe
                log('Right swipe detected');
                goToPrevious();
            } else {
                // Left swipe
                log('Left swipe detected');
                goToNext();
            }
        }
        
        // Reset values
        startX = startY = null;
    });
    
    // Hide arrows on mobile devices
    if (window.matchMedia('(max-width: 768px)').matches) {
        let arrows = document.querySelectorAll('.nav-arrow');
        arrows.forEach(function(arrow) {
            arrow.style.display = 'none';
        });
        log('Arrows hidden on mobile');
    } else {
        log('Desktop mode - showing arrows');
    }
});