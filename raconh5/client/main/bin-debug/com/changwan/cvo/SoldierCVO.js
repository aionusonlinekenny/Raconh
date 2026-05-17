var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SoldierCVO = (function () {
    function SoldierCVO() {
        this.soldierStarNum = 0;
    }
    SoldierCVO.parse = function (bytes) {
        this._cvos = {};
        var tableCount = bytes.readByte();
        for (var i = 0; i < tableCount; i++) {
            if (i == 0) {
                var count = bytes.readShort();
                for (var j = 0; j < count; j++) {
                    var item = Manager.pool.create(SoldierCVO);
                    item.id = bytes.readInt();
                    item.resId = bytes.readInt();
                    item.name = bytes.readUTF();
                    item.actCond = bytes.readUTF();
                    item.quality = bytes.readByte();
                    item.actConsume = bytes.readUTF();
                    item.sort = bytes.readShort();
                    item.starInfoList = {};
                    this._cvos[item.id] = item;
                }
            }
            if (i == 1) {
                var count = bytes.readShort();
                for (var j = 0; j < count; j++) {
                    var infoId = bytes.readInt();
                    var vo = this._cvos[infoId];
                    var item = Manager.pool.create(SoldierStarCvoInfo);
                    item.star = bytes.readByte();
                    item.loss = bytes.readUTF();
                    item.attr = bytes.readUTF();
                    vo.starInfoList[item.star] = item;
                }
            }
        }
    };
    SoldierCVO.getInfo = function (id) {
        if (!SoldierCVO._cvos)
            return null;
        return SoldierCVO._cvos[id];
    };
    SoldierCVO.getList = function () {
        var arr = [];
        for (var key in this._cvos) {
            var info = this._cvos[key];
            // let pass:boolean = true;
            // if(info.actCond)
            // {
            //     let conList:ConditionVO[] = ConditionVO.getVOList(info.actCond);
            //     for(let con of conList)
            //     {
            //         if(!con.isSatisfy())
            //         {
            //             pass = false;
            //             break;
            //         }
            //     }
            // }
            // if(!pass) continue;
            if (Manager.model.self.attrInfo.career == 1) {
                if (String(info.id).substr(0, 1) == "9")
                    arr.push(info);
            }
            else {
                if (String(info.id).substr(0, 1) == "8")
                    arr.push(info);
            }
        }
        return arr;
    };
    SoldierCVO.prototype.getAttrVO = function () {
        var i = (this.soldierStarNum == 0) ? 1 : this.soldierStarNum; //未激活取第1星的属性
        var starCvo = this.starInfoList[i];
        return starCvo.attrVo;
    };
    return SoldierCVO;
}());
__reflect(SoldierCVO.prototype, "SoldierCVO");
var SoldierStarCvoInfo = (function () {
    function SoldierStarCvoInfo() {
    }
    Object.defineProperty(SoldierStarCvoInfo.prototype, "attrVo", {
        get: function () {
            if (this._attrVo == null)
                this._attrVo = Manager.pool.create(AttrVO, this.attr);
            return this._attrVo;
        },
        enumerable: true,
        configurable: true
    });
    return SoldierStarCvoInfo;
}());
__reflect(SoldierStarCvoInfo.prototype, "SoldierStarCvoInfo");
//# sourceMappingURL=SoldierCVO.js.map