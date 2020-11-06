class Bille {
    constructor(x, y, mvel, mrot, firerate, size, iq, eyes, mouth, team) {
        this.pos = createVector(x,y);
        this.vel = createVector(0,0);
        this.acc = createVector(0,0);
        this.rot = 0;
        this.mvel = mvel; // Is this how fast it can move?
        this.mrot = mrot; // And is this how fast it can rotate?
        this.firerate = firerate;
        this.size = size;
        this.iq = iq; //noget med ai
        this.eyes = eyes;
        this.mouth = mouth;
        this.team = team;
    }

    update() {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    render() {
        fill(this.team*255);
        noStroke();
        ellipse(this.pos.x, this.pos.y, this.size);
    }
    
}