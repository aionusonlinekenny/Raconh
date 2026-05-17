class DateUtil {

    /**
	 * 获得　服务器当天　23时59分59秒的时间戳，
	 * 注(延迟１秒，防止服务器有跨天数据刷新）
	*/
	public static getToDayTime():number
    {
        let second:number = Math.round(Manager.model.getLogin().serverTimeInfo.serverTime / 1000);
		let nowDate = cw.DateUtil.getDateBySecs(second);
		let updateData:Date = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(),23,59,59);//取当天0时
		return Math.round(updateData.getTime()/1000)+2;
    }
}