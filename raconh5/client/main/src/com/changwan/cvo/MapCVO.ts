/**
 * 地图模板表
 */
class MapCVO
{
    private static _cvos:Object;
    private static _configs:Object;

    public static CONFIG_REVIVE_COST:string = "relive_cost";
    public static CONFIG_RANDOM_HOOK_POS:string = "random_hook_pos";
    public static CONFIG_DAILY_ICON:string = "daily_icon";

    //地图id
    public id:number;
    //地图名
    public name:string;
    //地图类型 对应MapConst.ts
    public type:number;
    //地图资源ID
    public res:number;
    //背景音乐
    public music:number;
    //进入场景特效id
    public introID:number;
    //复活类型
    public reliveType:number;
    //复活时间(秒)
    public reliveTime:number;
    //界面隐藏
    public hideViews:string;
    //温馨提示
    public warmTips:number;
    //经验效率
    public expPerHour:number;
    //金币效率
    public silverPerhour:number;
    //是否可移动
    public canClick:boolean;
    //显示其它玩家数量
    public showPlayerNum:number;
    //目标优先级
    public firstTarget:number;
    //开放章节
    public chapter:number;
    //地图长宽
    public width:number;
    public height:number;
    //最大行数
    public maxRow:number;
    //最大列数
    public maxCol:number;

    public parseOne(data:egret.ByteArray):void
    {
        this.id = data.readShort();
        this.name = data.readUTF();
        this.type = data.readByte();
        this.res = data.readInt();
        this.music = data.readInt();
        this.introID = data.readInt();
        this.reliveType = data.readByte();
        this.reliveTime = data.readShort();
        this.hideViews = data.readUTF();
        this.warmTips = data.readInt();
        this.expPerHour = data.readInt();
        this.silverPerhour = data.readInt();
        this.canClick = data.readBoolean();
        this.showPlayerNum = data.readByte();
        this.firstTarget = data.readByte();
        this.chapter = data.readShort();
        this.width = data.readInt();
        this.height = data.readInt();
        this.maxRow = Math.ceil(this.height / Manager.config.scale9H);
        this.maxCol = Math.ceil(this.width / Manager.config.scale9W);
    }

    public get hasIntro():boolean{ return (this.introID > 0); }
    public get isMainMap():boolean{ return (this.type == MapConst.TYPE_MAIN); }
    public get isFieldMap():boolean{ return (this.type == MapConst.TYPE_FIELD); }
    
    public static parse(bytes:egret.ByteArray):void
    {
        MapCVO._cvos = {};
        let tabCount:number = bytes.readByte();
        //地图场景
        let rowCount:number = bytes.readShort();
        for (let i:number = 0; i < rowCount; i++)
        {
            let item:MapCVO = new MapCVO();
            item.parseOne(bytes);
            MapCVO._cvos[item.id] = item;
        }
        //跳跃点
        rowCount = bytes.readShort();
        for (let j:number = 0; j < rowCount; j++)
        {
            let jump:JumpPointCVO = new JumpPointCVO();
            jump.parseOne(bytes);
            JumpPointCVO.idDic[jump.id] = jump;
            if(JumpPointCVO.mapDic[jump.mapResID] == null) JumpPointCVO.mapDic[jump.mapResID] = [];
            JumpPointCVO.mapDic[jump.mapResID].push(jump);
        }
        //复活
        this._configs = {};
        rowCount = bytes.readShort();
        for (let k = 0; k < rowCount; k++)
        {
            let type = bytes.readUTF();
            let value = bytes.readUTF();
            this._configs[type] = value;
        }
    }

    public static getCVO(id):MapCVO
    {
        if(!MapCVO._cvos) return null;
        return MapCVO._cvos[id];
    }

    public static getCVOsByType(type):Array<MapCVO>
    {
        let cvos:Array<MapCVO> = [];
        let cvo:MapCVO;
        for(let key in MapCVO._cvos)
        {
            cvo = MapCVO._cvos[key] as MapCVO;
            if(cvo.type == type) cvos.push(cvo);
        }
        return cvos;
    }

    public static getConfigData(type:string):string
    {
        return this._configs[type];
    }
}