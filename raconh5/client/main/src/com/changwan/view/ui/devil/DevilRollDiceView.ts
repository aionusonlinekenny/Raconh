/**
 * 魔神降临摇骰视图
 * liangyan
 * create 2018-04-17
*/
class DevilRollDiceView extends RenderSprite implements IViewManager
{
    private _back:BitmapRemote;
    private _dices:DevilDiceItem[];
    private _glass:BitmapRemote;
    private _maxTxt:TextField;
    private _btn:Button;
    private _cdTxt:TextField;
    private _myDice:DevilDiceItem;

    private _cd:number;

    private readonly DICE_SUM = 11;
    private readonly pointArr = [[177,373],[344,373],[269,407],[414,334],[137,350],[254,330],[201,394],[316,293],[382,370],[291,407],[393,255]];

    public constructor()
    {
        super();
        this.touchChildren = true;
        this.start();
        this.addEvent();
    }

    protected start():void
    {
        super.start();
        
        let path = Manager.path.getDevilPath("roll_back");
        this._back = Manager.pool.create(BitmapRemote, path);
        this.addChild(this._back);

        this._dices = [];
        let dice:DevilDiceItem;
        for(let i = 0; i < this.DICE_SUM; i++)
        {
            dice = new DevilDiceItem(Math.round(100 * Math.random()));
            dice.setMoving();
            this.addChild(dice);
            this._dices.push(dice);
        }

        path = Manager.path.getDevilPath("roll_glass");
        this._glass = Manager.pool.create(BitmapRemote, path);
        this._glass.x = 102;
        this._glass.y = 54;
        this.addChild(this._glass);

        this._maxTxt = TextField.create(252, 32, 0xFFF7E6, 24, egret.HorizontalAlign.CENTER, egret.VerticalAlign.MIDDLE);
        this._maxTxt.x = 200;
        this._maxTxt.y = 680;
        this.addChild(this._maxTxt);

        this._btn = new Button();
        this._btn.skinName = '<?xml version="1.0" encoding="utf-8"?>'
                        + '<e:Skin class="Button1Skin" xmlns:e="http://ns.egret.com/eui" states="up,down,disabled" xmlns:ns1="*">'
                        + '<e:Image width="100%" height="100%" source="common_btn1_1_png" source.down="common_btn1_2_png"/>'
                        + '<e:Image source="devil_roll_title_png" x="0" y="27"/>'
                        + '<e:Label id="labelDisplay" horizontalCenter="0" verticalCenter="0"/>'
                        +'</e:Skin>'
        this._btn.setSize(238,105);
        this._btn.move(200,700);
        this.addChild(this._btn);

        this._cdTxt = TextField.create(80, 32, 0xFFF7E6, 24, egret.HorizontalAlign.CENTER, egret.VerticalAlign.MIDDLE);
        this._cdTxt.x = 325;
        this._cdTxt.y = 735;
        this.addChild(this._cdTxt);
    }

    protected addEvent():void
    {
        super.addEvent();
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        Manager.model.getDevil().addEventListener(DevilEvent.DEVIL_ROLL_MAX_UPDATE, this.onDevilHandler, this);
    }

    protected removeEvent():void
    {
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        Manager.model.getDevil().removeEventListener(DevilEvent.DEVIL_ROLL_MAX_UPDATE, this.onDevilHandler, this);
        super.removeEvent();
    }

    private onResizeHandler(e:GlobalEvent):void
    {
        this.x = Math.round(Manager.global.gameMain.stage.stageWidth - 606) / 2;
        this.y = Math.round(Manager.global.gameMain.stage.stageHeight - 788) / 2;
    }

    private onTouchHandler(e:egret.TouchEvent):void
    {
        let dice:DevilDiceItem;
		for(var i = 0; i < this.DICE_SUM; i++)
		{
            dice = this._dices[i];
			dice.stop(this.pointArr[i][0], this.pointArr[i][1]);
		}
        
        Manager.control.getDevil().rollDice();
    }

    private onDevilHandler(e:DevilEvent):void
    {
        if(e == null) return;
        this._cd = Number(e.params);
        this._cdTxt.text = LangCVO.getContent("devil18", this._cd);//（{0}）
        Manager.render.add(this.countDown, this, 1000);
    }

    private countDown():void
    {
        if(this._cd <= 0)
        {
            Manager.render.remove(this.countDown, this);
            Manager.view.hide(ViewID.DevilRollDiceView);
        }
        else this._cdTxt.text = LangCVO.getContent("devil18", this._cd);//（{0}）
        this._cd--;
    }

    public updateMax(name:string, value:number):void
    {
        //{0}  摇出<font color='{1}'>{2}</font>点
        HtmlUtil.setTextFlow(this._maxTxt, LangCVO.getContent("devil17", name, Color.GREEN_STR_2, value));
    }

    public updateMyDice(value:number):void
    {
        egret.Tween.removeTweens(this);
        if(this._myDice) this._myDice.dispose();
        this._myDice = null;
        this._myDice = new DevilDiceItem(value);
        this._myDice.x = 330;
        this._myDice.y = 585;
        this._myDice.alpha = 0;
        this._myDice.anchorOffsetX = this._myDice.width / 2;
        this._myDice.anchorOffsetY = this._myDice.height / 2;
        this._myDice.scaleX = this._myDice.scaleY = 0.5;
        this.addChild(this._myDice);
        egret.Tween.get(this._myDice, {loop: false}).to({scaleX:1, scaleY:1, alpha:1}, 1500);
    }

    public show():void
    {
        if(this.parent == null)
        {
            this.onResizeHandler(null);
            Manager.layer.tipsLayer.addChild(this);
        }
    }

    public hide():void
    {
        if(this.parent != null) this.disposeSelf();
    }

    protected disposeSelf():void
    {
        Manager.render.remove(this.countDown, this);
        egret.Tween.removeTweens(this);
        super.disposeSelf();
        if(this._back) Manager.pool.push(this._back);
        this._back = null;
        if(this._glass) Manager.pool.push(this._glass);
        this._glass = null;
        if(this._maxTxt) Manager.pool.push(this._maxTxt);
        this._maxTxt = null;
        if(this._btn) this._btn.dispose();
        this._btn = null;
        if(this._cdTxt) Manager.pool.push(this._cdTxt);
        this._cdTxt = null;
        if(this._myDice)
        {
            ObjectUtil.remove(this._myDice);
            this._myDice.dispose();
        }
        this._myDice = null;

        for(let i = 0; i < this.DICE_SUM; i++)
        {
            ObjectUtil.remove(this._dices[i]);
            this._dices[i].dispose();
            this._dices[i] = null;
        }
        this._dices.length = 0;
    }
}