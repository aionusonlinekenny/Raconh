var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 2D矢量
 * luzhihong
 * create 2017-11-09
 */
var Vector2D = (function () {
    /**
     * Constructor.
     */
    function Vector2D(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this._x = x;
        this._y = y;
    }
    /**
     * Generates a copy of this vector.
     * @return Vector2D A copy of this vector.
     */
    Vector2D.prototype.clone = function () {
        return new Vector2D(this._x, this.y);
    };
    /**
    * Sets this vector's x and y values, and thus length, to zero.
    * @return Vector2D A reference to this vector.
    */
    Vector2D.prototype.zero = function () {
        this._x = 0;
        this._y = 0;
        return this;
    };
    /**
     * Whether or not this vector is equal to zero, i.e. its x, y, and length are zero.
     * @return boolean True if vector is zero, otherwise false.
     */
    Vector2D.prototype.isZero = function () {
        return this._x == 0 && this._y == 0;
    };
    Object.defineProperty(Vector2D.prototype, "length", {
        get: function () {
            return Math.sqrt(this.lengthSQ);
        },
        /**
         * Sets / gets the length or magnitude of this vector. Changing the length will change the x and y but not the angle of this vector.
         */
        set: function (value) {
            var a = this.angle;
            this._x = Math.cos(a) * value;
            this._y = Math.sin(a) * value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2D.prototype, "lengthSQ", {
        /**
         * Gets the length of this vector, squared.
         */
        get: function () {
            return this._x * this._x + this._y * this._y;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2D.prototype, "angle", {
        get: function () {
            return Math.atan2(this._y, this._x);
        },
        /**
         * Gets / sets the angle of this vector. Changing the angle changes the x and y but retains the same length.
         */
        set: function (value) {
            var len = this.length;
            this._x = Math.cos(value) * len;
            this._y = Math.sin(value) * len;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Normalizes this vector. Equivalent to setting the length to one, but more efficient.
     * @return Vector2D A reference to this vector.
     */
    Vector2D.prototype.normalize = function () {
        var len = this.length;
        if (len == 0) {
            this._x = 1;
            return this;
        }
        this._x /= len;
        this._y /= len;
        return this;
    };
    /**
     * Whether or not this vector is normalized, i.e. its length is equal to one.
     * @return boolean True if length is one, otherwise false.
     */
    Vector2D.prototype.isNormalized = function () {
        return this.length == 1.0;
    };
    /**
     * Reverses the direction of this vector.
     * @return Vector2D A reference to this vector.
     */
    Vector2D.prototype.reverse = function () {
        this._x = -this._x;
        this._y = -this._y;
        return this;
    };
    /**
     * Calculates the distance from this vector to another given vector.
     * @param v2 A Vector2D instance.
     * @return Number The distance from this vector to the vector passed as a parameter.
     */
    Vector2D.prototype.dist = function (v2) {
        return Math.sqrt(this.distSQ(v2));
    };
    /**
     * Calculates the distance squared from this vector to another given vector.
     * @param v2 A Vector2D instance.
     * @return Number The distance squared from this vector to the vector passed as a parameter.
     */
    Vector2D.prototype.distSQ = function (v2) {
        var dx = v2.x - this._x;
        var dy = v2.y - this._y;
        return dx * dx + dy * dy;
    };
    /**
     * Adds a vector to this vector, creating a new Vector2D instance to hold the result.
     * @param v2 A Vector2D instance.
     * @return Vector2D A new vector containing the results of the addition.
     */
    Vector2D.prototype.add = function (v2) {
        return new Vector2D(this._x + v2.x, this._y + v2.y);
    };
    /**
     * Subtacts a vector to this vector, creating a new Vector2D instance to hold the result.
     * @param v2 A Vector2D instance.
     * @return Vector2D A new vector containing the results of the subtraction.
     */
    Vector2D.prototype.subtract = function (v2) {
        return new Vector2D(this._x - v2.x, this._y - v2.y);
    };
    /**
     * Multiplies this vector by a value, creating a new Vector2D instance to hold the result.
     * @param v2 A Vector2D instance.
     * @return Vector2D A new vector containing the results of the multiplication.
     */
    Vector2D.prototype.multiply = function (value) {
        return new Vector2D(this._x * value, this._y * value);
    };
    /**
     * Divides this vector by a value, creating a new Vector2D instance to hold the result.
     * @param v2 A Vector2D instance.
     * @return Vector2D A new vector containing the results of the division.
     */
    Vector2D.prototype.divide = function (value) {
        return new Vector2D(this._x / value, this._y / value);
    };
    /**
     * Indicates whether this vector and another Vector2D instance are equal in value.
     * @param v2 A Vector2D instance.
     * @return boolean True if the other vector is equal to this one, false if not.
     */
    Vector2D.prototype.equals = function (v2) {
        return this._x == v2.x && this._y == v2.y;
    };
    Object.defineProperty(Vector2D.prototype, "x", {
        get: function () {
            return this._x;
        },
        /**
         * Sets / gets the x value of this vector.
         */
        set: function (value) {
            this._x = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2D.prototype, "y", {
        get: function () {
            return this._y;
        },
        /**
         * Sets / gets the y value of this vector.
         */
        set: function (value) {
            this._y = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Generates a string representation of this vector.
     * @return String A description of this vector.
     */
    Vector2D.prototype.toString = function () {
        return "[Vector2D (x:" + this._x + ", y:" + this._y + ")]";
    };
    return Vector2D;
}());
__reflect(Vector2D.prototype, "Vector2D");
//# sourceMappingURL=Vector2D.js.map