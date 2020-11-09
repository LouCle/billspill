class Bullet {
    constructor(x, y, direction, speed, size, team) {
        this.pos = createVector(x,y) // The bullet's position
        this.vel = p5.Vector.fromAngle(radians(direction)).setMag(speed) // The bullet's velocity
        this.size = size // How big the bullet is
        this.team = team // Which team the bullet is on
    }

    update() {
        // Move bullet
        this.pos.add(this.vel)

        let border = this.pos.x < borderW || this.pos.x > (W-borderW) ||
            this.pos.y < borderH || this.pos.y > (H-borderH)

        let billecol = false
        let bille_id = 0

        // check all biller in the opposite team
        for (let i in biller[this.team ? 0 : 1]) {
            let bille = biller[this.team ? 0 : 1][i]
            if (ds2(bille.pos.x, bille.pos.y, this.pos.x, this.pos.y) < (this.size/2+bille.size/2)**2) {
                billecol = true
                bille_id = i
            }
            
        }

        if (border || billecol) {
            ents.explosions.push(new Explosion(this.pos.x, this.pos.y, 1, 10, 10, 0.5, billecol ? bille_id : null, this.team))
            return DEAD
        }

        
    }

    render() {
        // Color
        fill(this.team*255)
        noStroke()
        // Draw bullet
        ellipse(this.pos.x, this.pos.y, this.size)
    }
    
}
