class Bille {
    constructor(x, y, mvel, mrot, firerate, bulletspeed, bulletsize, size, iq, sightlength, sightradius, mouth, health, team, rotdir) {
        this.pos = createVector(x,y) // The beetle's position
        this.vel = createVector(0,0) // The beetle's velocity
        this.acc = createVector(0,0) // The beetle's acceleration
        this.rot = random(360) // Which way the beetle is facing
        this.mvel = mvel // Max movement speed (or just movement speed)
        this.mrot = mrot // Max rotation speed (same)
        this.rotmult = 0.1 //Multiplier for rotationspeed (might be irrelevant with mrot existing dunno)
        this.rotdir = rotdir //rotation direction
        this.firerate = firerate // How quickly the beetle shoots
        this.bulletspeed = bulletspeed // Speed of bullets
        this.bulletsize = bulletsize // Size of bullets
        this.size = size // How big the beetle is
        this.iq = iq // Noget med ai
        this.sightlength = sightlength // How far the beetle can see
        this.sightradius = sightradius // The beetle's FOV basically
        this.mouth = mouth // Something with its mouth (damage up close or smth)
        this.health = health // The beetle's health
        this.team = team // Which team the beetle is on
        this.bulletarray = []
    }

    shooting() {
        // Fire each firerate'th frame
        if(frameCount % this.firerate == 0){
            ents.bullets.push(new Bullet(this.pos.x, this.pos.y, this.rot, this.bulletspeed, this.bulletsize, this.team))
        }
    }

    update() {
        // Shooting
        this.shooting()
        this.move()

    }

    move() {
        // Add acceleration to velocity, move beetle, reset acceleration
        this.vel.add(this.acc)
        this.pos.add(this.vel)
        this.acc.mult(0)
        this.rot += this.rotdir*this.rotmult

    }

    render() {
        // Color
        fill(this.team*255)
        noStroke()
        // Draw beetle
        ellipse(this.pos.x, this.pos.y, this.size)
        // Draw beetle's FOV
        stroke(0,255,255)
        strokeWeight(2)
        line(this.pos.x, this.pos.y, this.pos.x+cos(this.rot+this.sightradius/2)*this.sightlength, this.pos.y+sin(this.rot+this.sightradius/2)*this.sightlength)
        line(this.pos.x, this.pos.y, this.pos.x+cos(this.rot-this.sightradius/2)*this.sightlength, this.pos.y+sin(this.rot-this.sightradius/2)*this.sightlength)
        this.checkForTarget()
    }
    
    checkForTarget() {
        let lineCheck = createVector(this.pos.x,this.pos.y)
        let linecheck2 = createVector(lineCheck.x+cos(this.rot)*1000, lineCheck.y+sin(this.rot)*1000)
        line(lineCheck.x, lineCheck.y, linecheck2.x, linecheck2.y)
    }

}
