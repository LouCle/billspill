class Bille {
    constructor(x, y, mvel, mrot, firerate, size, iq, sightlength, sightradius, mouth, team) {
        this.pos = createVector(x,y); // The bug's position
        this.vel = createVector(0,0); // The bug's velocity
        this.acc = createVector(0,0); // The bug's acceleration
        this.rot = random(Math.PI*2); // Which way the bug is facing
        this.mvel = mvel; // Is this how fast it can move?
        this.mrot = mrot; // And is this how fast it can rotate?
        this.firerate = firerate; // How quickly the bug shoots
        this.size = size; // How big the bug is
        this.iq = iq; // Noget med ai
        this.sightlength = sightlength; // How far the bug can see
        this.sightradius = sightradius; // The bug's FOV basically
        this.mouth = mouth; // Something with its mouth (damage up close or smth)
        this.team = team; // Which team the bug is on
    }

    update() {
        // Add acceleration to velocity, move bug, reset acceleration
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    render() {
        // Color
        fill(this.team*255);
        noStroke();
        // Draw bug
        ellipse(this.pos.x, this.pos.y, this.size);
        // Draw bug's FOV
        stroke(0,255,255);
        strokeWeight(2);
        line(this.pos.x, this.pos.y, this.pos.x+Math.cos(this.rot+this.sightradius/2)*this.sightlength, this.pos.y+Math.sin(this.rot+this.sightradius/2)*this.sightlength);
        line(this.pos.x, this.pos.y, this.pos.x+Math.cos(this.rot-this.sightradius/2)*this.sightlength, this.pos.y+Math.sin(this.rot-this.sightradius/2)*this.sightlength);
    }
    
}