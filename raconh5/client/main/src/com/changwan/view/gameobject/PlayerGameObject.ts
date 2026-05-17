/**
 *人物视图
 * Anydo
 * create  
 * update devil 2017-11-08
*/
class PlayerGameObject extends AliveGameObject
{
	private _iconVIP:eui.Image;
	private _imgTitle:BitmapRemote;
	private _txtName:egret.TextField;
	private _txtGuild:egret.TextField;
	private _headContainer:egret.DisplayObjectContainer;//头部容器
	private _composeTool:HeadTopComposeTool;//头顶信息排版

	private _elementShow:ElementPlayerAnimation;

	private _trainingEff1:Animation;
	private _trainingEff2:Animation;

	private _playerGameObjectInfo:PlayerGameObjectInfo;

	public constructor()
	{
		super();
	}

	public reuse(info:GameObjectInfo):void
	{
		this._playerGameObjectInfo = info as PlayerGameObjectInfo;
		super.reuse(info);
	}

	public unuse():void
	{
		super.unuse();
		Manager.pool.push(this._headContainer);
		this._headContainer = null;
		if(this._elementShow != null)
		{
			Manager.pool.push(this._elementShow);
			this._elementShow = null;
		}
		if(Manager.render.contains(this.callback, this))
		{
			Manager.render.remove(this.callback, this);
		}
		if(this._composeTool != null)
		{
			Manager.pool.push(this._composeTool);
			this._composeTool = null;
		}
		if(this._txtName)
		{
			Manager.pool.push(this._txtName);
			this._txtName = null;
		}
		if(this._txtGuild)
		{
			Manager.pool.push(this._txtGuild);
			this._txtGuild = null;
		}
		if(this._iconVIP)
		{
			Manager.pool.push(this._iconVIP);
			this._iconVIP = null;
		}
		if(this._imgTitle != null)
		{
			Manager.pool.push(this._imgTitle);
			this._imgTitle = null;
		}
		this.removeTrainingEff();
		this._playerGameObjectInfo = null;
	}

	protected start():void
	{
		this._headContainer = Manager.pool.create(egret.DisplayObjectContainer);
		this.addChild(this._headContainer);
		this._composeTool = Manager.pool.create(HeadTopComposeTool);
		super.start();
		this._headContainer.y = -180;
		this._elementShow = Manager.pool.create(ElementPlayerAnimation, this);
	}

	public eventSpeed():void
	{
		(this._action as PlayerAction).updateSpeed();
	}

	protected createAction():void
	{
		this._action = Manager.pool.create(PlayerAction, this._aliveGameObjectInfo);
	}

	protected drawName():void
	{
		let isInit = this._txtName == null;
		if(isInit)
		{
			this._txtName = Manager.pool.create(egret.TextField);
			this._txtName.stroke = 2;
		}
		let color = this._playerGameObjectInfo.isSelfGO ? Color.SELF_NAME_STR : Color.WHITE_STR;
		let nameHtml = StringUtils.setParam(LangCVO.getContent("common1"), color, this._playerGameObjectInfo.attrInfo.nickName);
		this._txtName.width = 500;
		HtmlUtil.setTextFlow(this._txtName, nameHtml);
		this._txtName.width = this._txtName.textWidth + 10;
		this._txtName.height = 28;
		this._txtName.textAlign = "center";
		this._txtName.x = - this._txtName.width >> 1;
		if(this._txtName.parent == null) this._headContainer.addChild(this._txtName);
		if(isInit) this.headAddDisplayObj(this._txtName);
		this._composeTool.clearFlag();
		this.composeHeadTop();
	}

	protected reset():void
	{
		super.reset();
	}

	protected drawAll():void
	{
		super.drawAll();
		this.drawName();
		this.drawAnimation();
		this.drawGuildName();
		this.drawVIP();
		this.drawTitle();
	}

	protected draw():void
	{
		super.draw();
		if(this.isInvalid(InvalidationType.GO_NAME))this.drawName();
		if(this.isInvalid(InvalidationType.GO_ANIMATION))this.drawAnimation();		
		if(this.isInvalid(InvalidationType.GO_ACTION))this._elementShow.drawAction();
		if(this.isInvalid(InvalidationType.GO_DIRECTION))this._elementShow.drawDirection();
		if(this.isInvalid(InvalidationType.GO_DEAD))this._elementShow.drawDead();
		if(this.isInvalid(InvalidationType.GO_STYLE))this._elementShow.drawStyle();
		if(this.isInvalid(InvalidationType.GO_GUILD_NAME))this.drawGuildName();
		if(this.isInvalid(InvalidationType.GO_VIP))this.drawVIP();
		if(this.isInvalid(InvalidationType.GO_TITLE))this.drawTitle();
	}

	protected drawAnimation():void
	{
		this._elementShow.drawPlayerAnimation();
	}

	public getAnimation():PlayerAnimation
	{
		if(this._elementShow != null && this._elementShow.animation != null) return this._elementShow.animation;
		return null;
	}

	public eventDirection():void
	{
		this.invalidate(InvalidationType.GO_DIRECTION);
	}

	public eventAction():void
	{
		this.invalidate(InvalidationType.GO_ACTION);
	}

	public eventStyle():void
	{
		this.invalidate(InvalidationType.GO_STYLE);
	}

	public eventPkMode():void
	{
		this.invalidate(InvalidationType.GO_NAME);
	}

	public eventNickname():void
	{
		this.invalidate(InvalidationType.GO_NAME);
	}

	public eventGuild():void
	{
		this.invalidate(InvalidationType.GO_GUILD_NAME);
	}

	public eventVipLevel():void
	{
		this.invalidate(InvalidationType.GO_VIP);
	}

	public eventLevel(oldLevel:number):void
	{
		
	}

	public eventTitle():void
	{
		this.invalidate(InvalidationType.GO_TITLE);
	}

	public eventTraining(isTraining:boolean):void
	{
		if(isTraining)
		{
			this.removeTrainingEff();
			this._playerGameObjectInfo.setActionStr(FigureAction.SIT);
			if(this._playerGameObjectInfo.attrInfo.trainingType == 2 || this._playerGameObjectInfo.attrInfo.trainingType == 3)
			{
				let info:TrainingPosCVO = TrainingCVO.getPosInfo(this._playerGameObjectInfo.attrInfo.trainingPos);
				if(info) this._playerGameObjectInfo.setDirection(info.direction);
			}

			this._trainingEff1 = Manager.animation.createEffectAnimation("training"+ this._playerGameObjectInfo.attrInfo.trainingType +"1");
			this._trainingEff1.x = this._playerGameObjectInfo.x - 390;
			this._trainingEff1.y = this._playerGameObjectInfo.y - 390;
			Manager.layer.addChildToNodeByType(this._trainingEff1, this._trainingEff1.url, 2);
			this._trainingEff2 = Manager.animation.createEffectAnimation("training"+ this._playerGameObjectInfo.attrInfo.trainingType +"2");
			this._trainingEff2.x = this._playerGameObjectInfo.x - 390;
			this._trainingEff2.y = this._playerGameObjectInfo.y - 400;
			Manager.layer.addChildToNodeByType(this._trainingEff2, this._trainingEff2.url, 1);
		}
		else
		{
			this.removeTrainingEff();
			this._playerGameObjectInfo.setActionStr(FigureAction.STAND);
		}
	}

	private removeTrainingEff():void
	{
		if(this._trainingEff1)
		{
			Manager.pool.push(this._trainingEff1);
			this._trainingEff1 = null;
		}
		if(this._trainingEff2)
		{
			Manager.pool.push(this._trainingEff2);
			this._trainingEff2 = null;
		}
	}

	public eventAliveFlag():void
	{
		super.eventAliveFlag();
		this.invalidate(InvalidationType.GO_DEAD);
	}

	public eventJumpSyn(startPos:egret.Point, targets:egret.Point[]):void
	{
		(this._action as PlayerAction).jump(startPos, targets);
	}

	public eventJumpHeight(h:number):void
	{
		if(this._shadow != null)
		{
			this._shadow.y = this._info.y - 20.5 + h;
			let scale:number = 1 - 0.4 * h / 220;
			this._shadow.scaleX = this._shadow.scaleY = this._shadow.alpha = scale;
		}
	}

	public eventBlood()
	{
		if(this._bloodStrip3) this._bloodStrip3.updateBlood();
	}

	public eventStrip(value:boolean)
	{
		if(value) this.showStrip();
		else this.hideStrip();
	}

	protected drawColorFilter():void
	{
		this._elementShow.drawColorFilter();
	}

	//``````````````````````````````````````````````````````````````````````````````````````
	protected showStrip():void
	{
		// if(this._bloodStrip == null)
		// {
		// 	this._bloodStrip = Manager.pool.create(BloodStripView, this._info);
		// }
		// if(this._bloodStrip.parent == null)
		// {
		// 	this._headContainer.addChild(this._bloodStrip);
		// 	this._bloodStrip.visible = false;
		// 	this.headAddDisplayObj(this._bloodStrip);
		// 	this.composeHeadTop(this.addBlood);
		// }

		if(this._bloodContainer == null)
		{
			this._bloodContainer = ObjectUtil.createConainer(false,false);
		}
		if(this._bloodStrip3 == null)
		{
			this._bloodStrip3 = new BloodStripView2(this._bloodContainer,this._bloodContainer,this._info as AliveGameObjectInfo)
		}
		if(this._bloodContainer.parent == null)
		{
			this._headContainer.addChild(this._bloodContainer);
			this._bloodContainer.visible = false;
			this.headAddDisplayObj(this._bloodContainer);
			this.composeHeadTop(this.addBlood);
		}
	}
		
	protected hideStrip():void
	{
		// if(this._bloodStrip && this._bloodStrip.parent)
		// {
		// 	super.hideStrip();
		// 	this._composeTool.removeImage(this._bloodStrip);
		// 	this._composeTool.compose();
		// }
		if(this._bloodContainer && this._bloodContainer.parent)
		{
			super.hideStrip();
			this._composeTool.removeImage(this._bloodContainer);
			this._composeTool.compose();
		}
	}

	private headAddDisplayObj(obj:egret.DisplayObject, offsetY:number = 5, offsetX:number = 0):void
	{
		let arr:Array<number> = this.getComposePlace(obj);
		if(arr) this._composeTool.addImage(obj, arr[0], arr[1], offsetY, offsetX);
	}
		
	private getComposePlace(obj:egret.DisplayObject):Array<number>
	{
		//名字初始为null，特殊处理该行
		let line2A:Array<egret.DisplayObject> = [this._iconVIP];//_pkImg, _iconTeam2, _iconPVip, _iconVip, _zsIcon
		//名字
		if(this._txtName != null && (obj as egret.TextField) && (obj as egret.TextField).text == this._txtName.text) return [1, line2A.length];
		
		let arr:Array<Array<egret.DisplayObject>> = [[this._bloodContainer], line2A, [this._txtGuild], [this._imgTitle]];
		for(let i = arr.length - 1; i>=0; i--)
		{
			let index = arr[i].indexOf(obj);
			if(index != -1) return [i, index];
		}
		return null;
	}

	protected composeHeadTop(endFun:Function = null):void
	{
		//延时执行，多个调用过来只执行一次compose
		Manager.render.add(this.callback, this, 1000, 1, endFun, true);
	}

	private callback():void
	{
		this._composeTool.compose();
	}

	private addBlood():void
	{
		this._bloodContainer.visible = true;
	}

	protected drawGuildName():void
	{
		if(this._playerGameObjectInfo.attrInfo.guildName == "")// || GameModelII.scene.cvo.checkHeadHideFlag(PlayerHeadDataType.CORPS)
		{
			if(this._txtGuild != null)
			{
				this._composeTool.removeImage(this._txtGuild);
				ObjectUtil.remove(this._txtGuild);
			}
		}
		else
		{
			if(this._txtGuild == null)
			{
				this._txtGuild = Manager.pool.create(egret.TextField);
				this._txtGuild.textAlign = "center";
			}
			if(this._txtGuild.parent == null) this._headContainer.addChild(this._txtGuild);

			let careerId:number = this._playerGameObjectInfo.attrInfo.guildJob;
			let colorStr:string = "";
			if(careerId <= 10)
				colorStr = Color.BLUE_STR;
			else if(careerId > 10 && careerId <= 30)
				colorStr = Color.PURPLE_STR;
			else if(careerId > 30 && careerId <= 40)
				colorStr = Color.ORANGE_STR;
			else if(careerId > 40)
				colorStr = Color.RED_STR;

			let guildHtml = StringUtils.setParam(LangCVO.getContent("common1"), Color.GUILD_NAME_STR, "[" + this._playerGameObjectInfo.attrInfo.guildName + "]" + "<font color='"+ colorStr +"'>" + this._playerGameObjectInfo.attrInfo.guildJobName + "</font>");
			HtmlUtil.setTextFlow(this._txtGuild, guildHtml);
			this._txtGuild.width = 200;
			this._txtGuild.x = - this._txtGuild.width >> 1;
			this._composeTool.clearFlag();
			this.headAddDisplayObj(this._txtGuild);
		}
		this.composeHeadTop();
	}

	private drawVIP():void
	{
		if(this._playerGameObjectInfo.attrInfo.vipLevel > 0)
		{
			if(!this._iconVIP) this._iconVIP = Manager.pool.create(BitmapRes, "chat_vip_png", this.loadTitleOrVipCallBack, this);
			if(this._iconVIP.parent == null) this._headContainer.addChild(this._iconVIP);
			this._composeTool.clearFlag();
			this.headAddDisplayObj(this._iconVIP, 0, 0);
		}
		else
		{
			if(this._iconVIP != null)
			{
				this._composeTool.removeImage(this._iconVIP);
				ObjectUtil.remove(this._iconVIP);
			}
		}
		this.composeHeadTop();
	}

	private drawTitle():void
	{
		if(this._playerGameObjectInfo.attrInfo.titleId > 0)
		{
			let path = Manager.path.getTitlePath(this._playerGameObjectInfo.attrInfo.titleId);
			if(!this._imgTitle) this._imgTitle = Manager.pool.create(BitmapRemote);
			this._imgTitle.load(path, -1, -1, this.loadTitleOrVipCallBack, this);
			if(this._imgTitle.parent == null) this._headContainer.addChild(this._imgTitle);
			this._composeTool.clearFlag();
			this.headAddDisplayObj(this._imgTitle);
		}
		else
		{
			if(this._imgTitle != null)
			{
				this._composeTool.removeImage(this._imgTitle);
				ObjectUtil.remove(this._imgTitle);
			}
		}
		this.composeHeadTop();
	}
	/**加载头顶称号图片回调 */
	private loadTitleOrVipCallBack():void
	{
		if(this._composeTool != null)
		{
			this._composeTool.clearFlag();
			this.composeHeadTop();
		}
	}
	//```````````````````````````````````````````````````````````````````````````````````````````````

	protected disposeSelf():void
	{
		super.disposeSelf();
		// let pet:PetGameObjectInfo = this._playerGameObjectInfo.getPet();
		// if(pet)
		// {
		// 	Manager.model.getGameobject().removeGameObject(pet);
		// 	this._playerGameObjectInfo.setPet(null);
		// }
		Manager.pool.push(this._headContainer);
		this._headContainer = null;
		if(this._txtName != null)
		{
			Manager.pool.push(this._txtName);
			this._txtName = null;
		}
		this._playerGameObjectInfo = null;
		if(this._elementShow != null)
		{
			Manager.pool.push(this._elementShow);
			this._elementShow = null;
		}
		if(Manager.render.contains(this.callback, this))
		{
			Manager.render.remove(this.callback, this);
		}
		if(this._composeTool != null)
		{
			Manager.pool.push(this._composeTool);
			this._composeTool = null;
		}
		if(this._txtGuild != null)
		{
			Manager.pool.push(this._txtGuild);
			this._txtGuild = null;
		}
		if(this._iconVIP != null)
		{
			ObjectUtil.remove(this._iconVIP);
			this._iconVIP.bitmapData = null;
			this._iconVIP = null;
		}
		if(this._imgTitle != null)
		{
			Manager.pool.push(this._imgTitle);
			this._imgTitle = null;
		}
		this.removeTrainingEff();
	}
}