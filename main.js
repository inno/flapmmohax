(function () {
    function D() {
        k = [];
        c = null;
        u = !1;
        n = v[~~(v.length * Math.random())];
        m = new WebSocket(n, "flapmmo.com");
        m.binaryType = "arraybuffer"; 
        m.onopen = function (a) {
            h = [];
            null != c && (w = c.x);
            u = !0;
            console.log("Socket connected");
            q()
        };
        m.onmessage = function (a) {
            a = a.data;
            switch ((new DataView(a)).getUint8(0)) {
            case 0:
                x = (new DataView(a)).getInt32(1, !0);
                c = new y(x, [], "");
                k.push(c);
                break;
            case 2:
                a = new DataView(a);
                E = a.getUint32(1, !0);
                for (var b = a.getInt32(5, !0), e = 9, r = 0; r < b; r++) {
                    for (var d = a.getInt32(e, !0), e = e + 4, f = "";;) {
                        var g = a.getUint8(e++);
                        if (0 == g) break;
                        f += String.fromCharCode(g)
                    }
                    for (var g = [], m = a.getUint16(e, !0), e = e + 2, l = 0; l < m; l++) g.push(a.getUint16(e, !0)), e += 2;
                    d != x && (d = new y(d, g, f), s.push(d))
                }
                break;
            case 3:
                for (a = new DataView(a), b = 1, e = a.getInt32(b, !0), b += 4, r = 0; r < e; r++) h.push(new F(a.getInt32(b + 0, !0), a.getInt32(b + 4, !0))), b += 8
            }
        };
        m.onclose = function () {
            u = !1;
            setTimeout(D, 1E3)
        }
    }

    function G() {
        z = +new Date;
        var a = 1 + Math.ceil(s.length / 4);
        a > s.length && (a = s.length);
        for (; a--;) k.push(s.shift());
        for (a = 0; a < k.length; a++) k[a].think()
    }

    function H() {
        ++A;
        z = +new Date;
        b.clearRect(0, 0, f.width, f.height);
        var a = null != c ? c.x - 100 : 0;
        d = 0 == d ? a : Math.round((d + a) / 2);
        for (a = -(Math.floor(d / 2) % 288); a < f.width;) b.drawImage(l, 0, 0, 288, 512, a, 0, 288, 512), a += 288;
        b.save();
        b.translate(-d, 0);
        for (a =
            0; a < h.length; a++) h[a].draw();
        b.restore();
        for (a = -(Math.floor(d) % 336); a < f.width;) b.drawImage(l, 584, 0, 336, 111, a, 401, 336, 111), a += 336;
        var P = 0;
        b.save();
        b.translate(-d, 0);
        28 <= I ? (g += 10, 1E3 < g && (g = 1E3)) : (g -= 10, 20 > g && (g = 20));
        var e = g;
        J.checked && (e = 20);
        for (a = 0; a < k.length && !(k[a] != c && k[a].draw() && ++P > e); ++a);
        null != c && c.draw();
        b.restore();
        b.save();
        b.translate(-d, 0);
        for (a = 0; a < h.length; a++) h[a].drawOverlay();
        b.restore();
        u ? b.fillText("Score: " + Q() + " | Players: " + E + " | Distance: " + (null == c ? 0 : Math.floor(c.x / 200)) + " | Server #" + (v.indexOf(n) + 1)
        + (god ? " | GODMODE" : "")
        + (autobird ? " | AUTOBIRD" : "")
        , 20, 20)
        : b.fillText("Connecting to server " + n.slice(5) + "...", 20, 20);
        B.clearRect(0, 0, f.width, f.height);
        B.drawImage(t, 0, 0, f.width, f.height);
        window.requestAnimationFrame(H)
    }

    function K() {
        null != c && (c.vx = L, c.vy = 0, M(), c.reset(), w = c.x)
    }

    function Q() {
        if (null == c) return 0;
        for (var a = 0, b = 0; b < h.length; b++) c.x > h[b].x + 30 && ++a;
        return a
    }

    function y(a, b, c) {
        this.id = a;
        this.reset();
        this.seed = 9999 * Math.random();
        this.nick = c;
        this.jumps = b || [];
        this.playbackTime = 0
    }

    function F(a, b) {
        this.x = a;
        this.y = b
    }

    function N(a) {
        var b =
            k.indexOf(a); - 1 != b && (a.destroy(), k.splice(b, 1))
    }

    function M() {
        if (null != c && 0 != c.jumps.length) {
            var a = new ArrayBuffer(3 + 2 * c.jumps.length),
                b = new DataView(a);
            b.setUint8(0, 2);
            b.setUint16(1, c.jumps.length, !0);
            for (var e = 3, d = 0; d < c.jumps.length; d++) b.setUint16(e, c.jumps[d], !0), e += 2;
            m.send(a);
            c.jumps.length = 0
        }
    }

    function q() {
        var a = p.value,
            b = new ArrayBuffer(32),
            e = new DataView(b);
        e.setUint8(0, 5);
        for (var d = 0; d < a.length && 16 > d; d++) {
            var f = a.charCodeAt(d);
            128 <= f || e.setUint8(d + 1, f)
        }
        null != c && (c.nick = a);
        m.send(b)
    }

    function O(a,
        b) {
        return a.x + a.r < b.x || a.y + a.r < b.y || a.x - a.r > b.x + b.width || a.y - a.r > b.y + b.height ? !1 : !0
    }
    window.onload = function () {
        p = document.getElementById("nickname");
        p.onchange = q;
        p.onkeydown = q;
        p.onkeyup = q;
        p.onkeypress = q;
        J = document.getElementById("perfomance");
        f = document.getElementById("canvas");
        B = f.getContext("2d");
        t = document.createElement("canvas");
        t.width = f.width;
        t.height = f.height;
        b = t.getContext("2d");
        K();
        D();
        G();
        H();
        setInterval(G, 1E3 / 60)
    };
    var f, t, b, B, J, l = new Image;
    l.src = "atlas.png";
    var d = 0,
        k = [],
        h = [],
        z = 0,
        c = null,
        C = !1,
        x = null,
        E = "?",
        w = 100,
        p, L = 2,
        m, s = [],
        A = 0,
        I = 60,
        g = 200,
        v = "ws://69.164.192.211:2828 ws://69.164.192.211:2829 ws://69.164.192.211:2830 ws://96.126.121.68:2828 ws://96.126.121.68:2829 ws://96.126.121.68:2830 ws://198.58.104.108:2828 ws://198.58.104.108:2829 ws://198.58.104.108:2830 ws://198.58.122.72:2828 ws://198.58.122.72:2829 ws://198.58.122.72:2830 ws://192.31.187.83:2828 ws://192.31.187.83:2829 ws://192.31.187.83:2830 ws://192.31.187.83:2831 ws://192.31.187.83:2832 ws://192.31.187.83:2833".split(" "),
        n = null,
        u = !1;
    setInterval(function () {
        I = A;
        A = 0
    }, 1E3);
    y.prototype = {
        id: 0,
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        seed: 0,
        wasSeen: !0,
        nick: null,
        jumps: null,
        playbackTime: 0,
        gameOver: !1,
        rotation: 0,
        targetRotation: 0,
        removeTimer: -1,
        reset: function () {
            this.x = 100;
            this.y = 50;
            this.vx = L;
            this.vy = 0;
            this.jumps = [];
            this.playbackTime = 0;
            this.gameOver = !1;
            this.removeTimer = -1
        },
        draw: function () {
            if (-100 > this.x - d || 1E3 < this.x - d) return !1;
            b.save();
            b.translate(2 * Math.floor(this.x / 2), 2 * Math.floor(this.y / 2));
            var a = Math.floor((z + this.seed) / 200) % 2;
            b.rotate(this.rotation);
            this == c ? (b.beginPath(), b.fillStyle = "rgba(255, 255, 255, 0.5)", b.arc(0, 0, 30, 0, 2 * Math.PI, !1), b.fill(), b.drawImage(l, 230, 762 + 52 * a, 34, 24, -17, -12, 34, 24)) : (b.globalAlpha *= 0.5, b.drawImage(l, 6 + 56 * a, 982, 34, 24, -17, -12, 34, 24), b.globalAlpha /= 0.5);
            b.rotate(-this.rotation);
            (a = this.nick) && h.length && this.x - 60 > h[0].x && (b.textAlign = "center", b.fillStyle = "#000000", b.fillText(a, 1, -20), b.fillText(a, -1, -20), b.fillText(a, 0, -21), b.fillText(a, 0, -19), b.fillStyle = "#FFFFFF", b.fillText(a, 0, -20));
            b.restore();
            return !0
        },
        think: function () {
            ++this.playbackTime;
            for (var a = this.gameOver, b = 0; b < h.length; b++) {
                var d = h[b];
                if (d.collidesWith(this)) {
                    this.gameOver = !0;
                    break
                }
            }
            this.vy += 0.4;
            389 <= this.y && (this.vy = this.vx = 0, this.gameOver = !0, this == c ? M() : null == this.id && N(this));
            this.gameOver ? (this.vx = 0, 389 < this.y && (this.y = 389), this != c && (0 > this.removeTimer && (this.removeTimer = Math.floor(this.x / 10)), this.removeTimer -= 1, 0 == this.removeTimer && N(this))) : this == c ? C && (this.jumps.push(this.playbackTime), C = !1, this.vy = -8) : -1 != this.jumps.indexOf(this.playbackTime) && (this.vy = -8);
            this.x +=
                this.vx;
            this.y += this.vy;
            for (this.targetRotation = Math.atan2(this.vy, this.vx); 180 < this.targetRotation;) this.targetRotation -= 360;
            for (; - 180 > this.targetRotation;) this.targetRotation += 360;
            this.rotation = (this.rotation + this.targetRotation) / 2;
            if (!a && this.gameOver) {
                for (var a = null, f = 0, b = 0; b < h.length; b++) {
                    var d = h[b],
                        g = Math.abs(d.x - this.x + 26);
                    100 < g || !(null == a || g < f) || (f = g, a = d)
                }
                a && ++a.deaths
            }
        },
        setPlayback: function (a, b) {
            this != c && this.reset();
            this.jumps = a;
            b && (this.nick = b)
        },
        destroy: function () {}
    };
    F.prototype = {
        x: 0,
        y: 0,
        deaths: 0,
        getHeight: function () {
            return 124
        },
        draw: function () {
            -300 > this.x - d || 1200 < this.x - d || (this.isValid() || (b.globalAlpha *= 0.5), b.drawImage(l, 112, 646, 52, 320, this.x, this.y - 320, 52, 320), b.drawImage(l, 168, 646, 52, 320, this.x, this.y + this.getHeight(), 52, 320), this.isValid() || (b.globalAlpha /= 0.5))
        },
        drawOverlay: function () {
            if (!(-300 > this.x - d || 1200 < this.x - d)) {
                b.save();
                b.translate(this.x + 26, 415);
                var a = this.deaths.toString();
                b.textAlign = "center";
                b.fillStyle = "#000000";
                b.fillText(a, 1, 0);
                b.fillText(a, -1, 0);
                b.fillText(a,
                    0, -1);
                b.fillText(a, 0, 1);
                b.fillStyle = "#FFFFFF";
                b.fillText(a, 0, 0);
                b.restore()
            }
        },
        collidesWith: function (a) {
            if (god) return false;

            return this.isValid() ? O({
                x: a.x,
                y: a.y,
                r: 12
            }, {
                x: this.x,
                y: this.y - 320,
                width: 52,
                height: 320
            }) || O({
                x: a.x,
                y: a.y,
                r: 12
            }, {
                x: this.x,
                y: this.y + this.getHeight(),
                width: 52,
                height: 320
            }) : !1
        },
        isValid: function () {
            return this.x > w + 200
        }
    };
    god=false;
    autobird=0;
    flap = function (a) {
        null != c && c.gameOver && 389 <= c.y ? K() : null != c && 0 < c.y && (C = !0)
    };
    flapper = function (a) {
        flap();
        autobird = setTimeout(flapper, 500);
    };
    document.body.onkeydown = document.body.ontouchstart = function (a) {
        // [G]od mode
        if (a.keyCode == 71)
            god = !god;

        // [A]utobird
        if (a.keyCode == 65)
            autobird = autobird ? clearTimeout(autobird) : setTimeout(flapper, 500);

        flap(a);
    };
    window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame || function (a) {
            setTimeout(a, 1E3 / 60)
    }
})();
