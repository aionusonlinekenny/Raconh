/**
 * drq 
 * 聚元Model
 * 2018.4.2
 */
class JuyuanModel extends egret.EventDispatcher
{
	private _infoList:any[] = [];//魂球id列表
	public _curId:number = 1;//当前id
	private _cvo:Array<JuyuanCVO>;
	public _toJuyuan:boolean = false;
	 /**宝箱采集物 */
    public collectionInfo:CollectionGameObjectInfo;

	public constructor() {
		super();
		this._cvo = JuyuanCVO.getCvo();
	}

	//存

	//读
	public getInfoList():any[]
	{
		this._infoList = [];
		this._infoList.push(this.getCurList());

		let go:number = this._curId - 1 + 45;
		let len:number = this._curId;
		
		for(let i=go;i>len;i--)
		{
			if(this._cvo[i-1].star == 0 && this._cvo[i-1].id != this.getCurList().id)
			{
				this._infoList.push(this._cvo[i-1]);
			}
		}
		if(this._infoList[0].step == 0)
		{
			let length:number = this._infoList.length;
			let arr = [];
			for(let j=0;j<length;j++)
			{
				if(this._infoList[j].id <= this.getCurList().id)
				{
					arr.push(this._infoList[j]);	
				}
			}
			this._infoList = arr;
		}
		//排序
		for(let k=0;k<this._infoList.length;k++)
		{
			for(let l=0;l<this._infoList.length-1;l++)
			{
				if(this._infoList[l].id>this._infoList[l+1].id)
				{
					let a = this._infoList[l+1];
					this._infoList[l+1] = this._infoList[l];
					this._infoList[l] = a;
				}
			}
		}
		return this._infoList;
	}

	public getNextStepList(sortid:number):JuyuanCVO
	{
		let go:number = sortid - 1 + 45;
		let len:number = sortid;
		for(let i=go;i>len;i--)
		{
			if(this._cvo[i-1].star == 0 && this._cvo[i-1].id != this.getCurList().id)
			{
				return this._cvo[i-1];
			}
		}

	}

	public getCurList(curId:number = this._curId):JuyuanCVO
	{
		for(let i=0;i<this._cvo.length;i++)
		{
			if(curId == this._cvo[i].sort_id)
			{
				return this._cvo[i];
			}
		}
	}

	public checkCoin():boolean
	{
		if(!OpenCVO.isOpen(OpenConst.ID_JUYUAN)) return false;
		let bool:boolean = false;
		let list:JuyuanCVO = this.getCurList();
		if(list.consume)
		{
			let conList:ConditionVO[] = ConditionVO.getVOList(list.cond);
			let conValue:number = conList[0].value;
			let curLevel:number = Manager.model.self.attrInfo.level;

			let arr:GainLossVO[] = GainLossVO.parse(list.consume);
			let item:number = arr[0].num;
			let yinbi:number = arr[1].num;
			let cur_item:number = Manager.model.getItems().getCountItemById(arr[0].baseId);
			let cur_yinbi:number  = Manager.model.self.attrInfo.coin;
			if(conValue <= curLevel && cur_item >= item && cur_yinbi >= yinbi){
				bool = true;
			}
		}else{
			bool = true;
		}

		return bool;
	}

	//副本相关
	public setCopyAni(localX:number,localY:number):void
	{
		let info:CollectionGameObjectInfo = Manager.pool.create(CollectionGameObjectInfo, egret.getTimer());
        info.x = localX;
        info.y = localY;
		info.updatePostion(info.x, info.y, false);
		info.setData("box", false, this.collectComplete, this);
		Manager.model.getGameobject().addGameObject(info);
        this.collectionInfo = info;
		Manager.render.add(this.pick, this, 1000);
	}

	private pick():void
    {
        Manager.render.remove(this.pick, this);
        (this.collectionInfo.createGameObject() as CollectionGameObject).pick();
    }

	public collectComplete():void
    {
		Manager.control.getMaterialCopy().queryCollection();
        Manager.model.self.updateIsingState(BodyStateManger.ISING_COLLECT, false);
        Manager.model.getGameobject().removeGameObject(this.collectionInfo);
		this.createAni();
    }

	//采集完后 动画
	private _ani01:Animation;
	private _ani02:Animation;
	private _ani03:Animation;

	private createAni():void
	{
		this._ani01 = Manager.animation.createJuyuanAnimation("fuben01");
		this._ani01.addEventListener(GlobalEvent.ANIMATION_PLAY_COMPLETE,this.createAni01,this);
		let self = Manager.model.self;
		this._ani01.x = self.x + self.view.width/2 - 500 + 100;
		this._ani01.y = self.y + self.view.height/2 - 500 - 100;
		// Manager.layer.elementLayer2.addChildAt(this._ani01, Manager.layer.elementLayer2.numChildren - 1);
		Manager.layer.elementLayer2.addChild(this._ani01);
	}

	private createAni01():void
	{
		this._ani01.removeEventListener(GlobalEvent.ANIMATION_PLAY_COMPLETE,this.createAni01,this);
		this._ani02 = Manager.animation.createJuyuanAnimation("fuben03");
		this._ani02.addEventListener(GlobalEvent.ANIMATION_PLAY_COMPLETE,this.createAni02,this);
		this._ani02.anchorOffsetX = 400;
		this._ani02.anchorOffsetY = 400;
		let self = Manager.model.self;
		let centerX = self.x + self.view.width/2;
		let centerY = self.y + self.view.height/2;
		this._ani02.x = centerX - 80;
		this._ani02.y = centerY - 200;
		//let angle:number = Math.atan2(this._ani02.y - centerY, this._ani02.x - centerX) * (180/Math.PI) - 90;
		this._ani02.rotation = 150;
		Manager.layer.elementLayer2.addChild(this._ani02);	
	}

	private createAni02():void
	{
		this._ani02.removeEventListener(GlobalEvent.ANIMATION_PLAY_COMPLETE,this.createAni02,this);
		this._ani03 = Manager.animation.createJuyuanAnimation("fuben02");
		this._ani03.addEventListener(GlobalEvent.ANIMATION_PLAY_COMPLETE,this.aniEnd,this);
		let self = Manager.model.self;
		this._ani03.x = self.x + self.view.width/2 - 500;
		this._ani03.y = self.y + self.view.height/2 - 530;
		Manager.layer.elementLayer2.addChild(this._ani03);	
	}

	private aniEnd():void
	{
		this._ani03.removeEventListener(GlobalEvent.ANIMATION_PLAY_COMPLETE,this.aniEnd,this);
		Manager.view.show(ViewID.JuyuanResultView,this._curId,10,this.aniEndCallback);
	}

	private aniEndCallback():void
	{
			Manager.control.getCopy().exit();
			Manager.view.show(ViewID.GfgPanel,1);
			this._curId += 1;
	}
}