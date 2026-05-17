var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 转生界面
 * liangyan
 * create 2017-12-14
*/
var ReinView = /** @class */ (function (_super) {
    __extends(ReinView, _super);
    function ReinView() {
        var _this = _super.call(this) || this;
        _this.touchChildren = true;
        _this.skinName = Manager.path.getSkinName("rein", "ReinViewSkin");
        return _this;
    }
    ReinView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
    };
    ReinView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._reinBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        Manager.model.getRein().addEventListener(ReinEvent.REIN_INFO, this.onReinUpdateHandler, this);
        Manager.model.getRein().addEventListener(ReinEvent.REIN_APPLY, this.onReinUpdateHandler, this);
        Manager.model.getItems().addEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.onUpdateCheckHandler, this);
        Manager.model.self.addEventListener(GameObjectAttrEvent.LEVEL, this.onUpdateCheckHandler, this);
        Manager.model.getCopy().addEventListener(CopyEvent.UPDATE_SINGLE, this.onUpdateCheckHandler, this);
        Manager.model.getRein().addEventListener(ReinEvent.REIN_BOSS_UPDATE, this.onUpdateCheckHandler, this);
    };
    ReinView.prototype.removeEvent = function () {
        this._reinBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        Manager.model.getRein().removeEventListener(ReinEvent.REIN_INFO, this.onReinUpdateHandler, this);
        Manager.model.getRein().removeEventListener(ReinEvent.REIN_APPLY, this.onReinUpdateHandler, this);
        Manager.model.getItems().removeEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.onUpdateCheckHandler, this);
        Manager.model.self.removeEventListener(GameObjectAttrEvent.LEVEL, this.onUpdateCheckHandler, this);
        Manager.model.getCopy().removeEventListener(CopyEvent.UPDATE_SINGLE, this.onUpdateCheckHandler, this);
        Manager.model.getRein().removeEventListener(ReinEvent.REIN_BOSS_UPDATE, this.onUpdateCheckHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    ReinView.prototype.initData = function () {
        _super.prototype.initData.call(this);
    };
    ReinView.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawLayout();
        this.drawData();
    };
    ReinView.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.LAYOUT))
            this.drawLayout();
        if (this.isInvalid(InvalidationType.DATA))
            this.drawData();
    };
    ReinView.prototype.drawLayout = function () {
        if (!this._curCvo)
            return;
        var isMax = this._curCvo.isMax;
        // let nextCvo = isMax ? null : ReinCVO.getCvo(this._curCvo.level + 1);
        //属性
        var str = "";
        var info;
        var infos = this._curCvo.attr.attrInfos;
        for (var i = 0; i < infos.length; i++) {
            info = infos[i];
            if (i != infos.length - 1)
                str += info.name + "+" + info.num + "\n";
            else
                str += info.name + "+" + info.num;
        }
        HtmlUtil.setTextFlow(this._attrTxt, str);
        //战力
        if (!this._fightView) {
            this._fightView = Manager.pool.create(NumImgView2);
            this._fightView.x = this._fightImg.x + 150;
            this._fightView.y = this._fightImg.y + 15;
            this.addChild(this._fightView);
        }
        this._fightView.setValue(this._curCvo.attr.getFighting(), "nums_fighting_", 25);
        //人物外形
        this.showAni();
        //当前转数、下一转数
        if (!this._curLvl) {
            this._curLvl = Manager.pool.create(NumImgView2);
            this._curLvl.x = this._curImg.x - 50;
            this._curLvl.y = this._curImg.y;
            this.addChild(this._curLvl);
        }
        if (!this._nextLvl) {
            this._nextLvl = Manager.pool.create(NumImgView2);
            this._nextLvl.x = this._nextImg.x - 50;
            this._nextLvl.y = this._nextImg.y;
            this.addChild(this._nextLvl);
        }
        if (!isMax) {
            this._curLvl.setValue(this._curCvo.level, "nums_rein_", 41);
            this._nextLvl.setValue(this._curCvo.level + 1, "nums_rein_", 41);
        }
        else {
            this._curLvl.setValue(this._curCvo.level - 1, "nums_rein_", 41);
            this._nextLvl.setValue(this._curCvo.level, "nums_rein_", 41);
        }
        //条件子项
        this.updateCond();
        //转生物品物品
        var showRewards;
        if (isMax)
            showRewards = ReinCVO.getCvo(this._curCvo.level - 1).showRewards;
        else
            showRewards = this._curCvo.showRewards;
        var len = showRewards != null ? showRewards.length : 0;
        // let goods:BaseGoods;
        // for(let j = 0; j < len; j++)
        // {
        //     goods = Manager.pool.create(BaseGoods);
        //     goods.baseId = showRewards[j].baseId;
        //     goods.x = 28;
        //     goods.y = 187 + j * 152;
        //     this._goods.push(goods);
        //     this.addChild(goods);
        // }
        this.cleanItemInfoList();
        this._itemInfoList = [];
        for (var j = 0; j < len; j++) {
            var info_1 = Manager.pool.create(ItemsModelInfo);
            info_1.id = j + 1;
            info_1.base_id = showRewards[j].baseId;
            this._itemInfoList.push(info_1);
        }
        this._itemObject = Manager.pool.create(ItemObject, this._itemInfoList, 1, 11);
        this._itemObject.touchChildren = true;
        this._itemObject.x = 28;
        this._itemObject.y = 187;
        this.addChild(this._itemObject);
        //转生完成标记、转生按钮
        this._finishIcon.visible = isMax;
        this._reinBtn.visible = !isMax;
    };
    ReinView.prototype.cleanItemInfoList = function () {
        if (this._itemInfoList) {
            for (var i = 0; i < this._itemInfoList.length; i++) {
                if (this._itemInfoList[i])
                    Manager.pool.push(this._itemInfoList[i]);
                this._itemInfoList[i] = null;
            }
        }
        this._itemInfoList = null;
    };
    ReinView.prototype.drawData = function () { };
    ReinView.prototype.showAni = function () {
        if (!this._curCvo)
            return;
        var attrInfo = Manager.model.self.attrInfo;
        if (!this._roleModel) {
            this._roleModel = Manager.pool.create(RoleAnimation, this._curCvo.dress, attrInfo.weapon, attrInfo.wing);
            this.addChildAt(this._roleModel, 0);
        }
        this._roleModel.x = -280;
        this._roleModel.y = -150;
    };
    ReinView.prototype.clearAni = function () {
        if (this._roleModel) {
            Manager.pool.push(this._roleModel);
            this._roleModel = null;
        }
    };
    ReinView.prototype.updateCond = function () {
        if (!this._curCvo)
            return;
        var cvo = ReinCVO.getCvo(this._curCvo.level);
        if (cvo.isMax)
            cvo = ReinCVO.getCvo(cvo.level - 1);
        for (var i = 0; i < cvo.condArr.length; i++) {
            this._condArr[i].vo = cvo.condArr[i];
        }
        this._condArr[this._condArr.length - 1].vo = cvo.loss;
        this._reinIcon.visible = Manager.model.getRein().getCheckCanRein();
    };
    ReinView.prototype.onTouchHandler = function (e) {
        if (!this._condArr)
            return;
        var allFinish = true;
        for (var i = 0; i < this._condArr.length; i++) {
            if (!this._condArr[i].isFinish) {
                allFinish = false;
                break;
            }
        }
        if (!allFinish) {
            FloatTips.addTips(LangCVO.getContent("rein8"), Color.RED); //请完成转生目标
            return;
        }
        else
            Manager.control.getRein().reinApply();
    };
    ReinView.prototype.onReinUpdateHandler = function (e) {
        if (e.type == ReinEvent.REIN_APPLY) {
            Manager.view.show(43 /* ReinSuccView */);
            this.updateCvo();
            this.invalidate(InvalidationType.LAYOUT);
        }
        else if (e.type == ReinEvent.REIN_INFO)
            this.updateCond();
    };
    ReinView.prototype.onUpdateCheckHandler = function (e) {
        if (e.type == ItemsEvent.ITEM_UPDATE_EVENT && e.params != ItemsType.BAG)
            return;
        this.updateCond();
    };
    ReinView.prototype.updateCvo = function () {
        this._curCvo = ReinCVO.getCvo(Manager.model.self.attrInfo.zhuanshu);
    };
    // private clearGoods():void
    // {
    //     let len = this._goods != null ? this._goods.length : 0;
    //     for(let i = 0; i < len; i++)
    //     {
    //         Manager.pool.push(this._goods[i]);
    //         this._goods[i] = null;
    //     }
    //     this._goods.length = 0;
    // }
    ReinView.prototype.reuse = function () {
        _super.prototype.reuse.call(this);
        // this._goods = [];
        this._itemInfoList = [];
        this._condArr = [this._cond0, this._cond1, this._cond2, this._cond3];
        this.updateCvo();
    };
    ReinView.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
    };
    ReinView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._curImg, this._nextImg, this._attrTxt, this._reinBtn, this._reinIcon, this._cond0, this._cond1, this._cond2, this._cond3, this._finishIcon, this._itemObject);
        this._curImg.bitmapData = null;
        this._curImg = null;
        this._nextImg.bitmapData = null;
        this._nextImg = null;
        this._fightImg.bitmapData = null;
        this._fightImg = null;
        this._attrTxt.dispose();
        this._attrTxt = null;
        this._reinBtn.dispose();
        this._reinBtn = null;
        this._reinIcon.bitmapData = null;
        this._reinIcon = null;
        this._cond0.dispose();
        this._cond0 = null;
        this._cond1.dispose();
        this._cond1 = null;
        this._cond2.dispose();
        this._cond2 = null;
        this._cond3.dispose();
        this._cond3 = null;
        this._finishIcon.bitmapData = null;
        this._finishIcon = null;
        if (this._itemObject)
            this._itemObject.dispose();
        this._itemObject = null;
        if (this._fightView)
            this._fightView.dispose();
        this._fightView = null;
        if (this._curLvl)
            this._curLvl.dispose();
        this._curLvl = null;
        if (this._nextLvl)
            this._nextLvl.dispose();
        this._nextLvl = null;
        this.clearAni();
        // this.clearGoods();
        this.cleanItemInfoList();
        this._condArr.length = 0;
    };
    return ReinView;
}(UIComponent));
//# sourceMappingURL=ReinView.js.map