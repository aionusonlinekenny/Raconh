var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 神器小界面提示
 * pzx
 * create 18.3.13
 * @updateTime devil 2018-04-17
 */
var MainRelicStuffNotice2 = (function () {
    function MainRelicStuffNotice2(homeImageLayer, homeLayer, owner) {
        this._id = -1;
        this._homeImageLayer = ObjectUtil.createConainer();
        homeImageLayer.addChild(this._homeImageLayer);
        this._homeLayer = ObjectUtil.createConainer();
        homeLayer.addChild(this._homeLayer);
        this._visible = false;
        this._model = Manager.model.getrelicstuff();
        this._taskModel = Manager.model.getTask();
        this._owner = owner;
        this._drawData = true;
    }
    MainRelicStuffNotice2.prototype.getGuidPos = function () {
        return this._homeImageLayer.parent.localToGlobal(this._homeImageLayer.x, this._homeImageLayer.y);
    };
    MainRelicStuffNotice2.prototype.move = function (x, y) {
        this._homeLayer.x = x;
        this._homeLayer.y = y;
        this._homeImageLayer.x = x;
        this._homeImageLayer.y = y;
    };
    MainRelicStuffNotice2.prototype.switch = function (visible) {
        if (this._visible == visible)
            return;
        this._visible = visible;
        if (this._visible) {
            this._id = -1;
            this._drawData = true;
            if (this._back == null) {
                this._back = BitmapRes.create("relicStuff_taizi_png", 22, 115);
                this._back.touchEnabled = true;
                this._homeImageLayer.addChild(this._back);
            }
            if (this._back1 == null) {
                this._back1 = BitmapRes.create("common_name_back_png", 147, -24);
                this._back1.height = 320;
                this._homeImageLayer.addChild(this._back1);
            }
            if (this._nameBit == null) {
                this._nameBit = Manager.pool.create(BitmapRemote);
                this._nameBit.x = 168;
                this._nameBit.y = 23;
                this._nameBit.width = 44;
                this._nameBit.height = 166;
                this._homeLayer.addChild(this._nameBit);
            }
            if (this._descTxt == null) {
                this._descTxt = TextField.create(193, 54, 0xfff7e7, 22, "center");
                this._descTxt.y = 160;
                this._descTxt.lineSpacing = 6;
                this._homeLayer.addChild(this._descTxt);
            }
            this.addEvent();
            this.dispatchRender();
        }
        else {
            this.removeEvent();
            if (this._back != null) {
                Manager.pool.push(this._back);
                this._back = null;
            }
            if (this._back1 != null) {
                Manager.pool.push(this._back1);
                this._back1 = null;
            }
            if (this._descTxt != null) {
                Manager.pool.push(this._descTxt);
                this._descTxt = null;
            }
            if (this._nameBit != null) {
                Manager.pool.push(this._nameBit);
                this._nameBit = null;
            }
            if (this._ani) {
                Manager.pool.push(this._ani);
                this._ani = null;
            }
        }
    };
    MainRelicStuffNotice2.prototype.dispatchRender = function () {
        Manager.render.add(this.draw, this, 500, 1);
    };
    MainRelicStuffNotice2.prototype.addEvent = function () {
        this._back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchOpenHandler, this);
        this._model.addEventListener(RelicStuffEvent.RELICSTUFF_ACTIVITY_EVENT, this.onActivityReturn, this);
    };
    MainRelicStuffNotice2.prototype.removeEvent = function () {
        this._back.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchOpenHandler, this);
        this._model.removeEventListener(RelicStuffEvent.RELICSTUFF_ACTIVITY_EVENT, this.onActivityReturn, this);
    };
    MainRelicStuffNotice2.prototype.onTouchOpenHandler = function () {
        Manager.view.show(37 /* ReinPanel */);
    };
    /** 激活成功返回 */
    MainRelicStuffNotice2.prototype.onActivityReturn = function (e) {
        var type = e.params.type;
        if (type == RelicStuffType.RELICSTUFF_TYPE) {
            this._curCvo = RelicStuffCVO.cvo(e.params.id + 1);
            if (this._curCvo == null)
                this._owner.disposeView(HomeView2.MAIN_RELICE_STUFF);
            else
                this.drawData();
        }
        else {
            this._drawData = true;
            this.dispatchRender();
        }
    };
    MainRelicStuffNotice2.prototype.draw = function () {
        if (this._drawData) {
            this.drawData();
            this._drawData = false;
        }
    };
    MainRelicStuffNotice2.prototype.drawData = function () {
        if (!this._curCvo)
            return;
        this.drawView();
        var arr = this._curCvo.getDebrisList();
        var cvo = arr[arr.length - 1]; //不可激活：显示“再战*关”（条件同最后一个碎片的激活条件）
        var val = "";
        if (cvo.checkisActivity() || cvo.isActivity()) {
            val = LangCVO.getContent("common59"); //<font color='#00ff00'>可激活</font>
        }
        else {
            if (this._taskModel.getcurTask()) {
                var con = cvo.condVo;
                var taskcvo = TaskCVO.getinfo(con.value);
                var curCvo = TaskCVO.getinfo(this._taskModel.getcurTask().id);
                var isact = taskcvo.verse - curCvo.verse + 1;
                val = StringUtils.setParam(LangCVO.getContent("relicstuff4"), isact); //再战{0}关
            }
        }
        var desc = StringUtils.setParam(this._curCvo.desc, val);
        HtmlUtil.setTextFlow(this._descTxt, desc);
    };
    MainRelicStuffNotice2.prototype.drawView = function () {
        if (this._id == this._curCvo.id)
            return;
        this._id = this._curCvo.id;
        this._nameBit.load(Manager.path.getRelicStuffPath("label/name" + this._curCvo.id));
        if (this._ani) {
            Manager.pool.push(this._ani);
            this._ani = null;
        }
        this._ani = Manager.animation.createPanelGlobalAnimation("relicStuff/ani/" + this._curCvo.mainAni_id, this._curCvo.mainAni_id);
        this._ani.x = -310;
        this._ani.y = -315;
        this._homeLayer.addChild(this._ani);
    };
    MainRelicStuffNotice2.prototype.setData = function (data) {
        if (this._curCvo == data)
            return;
        this._curCvo = data;
        if (!this._visible)
            return;
        this._drawData = true;
        this.dispatchRender();
    };
    MainRelicStuffNotice2.prototype.dispose = function () {
        this.switch(false);
        Manager.render.remove(this.draw, this);
        this._homeImageLayer.parent.removeChild(this._homeImageLayer);
        this._homeImageLayer = null;
        this._homeLayer.parent.removeChild(this._homeLayer);
        this._homeLayer = null;
        this._model = null;
        this._taskModel = null;
        this._curCvo = null;
        this._owner = null;
    };
    return MainRelicStuffNotice2;
}());
__reflect(MainRelicStuffNotice2.prototype, "MainRelicStuffNotice2", ["cw.IDispose"]);
//# sourceMappingURL=MainRelicStuffNotice2.js.map