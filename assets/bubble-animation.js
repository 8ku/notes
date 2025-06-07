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
    var x = document.getElementsByTagName("li").length;
    // var message = "Total count: " + x;
    var message = x;

    // Add jump animation to button
    const button = document.querySelector('.calculation');
    button.classList.add('jump-animation');
    
    // Remove jump animation class after it completes
    setTimeout(() => {
        button.classList.remove('jump-animation');
    }, 300);

    
    // Use your container ID or create a default one
    var containerId = 'bubble-container'; // You can change this to match your HTML
    createNewBubble(containerId, message);
}

// Alternative version if you want to use a specific bubble ID (like your original code)
function myFunctionWithId(bubbleId) {
    var x = document.getElementsByTagName("li").length;
    var container = document.getElementById(bubbleId).parentNode;
    // var message = "Total count: " + x;
    var message = x;
    
    createNewBubble(container.id, message);
}