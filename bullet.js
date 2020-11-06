class Bullet {
    constructor(x, y, direction, speed, size, team) {
        this.pos = createVector(x,y); // The bullet's position
        this.vel = p5.Vector.fromAngle(radians(direction)).setMag(speed); // The bullet's velocity
        this.size = size; // How big the bullet is
        this.team = team; // Which team the bullet is on
    }

    update() {
        // Move bullet
        this.pos.add(this.vel);
    }

    render() {
        // Color
        fill(this.team*255);
        noStroke();
        // Draw bullet
        ellipse(this.pos.x, this.pos.y, this.size);
    }
    
}