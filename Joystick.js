class Joystick {
    constructor() {
        //joypad
        this.p = new Vector(W/4, 5*H/6);
        this.pr = 40;
        //joystick
        this.s = new Vector(W/4, 5*H/6);
        this.sr = 20;
        
        this.down = false;
        this.nv = new Vector(0, 0);
    }
    
    start(e) {
        this.down = true;
        this.move(e);
    }
    
    move(e) {
        this.s.x = e.touches[0].clientX;
        this.s.y = e.touches[0].clientY;
        
        //contain joystick within joypad
        let dist = min(hypot(this.s.x - this.p.x, this.s.y - this.p.y), this.pr);
        let θ = atan2(this.s.y - this.p.y, this.s.x - this.p.x);
        this.s.x = this.p.x + dist * cos(θ);
        this.s.y = this.p.y + dist * sin(θ);
        
        //convert user input to player movement
        this.nv.x = this.s.x - this.p.x;
        this.nv.y = this.s.y - this.p.y;
        //normalise the vector
        this.nv.norm();
        //scale the normalised vector according to joystick distance from joypad center
        let maxMove = 3; //max movement speed
        let mapedDist = map(dist, 0, this.pr, 0, maxMove);
        this.nv.scale(mapedDist);
    }
    
    end(e) {
        this.down = false;
        this.s.x = W/4;
        this.s.y = 5*H/6;
    }
    
    draw() {
        //joypad
        circle(this.p.x, this.p.y, this.pr, "rgb(0, 100, 255)");
        //joystick
        circle(this.s.x, this.s.y, this.sr, "rgb(255, 100, 0)");
    }
}
