/**
 * 2D矢量
 * luzhihong
 * create 2017-11-09
 */
class Vector2D
{
	private _x:number;
	private _y:number;
    
    /**
     * Constructor.
     */
    public constructor(x:number = 0, y:number = 0)
    {
        this._x = x;
        this._y = y;
    }
    /**
     * Generates a copy of this vector.
     * @return Vector2D A copy of this vector.
     */
    public clone():Vector2D
    {
        return new Vector2D(this._x, this.y);
    }

     /**
     * Sets this vector's x and y values, and thus length, to zero.
     * @return Vector2D A reference to this vector.
     */
    public zero():Vector2D
    {
        this._x = 0;
        this._y = 0;
        return this;
    }
    /**
     * Whether or not this vector is equal to zero, i.e. its x, y, and length are zero.
     * @return boolean True if vector is zero, otherwise false.
     */
    public isZero():boolean
    {
        return this._x == 0 && this._y == 0;
    }
		
    /**
     * Sets / gets the length or magnitude of this vector. Changing the length will change the x and y but not the angle of this vector.
     */
    public set length(value:number)
    {
        var a:number = this.angle;
        this._x = Math.cos(a) * value;
        this._y = Math.sin(a) * value;
    }
    public get length():number
    {
        return Math.sqrt(this.lengthSQ);
    }

    /**
     * Gets the length of this vector, squared.
     */
    public get lengthSQ():number
    {
        return this._x * this._x + this._y * this._y;
    }
    
    /**
     * Gets / sets the angle of this vector. Changing the angle changes the x and y but retains the same length.
     */
    public set angle(value:number)
    {
        var len:number = this.length;
        this._x = Math.cos(value) * len;
        this._y = Math.sin(value) * len;
    }
    public get angle():number
    {
        return Math.atan2(this._y, this._x);
    }
	
    /**
     * Normalizes this vector. Equivalent to setting the length to one, but more efficient.
     * @return Vector2D A reference to this vector. 
     */
    public normalize():Vector2D
    {
        var len:number = this.length;
        if(len == 0)
        {
            this._x = 1;
            return this;
        }
        this._x /= len;
        this._y /= len;
        return this;
    }
    /**
     * Whether or not this vector is normalized, i.e. its length is equal to one.
     * @return boolean True if length is one, otherwise false.
     */
    public isNormalized():boolean
    {
        return this.length == 1.0;
    }
				
    /**
     * Reverses the direction of this vector.
     * @return Vector2D A reference to this vector.
     */
    public reverse():Vector2D
    {
        this._x = -this._x;
        this._y = -this._y;
        return this;
    }

    /**
     * Calculates the distance from this vector to another given vector.
     * @param v2 A Vector2D instance.
     * @return Number The distance from this vector to the vector passed as a parameter.
     */
    public dist(v2:Vector2D):number
    {
        return Math.sqrt(this.distSQ(v2));
    }
    
    /**
     * Calculates the distance squared from this vector to another given vector.
     * @param v2 A Vector2D instance.
     * @return Number The distance squared from this vector to the vector passed as a parameter.
     */
    public distSQ(v2:Vector2D):number
    {
        var dx:number = v2.x - this._x;
        var dy:number = v2.y - this._y;
        return dx * dx + dy * dy;
    }
    
    /**
     * Adds a vector to this vector, creating a new Vector2D instance to hold the result.
     * @param v2 A Vector2D instance.
     * @return Vector2D A new vector containing the results of the addition.
     */
    public add(v2:Vector2D):Vector2D
    {
        return new Vector2D(this._x + v2.x, this._y + v2.y);
    }

    /**
     * Subtacts a vector to this vector, creating a new Vector2D instance to hold the result.
     * @param v2 A Vector2D instance.
     * @return Vector2D A new vector containing the results of the subtraction.
     */
    public subtract(v2:Vector2D):Vector2D
    {
        return new Vector2D(this._x - v2.x, this._y - v2.y);
    }
    
    /**
     * Multiplies this vector by a value, creating a new Vector2D instance to hold the result.
     * @param v2 A Vector2D instance.
     * @return Vector2D A new vector containing the results of the multiplication.
     */
    public multiply(value:number):Vector2D
    {
        return new Vector2D(this._x * value, this._y * value);
    }
    
    /**
     * Divides this vector by a value, creating a new Vector2D instance to hold the result.
     * @param v2 A Vector2D instance.
     * @return Vector2D A new vector containing the results of the division.
     */
    public divide(value:number):Vector2D
    {
        return new Vector2D(this._x / value, this._y / value);
    }
    
    /**
     * Indicates whether this vector and another Vector2D instance are equal in value.
     * @param v2 A Vector2D instance.
     * @return boolean True if the other vector is equal to this one, false if not.
     */
    public equals(v2:Vector2D):boolean
    {
        return this._x == v2.x && this._y == v2.y;
    }
    
    /**
     * Sets / gets the x value of this vector.
     */
    public set x(value:number)
    {
        this._x = value;
    }
    public get x():number
    {
        return this._x;
    }
    
    /**
     * Sets / gets the y value of this vector.
     */
    public set y(value:number)
    {
        this._y = value;
    }
    public get y():number
    {
        return this._y;
    }
    /**
     * Generates a string representation of this vector.
     * @return String A description of this vector.
     */
    public toString():String
    {
        return "[Vector2D (x:" + this._x + ", y:" + this._y + ")]";
    }
}