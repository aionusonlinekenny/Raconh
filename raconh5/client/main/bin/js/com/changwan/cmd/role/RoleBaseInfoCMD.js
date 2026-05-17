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
var RoleBaseInfoCMD = /** @class */ (function (_super) {
    __extends(RoleBaseInfoCMD, _super);
    function RoleBaseInfoCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.ROLE_BASE_INFO;
        return _this;
    }
    RoleBaseInfoCMD.prototype.receive = function (pi) {
        var roleId = pi.readInt64();
        Manager.model.getLogin().curRoleInfoId = roleId;
        var roleInfo = Manager.model.getLogin().getRoleInfoByID(roleId);
        if (roleInfo == null) {
            roleInfo = new RoleInfo();
            roleInfo.id = roleId;
            Manager.model.getLogin().roleInfos.push(roleInfo);
        }
        roleInfo.serverID = pi.readInt();
        // let selfInfo:SelfGameObjectInfo = Manager.pool.create(SelfGameObjectInfo, roleId, roleInfo);
        if (!Manager.model.self)
            Manager.model.self = Manager.pool.create(SelfGameObjectInfo, roleId, roleInfo);
        var selfInfo = Manager.model.self;
        selfInfo.setAliveFlag(true);
        selfInfo.setDirection(Direction.RIGHT_DOWN);
        selfInfo.setActionStr(FigureAction.STAND);
        // Manager.model.self = selfInfo;
        selfInfo.attrInfo.setValue(AttrDescType.NICKNAME, pi.readUTF());
        selfInfo.attrInfo.setValue(AttrDescType.CAREER, pi.readByte());
        selfInfo.attrInfo.setValue(AttrDescType.CLOTHES, pi.readShort());
        selfInfo.attrInfo.setValue(AttrDescType.WEAPON, pi.readShort());
        selfInfo.attrInfo.setValue(AttrDescType.WING, pi.readShort());
        selfInfo.attrInfo.setValue(AttrDescType.TURN_LIVE, pi.readByte());
        selfInfo.attrInfo.setValue(AttrDescType.LEVEL, pi.readShort());
        selfInfo.attrInfo.setValue(AttrDescType.HONOR, pi.readInt());
        selfInfo.attrInfo.setValue(AttrDescType.GOLD, pi.readInt());
        selfInfo.attrInfo.setValue(AttrDescType.COIN, pi.readInt64());
        selfInfo.attrInfo.setValue(AttrDescType.DESTINY_SOUL, pi.readInt());
        selfInfo.attrInfo.setValue(AttrDescType.DESTINY_FRAG, pi.readInt());
        selfInfo.attrInfo.setValue(AttrDescType.EXP, pi.readInt64());
        selfInfo.attrInfo.setValue(AttrDescType.EXP_MAX, pi.readInt64());
        selfInfo.attrInfo.setValue(AttrDescType.HP_MAX, pi.readInt());
        selfInfo.attrInfo.setValue(AttrDescType.HP, pi.readInt());
        selfInfo.attrInfo.setValue(AttrDescType.FIGHT, pi.readInt());
        selfInfo.attrInfo.setValue(AttrDescType.SPEED, pi.readShort());
        selfInfo.attrInfo.setValue(AttrDescType.DMG, pi.readInt());
        selfInfo.attrInfo.setValue(AttrDescType.HP_MAX, pi.readInt64());
        selfInfo.attrInfo.setValue(AttrDescType.ARMOR, pi.readInt());
        selfInfo.attrInfo.setValue(AttrDescType.DEFENCE, pi.readInt());
        selfInfo.attrInfo.setValue(AttrDescType.HITRATE, pi.readInt());
        selfInfo.attrInfo.setValue(AttrDescType.EVASION, pi.readInt());
        selfInfo.attrInfo.setValue(AttrDescType.CRITRATE, pi.readInt());
        selfInfo.attrInfo.setValue(AttrDescType.TENACITY, pi.readInt());
        selfInfo.attrInfo.setValue(AttrDescType.RECOVER, pi.readInt());
        selfInfo.attrInfo.setValue(AttrDescType.EXP_PER, pi.readInt());
        selfInfo.attrInfo.setValue(AttrDescType.DMG_ENHANCE, pi.readInt());
        selfInfo.attrInfo.setValue(AttrDescType.DMG_REDUCE, pi.readInt());
        selfInfo.attrInfo.setValue(AttrDescType.CRITRATE_PER, pi.readInt());
        selfInfo.attrInfo.setValue(AttrDescType.ANTI_CRITRATE_PER, pi.readInt());
        selfInfo.attrInfo.setValue(AttrDescType.CRITDMG_PER, pi.readInt());
        selfInfo.attrInfo.setValue(AttrDescType.ANTI_CRITDMG_PER, pi.readInt());
        selfInfo.attrInfo.setValue(AttrDescType.HITRATE_PER, pi.readInt());
        selfInfo.attrInfo.setValue(AttrDescType.EVASION_PER, pi.readInt());
        selfInfo.attrInfo.setValue(AttrDescType.BF_TYPE, pi.readByte());
        selfInfo.attrInfo.setValue(AttrDescType.UNION, pi.readInt());
        selfInfo.attrInfo.setValue(AttrDescType.PK_MODE, pi.readByte());
        selfInfo.attrInfo.setValue(AttrDescType.TITLE_ID, pi.readShort());
        selfInfo.attrInfo.setValue(AttrDescType.GUILD_ID, pi.readInt64());
        selfInfo.attrInfo.setValue(AttrDescType.GUILD_JOB, pi.readByte());
        selfInfo.attrInfo.setValue(AttrDescType.GUILD_NAME, pi.readUTF());
        selfInfo.attrInfo.setValue(AttrDescType.GUILD_CONTRI, pi.readInt());
        selfInfo.attrInfo.setValue(AttrDescType.VIP_LEVEL, pi.readByte());
        selfInfo.attrInfo.setValue(AttrDescType.GUILD_JOB_NAME, pi.readUTF());
        selfInfo.attrInfo.setValue(AttrDescType.PET_ANI, pi.readShort());
        selfInfo.attrInfo.setValue(AttrDescType.GUILD_TYPE, pi.readByte());
        selfInfo.attrInfo.setValue(AttrDescType.JUEXUE_AMBIT, pi.readInt());
        // //添加自己
        // Manager.model.getGameobject().addGameObject(Manager.model.self);
        //进地图
        Manager.control.getMap().cmdEnterMap(-1); //登陆时地图id发-1
        Manager.model.getLogin().showHomeView();
    };
    return RoleBaseInfoCMD;
}(BaseCMD));
//# sourceMappingURL=RoleBaseInfoCMD.js.map