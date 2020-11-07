// if we are gonna add more entities, Bullet should inherit some general Entity class

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

        if (this.pos.x < borderW || this.pos.x > (W-borderW) ||
            this.pos.y < borderH || this.pos.y > (H-borderH)) {
            ents.explosions.push(new Explosion(this.pos.x, this.pos.y, 0, 10, 10, 0.2))
            return DEAD
        }
    }

    render() {
        // Color
        fill(this.team*255);
        noStroke();
        // Draw bullet
        ellipse(this.pos.x, this.pos.y, this.size);
    }
    
}
