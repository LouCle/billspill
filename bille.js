class BilleDNA {
    constructor(upgrades) {
        this.upgradetree = upgrades // default upgrades
    }
}

class Bille {
    constructor(x, y, dna, team) {
        this.dna = dna
        this.pos = createVector(x,y) // The beetle's position
        this.vel = createVector(0,0) // The beetle's velocity
        this.acc = createVector(0,0) // The beetle's acceleration
        this.rot = random(360) // Which way the beetle is facing
        this.angvel = 0 //rotation direction
        this.team = team // Which team the beetle is on
        

        // Upgradable properties
        this.mvel = 1 // Max movement speed (or just movement speed)
        this.mrot = 5 // Max rotation speed (same)
        this.rotmult = 1 //Multiplier for rotationspeed (might be irrelevant with mrot existing dunno)
        this.firerate = 30 // How quickly the beetle shoots
        this.bulletspeed = 5 // Speed of bullets
        this.bulletsize = 10 // Size of bullets
        this.size = 50 // How big the beetle is
        this.iq = 500 // Noget med ai
        this.sightlength = 800 // How far the beetle can see
        this.sightradius = 50 // The beetle's FOV basically
        this.mouth = 5 // Something with its mouth (damage up close or smth)
        this.health = 5 // The beetle's health

        // apply
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
    
    turning() {
        // Turn to look at enemy
        let lowestDist = []
        for (let i in biller[int(!this.team)]) {
            let enemyBille = biller[int(!this.team)][i]
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
        let v1 = p5.Vector.sub(chosenBille.pos, this.pos)
        let v2 = p5.Vector.fromAngle(this.rot/180*Math.PI)

        // get signed angle between them
        let desiredTurn = atan2(v1.y,v1.x) - atan2(v2.y,v2.x)

        // correct to turn the most efficient direction - looks like it works, idk
        let corrector = -1
        if (desiredTurn > 180 || desiredTurn < -180) {
            corrector = -1
        } else {
            corrector = 1
        }

        this.angvel = corrector * Math.sign(desiredTurn) * this.mvel
        
    }

    update() {

        if (this.health <= 0) {
            return DEAD
        }
        
        // Turning
        if(frameCount%2==0) this.turning()
        
        // Shooting
        this.shooting()
        this.move()
    }

    move() {
        // Add acceleration to velocity, move beetle, reset acceleration
        this.vel.add(this.acc)
        this.pos.add(this.vel)
        this.acc.mult(0)
        
        this.rot += this.angvel*this.rotmult
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
