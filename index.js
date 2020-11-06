let W = window.innerWidth
let H = window.innerHeight
let biller = []


function Bille(x, y, mvel, mrot, fspeed, r, iq, eyes, mouth) {
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

    this.update = function() {
        // this
    }

    this.show = function() {
        fill(255)
        ellipse(this.pos.x, this.pos.y, this.r, this.r)
    }
}


function setup() {
    createCanvas(window.innerWidth, window.innerHeight)
    background(0)

    
    
}

function draw() {
    background(0)
    for (let bill in biller) {
        
    }
}
