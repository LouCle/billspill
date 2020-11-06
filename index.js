// Main file
// Initialize global variables
let W = window.innerWidth
let H = window.innerHeight
let biller = []

// Setup function (runs once)
function setup() {
    createCanvas(W, H);
    background(0);
    
}

// Draw function (runs in a loop)
function draw() {
    background(0)
    updateEntities()
}
