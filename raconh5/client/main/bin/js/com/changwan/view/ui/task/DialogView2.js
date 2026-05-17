var DialogView2 = /** @class */ (function () {
    function DialogView2() {
        this.start();
        this.addEvent();
    }
    DialogView2.prototype.start = function () {
        this._imageContainer = ObjectUtil.createConainer();
        Manager.layer.modalImageLayer.addChild(this._imageContainer);
        this._conainer1 = ObjectUtil.createConainer();
        Manager.layer.modalLayer.addChild(this._conainer1);
        this._head = Manager.pool.create(BitmapRemote);
        this._head.y = 50;
        this._imageContainer.addChild(this._head);
        this._back = BitmapRes.create("guide_dialog_back_png", 0, 570, 720, 213);
        this._imageContainer.addChild(this._back);
        this._arrow = BitmapRes.create("guide_dialog_arrow1_png", 521, 745, 135, 22);
        this._imageContainer.addChild(this._arrow);
        this._hand = new HandAni(552, 756);
        this._imageContainer.addChild(this._hand);
        this._content = TextField.create(584, 140, 0xffffff, 24);
        this._content.move(54, 632);
        this._conainer1.addChild(this._content);
        this._name = Manager.pool.create(BitmapRemote);
        this._name.x = 56;
        this._name.y = 589;
        this._conainer1.addChild(this._name);
    };
    DialogView2.prototype.addEvent = function () {
        Manager.global.gameMain.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
    };
    DialogView2.prototype.removeEvent = function () {
        Manager.global.gameMain.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
    };
    DialogView2.prototype.show = function (id) {
        this._time = 0;
        this._index = -1;
        this._id = id;
        if (this._id == CopyConst.ID_DIALOG_EXP)
            Manager.model.getCopy().expModel.needGuide = true;
        else if (this._id == CopyConst.ID_DIALOG_COIN)
            Manager.model.getCopy().silverModel.needGuide = true;
        this._cvos = DialogCVO.getCVOs(this._id);
        this._cvos.sort(this.sortFun);
        this.onResizeHandler();
        Manager.render.add(this.countDown, this, 1000);
        this.showNext();
    };
    DialogView2.prototype.sortFun = function (cvo0, cvo1) {
        if (cvo0.sort < cvo1.sort)
            return -1;
        if (cvo0.sort > cvo1.sort)
            return -1;
        return 0;
    };
    DialogView2.prototype.hide = function () {
        if (this._id == RookieConst.FIRST_DIALOG_ID)
            Manager.model.getTask().parseStep(RookieConst.FIRST_ID + 1);
        else if (this._id == CopyConst.ID_DIALOG_EXP)
            Manager.model.getGuide().curID = GuideID.EXP_COPY;
        else if (this._id == CopyConst.ID_DIALOG_COIN)
            Manager.model.getGuide().curID = GuideID.COIN_COPY;
        else
            Manager.control.getTask().rookieAsk();
        this.dispose();
    };
    DialogView2.prototype.onResizeHandler = function (e) {
        var xx = Math.round((Manager.config.gameWidth - 720) >> 1);
        this._conainer1.x = xx;
        this._imageContainer.x = xx;
    };
    DialogView2.prototype.onClickHandler = function (e) {
        this.showNext();
    };
    DialogView2.prototype.countDown = function () {
        if (this._time / 2 >= this._cvos[this._index].time)
            this.showNext();
        this._time++;
    };
    DialogView2.prototype.showNext = function () {
        this._index++;
        if (this._index < this._cvos.length) {
            var cvo = this._cvos[this._index];
            this._time = 0;
            var headID = cvo.head > 0 ? cvo.head : Manager.model.self.attrInfo.career;
            this._head.load(Manager.path.getTaskPath("dialog/head/" + headID + ".png"));
            this._head.scaleX = cvo.dic;
            this._head.x = cvo.dic > 0 ? 0 : 720;
            this._head.y = 50;
            this._name.load(Manager.path.getTaskPath("dialog/name/" + cvo.nameRes + ".png"));
            this._content.text = cvo.description;
        }
        else {
            Manager.view.hide(113 /* DialogView2 */);
        }
    };
    DialogView2.prototype.dispose = function () {
        this.removeEvent();
        Manager.render.remove(this.countDown, this);
        Manager.pool.push(this._head);
        Manager.pool.push(this._name);
        Manager.pool.push(this._content);
        Manager.pool.push(this._back);
        Manager.pool.push(this._arrow);
        Manager.pool.push(this._head);
        ObjectUtil.dispose(this._hand);
        this._head = null;
        this._name = null;
        this._content = null;
        this._hand = null;
        this._back = null;
        this._arrow = null;
        this._cvos = null;
    };
    return DialogView2;
}());
//# sourceMappingURL=DialogView2.js.map