/**
 * 表情信息
 * liangyan
 * create 2017-11-13
*/
class FaceInfo
{
    private _src:string;
	public get src():string{return this._src;}
	public set src(value:string){this._src = value;}
		
	private _index:number;
	public get index():number{return this._index;}
	public set index(value:number){this._index = value;}
		
	public constructor(src:string, index:number)
	{
		this._src = src;
		this._index = index;
	}
}