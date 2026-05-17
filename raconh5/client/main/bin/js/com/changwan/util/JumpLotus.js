/**
 *author Anydo
 *create 2017-12-4
 *description
*/
var JumpLotus = /** @class */ (function () {
    function JumpLotus() {
        this.R1 = 0.28;
        this.R2 = 0.4;
    }
    Object.defineProperty(JumpLotus.prototype, "s", {
        get: function () { return this._s; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JumpLotus.prototype, "h0", {
        get: function () { return this._h0; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JumpLotus.prototype, "tAll", {
        get: function () { return this._tAll; },
        enumerable: true,
        configurable: true
    });
    JumpLotus.prototype.reuse = function (start, down, totalT, h, h0) {
        if (h === void 0) { h = 170; }
        if (h0 === void 0) { h0 = 0; }
        this._start = start.clone();
        this._donw = down.clone();
        this._downInS = new egret.Point(down.x, down.y - h0);
        this._s = this._downInS.subtract(this._start);
        this._tAll = totalT;
        this._vsFaded = 0.5;
        //****** hLotus *************
        this._t1 = this._tAll * this.R1;
        this._t23 = this._tAll - this._t1;
        this._t2 = this._t23 * this.R2;
        this._t3 = this._t23 - this._t2;
        this._h = h;
        this._h0 = h0;
        this._vh3 = (this._h0 + this._h) / (this._t2 * 0.5 + this._t3);
        this._ah2 = this._vh3 / this._t2;
    };
    JumpLotus.prototype.unuse = function () {
        this._start = null;
        this._donw = null;
        this._downInS = null;
        this._s = null;
        this._vsFaded = 0;
        this._tAll = 0;
        this._t1 = 0;
        this._t23 = 0;
        this._t2 = 0;
        this._t3 = 0;
        this._vh3 = 0;
        this._ah2 = 0;
        this._h = 0;
        this._h0 = 0;
    };
    JumpLotus.prototype.getPos = function (t) {
        var hElese = true;
        if (t > this._tAll) {
            return hElese ? this._donw : this._downInS;
        }
        var r = t * (2 * this._tAll + (this._vsFaded - 1) * t) / (this._tAll * (1 + this._vsFaded) * this._tAll);
        if (hElese) {
            var h = this.getH(t);
            return new egret.Point(this._start.x + this._s.x * r, this._start.y + this._s.y * r + this._h0 - h);
        }
        else {
            return new egret.Point(this._start.x + this._s.x * r, this._start.y + this._s.y * r);
        }
    };
    JumpLotus.prototype.getH = function (t) {
        var r;
        if (t <= this._t1) {
            r = Math.PI * 0.5 * t / this._t1;
            return this._h0 + this._h * Math.sin(r);
        }
        else if (t <= this._t1 + this._t2) {
            t = t - this._t1;
            return this._h0 + this._h - 0.5 * this._ah2 * t * t;
        }
        else if (t <= this._t1 + this._t2 + this._t3) {
            t = t - this._t1 - this._t2;
            return this._h0 + this._h - 0.5 * this._ah2 * this._t2 * this._t2 - this._vh3 * t;
        }
        else
            return 0;
    };
    JumpLotus.prototype.dispose = function () {
        this._start = null;
        this._donw = null;
        this._downInS = null;
        this._s = null;
    };
    return JumpLotus;
}());
//# sourceMappingURL=JumpLotus.js.map