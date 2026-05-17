/**
 *author Anydo
 *create 2017-11-2
 *description 
*/
class MonsterCVO extends BaseFindCVO
{
    // private _script:ScriptBaseCVO;
		
    public id:number;
    public name:string;
    public level:number;
    /** 级别：1普通怪 2精英怪 3BOSS怪 */		
    public grade:number;
    public gradeName:string;
    /** 对应MonsterType.as 0空怪 1普通 ..  对应MonsterType.as */		
    public type:number; 
    /**
     * 相同不可以攻击，不同可以攻击
     * 野外 0新手,1A阵营,2B阵营,3怪物,127AB阵营
     * 战场 1A阵营 2B阵营 3C阵营
     * 副本 0怪物 1友方怪 
     */		
    public camp:number;
    /**
     * 攻击与被攻击配置（按位运算）
     * 0不能被攻击  1只可以被怪攻击 2只可以被人攻击 4可以打怪 8可以打人按位规则
     */		
    public canAttackedFlag:number; 
    /** 攻击模式 1主动 2被动 */		
    public attackMode:number;
    /** 分段血量 */		
    public hpSection:number;
    public canDieRepel:boolean;
    public speed:number;
    public mapID:number;
    private _birthPosConfig:string;//出生点配置
    private _findPosConfig:string;//前端寻路点配置，如果没有配，则用_birthPosConfig寻路
    public get hasFindPos():boolean{ return (this._findPosConfig != ""); }
    private _postions:egret.Point[];//由_birthPosConfig或_findPosConfig解析
    public get positions():egret.Point[]{return this._postions;}
    public firstPosition:egret.Point;
    public lastPosition:egret.Point;
    public killedPriority:number;  //挂机优先级，值越小，优先级越高
    public showHalfWidth:number;//模型宽度
    private _url:number;//模型资源
    public get url():string{return "" + this._url;}
    private _height:number;//名称高度
    public get height():number{return this._height;}
    public offsetX:number;//资源偏差X
    public offsetY:number;//资源偏差Y
    
    public cvoscript:string; //怪物表现脚本
    
    private _loopFindPosIndex:number;
    public farToSelf:number;
    public isAllBroadCast:boolean; //是否全图广播 
    public showID:string; //界面显示的形象动画id
    
    public parseOne(bytes:egret.ByteArray)
    {
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
    }
    
    private setGradeName():void
    {
        if(this.grade == MonsterGrade.ELITE) this.gradeName = LangCVO.getContent("game4");
        else if(this.grade == MonsterGrade.BOSS) this.gradeName = LangCVO.getContent("game5");
        else this.gradeName = "";
    }
    
    private parsePosition():void
    {
        this._postions = []
        let arr:string[] = this.hasFindPos ? this._findPosConfig.split("|") : this._birthPosConfig.split("|");
        for(let i:number = 0; i < arr.length; i++) 
        {
            this._postions.push(PointUtil.getPoint(arr[i].split(",")))
        }
        this.firstPosition = this._postions[0];
        this.lastPosition = this._postions[this._postions.length - 1];
    }
    
    public getPostionBySeekMode():egret.Point
    {
        let index:number = Math.floor(this._postions.length * Math.random());
        return this._postions[index];
    }
    
    public resetLoopFindPosIndex():void
    {
        this._loopFindPosIndex = 0;
    }
    
    public getFindPosition():egret.Point
    {
        let p:egret.Point = this._postions[this._loopFindPosIndex];
        this._loopFindPosIndex++;
        if(this._loopFindPosIndex > this._postions.length - 1) this._loopFindPosIndex = 0;
        return p;
    }
    
    public get nameColor():string
    {
        return (this.attackMode == 1) ? "#ff0000" : "#ffffff";
    }
    
    public get nameHtml():string
    {
        return HtmlUtil.addColorTag(this.name, this.nameColor);
    }


    private static MONSTER_BORTH_DIRECTION:number = 1;//出生策划配置方向
    private static MONSTER_BORTH_ALPHA:number = 2;//渐显出生起始透明度
    private static MONSTER_BORTH_ALPHA_TIME:number = 3;//渐显出生时间(毫秒)
    private static MONSTER_FOOT:number = 4;//脚底光环
    private static MONSTER_DEAD_EFFECT:number = 5;//死亡特效
    private static MONSTER_OUT_HOOK_LIST:number = 6;//不列入挂机列表
    private static MONSTER_SINGLE_DIC:number = 7;//怪物形象不随方向改变，方向取右上资源
    private static MONSTER_SINGLE_ACTION:number = 8;//怪物形象只有一种动作，动作取站立资源
    private static MONSTER_DEAD_NO_HIDE:number = 9;//死亡形象不消失
    
    
    private _scriptDone:boolean;
    private analyzeScript():void
    {
        if(this._scriptDone) return;
        this._scriptDone = true;
        
        let script:ScriptBaseCVO = new ScriptBaseCVO(this.cvoscript);
        
        this._birthDirIndex = script.getTypeValue(MonsterCVO.MONSTER_BORTH_DIRECTION);
        this._birthAlpha = script.getTypeValue(MonsterCVO.MONSTER_BORTH_ALPHA);
        this._birthAlphaTime = script.getTypeValue(MonsterCVO.MONSTER_BORTH_ALPHA_TIME);
        this._hasFoot = script.getTypeHasValue(MonsterCVO.MONSTER_FOOT);
        this._deadEffect = script.getTypeValue(MonsterCVO.MONSTER_DEAD_EFFECT);
        this._outHookList = script.getTypeHasValue(MonsterCVO.MONSTER_OUT_HOOK_LIST);
        this._singleDic = script.getTypeHasValue(MonsterCVO.MONSTER_SINGLE_DIC);
        this._deadNoHide = script.getTypeHasValue(MonsterCVO.MONSTER_DEAD_NO_HIDE);
        this._singleAction = script.getTypeHasValue(MonsterCVO.MONSTER_SINGLE_ACTION);
    }
    
    
    private _birthDirIndex:number;
    public get birthDirIndex():number
    {
        if(!this._scriptDone) this.analyzeScript();
        return this._birthDirIndex;
    }
    private _birthAlpha:number;
    public get birthAlpha():number
    {
        if(!this._scriptDone) this.analyzeScript();
        return this._birthAlpha;
    }
    private _birthAlphaTime:number;
    public get birthAlphaTime():number
    {
        if(!this._scriptDone) this.analyzeScript();
        return this._birthAlphaTime;
    }
    private _hasFoot:boolean;
    public get hasFoot():boolean
    {
        if(!this._scriptDone) this.analyzeScript();
        return this._hasFoot;
    }
    private _deadEffect:number;
    public get deadEffect():number
    {
        if(!this._scriptDone) this.analyzeScript();
        return this._deadEffect;
    }
    private _outHookList:boolean;
    public get outHookList():boolean
    {
        if(!this._scriptDone) this.analyzeScript();
        return this._outHookList;
    }
    private _singleDic:boolean;
    public get singleDic():boolean
    {
        if(!this._singleDic) this.analyzeScript();
        return this._singleDic;
    }
    private _singleAction:boolean;
    public get singleAction():boolean
    {
        if(!this._singleAction) this.analyzeScript();
        return this._singleAction;
    }
    /**死亡不消失 */
    private _deadNoHide:boolean;
    public get deadNoHide():boolean
    {
        if(!this._deadNoHide) this.analyzeScript();
        return this._deadNoHide;
    }
/**
 * 取得boss类型 
 * 
 * 1 野外地图  ID 1001~1999
2 主线副本  ID 2001~2999
3 爬塔BOSS  ID 3001~3999
4.个人BOSS  ID 9001~9100
5.全民BOSS  ID 9101~9200
6.爬塔副本  ID 4001~4011

 */
    public  getBossTypeDesc():string
    {
        if(this.id>=3001 && this.id<= 3999)
        {
            return LangCVO.getContent("boss20")
        }
        else if(this.id>=9001 && this.id<= 9100)
        {
            return LangCVO.getContent("boss18")
        }
        else if(this.id>=9101 && this.id<= 9200)
        {
            return LangCVO.getContent("boss19")
        }
    }

    /**是否缥缈录火龙 */
    public isMaterialFireLong():boolean
    {
        return this.url == "9040";
    }
    
    private static _cvos:Object;
    public static parse(bytes:egret.ByteArray):void
    {
        MonsterCVO._cvos = {};
        var tableCount:number = bytes.readByte();
        for (var i = 0; i < tableCount; i++)
        {
            let cvo:MonsterCVO;
            var count:number = bytes.readShort();
            for (var j = 0; j < count; j++)
            {
                cvo = new MonsterCVO();
                cvo.parseOne(bytes);
                MonsterCVO._cvos[cvo.id] = cvo;
            }
        }
    }
    
    public static getCVO(id:number):MonsterCVO
    {
        return MonsterCVO._cvos[id] as MonsterCVO;
    }
    
    public static getCVOSAtMap(mapID:number):MonsterCVO[]
    {
        let result:MonsterCVO[] = [];
        let cvo:MonsterCVO;
        for (let key in MonsterCVO._cvos)
        {
            cvo = MonsterCVO._cvos[key];
            if(cvo.mapID == mapID) result.push(cvo);
        }
        return result;
    }
}