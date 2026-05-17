// 邮件事件
class MailEvent extends BaseEvent
{
    /**
	 * 更新邮件列表 
	 */		
	public static UPDATE_LIST:string = "UPDATE_LIST";
	/**
	 * 推送新邮件
	 */
	public static MAIL_RECEIVE:string = "MAIL_RECEIVE";
	/**
	 * 删除邮件
	 */
	public static MAIL_DELETE:string = "MAIL_DELETE";
    /**
	 * 邮件已读
	 */
	public static HAS_READ_MAIL:string = "HAS_READ_MAIL";
	/**
	 * 领取指定邮件中的附件
	 */
	public static FETCH_ATTACH:string = "FETCH_ATTACH";
	/**
	 * 隐藏/显示邮件提醒标志
	 */
	public static HIDE_SHOW_NOTICE:string = "HIDE_SHOW_NOTICE";
	/**
	 * 一键领取邮件
	 */
	public static MAIL_ALL_FETCH:string = "MAIL_ALL_FETCH";
}