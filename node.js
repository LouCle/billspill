class Node {
    constructor(x, y, parent, team, upgrade) {
        this.parent = parent
        let deg = random(360)
        this.pos = !parent ? createVector(x,y) : createVector(parent.pos.x + 40, parent.pos.y + 60)
        this.team = team
        this.upgrade = upgrade
    }

    render() {
        fill(255)
        if (this.parent) {
            line(this.parent.pos.x, this.parent.pos.y, this.pos.x, this.pos.y)
        }
        let key = Object.keys(this.upgrade)[0]
        textSize(30)
        text("+" + this.upgrade[key] + " " + key, this.pos.x, this.pos.y)
    }
}
