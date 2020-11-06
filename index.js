// Main file
// Initialize global variables
let W = window.innerWidth;
let H = window.innerHeight;
let borderW = 100;
let borderH = 100;
let biller = [];

// Setup function (runs once)
function setup() {
    createCanvas(W, H);
    background(0);
    
    for(let i = 0; i < 6; i++){
        biller[i] = new Bille(random(borderW, W-borderW), random(borderH, H-borderH), 5, 5, 5, 50, 500, 5, 5, i%2);
    }
}

// Function for updating entities (duh)
function updateEntities() {
    // Split these into two, as I think doing them both at once for each bug could lead to dead bugs being alive for an extra frame, probably not worth splitting the loop for that but w/e I'm tired - H
    for(let i = 0; i < biller.length; i++){
        biller[i].update();
    }
    for(let i = 0; i < biller.length; i++){
        biller[i].render();
    }
}

// Draw function (runs in a loop)
function draw() {
    background(color(50,150,100));
    updateEntities();
}
