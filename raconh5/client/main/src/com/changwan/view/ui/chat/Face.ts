/**
 * 表情
 * liangyan
 * create 2017-11-10
*/
class Face extends Sprite
{
	public static SIZE:number = 28;
    private _face:Animation;
    private _type:string;
		
	public constructor()
	{
		super();
	}
		
	protected start():void
	{
		super.start();
		this.genFace();
	}
		
	private genFace():void
	{
		this._face = Manager.animation.createFaceAnimation(this._type);
		if(this._face == null) return;
		if(!this._face.parent) this.addChild(this._face);
	}

	public get type():string
    {
        return this._type;
    }

	public get faceName():string
    {
		let num = Number(this._type);
		if(num < 10) return "#0" + this._type;
		else return "#" + this._type;
    }

	public reuse(type:string):void
	{
		this._type = type;
		super.reuse();
	}

	public unuse():void
	{
		super.unuse();
		Manager.pool.push(this._face);
		this._face = null;
		this._type = "";
	}

	public dispose():void
	{
		super.dispose();
		ObjectUtil.remove(this._face);
		Manager.pool.push(this._face);
		this._face = null;
	}
}