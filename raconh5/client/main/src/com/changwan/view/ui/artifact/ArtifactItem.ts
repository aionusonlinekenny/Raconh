/**
 * 寻宝scrollItem
 * pzx 
 * create 18.2.7
 */
class ArtifactItem extends UIComponent{
	private _label0:Label;
	private _label1:Label;
	private _label2:Label;
	private _label3:Label;
	private _label4:Label;
	private _label5:Label;
	private _label6:Label;
	private _label7:Label;
	private _label8:Label;

	private _list:Array<Label>;
	private _stateList:Array<number>;
	/** 最后一个的y坐标 */
	private _lastY:number;

	private readonly _STAR_X:number = 10;
	private readonly _CENTER_X:number = 330;

	/** 文本总数 */
	private _max_num:number;
	/** 当前已结束的动画数 */
	private _endnum:number;


	private _group:eui.Group;

	private _data:Array<ArtifactLogInfo>;
	private _dataIndex:number;
	private _max_data:number;

	private _isFrist:boolean = true;

	public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("artifact", "ArtifactItemSkin");
		this.visible = false;
    }
    protected configUI():void
    {
        super.configUI();
		this._stateList=[0.7,0.7,0.8,0.9,1,1,0.9,0.8,0.7]
		if(!this._list)
		{
			this._list = [];
			for(let i:number = 0;i<9;i++)
			{
				let txt:Label = this["_label"+ i];
				this._list.push(txt);
				let n:number = this._stateList[i];
				txt.x = this._STAR_X;
				//txt.x = this._STAR_X+this._CENTER_X*(1-n);
				//txt.alpha = n;
				//txt.scaleX = txt.scaleY = n;
			}
		}
		this._lastY = this._list[this._list.length-1].y;
		this._max_num = this._list.length - 1;
		this._group.mask = new egret.Rectangle(5,6,710,252);

		this._max_data = Manager.model.getArtifact().MAX_NUM;

    }
	private drawTween():void
	{
		let ln:number = this._list.length;
		this._endnum = 0;
		this._list[this._max_num].y = this._lastY;
		
		for(let i:number= 0;i<ln;i++)
		{
			let n:number = this._stateList[i];
			egret.Tween.get(this._list[i], {loop: false}).to({x:this._STAR_X, y:this._list[i].y-32}, 1000).call(this.tweenEnd,this,[i]);
			//egret.Tween.get(this._list[i], {loop: false}).to({x:this._STAR_X+this._CENTER_X*(1-n), y:this._list[i].y-32, alpha:n,scaleX:n,scaleY:n}, 1000).call(this.tweenEnd,this,[i]);
		}
	}

	private tweenEnd(index:number):void
	{
		this._endnum++;
		if(this._endnum == this._max_num)
		{
			this._dataIndex++;
			let txt:Label = this._list.splice(0,1)[0];
			this._list.push(txt);
			if(this._dataIndex>= this._max_data)
			{
				this._dataIndex = 0;
			}
			let info:ArtifactLogInfo = this._data[this._dataIndex];
			HtmlUtil.setTextFlow(txt,info.desc);
		}
	}

    protected drawAll():void
	{
		super.drawAll();
		if(this._data)
		{
			this.drawData();
		}
	}

	protected draw():void
	{
		super.draw();
        if(this.isInvalid(InvalidationType.DATA)) this.drawData();
	}

    public setData(data:Array<ArtifactLogInfo>):void
    {
		this._data = data;
		if(this._isFrist)
		{
			this._isFrist = false;
        	this.invalidate(InvalidationType.DATA);
		}
    }

    private drawData():void{
		for(let i:number = this._list.length - 1;i>-1;i--)
		{
			let info:ArtifactLogInfo = this._data[i];
			HtmlUtil.setTextFlow(this._list[i],info.desc);
		}
		this._dataIndex= this._max_num;
		this.drawTween();
		Manager.render.add(this.drawTween,this,1010);
		this.visible = true;
    }

    public reuse():void
    {
        super.reuse();
       
    }

    public unuse():void
    {
        super.unuse();
		this.clear();
    }
	
	private clear(isRemove:boolean=false):void
	{
		if(Manager.render.contains(this.drawTween,this)) Manager.render.remove(this.drawTween,this);
		for(let txt of this._list)
		{
			egret.Tween.removeTweens(txt);
			txt.dispose();
		}
		this._list=null;
		this._stateList=null;
		if(isRemove)
		{
			ObjectUtil.remove(this._group);
		}
		this._label0=null;
		this._label1=null;
		this._label2=null;
		this._label3=null;;
		this._label4=null;
		this._label5=null;
		this._label6=null;
		this._label7=null;
		this._label8=null;
		this.mask=null;
		this._group=null;
		this._data=null;
		
	}

    public dispose():void
    {
        super.dispose();
        this.clear(true);
    }
}