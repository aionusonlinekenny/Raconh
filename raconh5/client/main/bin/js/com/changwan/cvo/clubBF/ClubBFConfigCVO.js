/**
 * 盟会战配置
 * luzh
 * create 2018.1.30
 */
var ClubBFConfigCVO = /** @class */ (function () {
    function ClubBFConfigCVO() {
    }
    ClubBFConfigCVO.isInDoorArea = function (isDef) {
        if (isDef === void 0) { isDef = false; }
        var pos = isDef ? this.defDoorPos : this.atkDoorPos;
        var radiu = isDef ? this.defDoorRadiu : this.atkDoorRadiu;
        var selfPos = new egret.Point(Manager.model.self.x, Manager.model.self.y);
        var dis = egret.Point.distance(pos, selfPos);
        return egret.Point.distance(pos, selfPos) < radiu;
    };
    ClubBFConfigCVO.doorNearPos = function (isDef) {
        if (isDef === void 0) { isDef = false; }
        var pos = isDef ? this.defDoorPos : this.atkDoorPos;
        var radiu = isDef ? this.defDoorRadiu : this.atkDoorRadiu;
        var v = new Vector2D(Math.random() * radiu * 0.8, 0);
        v.angle = Math.PI * 2 * Math.random();
        return new egret.Point(pos.x + v.x, pos.y + v.y);
    };
    /*解析表*/
    ClubBFConfigCVO.parseCVOs = function (bytes) {
        var tabCount = bytes.readByte();
        ClubBFRankRewardsCVO.parse(bytes);
        ClubBFScoreRewardsCVO.parse(bytes);
        ClubBFConfigCVO.parseOthers(bytes);
        ClubBFConfigCVO.parsePos(bytes);
        ClubBFConfigCVO.parseCost(bytes);
    };
    ClubBFConfigCVO.parseOthers = function (bytes) {
        var rowCount = bytes.readShort();
        for (var j = 0; j < rowCount; j++) {
            var id = bytes.readByte();
            var value = bytes.readUTF();
            if (id == 15)
                this.startTimeStr = value;
        }
    };
    /*解析表*/
    ClubBFConfigCVO.parsePos = function (bytes) {
        var rowCount = bytes.readShort();
        for (var j = 0; j < rowCount; j++) {
            var id = bytes.readByte();
            var x = bytes.readInt();
            var y = bytes.readInt();
            var radiu = bytes.readInt();
            if (id == 3) {
                this.atkDoorPos = new egret.Point(x, y);
                this.atkDoorRadiu = radiu;
            }
            else if (id == 4) {
                this.defDoorPos = new egret.Point(x, y);
                this.defDoorRadiu = radiu;
            }
        }
    };
    /*解析表*/
    ClubBFConfigCVO.parseCost = function (bytes) {
        var rowCount = bytes.readShort();
        for (var j = 0; j < rowCount; j++) {
            var id = bytes.readByte();
            var vo = new GainLossVO(bytes.readUTF());
            if (id == 1)
                this.clear_cd_cost = vo;
            else if (id == 2)
                this.club_buff_cost = vo;
        }
    };
    Object.defineProperty(ClubBFConfigCVO, "nextStartTime", {
        get: function () {
            var arr = this.startTimeStr.split("&");
            var openDays = parseInt(arr[0]);
            var seconds = parseInt(arr[2]);
            var curDate = new Date(Manager.model.getLogin().serverTimeInfo.serverTime);
            var svrOpenDate = new Date(Manager.model.getLogin().serverTimeInfo.svrOpenTime * 1000);
            var startDate = new Date(svrOpenDate.getFullYear(), svrOpenDate.getMonth(), svrOpenDate.getDate() + 1, 0, 0, seconds); //开服第2天20：30
            if (startDate.getTime() > curDate.getTime())
                return startDate;
            var weekDays = ArrayUtil.parseStringToArray(arr[1], "|");
            startDate = new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate(), 0, 0, seconds);
            var curWeekDay = curDate.getDay();
            for (var i = 0; i < weekDays.length; i++) {
                if (curWeekDay < weekDays[i]) {
                    startDate.setDate(startDate.getDate() + weekDays[i] - curWeekDay);
                    return startDate;
                }
                else if (curWeekDay == weekDays[i] && startDate.getTime() > curDate.getTime())
                    return startDate;
            }
            startDate.setDate(startDate.getDate() + weekDays[0] + 7 - curWeekDay);
            return startDate;
        },
        enumerable: true,
        configurable: true
    });
    return ClubBFConfigCVO;
}());
//# sourceMappingURL=ClubBFConfigCVO.js.map