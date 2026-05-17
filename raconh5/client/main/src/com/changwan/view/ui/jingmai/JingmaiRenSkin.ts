/**
 * pzx 
 * 17.11.17
 * 经脉人物星位图层
 */
class JingmaiRenSkin extends UIComponent
{
	private _ling7:eui.Image;
	private _ling6:eui.Image;
	private _ling5:eui.Image;
	private _ling4:eui.Image;
	private _ling3:eui.Image;
	private _ling2:eui.Image;
	private _ling1:eui.Image;

	private _star0:eui.Image;
	private _star1:eui.Image;
	private _star2:eui.Image;
	private _star3:eui.Image;
	private _star4:eui.Image;
	private _star5:eui.Image;
	private _star6:eui.Image;
	private _star7:eui.Image;
	private _jmAni:Animation;
	private _upgradeAni:Animation;

	private _list:Array<eui.Image>;

	private _starList:Array<eui.Image>;
	private _aniList:Array<Animation>;

	private _pos:number;

	public callBackFun:Function;
	public target:any;

	public static poses:any ={1:85,2:86,3:128,4:145,5:0,6:152};

	private _bitmap:BitmapRemote;


	public constructor() 
	{
		super();
		this._pos = -1;
	}
	
	protected removeEvent():void
	{
		super.removeEvent();
		if(this._upgradeAni) this._upgradeAni.removeEventListener(GlobalEvent.ANIMATION_PLAY_COMPLETE,this.onUpgradeHandler,this);
	}
	public setSkinName(url:string):void
	{
		this.skinName = Manager.path.getSkinName("jingmai", url);
		this._pos = -1;
	}
	public setStarActive(value:number)
	{
		this._pos = value;
		if(this._list) this.updateVilue();
	}
	private updateVilue():void
	{
		let ln:number = this._list.length;
		this._aniList=[];
		for(let i:number = 0;i<ln;i++)
		{
			if(i<this._pos)
			{
				this._list[i].visible = true;
				let ani:Animation;
				if(!this._aniList[i])
				{
					ani = Manager.animation.createJingmaiAnimation("jingmailjm");
					this.addChild(ani);
					this._aniList.push(ani);
				}
				ani = this._aniList[i];
				ani.x = this._starList[i].x-31;
				ani.y = this._starList[i].y-28;
			}
			else
			{
				this._list[i].visible = false;
			}
			if(this._pos == 8)
			{
				if(this._jmAni)
				{
					this._jmAni.visible = false;
					this._jmAni.stop();
				}
			}
			else if(i==this._pos)
			{
				if(!this._jmAni)
				{
					this._jmAni = Manager.animation.createJingmaiAnimation("jingmaijm");
					this.addChild(this._jmAni);
				}
				this._jmAni.x = this._starList[i].x-101;
				this._jmAni.y = this._starList[i].y-89;
				this._jmAni.visible = true;
				this._jmAni.play();
			}

			this._starList[i].visible = false;
		}
		

	}

	protected configUI():void
	{
		super.configUI();
		this._list= [this._star0,this._ling1,this._ling2,this._ling3,this._ling4,this._ling5,this._ling6,this._ling7];
		this._starList =[this._star0,this._star1,this._star2,this._star3,this._star4,this._star5,this._star6,this._star7]
	}
	protected drawAll():void
	{
		super.drawAll();
		this.setStarActive(this._pos);
	}

	public upgradeStar():void
	{
		
		if(this._upgradeAni==null)
		{
			this._upgradeAni = Manager.animation.createJingmaiAnimation("jingmaiqs");
			this._upgradeAni.addEventListener(GlobalEvent.ANIMATION_PLAY_COMPLETE,this.onUpgradeHandler,this);
			this.addChild(this._upgradeAni);
		}
		this._upgradeAni.visible = true;
		this._upgradeAni.play();
		let index:number;
		if(this._pos == 8)
		{
			index = 7;
		}
		else
		{
			index = this._pos;
		}
		this._upgradeAni.x = this._starList[index].x-32;
		this._upgradeAni.y = this._starList[index].y-25;
		if(this._jmAni)this._jmAni.visible = false;
	}
	private onUpgradeHandler():void
	{
		this._upgradeAni.visible = false;
		this._upgradeAni.stop();
		if(this._jmAni)this._jmAni.visible = true;
		if(this.callBackFun!=null)
		{
			// this.callBackFun();
			this.callBackFun.call(this.target);
		}
	}

	public setDiBitmap(path:string)
	{
		this._bitmap = Manager.pool.create(BitmapRemote);
		this._bitmap.load(Manager.path.getPanelUiImgPath("jingmai/jingmai/jingmai_ren"+path,Extension.PNG));
		this._bitmap.x = JingmaiRenSkin.poses[path];
		this._bitmap.y = 110;
		this.addChildAt(this._bitmap,0);
	}
	public dispose():void
	{
		super.dispose();
		for(var mc of this._list)
		{
			this.removeChild(mc);
		}
		this._list = null;
		for(let mc of this._starList)
		{
			if(mc.parent)
			this.removeChild(mc);
		}
		this._starList = null;
		this._ling7 = this._ling6 = this._ling5 = this._ling4 = this._ling3 = this._ling2 = this._ling1 = null;
		this._star0 = this._star1= this._star2= this._star3= this._star4= this._star5= this._star6= this._star7 =null;
		if(this._jmAni) Manager.pool.push(this._jmAni);
		this._jmAni = null;
		if(this._upgradeAni) 
		{
			this._upgradeAni.stop();
			Manager.pool.push(this._upgradeAni);
		}
		this._upgradeAni = null;
		for(let ani of this._aniList)
		{
			Manager.pool.push(ani);
		}
		this._aniList = null;
		this.callBackFun = null;
		this.target = null;
		if(this._bitmap)
		{
			Manager.pool.push(this._bitmap);
			this._bitmap = null;
		}
	}


}