class Bille {
    constructor(x, y, mvel, mrot, fspeed, r, iq, eyes, mouth, team) {
        this.pos = createVector(x,y)
        this.vel = createVector(0,0)
        this.rot = 0
        this.mvel = mvel
        this.mrot = mrot
        this.fspeed = fspeed //firing speed
        this.r = r
        this.iq = iq //noget med ai
        this.eyes = eyes
        this.mouth = mouth
        this.team = 0
    }

    update() {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    render() {
        ellipse(this.pos.x, this.pos.y, this.r);
    }
    
}