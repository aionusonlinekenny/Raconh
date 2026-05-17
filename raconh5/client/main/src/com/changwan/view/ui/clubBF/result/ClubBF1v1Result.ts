/**
 * 挑战玩家、boss结算界面
 * luzhihong
 * create 2017-12-1
 */
class ClubBF1v1Result extends UIComponent implements IViewManager
{
    private _title:eui.Image;
    private _txtTime:Label;
    private _btn:Button;
    private _btnClose:eui.Image;
    private _txt0:Label;
    private _txt1:Label;
    private _gPower:eui.Group;
    private _gItems:eui.Group;
    private _powerView:NumImgView2;
	private _goodItems:Array<Goods> = [];
    
	private _isBoss:boolean;
	private _data:Object;
	private _leftTime:number;
    
    public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("clubBF", "ClubBF1v1ResultSkin");
        GameDispatcher.getInstance().addEventListener(GlobalEvent.ENTER_SCENE, this.enterScene, this);//有时ui还没加载完，就切了地图，要关掉界面，在开始就注册事件
		this.touchChildren = true;
    }

    /** 
	 * @param isBoss 是否为boss结算
	 * @param data 数据
    */
    public show(isBoss:boolean, data:Object):void
    {
		this._isBoss = isBoss;
        this._data = data;
		this._leftTime = 10;
        
        if(this.parent == null)
        {
            this.y = 213;
            Manager.layer.tipsLayer.addChild(this);
        }
    }

    protected configUI():void
    {
		super.configUI();
        // data["isWin"] = pi.readByte() != 0; 
        // data["infos"] = infos;
		this._title.source = this._data["isWin"] ? "result_title_win_png" : "result_title_fail_png";

		let infos:Array<ItemsModelInfo> = this._data["infos"];
		let item:Goods;
		for(let i:number=0, len:number=infos.length; i<len; i++)
		{
			item = Manager.pool.create(Goods);
			item.x = i*128;
			item.data = infos[i];
			this._gItems.addChild(item);
			this._goodItems.push(item);
		}

		if(this._isBoss)
		{
			// data["hurt"] = pi.readInt();
			// data["boss_hp"] = pi.readInt();
			// data["boss_max_hp"] = pi.readInt();
			let hurt:string = (this._data["hurt"] / this._data["boss_max_hp"] * 100).toFixed(2);
			let left:string = (this._data["boss_hp"] / this._data["boss_max_hp"] * 100).toFixed(2);
			HtmlUtil.setTextFlow(this._txt0, LangCVO.getContent("clubBF12", HtmlUtil.addColorTag(hurt+"%", Color.RED_STR)));//你对守城BOSS造成{0}伤害
			HtmlUtil.setTextFlow(this._txt1, LangCVO.getContent("clubBF13", HtmlUtil.addColorTag(left+"%", Color.RED_STR)));//守城BOSS剩余血量：{0}
			this._gPower.visible = false;
		}
		else 
		{
			// data["myPower"] = pi.readInt();
			// data["enemyPower"] = pi.readInt();
			// data["enemyName"] = pi.readUTF();

			if(this._data["isWin"])
			{
				HtmlUtil.setTextFlow(this._txt0, LangCVO.getContent("clubBF9"));//恭喜你挑战胜利！
				HtmlUtil.setTextFlow(this._txt1, LangCVO.getContent("clubBF10", HtmlUtil.addColorTag(this._data["enemyName"], Color.ORANGE_STR)));//击败对方{0}
				this._gPower.visible = false;
			}
			else 
			{
				HtmlUtil.setTextFlow(this._txt0, LangCVO.getContent("clubBF11", HtmlUtil.addColorTag(this._data["enemyName"], Color.ORANGE_STR)));//你被{0}击败
				this._txt1.text = "";
				let dis:number = this._data["enemyPower"] - this._data["myPower"];
				if(dis > 0)
				{
					this._gPower.visible = true;
					if(this._powerView == null)
					{
						this._powerView = Manager.pool.create(NumImgView2);
						this._powerView.x = 200;
						this._powerView.y = 5;
        		    	this._gPower.addChild(this._powerView);
					}
					this._powerView.setValue(dis, "nums_fighting2_", 25);
				}
				else this._gPower.visible = false;
			}
		}

		Manager.render.add(this.countDown, this, 1000);
		this.countDown();
		this.onResizeHandler(null);
    }

	private countDown():void
	{
		if(this._leftTime <= 0)
		{
			Manager.view.hide(ViewID.ClubBF1v1Result);
			return;
		}
		this._txtTime.text = LangCVO.getContent("activity2", this._leftTime);
		this._leftTime--;
	}

    public hide():void
    {
        this.dispose();
    }

    protected addEvent():void
    {
        super.addEvent();

        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
        this._btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
    }

    protected removeEvent():void
    {
        super.removeEvent();

        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._btn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
        this._btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
    }

    private onResizeHandler(e:GlobalEvent):void
	{
        this.x = Math.round(Manager.global.gameMain.stage.stageWidth - this.width) / 2;
	}

	private enterScene(e:GlobalEvent):void
	{
        if(Manager.model.getMap().mapCVO.id != MapConst.ID_CLUB_BF_1V1 || Manager.model.getMap().mapCVO.id != MapConst.ID_CLUB_BF_BOSS) 
		{
			Manager.view.hide(ViewID.ClubBF1v1Result);
		}
	}

	private onClickHandler(e:egret.TouchEvent):void
	{
        // if(this._callback && e.currentTarget != this._btnClose) this._callback();
		Manager.view.hide(ViewID.ClubBF1v1Result);
	}

	public dispose():void
	{
		Manager.control.getClubBF().exit();
		
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.ENTER_SCENE, this.enterScene, this);
		Manager.render.remove(this.countDown, this);
		super.dispose();
		for(let i:number=this._goodItems.length-1; i>=0; i--)
        {
            Manager.pool.push(this._goodItems[i]); 
        }
		ObjectUtil.disposes(this._txtTime, this._btn, this._txt0, this._txt1, this._powerView);
		ObjectUtil.removes(this._title, this._btnClose, this._gPower, this._gItems);
		this._title = null;
    	this._txtTime = null;
    	this._btn = null;
    	this._btnClose = null;
    	this._txt0 = null;
    	this._txt1 = null;
    	this._gPower = null;
    	this._gItems = null;
    	this._powerView = null;
		this._goodItems = null;
		this._data = null;
	}
}