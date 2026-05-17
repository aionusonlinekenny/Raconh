/**
 * 魔神降临抢夺列表子项
 * liangyan
 * create 2018-04-10
*/
class DevilGrabItem extends RenderSprite
{
    private _headBg:BitmapRes;
    private _scoreBg:BitmapRes;
    private _head:BitmapRemote;
    private _winTimesImg:BitmapRes;
    private _fightTxt:TextField;
    private _scoreTxt:TextField;
    private _winTimesTxt:TextField;

    private _info:DevilGrabInfo;

    public constructor()
    {
        super();
    }

    protected start():void
    {
        super.start();
        this._headBg = BitmapRes.create("common_cb_rect_png", 6, 0, 112, 112);
        this.addChild(this._headBg);
        this._scoreBg = BitmapRes.create("common_back2_png", 0, 112, 123, 38);
        this.addChild(this._scoreBg);
        this._head = Manager.pool.create(BitmapRemote);
        this._head.x = 15;
        this._head.y = 15;
        this.addChildAt(this._head, 1);
        this._winTimesImg = BitmapRes.create("suit_qizi_png")
        this.addChild(this._winTimesImg);
        this._fightTxt = TextField.create(123, 20, 0xfffbeb, 20, egret.HorizontalAlign.CENTER, egret.VerticalAlign.MIDDLE);
        this._fightTxt.move(0, 80);
        this.addChild(this._fightTxt);
        this._scoreTxt = TextField.create(123, 38, 0xfffbeb, 20, egret.HorizontalAlign.CENTER, egret.VerticalAlign.MIDDLE);
        this._scoreTxt.move(0, 112);
        this.addChild(this._scoreTxt);
        this._winTimesTxt = TextField.create(24, 51, 0xfffbeb, 20, egret.HorizontalAlign.CENTER, egret.VerticalAlign.MIDDLE);
        this._winTimesTxt.wordWrap = true;
        this._winTimesTxt.move(5, -8);
        this.addChild(this._winTimesTxt);
    }

    protected addEvent():void
    {
        super.addEvent();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
    }

    protected removeEvent():void
    {
        super.removeEvent();
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
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
        if(this._info == null) return;
        this._head.load(Manager.path.getRoleHeadPath(1, this._info.career, 0));

        // let fight = this.setWordsFormat(this._info.fight);
        let score = this.setWordsFormat(this._info.score);

        // this._fightTxt.text = LangCVO.getContent("devil4", fight);
        this._fightTxt.text = this._info.name;
        this._scoreTxt.text = LangCVO.getContent("devil5", score);

        if(this._info.winTimes > 0)
        {
            this._winTimesImg.visible = this._winTimesTxt.visible = true;
            this._winTimesTxt.text = LangCVO.getContent("devil14", this._info.winTimes);//{0}胜
        }
        else this._winTimesImg.visible = this._winTimesTxt.visible = false;
    }

    private setWordsFormat(num:number):string
	{
		if(num < 10000) return "" + num;
		if(num >= 100000000) return (num / 100000000).toFixed(num % 100000000 == 0 ? 0 : 1) + "亿";
		return (num / 10000).toFixed(num % 10000 == 0 ? 0 : 1) + "万";
	}

    private onTouchHandler(e:egret.TouchEvent):void
    {
        if(this._info == null) return;
        let now = Manager.model.getLogin().serverTimeInfo.serverTime / 1000;
        let differ = Math.round(Manager.model.getDevil().canGrabTime - now);
        if(differ > 0)
        {
            //{0}秒后可发起抢夺
            FloatTips.addTips(LangCVO.getContent("devil11", differ), Color.RED);
            return;
        }
        else if(!Manager.model.self.getAliveFlag()) FloatTips.addTips(LangCVO.getContent("devil19"), Color.RED);//角色已死亡，无法抢夺
        else Manager.control.getDevil().challenge(this._info.id);
    }

    private clear():void
    {
        if(this._headBg) Manager.pool.push(this._headBg);
        this._headBg = null;
        if(this._scoreBg) Manager.pool.push(this._scoreBg);
        this._scoreBg = null;
        if(this._head) Manager.pool.push(this._head);
        this._head = null;
        if(this._winTimesImg) Manager.pool.push(this._winTimesImg);
        this._winTimesImg = null;
        if(this._fightTxt) Manager.pool.push(this._fightTxt);
        this._fightTxt = null;
        if(this._scoreTxt) Manager.pool.push(this._scoreTxt);
        this._scoreTxt = null;
        if(this._winTimesTxt) Manager.pool.push(this._winTimesTxt);
        this._winTimesTxt = null;

        this._info = null;
    }

    public set info(info:DevilGrabInfo)
    {
        if(this._info == info) return;
        this._info = info;
        this.drawData();
    }

    public reuse():void
    {
        this.touchEnabled = true;
        super.reuse();
    }
    
    public unuse():void
    {
        super.unuse();
        this.clear();
    }

    protected disposeSelf():void
    {
        super.disposeSelf();
        this.clear();
    }
}