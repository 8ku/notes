function createNewBubble(containerId, message) {
    const container = document.getElementById(containerId);
    
    // Create new bubble element
    const bubble = document.createElement('div');
    bubble.className = 'count-bubble';
    bubble.textContent = message || '0';
    
    // Add to container
    container.appendChild(bubble);
    
    // Show the bubble with animation
    setTimeout(() => {
        bubble.classList.add('show');
    }, 50);
    
    // Auto-hide after 1.5 seconds (matching your original timing)
    setTimeout(() => {
        bubble.classList.add('hide');
        // Remove from DOM after animation completes
        setTimeout(() => {
            if (bubble.parentNode) {
                bubble.parentNode.removeChild(bubble);
            }
        }, 500);
    }, 300);
}

// Your original counting function with smooth animation
function myFunction() {
    let x;
    const $results = $("#search-results");
    if ($results.is(":visible")) {
        // Count <li> in search results only
        x = $results.find("li").length;
    } else {
        // Count <li> in the main content only
        x = $(".con li").length;
    }
    var message = x;

    // Add jump animation to button
    const button = document.querySelector('.calculation');
    button.classList.add('jump-animation');
    setTimeout(() => {
        button.classList.remove('jump-animation');
    }, 300);

    var containerId = 'bubble-container';
    createNewBubble(containerId, message);
}

// Alternative version if you want to use a specific bubble ID (like your original code)
function myFunctionWithId(bubbleId) {
    var x = $("li:visible").length;
    var container = document.getElementById(bubbleId).parentNode;
    // var message = "Total count: " + x;
    var message = x;
    
    createNewBubble(container.id, message);
}