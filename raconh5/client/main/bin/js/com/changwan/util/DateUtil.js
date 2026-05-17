var DateUtil = /** @class */ (function () {
    function DateUtil() {
    }
    /**
     * 获得　服务器当天　23时59分59秒的时间戳，
     * 注(延迟１秒，防止服务器有跨天数据刷新）
    */
    DateUtil.getToDayTime = function () {
        var second = Math.round(Manager.model.getLogin().serverTimeInfo.serverTime / 1000);
        var nowDate = cw.DateUtil.getDateBySecs(second);
        var updateData = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), 23, 59, 59); //取当天0时
        return Math.round(updateData.getTime() / 1000) + 2;
    };
    return DateUtil;
}());
//# sourceMappingURL=DateUtil.js.map