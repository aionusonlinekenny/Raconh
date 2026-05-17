/**
 * 火眼金睛游戏界面
 * liangyan
 * create 2018-03-28
*/
class FireEyeGameView extends UIComponent
{
    private _levelTxt:Label;
    private _timeTxt:Label;
    private _rateTxt:Label;
    private _itemTxt:Label;

    private _scroll:egret.ScrollView;
    private _canvas:FireEyeCanvas;

    private _levelInfo:FireEyeNextLevelInfo;
    private _cd:number;
    private _redBorder:BitmapRemote;

    public constructor()
    {
        super();
        this.touchChildren = true;
        this.skinName = Manager.path.getSkinName("fireEye", "FireEyeGameViewSkin");
    }

    protected configUI():void
    {
        super.configUI();

        if(this._scroll == null)
        {
            this._scroll = new egret.ScrollView();
            this._scroll.horizontalScrollPolicy = "off";
            this._scroll.width = FireEyeConfigCVO.getCVOByID(FireEyeConfigCVO.ID_CANVAS_WIDTH).value;
		    this._scroll.height = FireEyeConfigCVO.getCVOByID(FireEyeConfigCVO.ID_SEE_HEIGHT).value;
            this._scroll.x = 10;
            this._scroll.y = 197;
            this._scroll.scrollSpeed = 0.01;
            this._scroll.bounces = false;
            this.addChild(this._scroll);
        }

        if(this._canvas == null) this._canvas = Manager.pool.create(FireEyeCanvas);
        this._canvas.touchChildren = true;
        
        this._scroll.setContent(this._canvas);
    }

    protected addEvent():void
    {
        super.addEvent();
        Manager.model.getFireEye().addEventListener(FireEyeEvent.FIRE_EYE_PLAYER_DATA, this.onFireEyeHandler, this);
    }

    protected removeEvent():void
    {
        Manager.model.getFireEye().removeEventListener(FireEyeEvent.FIRE_EYE_PLAYER_DATA, this.onFireEyeHandler, this);
        super.removeEvent();
    }

    protected drawAll():void
    {
        super.drawAll();
        this.drawData();
    }

    protected draw():void
    {
        super.draw();
        if(this.isInvalid(InvalidationType.DATA)) this.drawData();
    }

    private drawData():void
    {
        if(Manager.control.getFireEye().banView != null)
            (Manager.view.getView(ViewID.FireEyePanel) as FireEyePanel).addChild(Manager.control.getFireEye().banView);
        if(Manager.control.getFireEye().finishView != null)
            (Manager.view.getView(ViewID.FireEyePanel) as FireEyePanel).addChild(Manager.control.getFireEye().finishView);
        this._levelInfo = Manager.model.getFireEye().nextInfo;
        //关卡数
        this._levelTxt.text = LangCVO.getContent("fireEye1", this._levelInfo.level, FireEyeLevelCVO.maxLevel);
        //关卡时间
        let curTime = Manager.model.getLogin().serverTimeInfo.serverTime / 1000;
        this._cd = Math.round(this._levelInfo.startTime + this._levelInfo.levelTime - curTime);
        this._timeTxt.text = cw.DateUtil.formatStr(this._cd, cw.DateUtil.MM_SS);
        Manager.render.add(this.countdown, this, 1000);
        //双方进度
        this.onFireEyeHandler(null);
    }

    private countdown():void
    {
        this._cd--;
        if(this._cd <= 0)
        {
            Manager.render.remove(this.countdown, this);
        }
        else if(this._cd <= 10)
        {
            this._timeTxt.textColor = Color.RED;
            if(this._redBorder == null)
            {
                let path = Manager.path.getFireEyePath("red_back");
                this._redBorder = Manager.pool.create(BitmapRemote, path);
                this._redBorder.x = this._scroll.x + 25;
                this._redBorder.y = this._scroll.y - 3;
                this._redBorder.touchEnabled = false;
                this.addChildAt(this._redBorder, this.getChildIndex(this._scroll) + 1);
                Manager.render.add(this.shine, this, 600);
            }
        }
        this._timeTxt.text = cw.DateUtil.formatStr(this._cd, cw.DateUtil.MM_SS);
    }

    private shine():void
    {
        let isShow = this._redBorder.visible;
        this._redBorder.visible = !isShow;
    }

    private onFireEyeHandler(e:FireEyeEvent):void
    {
        let myInfo = Manager.model.getFireEye().myGameInfo;
        let enemyInfo = Manager.model.getFireEye().enemyGameInfo;
        let rateStr = LangCVO.getContent("fireEye13", myInfo.rate) + "  " + LangCVO.getContent("fireEye14", enemyInfo.rate);
        HtmlUtil.setTextFlow(this._rateTxt, rateStr);
        if(this._levelInfo == null) return;
        let len = this._levelInfo.datas ? this._levelInfo.datas.length : 0;
        let targetLen = myInfo.targets ? myInfo.targets.length : 0;
        let itemCvo:FireEyeItemCVO;
        let curNum:number;
        let sumNum:number;
        let color:string;
        let str = "";
        for(let i = 0; i < len; i++)
        {
            itemCvo = FireEyeItemCVO.getFirstCvoByType(this._levelInfo.datas[i].type);
            curNum = 0;
            if(targetLen > 0)
            {
                for(let j = 0; j < targetLen; j++)
                {
                    if(myInfo.targets[j].type == itemCvo.type) curNum = myInfo.targets[j].num;
                }
            }
            sumNum = this._levelInfo.datas[i].num;
            color = curNum < sumNum ? Color.RED_STR : Color.GREEN_STR_2;
            str += LangCVO.getContent("fireEye10", itemCvo.name, color, curNum, sumNum);
            if(i != len - 1) str += "     ";
        }
        HtmlUtil.setTextFlow(this._itemTxt, str);
    }

    public drawStatus(id:number, newData:FireEyeGoodsData):void
    {
        if(this._canvas == null) return;
        this._canvas.drawStatus(id, newData);
    }

    public dispose():void
    {
        Manager.render.remove(this.countdown, this);
        Manager.render.remove(this.shine, this);
        super.dispose();
        ObjectUtil.removes(this._levelTxt, this._timeTxt, this._rateTxt, this._itemTxt, this._scroll);
        this._levelTxt.dispose();
        this._levelTxt = null;
        this._timeTxt.dispose();
        this._timeTxt = null;
        this._rateTxt.dispose();
        this._rateTxt = null;
        this._itemTxt.dispose();
        this._itemTxt = null;
        if(this._scroll)
		{
			this._scroll.removeContent();
			this.removeChild(this._scroll);
		}
        this._scroll = null;
        if(this._canvas) Manager.pool.push(this._canvas);
        this._canvas = null;
        if(this._redBorder) Manager.pool.push(this._redBorder);
        this._redBorder = null;
    }
}