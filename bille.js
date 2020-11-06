class Bille {
    constructor(x, y, mvel, mrot, firerate, size, iq, sightlength, sightradius, mouth, team) {
        this.pos = createVector(x,y); // The beetle's position
        this.vel = createVector(0,0); // The beetle's velocity
        this.acc = createVector(0,0); // The beetle's acceleration
        this.rot = random(Math.PI*2); // Which way the beetle is facing
        this.mvel = mvel; // Is this how fast it can move?
        this.mrot = mrot; // And is this how fast it can rotate?
        this.firerate = firerate; // How quickly the beetle shoots
        this.size = size; // How big the beetle is
        this.iq = iq; // Noget med ai
        this.sightlength = sightlength; // How far the beetle can see
        this.sightradius = sightradius; // The beetle's FOV basically
        this.mouth = mouth; // Something with its mouth (damage up close or smth)
        this.team = team; // Which team the beetle is on
    }

    update() {
        // Add acceleration to velocity, move beetle, reset acceleration
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    render() {
        // Color
        fill(this.team*255);
        noStroke();
        // Draw beetle
        ellipse(this.pos.x, this.pos.y, this.size);
        // Draw beetle's FOV
        stroke(0,255,255);
        strokeWeight(2);
        line(this.pos.x, this.pos.y, this.pos.x+Math.cos(this.rot+this.sightradius/2)*this.sightlength, this.pos.y+Math.sin(this.rot+this.sightradius/2)*this.sightlength);
        line(this.pos.x, this.pos.y, this.pos.x+Math.cos(this.rot-this.sightradius/2)*this.sightlength, this.pos.y+Math.sin(this.rot-this.sightradius/2)*this.sightlength);
    }
    
}