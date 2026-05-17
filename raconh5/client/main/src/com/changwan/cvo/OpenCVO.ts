/**
 * 功能开放表
 * liangyan
 * create 2017-12-25
*/
class OpenCVO
{
    private static _cvos:Object;

    public id:number;
    /**功能名字 */
    public name:string;
    /**触发类型
     * 1.等级
     * 2.任务完成
     * 3.客户端控制 
     * 4.转生激活
     * 5.神器激活
     */
    public triggerType:number;
    /**触发参数 */
    public triggerValue:number;
    /**功能开放表现 */
    public openEff:boolean;
    /**开启位置
     * 0.默认值
     * 1.底部区
     * 2.活动区
     * 3.地图区
     * 4.任务区
     * 5.其他
     */
    public position:number;
    /**开启前点击功能图标的文本提示 */
    public tips:string;

    private parseOne(data:egret.ByteArray):void
    {
        this.id = data.readShort();
        this.name = data.readUTF();
        this.triggerType = data.readByte();
        this.triggerValue = data.readShort();
        this.openEff = data.readByte() == 1;
        this.position = data.readByte();
        this.tips = data.readUTF();
    }

    public static parse(bytes:egret.ByteArray):void
    {
        OpenCVO._cvos = {};
        var tableCount:number = bytes.readByte();
        var baseCount:number = bytes.readShort();
        let cvo:OpenCVO;
        for (var i = 0; i < baseCount; i++)
        {
            cvo = new OpenCVO();
            cvo.parseOne(bytes);
            OpenCVO._cvos[cvo.id] = cvo;
        }
    }

    public static getCVO(id:number):OpenCVO
    {
        return OpenCVO._cvos[id];
    }

    /**
     * 功能是否开放
	 * @param id
	 * @param needTips 是否需要提示
	 */
	public static isOpen(id:number, needTips:boolean = false):boolean
	{
		let cvo:OpenCVO = OpenCVO._cvos[id];
		if(!cvo) return true;
		if(!cvo.isSatisfy)
		{
			if(needTips) FloatTips.addTips(cvo.tips, Color.RED);
			return false;
		}
		return true;
	}

    public get isSatisfy():boolean
    {
        let result = false;
        switch(this.triggerType)
        {
            case OpenConst.TRIGGER_LVL:
                let level = Manager.model.self.attrInfo.level;
                result = level >= this.triggerValue;
                break;
            case OpenConst.TRIGGER_TASK:
                result =Manager.model.getTask().getTaskIdComplete(this.triggerValue);
                break;
            case OpenConst.TRIGGER_CLIENT:
                break;
            case OpenConst.TRIGGER_REIN:
                let num = Manager.model.self.attrInfo.zhuanshu;
                result = num >= this.triggerValue;
                break;
            case OpenConst.TRIGGRE_RELICSTUFF:
                let cvo = RelicStuffCVO.cvo(this.triggerValue);
                result = cvo.isActivity();
                break;
        }
        return result;
    }
}