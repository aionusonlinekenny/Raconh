var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 创角名称
 */
var CreateRoleCVO = (function () {
    function CreateRoleCVO() {
        this._lastNameList = [];
        this._maleNameList = [];
        this._femaleNameList = [];
    }
    CreateRoleCVO.prototype.parse = function (bytes) {
        var tableCount = bytes.readShort();
        for (var i = 0; i < tableCount; i++) {
            this._lastNameList.push(bytes.readUTF());
            this._maleNameList.push(bytes.readUTF());
            this._femaleNameList.push(bytes.readUTF());
        }
    };
    /**
     * type:0为女，1为男
     */
    CreateRoleCVO.prototype.getName = function (type) {
        var lastName = this._lastNameList[Math.floor(Math.random() * this._lastNameList.length)];
        var firstName = "";
        switch (type) {
            case 0:
                firstName = this._femaleNameList[Math.floor(Math.random() * this._femaleNameList.length)];
                break;
            case 1:
                firstName = this._maleNameList[Math.floor(Math.random() * this._maleNameList.length)];
                break;
        }
        return firstName + lastName;
    };
    return CreateRoleCVO;
}());
__reflect(CreateRoleCVO.prototype, "CreateRoleCVO");
//# sourceMappingURL=CreateRoleCVO.js.map