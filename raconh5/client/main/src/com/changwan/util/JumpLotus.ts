/**
 *author Anydo
 *create 2017-12-4
 *description 
*/
class JumpLotus
{
    private _start:egret.Point;
    private _donw:egret.Point;
    private _downInS:egret.Point;
    
    private _s:egret.Point;
    private _vsFaded:number;//V1:V0
    public get s():egret.Point { return this._s; }
    
    private R1:number = 0.28;
    private R2:number = 0.4;
    
    //****** hLotus *************
    private _tAll:number;
    private _t1:number;
    private _t23:number;
    private _t2:number;
    private _t3:number;
    
    private _vh3:number;
    private _ah2:number;
    
    private _h:number;
    private _h0:number;
    
    public get h0():number { return this._h0;}
    public get tAll():number { return this._tAll;}

    public constructor()
	{}

    public reuse(start:egret.Point, down:egret.Point, totalT:number, h:number = 170, h0:number = 0):void
    {
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
        
        this._vh3 = (this._h0 + this._h) / ( this._t2 * 0.5 + this._t3);
        this._ah2 = this._vh3 / this._t2;
    }

    public unuse():void
    {
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
    }
    
    public getPos(t:number):egret.Point
    {
        let hElese:boolean = true;
        if(t > this._tAll)
        {
            return hElese ? this._donw : this._downInS;
        }
        let r:number = t * (2 * this._tAll + (this._vsFaded - 1) * t) / (this._tAll * (1 + this._vsFaded) * this._tAll);
        if(hElese)
        {
            let h:number = this.getH(t);
            return new egret.Point(this._start.x + this._s.x * r, this._start.y + this._s.y * r + this._h0 - h);
        }
        else
        {
            return new egret.Point(this._start.x + this._s.x * r, this._start.y + this._s.y * r);
        }
    }
    
    
    public getH(t:number):number
    {
        let r:number;
        if(t <= this._t1)
        {
            r = Math.PI * 0.5 * t / this._t1;
            return this._h0 + this._h * Math.sin(r);
        }
        else if(t <= this._t1 + this._t2)
        {
            t = t - this._t1;
            return this._h0 + this._h - 0.5 * this._ah2 * t * t;
        }
        else if(t <= this._t1 + this._t2 + this._t3)
        {
            t = t - this._t1 - this._t2;
            return this._h0 + this._h - 0.5 * this._ah2 * this._t2 * this._t2 - this._vh3 * t;
        }
        else return 0;
    }
    
    public dispose():void
    {
        this._start = null;
        this._donw = null;
        this._downInS = null;
        this._s = null;
    }
}