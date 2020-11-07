/*
  REMEMBER

  Always refer to "mutable" properties as this._dna, and remember to use the definition that

  this._dna = applied(this.dna, upgradetree)

  to create the base DNA + all the upgrades
  
  - L

*/

function applied(dna, upgradetree) {
    let temp = JSON.parse(JSON.stringify(dna)) // deep-copy, very buggy, don't touch
    for (let upgrade of upgradetree) {
        let key = Object.keys(upgrade)[0]
        temp[key] = temp[key] + upgrade[key]
    }
    return temp
}

class BilleDNA {
    constructor(mvel, mrot, firerate, bulletspeed, bulletsize, size, iq, sightlength, sightradius, mouth, health) {
        this.mvel = mvel // Max movement speed (or just movement speed)
        this.mrot = mrot // Max rotation speed (same)
        this.rotmult = 0.1 //Multiplier for rotationspeed (might be irrelevant with mrot existing dunno)
        this.firerate = firerate // How quickly the beetle shoots
        this.bulletspeed = bulletspeed // Speed of bullets
        this.bulletsize = bulletsize // Size of bullets
        this.size = size // How big the beetle is
        this.iq = iq // Noget med ai
        this.sightlength = sightlength // How far the beetle can see
        this.sightradius = sightradius // The beetle's FOV basically
        this.mouth = mouth // Something with its mouth (damage up close or smth)
        this.health = health // The beetle's health
        this.upgradetree = [{"iq" : 10}, {"size" : 20}] // default upgrades
    }

    // unused getter
    // will be useful later when I get rid of the whole applied() bullshit
    /*
    get stats() {
        let temp = new BilleDNA()
        for (let i in this.upgradetree) {
            let key = Object.keys(this.upgradetree[i])[0]
            temp[key] = this.upgradetree[i][key]
        }
        return temp
    }
    */
}

// note: no longer extends BilleDNA, they are "unrelated" objects now
class Bille {
    constructor(x, y, dna, team, angvel) {
        this.dna = dna
        this._dna = applied(this.dna, this.dna.upgradetree)
        this.pos = createVector(x,y) // The beetle's position
        this.vel = createVector(0,0) // The beetle's velocity
        this.acc = createVector(0,0) // The beetle's acceleration
        this.rot = random(360) // Which way the beetle is facing
        this.angvel = angvel //rotation direction
        this.team = team // Which team the beetle is on
    }

    shooting() {
        this._dna = applied(this.dna, this.dna.upgradetree)
        // Fire each firerate'th frame
        if(frameCount % this._dna.firerate == 0){
            ents.bullets.push(new Bullet(this.pos.x, this.pos.y, this.rot, this._dna.bulletspeed, this._dna.bulletsize, this.team))
        }
    }

    update() {
        this._dna = applied(this.dna, this.dna.upgradetree)
        // Shooting
        this.shooting()
        this.move()

    }

    move() {
        this._dna = applied(this.dna, this.dna.upgradetree)
        // Add acceleration to velocity, move beetle, reset acceleration
        this.vel.add(this.acc)
        this.pos.add(this.vel)
        this.acc.mult(0)
        this.rot += this.angvel*this._dna.rotmult

    }

    render() {
        this._dna = applied(this.dna, this.dna.upgradetree)
        // Color
        fill(this.team*255)
        noStroke()
        // Draw beetle
        ellipse(this.pos.x, this.pos.y, this._dna.size)
        // Draw beetle's FOV
        stroke(0,255,255)
        strokeWeight(2)

        let sr = this._dna.sightradius //yeah som om jeg gider skrive det her 40 gange
        let sl = this._dna.sightlength

        line(this.pos.x, this.pos.y, this.pos.x+cos(this.rot+sr/2)*sl, this.pos.y+sin(this.rot+sr/2)*sl)
        line(this.pos.x, this.pos.y, this.pos.x+cos(this.rot-sr/2)*sl, this.pos.y+sin(this.rot-sr/2)*sl)
        this.checkForTarget()
    }
    
    checkForTarget() {
        this._dna = applied(this.dna, this.dna.upgradetree)
        let lineCheck = createVector(this.pos.x,this.pos.y)
        let linecheck2 = createVector(lineCheck.x+cos(this.rot)*1000, lineCheck.y+sin(this.rot)*1000)
        line(lineCheck.x, lineCheck.y, linecheck2.x, linecheck2.y)
    }

}
