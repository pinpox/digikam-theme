document.addEventListener("DOMContentLoaded", function() {
    // Debug mode can be enabled by adding #debug to the URL
    const isDebug = window.location.hash === '#debug';
    
    // Simple debug logger
    function log(message) {
        if (isDebug) {
            console.log(`[SwipeNav] ${message}`);
            
            // Create or update debug overlay
            let debugEl = document.getElementById('swipe-debug');
            if (!debugEl) {
                debugEl = document.createElement('div');
                debugEl.id = 'swipe-debug';
                debugEl.style.position = 'fixed';
                debugEl.style.bottom = '10px';
                debugEl.style.right = '10px';
                debugEl.style.backgroundColor = 'rgba(0,0,0,0.7)';
                debugEl.style.color = 'white';
                debugEl.style.padding = '10px';
                debugEl.style.zIndex = '9999';
                debugEl.style.fontFamily = 'monospace';
                debugEl.style.fontSize = '12px';
                debugEl.style.maxWidth = '80%';
                document.body.appendChild(debugEl);
            }
            
            // Add new message to debug overlay
            const msgEl = document.createElement('div');
            msgEl.textContent = message;
            debugEl.appendChild(msgEl);
            
            // Only keep last 5 messages
            while (debugEl.childNodes.length > 5) {
                debugEl.removeChild(debugEl.firstChild);
            }
        }
    }

    log('Touch navigation script loaded');
    
    // Navigation data from template
    const prevUrl = window.navigationData && window.navigationData.prevUrl;
    const nextUrl = window.navigationData && window.navigationData.nextUrl;
    
    log(`Navigation data: prev=${prevUrl}, next=${nextUrl}`);
    
    // Navigate to previous/next page
    function goToPrevious() {
        if (prevUrl) {
            log(`Navigating to previous: ${prevUrl}`);
            window.location.href = prevUrl;
        } else {
            log('No previous page available');
        }
    }
    
    function goToNext() {
        if (nextUrl) {
            log(`Navigating to next: ${nextUrl}`);
            window.location.href = nextUrl;
        } else {
            log('No next page available');
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
    
    // Touch variables
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;
    
    // Add swipe detection to the whole document
    document.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
        log(`Touch start at: ${touchStartX},${touchStartY}`);
    }, false);
    
    document.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        
        log(`Touch end at: ${touchEndX},${touchEndY}`);
        
        // Calculate swipe
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;
        const absDeltaX = Math.abs(deltaX);
        const absDeltaY = Math.abs(deltaY);
        
        log(`Swipe delta: x=${deltaX}, y=${deltaY}`);
        
        // Minimum distance required for a swipe
        const minDistance = 75;
        
        // If horizontal swipe is dominant and exceeds minimum distance
        if (absDeltaX > absDeltaY && absDeltaX > minDistance) {
            // Check swipe direction
            if (deltaX < 0) {
                // Swipe left (next)
                log('Detected left swipe - go to next');
                goToNext();
            } else {
                // Swipe right (previous)
                log('Detected right swipe - go to previous');
                goToPrevious();
            }
        } else {
            log('No valid swipe detected');
        }
    }
    
    // If mobile (no hover capability), hide arrow buttons and show swipe hint
    if (window.matchMedia('(hover: none)').matches) {
        log('Mobile device detected - hiding arrows');
        
        // Hide arrow buttons
        const arrows = document.querySelectorAll('.nav-arrow');
        arrows.forEach(arrow => {
            arrow.style.display = 'none';
        });
        
        // No hint shown, just use the image container as is
        const imgContainer = document.querySelector('.image-container');
    }
    
    log('Swipe detection initialized');
});