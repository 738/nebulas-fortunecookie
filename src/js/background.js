var scketch = function (p) {

    var Particle = function (pos, v, d) {
        this.p = pos;
        this.v = v;
        this.a = 0;
        this.d = d;
        this.r = d / 2;
        this.col_r = p.floor(p.random(255));
        this.col_g = p.floor(p.random(255));
        this.col_b = p.floor(p.random(255));
    }
    Particle.prototype.addForce = function () {

    }
    Particle.prototype.update = function () {
        this.v.add(this.a);
        this.p.add(this.v);
    }
    Particle.prototype.draw = function () {
        //p.translate(p.windowWidth/2,p.windowHeight/2);
        p.noStroke();
        //gradation
        var grad = p.drawingContext.createRadialGradient(this.p.x, this.p.y, 0, this.p.x, this.p.y, this.r);
        grad.addColorStop(0.1, 'rgba(' + this.col_r + ',' + this.col_g + ',' + this.col_b + ', 1)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        p.drawingContext.fillStyle = grad;
        p.ellipse(this.p.x, this.p.y, this.d, this.d);
    }
    Particle.prototype.through = function () {
        if (this.p.x - this.r > p.windowWidth) {
            this.p.x = 0;
        } else if (this.p.x + this.r < 0) {
            this.p.x = p.windowWidth + this.r;
        }
        if (this.p.y - this.r > p.windowHeight) {
            this.p.y = 0;
        } else if (this.p.y + this.r < 0) {
            this.p.y = p.windowHeight + this.r;
        }

    }


    var particle;
    var particles = [];
    var particlesNum = 100;
    var px = 0;

    /*--
      p5 framwork
    ------------------------------------*/
    p.setup = function () {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.blendMode(p.ADD);
        p.background(0);
        for (var i = 0; i < particlesNum; i++) {
            var pos = p.createVector(p.random(p.windowWidth), p.random(p.windowHeight));
            var vec = p.createVector(p.random(-2, 2), p.random(-2, 2));
            particles.push(
                new Particle(pos, vec, p.random(4, 300))
            )
        }
    }

    p.draw = function () {
        p.clear();
        p.background(0, 0, 0, 255);
        for (var i = 0; i < particlesNum; i++) {
            particles[i].update();
            particles[i].through();
            particles[i].draw();
        }
    }

    p.mousePressed = function (event) {
    };

    p.windowResized = function () {
    }


}

new p5(scketch);