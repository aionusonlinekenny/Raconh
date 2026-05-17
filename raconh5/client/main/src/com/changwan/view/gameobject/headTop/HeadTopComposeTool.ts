/**
 * 头顶信息排版工具
 * liangyan
 * create 2017-11-17
*/
class HeadTopComposeTool implements cw.IPool
{
    public constructor()
	{
	}
		
	private _paddingV:number;
	private _paddingH:number;
		
    private _dic;
	private _rowVecChange:boolean;
	private _rowVector:Array<number>;
		
	//是否已排版（添加、删除后自动赋值为false)
	private _compsed:boolean;
	private _x0:number = 0;
	private _y0:number = 0;
	private _height:number = 0;
	public get height():number {return this._height;}
	private _wight:number = 0;
	public get width():number {return this._wight;}

	public reuse():void
	{
		this._paddingH = 2;
		this._paddingV = 2;
		this._dic = new Dictionary();
		this._rowVector = [];
	}

	public unuse():void
	{
		this.clear();
		this.clearFlag();
	}
		
	public clear(): void
	{
		let tmpList:Array<ComposeData>;
		for(let r in this._rowVector)
		{
			tmpList = this._dic[r];
			if(tmpList != null)
			{
				for(let i = tmpList.length - 1; i >= 0; i--)
				{
					if(tmpList[i] != null)
					{
						tmpList[i].dispose();
					}
				}
				delete this._dic[r];
			}
		}
		this._rowVector.length = 0;
	}
		
	public removeImage(image:egret.DisplayObject): void
	{
		if(image == null)return;
		for(let key in this._dic)
		{
			this.removeAtRow(image, Number(key));
		}
	}
		
	private removeAtRow(image:egret.DisplayObject, row:number):void
	{
		if(image == null)return;
		if(this._dic[row] == null || this._dic[row] == undefined)return;
		let index = this.getIndexByObj(image, row);
		let tmpData:ComposeData[];
		if(index != -1)
		{
			this._compsed = false;
			tmpData = (this._dic[row].splice(index,1)) as ComposeData[];
			if(tmpData && tmpData.length > 0)
			{
				tmpData.forEach((child, i) => 
				{
					child.dispose();
					child = null;
				})
			}
			if(this._dic[row].length == 0)
			{
				delete this._dic[row];
			}
		}
	}
		
	private getIndexByObj(obj:egret.DisplayObject, row:number):number
	{
		let vec:Array<ComposeData> = this._dic[row];
		if(vec == null) return -1;
		for(let i = vec.length - 1; i>=0; i--)
		{
			if(vec[i].obj == obj) return i;
		}
		return -1;
	}
		
	public addImage(image:egret.DisplayObject ,row:number, index:number = 0, offsetY:number = 0, offsetX:number = 0):void
	{
		if(this._dic[row] == null) this._dic[row] = new Array<ComposeData>();
		if(this.getIndexByObj(image, row) == -1)
		{
			this._dic[row].push(new ComposeData(image, index, offsetY, offsetX));
			this._compsed = false;
		}
			
		if(this._rowVector.indexOf(row) < 0)
		{
			this._rowVecChange = true;
			this._rowVector.push(row);
		}
	}
		
	public clearFlag(): void
	{
		this._compsed = false;
	}
		
	/**
	 * 开始排版
	 */
	public compose(): void
	{
		if(this._compsed || this._dic == null || this._rowVector == null)return;
		this._compsed = true;
		this._height = 0;
		this._wight = 0;
			
		if(this._rowVecChange)
		{
			this._rowVecChange = false;
			this._rowVector.sort((a:number, b:number) => { return (a > b ? 1 : -1) });
		}
			
		let currY:number = this._y0;
		let tmpW:number;
		let tmpH:number;
		let isFirstRow:boolean = true;
		let tmpImageArr:Array<ComposeData>;
		let tmpRowHight:number;
		for(let r in this._rowVector)
		{
			tmpImageArr = this._dic[this._rowVector[r]];
			if(tmpImageArr == null || tmpImageArr.length == 0)continue;
			tmpRowHight = this.getRowHeight(tmpImageArr);
			tmpW = this.composeRow(tmpImageArr,currY,tmpRowHight);
			this._wight = tmpW > this._wight ? tmpW : this._wight;
			currY -= tmpRowHight + this._paddingV;
				
			if(!isFirstRow) this._height += this._paddingV;
			this._height += tmpRowHight;
		}
	}
		
	private getRowHeight(datas:Array<ComposeData>):number
	{
		let rtn:number = 0;
        let data:ComposeData;
		for(let i = 0; i < datas.length; i++)
        {
            data = datas[i];
            if(data == null)continue;
			let tempH = this.getImageHeight(data.obj) + data.offsetY;
			if(tempH > rtn) rtn = tempH;
        }
		return rtn;
	}
		
	private getImageHeight(displayObject:egret.DisplayObject):number
	{
		if(displayObject == null) return 0;
		if(displayObject instanceof BitmapRemote) return (displayObject as BitmapRemote).getHeight();
        return displayObject.height;
	}
		
	private getImageWidth(displayObject:egret.DisplayObject):number
	{
		if(displayObject == null) return 0;
		if(displayObject instanceof BitmapRemote) return (displayObject as BitmapRemote).getWidth();
        return displayObject.width;
	}
		
	private composeRow(datas:Array<ComposeData>, y:number, h:number):number
	{
		datas.sort((a:ComposeData, b:ComposeData) => { return (a.index < b.index ? -1 : 1) });
			
		let w:number = 0;
		let len:number = datas.length;
		for(let i:number = 0;i < len;i++)
		{
			if(datas[i] == null)continue;
			if(i != 0)w += this._paddingH;
			w += this.getImageWidth(datas[i].obj);
		}
			
		let currX:number = this._x0 - w * 0.5;
			
		let image:egret.DisplayObject;
		for(let j = 0; j < len; j++)
		{
			if(datas[j] == null)continue;
			image = datas[j].obj;
			image.x = currX + datas[j].offsetX;
			currX += this._paddingH + this.getImageWidth(image);
				
			image.y = y - h + ((h - this.getImageHeight(image)) / 2);
			if(image instanceof BitmapRes)
			{
				if(image.getName() == "chat_vip_png") image.y -= 2;
			}
		}
		return w;
	}
		
	public dispose(): void
	{
		this.clear();
		this._dic = null;
		this._rowVector = null;
	}
}




class ComposeData
{
	public obj:egret.DisplayObject;
	public index:number;
	public offsetY:number;
	public offsetX:number;
	
	public constructor(obj:egret.DisplayObject, index:number, offsetY:number = 0, offsetX:number = 0)
	{
		this.obj = obj;
		this.index = index;
		this.offsetY = offsetY;
		this.offsetX = offsetX;
	}
	public dispose():void
	{
        ObjectUtil.remove(this.obj);
		this.obj = null;
	}
}