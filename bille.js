class BilleDNA {
    constructor(upgrades) {
        this.upgradetree = upgrades // default upgrades
    }
}

class Bille {
    constructor(x, y, dna, team) {
        // Upgradable properties
        this.mvel = 2 // Max movement speed (or just movement speed)
        this.mrot = 5 // Max rotation speed (same)
        this.rotmult = 1 //Multiplier for rotationspeed (might be irrelevant with mrot existing dunno)
        this.firerate = 30 // How quickly the beetle shoots
        this.bulletspeed = 5 // Speed of bullets
        this.bulletsize = 10 // Size of bullets
        this.accuracy = 0 // the lower the better
        this.size = 50 // How big the beetle is
        this.iq = 500 // Noget med ai
        this.sightlength = 800 // How far the beetle can see
        this.sightradius = 50 // The beetle's FOV basically
        this.mouth = 5 // Something with its mouth (damage up close or smth)
        this.maxhealth = 15// The beetle's health

        // temp
        this.dna = dna
        this.pos = createVector(x,y) // The beetle's position
        this.vel = createVector(0,0) // The beetle's velocity
        this.acc = createVector(0,0) // The beetle's acceleration
        this.rot = random(360) // Which way the beetle is facing
        this.angvel = 0 //rotation direction
        this.enemy_center_of_mass = createVector(0,0)
        this.team = team // Which team the beetle is on
        this.target = createVector(0,0) // Which beetle the beetle is currently targeting
        this.state = CHASING // CHASING or FLEEING or FLEEFROMTARGET
        this.health = this.maxhealth

        for (let upgrade of this.dna.upgradetree) {
            let key = Object.keys(upgrade)[0]
            this[key] = this[key] + upgrade[key]
        }

    }

    shooting() {
        // Fire each firerate'th frame
        if(frameCount % this.firerate == 0){
            ents.bullets.push(new Bullet(this.pos.x, this.pos.y, this.rot, this.bulletspeed, this.bulletsize, this.team))
        }
    }
    
    findTarget() {
        // Turn to look at enemy

        if (biller[int(!this.team)].length == 0) return // early return to avoid out of index errors
        this.enemy_center_of_mass = createVector(0,0)
        let lowestDist = []
        for (let i in biller[int(!this.team)]) {
            let enemyBille = biller[int(!this.team)][i]
            this.enemy_center_of_mass.add(enemyBille.pos)
            lowestDist.push([ds2(this.pos.x,this.pos.y,enemyBille.pos.x,enemyBille.pos.y),i])
        }
        lowestDist.sort(function(a, b) {
            if (a[0] === b[0]) {
                return 0
            }
            else {
                return (a[0] < b[0]) ? -1 : 1
            }
        })
        let chosenBille = biller[int(!this.team)][lowestDist[0][1]]
        this.enemy_center_of_mass.div(biller[int(!this.team)].length)
        this.target = chosenBille.pos
        
    }

    aim() {
        let v1 = p5.Vector.sub(this.target, this.pos)
        let v2 = p5.Vector.fromAngle(this.rot/180*Math.PI)

        let acc_off = random(-this.accuracy,this.accuracy)

        // get signed angle between them
        let desiredTurn = atan2(v1.y,v1.x) - atan2(v2.y,v2.x) + acc_off

        // correct to turn the most efficient direction - looks like it works, idk
        let corrector = -1
        if (desiredTurn > 180 || desiredTurn < -180) {
            corrector = -1
        } else {
            corrector = 1
        }
        let desiredAng = mod(atan2(v1.y,v1.x) + acc_off, 360)
        let billeAng = mod(this.rot, 360)
        if (d(this.rot,desiredAng) < this.mrot+1) {
            this.angvel = 0
            this.rot = desiredAng
            return
        } else {
            this.angvel = corrector * Math.sign(desiredTurn) * this.mrot
        }

        this.rot += this.angvel

    }

    update() {


        if (this.health <= 0) {
            return DEAD
        } else if (this.health < Math.ceil(this.maxhealth/2)) {
            this.state = FLEEING
        } else if (ds2(this.pos.x, this.pos.y, this.target.x, this.target.y) < 150**2) {
            this.state = FLEEFROMTARGET
        } else {
           this.state = CHASING
        }
        
        // Turning
        if(frameCount%60==0) this.findTarget()

        if (frameCount%2==0) this.aim()
        
        // Shooting
        this.shooting()
        this.move()
    }

    move() {
        // Add acceleration to velocity, move beetle, reset acceleration
        if (this.state == FLEEING) {
            this.acc = p5.Vector.sub(this.pos,this.enemy_center_of_mass).normalize().mult(0.1)
        } else if (this.state == CHASING) {
            this.acc = p5.Vector.sub(this.target,this.pos).normalize().mult(0.1)
        } else if (this.state == FLEEFROMTARGET) {
            this.acc = p5.Vector.sub(this.pos,this.target).normalize().mult(0.1)
        }
        this.vel.add(this.acc)
        this.vel.limit(this.mvel)
        this.pos.add(this.vel)
        this.acc.mult(0)

    }

    render() {
        // Color
        fill(this.team ? 235 : 20)
        noStroke()
        // Draw beetle
        ellipse(this.pos.x, this.pos.y, this.size)

        // health
        noStroke()
        fill(this.team ? 20 : 235)
        textSize(30)
        text(this.health, this.pos.x, this.pos.y-40)
        
        noStroke()
        fill(this.team ? 20 : 235)
        textSize(30)
        text(this.state, this.pos.x, this.pos.y+40)
        
        // Rotation mark
        stroke(255,0,0)
        line(this.pos.x,this.pos.y,this.pos.x+cos(this.rot)*this.size/2,this.pos.y+sin(this.rot)*this.size/2)

        // Draw beetle's FOV
        /*
        stroke(0,255,255)
        strokeWeight(2)

        let sr = this.sightradius //yeah som om jeg gider skrive det her 40 gange
        let sl = this.sightlength

        line(this.pos.x, this.pos.y, this.pos.x+cos(this.rot+sr/2)*sl, this.pos.y+sin(this.rot+sr/2)*sl)
        line(this.pos.x, this.pos.y, this.pos.x+cos(this.rot-sr/2)*sl, this.pos.y+sin(this.rot-sr/2)*sl)
        this.checkForTarget()
        */
    }
    
    checkForTarget() {
        let lineCheck = createVector(this.pos.x,this.pos.y)
        let linecheck2 = createVector(lineCheck.x+cos(this.rot)*1000, lineCheck.y+sin(this.rot)*1000)
        line(lineCheck.x, lineCheck.y, linecheck2.x, linecheck2.y)
    }

}
