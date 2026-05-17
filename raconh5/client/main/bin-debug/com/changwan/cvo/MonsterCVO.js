var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
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
 *author Anydo
 *create 2017-11-2
 *description
*/
var MonsterCVO = (function (_super) {
    __extends(MonsterCVO, _super);
    function MonsterCVO() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MonsterCVO.prototype, "hasFindPos", {
        get: function () { return (this._findPosConfig != ""); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MonsterCVO.prototype, "positions", {
        get: function () { return this._postions; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MonsterCVO.prototype, "url", {
        get: function () { return "" + this._url; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MonsterCVO.prototype, "height", {
        get: function () { return this._height; },
        enumerable: true,
        configurable: true
    });
    MonsterCVO.prototype.parseOne = function (bytes) {
        this.id = bytes.readInt();
        this.name = bytes.readUTF();
        this.level = bytes.readShort();
        this.grade = bytes.readByte();
        this.type = bytes.readByte();
        this.camp = bytes.readByte();
        this.attackMode = bytes.readByte();
        this.canAttackedFlag = bytes.readByte();
        this.hpSection = bytes.readByte();
        this.canDieRepel = bytes.readBoolean();
        this.speed = bytes.readShort();
        this.mapID = bytes.readShort();
        this._birthPosConfig = bytes.readUTF();
        this._findPosConfig = bytes.readUTF();
        this.killedPriority = bytes.readByte();
        this.showHalfWidth = bytes.readShort();
        this._url = bytes.readShort();
        this._height = bytes.readShort();
        this.offsetX = bytes.readShort();
        this.offsetY = bytes.readShort();
        this.cvoscript = bytes.readUTF();
        this.isAllBroadCast = bytes.readBoolean();
        this.showID = bytes.readUTF();
        this.setGradeName();
        this.parsePosition();
    };
    MonsterCVO.prototype.setGradeName = function () {
        if (this.grade == MonsterGrade.ELITE)
            this.gradeName = LangCVO.getContent("game4");
        else if (this.grade == MonsterGrade.BOSS)
            this.gradeName = LangCVO.getContent("game5");
        else
            this.gradeName = "";
    };
    MonsterCVO.prototype.parsePosition = function () {
        this._postions = [];
        var arr = this.hasFindPos ? this._findPosConfig.split("|") : this._birthPosConfig.split("|");
        for (var i = 0; i < arr.length; i++) {
            this._postions.push(PointUtil.getPoint(arr[i].split(",")));
        }
        this.firstPosition = this._postions[0];
        this.lastPosition = this._postions[this._postions.length - 1];
    };
    MonsterCVO.prototype.getPostionBySeekMode = function () {
        var index = Math.floor(this._postions.length * Math.random());
        return this._postions[index];
    };
    MonsterCVO.prototype.resetLoopFindPosIndex = function () {
        this._loopFindPosIndex = 0;
    };
    MonsterCVO.prototype.getFindPosition = function () {
        var p = this._postions[this._loopFindPosIndex];
        this._loopFindPosIndex++;
        if (this._loopFindPosIndex > this._postions.length - 1)
            this._loopFindPosIndex = 0;
        return p;
    };
    Object.defineProperty(MonsterCVO.prototype, "nameColor", {
        get: function () {
            return (this.attackMode == 1) ? "#ff0000" : "#ffffff";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MonsterCVO.prototype, "nameHtml", {
        get: function () {
            return HtmlUtil.addColorTag(this.name, this.nameColor);
        },
        enumerable: true,
        configurable: true
    });
    MonsterCVO.prototype.analyzeScript = function () {
        if (this._scriptDone)
            return;
        this._scriptDone = true;
        var script = new ScriptBaseCVO(this.cvoscript);
        this._birthDirIndex = script.getTypeValue(MonsterCVO.MONSTER_BORTH_DIRECTION);
        this._birthAlpha = script.getTypeValue(MonsterCVO.MONSTER_BORTH_ALPHA);
        this._birthAlphaTime = script.getTypeValue(MonsterCVO.MONSTER_BORTH_ALPHA_TIME);
        this._hasFoot = script.getTypeHasValue(MonsterCVO.MONSTER_FOOT);
        this._deadEffect = script.getTypeValue(MonsterCVO.MONSTER_DEAD_EFFECT);
        this._outHookList = script.getTypeHasValue(MonsterCVO.MONSTER_OUT_HOOK_LIST);
        this._singleDic = script.getTypeHasValue(MonsterCVO.MONSTER_SINGLE_DIC);
        this._deadNoHide = script.getTypeHasValue(MonsterCVO.MONSTER_DEAD_NO_HIDE);
        this._singleAction = script.getTypeHasValue(MonsterCVO.MONSTER_SINGLE_ACTION);
    };
    Object.defineProperty(MonsterCVO.prototype, "birthDirIndex", {
        get: function () {
            if (!this._scriptDone)
                this.analyzeScript();
            return this._birthDirIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MonsterCVO.prototype, "birthAlpha", {
        get: function () {
            if (!this._scriptDone)
                this.analyzeScript();
            return this._birthAlpha;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MonsterCVO.prototype, "birthAlphaTime", {
        get: function () {
            if (!this._scriptDone)
                this.analyzeScript();
            return this._birthAlphaTime;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MonsterCVO.prototype, "hasFoot", {
        get: function () {
            if (!this._scriptDone)
                this.analyzeScript();
            return this._hasFoot;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MonsterCVO.prototype, "deadEffect", {
        get: function () {
            if (!this._scriptDone)
                this.analyzeScript();
            return this._deadEffect;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MonsterCVO.prototype, "outHookList", {
        get: function () {
            if (!this._scriptDone)
                this.analyzeScript();
            return this._outHookList;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MonsterCVO.prototype, "singleDic", {
        get: function () {
            if (!this._singleDic)
                this.analyzeScript();
            return this._singleDic;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MonsterCVO.prototype, "singleAction", {
        get: function () {
            if (!this._singleAction)
                this.analyzeScript();
            return this._singleAction;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MonsterCVO.prototype, "deadNoHide", {
        get: function () {
            if (!this._deadNoHide)
                this.analyzeScript();
            return this._deadNoHide;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 取得boss类型
     *
     * 1 野外地图  ID 1001~1999
    2 主线副本  ID 2001~2999
    3 爬塔BOSS  ID 3001~3999
    4.个人BOSS  ID 9002~9100
    5.全民BOSS  ID 9101~9200
    6.爬塔副本  ID 4001~4011
    
     */
    MonsterCVO.prototype.getBossTypeDesc = function () {
        if (this.id >= 3001 && this.id <= 3999) {
            return LangCVO.getContent("boss20");
        }
        else if (this.id >= 9002 && this.id <= 9100) {
            return LangCVO.getContent("boss18");
        }
        else if (this.id >= 9101 && this.id <= 9200) {
            return LangCVO.getContent("boss19");
        }
    };
    /**是否缥缈录火龙 */
    MonsterCVO.prototype.isMaterialFireLong = function () {
        return this.url == "9040";
    };
    MonsterCVO.parse = function (bytes) {
        MonsterCVO._cvos = {};
        var tableCount = bytes.readByte();
        for (var i = 0; i < tableCount; i++) {
            var cvo = void 0;
            var count = bytes.readShort();
            for (var j = 0; j < count; j++) {
                cvo = new MonsterCVO();
                cvo.parseOne(bytes);
                MonsterCVO._cvos[cvo.id] = cvo;
            }
        }
    };
    MonsterCVO.getCVO = function (id) {
        return MonsterCVO._cvos[id];
    };
    MonsterCVO.getCVOSAtMap = function (mapID) {
        var result = [];
        var cvo;
        for (var key in MonsterCVO._cvos) {
            cvo = MonsterCVO._cvos[key];
            if (cvo.mapID == mapID)
                result.push(cvo);
        }
        return result;
    };
    MonsterCVO.MONSTER_BORTH_DIRECTION = 1; //出生策划配置方向
    MonsterCVO.MONSTER_BORTH_ALPHA = 2; //渐显出生起始透明度
    MonsterCVO.MONSTER_BORTH_ALPHA_TIME = 3; //渐显出生时间(毫秒)
    MonsterCVO.MONSTER_FOOT = 4; //脚底光环
    MonsterCVO.MONSTER_DEAD_EFFECT = 5; //死亡特效
    MonsterCVO.MONSTER_OUT_HOOK_LIST = 6; //不列入挂机列表
    MonsterCVO.MONSTER_SINGLE_DIC = 7; //怪物形象不随方向改变，方向取右上资源
    MonsterCVO.MONSTER_SINGLE_ACTION = 8; //怪物形象只有一种动作，动作取站立资源
    MonsterCVO.MONSTER_DEAD_NO_HIDE = 9; //死亡形象不消失
    return MonsterCVO;
}(BaseFindCVO));
__reflect(MonsterCVO.prototype, "MonsterCVO");
//# sourceMappingURL=MonsterCVO.js.map