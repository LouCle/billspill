class Explosion {
    constructor(x, y, damage, radius, aliveframes, magnitude) {
        this.pos = createVector(x,y)
        this.damage = damage // the damage, ex. 1 for a bullet
        this.radius = radius // the radius of the explosion
        this.magnitude = magnitude // factor for how much the radius should increase per frame
        this.aliveframes = aliveframes // how many frames the explosion should be for
        this.frames = 0
        this.team = 0 // team of the explosion

        // flashing animation
        this.colors = ["#FF0000", "#FFFFFFF"]
        this.currentColor = this.colors[0]

    }

    update() {
        if (this.frames == this.aliveframes) {
            return DEAD
        }


        this.frames += 1
        this.radius += this.magnitude * this.frames

        this.currentColor = this.colors[this.frames % this.colors.length]
    }

    render() {
        fill(this.currentColor)
        ellipse(this.pos.x, this.pos.y, this.radius)
    }
}
