/**
 *author Anydo
 *create 2017-11-24
 *description 
*/
class BuffCVO
{
    /** 组ID */
    public groupID:number;
    /** 名称 */
    public name:string;
    /** 等级 */
    public level:number;
    /** buff状态类型 BuffStatusType.ts */
    public statusType:number;
    /** 变色 ColorFilterType.ts */
    public color:number;
    /** 变色优先级，越大越优先 */
    public colorPriority:number;
    /** 动画资源ID */
	public aniId:number;
    /** 特效替换优先级。数字大的会替换小的，大小相同时新的会替换旧的 */		
    public aniPriority:number;
    /** 播放位置 1脚底 2头顶 3中部 */		
    public placeFlag:number;
    /**属性 */
    private _attrStr:string;
    private _attrVo:AttrVO
    public get attrVo():AttrVO
    {
        if(this._attrVo == null) this._attrVo = Manager.pool.create(AttrVO, this._attrStr);
        return this._attrVo;
    }
    /** 表现脚本 */		
    public cvoscript:string;

    public parseOne(data:egret.ByteArray)
    {
        this.groupID = data.readShort();
        this.name = data.readUTF();
        this.level = data.readByte();
        this.statusType = data.readByte();
        this.color = data.readByte();
        this.colorPriority = data.readByte();
        this.aniId = data.readShort();
        this.aniPriority = data.readByte();
        this.placeFlag = data.readByte();
        this._attrStr = data.readUTF();
        // this.attrVo = Manager.pool.create(AttrVO, data.readUTF());
        this.cvoscript = data.readUTF();
    }

    public static BUFF_CHANGE_STYLE:number = 1;//buff变身
    
    private _scriptDone:boolean;
    private analyzeScript():void
    {
        if(this._scriptDone) return;
        this._scriptDone = true;
        let script:ScriptBaseCVO = new ScriptBaseCVO(this.cvoscript);
        this._changeStyleId = script.getTypeValue(BuffCVO.BUFF_CHANGE_STYLE);
    }
    
    private _changeStyleId:number;
    public get changeStyleId():number
    {
        if(!this._scriptDone) this.analyzeScript();
        return this._changeStyleId;
    }




    private static _cvos:Object;
    public static parse(bytes:egret.ByteArray):void
    {
        BuffCVO._cvos = {};
        var tableCount:number = bytes.readByte();
        var baseCount:number = bytes.readShort();
        let cvo:BuffCVO;
        for (var i = 0; i < baseCount; i++)
        {
            cvo = new BuffCVO();
            cvo.parseOne(bytes);
            if(!BuffCVO._cvos[cvo.groupID]) BuffCVO._cvos[cvo.groupID] = [];
            BuffCVO._cvos[cvo.groupID].push(cvo);
        }
    }
    
    public static getCVO(groupID:number, level:number):BuffCVO
    {
        let arr:BuffCVO[] = this._cvos[groupID];
        for (var i:number = 0; i < arr.length; i++)
        {
            if(arr[i].level == level) return arr[i];
        }
        return null;
    }
}