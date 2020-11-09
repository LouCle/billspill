class Node {
    constructor(W, H, team, upgrade) {
        this.team = team
        this.upgrade = upgrade
    }

    render(node,len) {
        fill(255)
        let deg = 90

        let pnode = !node ? node : node - 1

        let dist = 50

        let px = this.team * W/2 + W/6
        let py = H/8 + pnode*dist
        let x = this.team * W/2 + W/6
        let y = H/8 + node*dist

        stroke(this.team?20:235)
        fill((this.team == 0)?20:235)
        let key = Object.keys(this.upgrade)[0]
        textSize(30)

        textAlign(LEFT)
        text("+" + this.upgrade[key] + " " + key, x, y)
    }
}
