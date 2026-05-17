/**
 * 掉落珍稀物品弹出框
 * luzhihong
 * create 2017-11-20
 */
 class EfficiencyAlert extends UIComponent
{
    private _back:eui.Image;
    private _title:eui.Image;
    private _txtSilver0:Label;
    private _txtSilver1:Label;
    private _txtExp0:Label;
    private _txtExp1:Label;

    private _group0:eui.Group;
    private _group1:eui.Group;
    private _group2:eui.Group;
    private _group3:eui.Group;
    
    public constructor()
    {
        super();
        this.touchChildren = true;
        this.skinName = Manager.path.getSkinName("drop", "EfficiencyAlertSkin");
        this.touchEnabled = false;
    }

    public reuse(lastSilver:number, lastExp:number, curSilver:number, curExp:number):void
	{
        this.unuse();
        super.reuse();

        this._txtSilver0.text = GameUtil.getNumShortStr(lastSilver);
        this._txtExp0.text = GameUtil.getNumShortStr(lastExp);
        HtmlUtil.setTextFlow(this._txtSilver1, HtmlUtil.addColorTag(GameUtil.getNumShortStr(curSilver), Color.GREEN_STR) + LangCVO.getContent("common35"));//分钟
        HtmlUtil.setTextFlow(this._txtExp1, HtmlUtil.addColorTag(GameUtil.getNumShortStr(curExp), Color.GREEN_STR) + LangCVO.getContent("common35"));//分钟

        Manager.layer.tipsLayer.addChild(this);
        this._back.width = 100;
        this._title.alpha = this._group0.alpha = this._group1.alpha = this._group2.alpha = this._group3.alpha = 0;
        //停留时间
        let stayTime:number = 1000;


        egret.Tween.get(this._back).to({width:480}, 200)
                                   .wait(stayTime + 700).to({width:100}, 200)
                                   .call(this.callback, this);


        egret.Tween.get(this._title).wait(200).to({alpha:1}, 150)
                                    .wait(stayTime + 400).to({alpha:0}, 150);
                                    
        egret.Tween.get(this._group0).wait(400).to({alpha:1}, 200)
                                            .wait(stayTime - 200).to({alpha:0}, 200);
        egret.Tween.get(this._group1).wait(500).to({alpha:1}, 200)
                                            .wait(stayTime - 200).to({alpha:0}, 200);
        egret.Tween.get(this._group2).wait(600).to({alpha:1}, 200)
                                            .wait(stayTime - 200).to({alpha:0}, 200);
        egret.Tween.get(this._group3).wait(700).to({alpha:1}, 200)
                                            .wait(stayTime - 200).to({alpha:0}, 200);

    }

    private callback():void
    {
        Manager.control.getDrop().hideEfficiencyAlert();
    }

    public unuse():void
    {
        super.unuse();
        egret.Tween.removeTweens(this._back);
        egret.Tween.removeTweens(this._title);
        egret.Tween.removeTweens(this._group0);
        egret.Tween.removeTweens(this._group1);
        egret.Tween.removeTweens(this._group2);
        egret.Tween.removeTweens(this._group3);
    }

    public dispose():void
    {
        egret.Tween.removeTweens(this._back);
        egret.Tween.removeTweens(this._title);
        egret.Tween.removeTweens(this._group0);
        egret.Tween.removeTweens(this._group1);
        egret.Tween.removeTweens(this._group2);
        egret.Tween.removeTweens(this._group3);
        super.dispose();
        this._back = null;
        this._title = null;
        this._txtSilver0.dispose();
        this._txtSilver0 = null;
        this._txtSilver1.dispose();
        this._txtSilver1 = null;
        this._txtExp0.dispose();
        this._txtExp0 = null;
        this._txtExp1.dispose();
        this._txtExp1 = null;
        this._group0 = null;
        this._group1 = null;
        this._group2 = null;
        this._group3 = null;
    }
}