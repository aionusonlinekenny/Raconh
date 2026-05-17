/**
 * 17.11.20
 * pzx
 * 属性拆分
 */
class AttrVO implements cw.IPool
{
   private _attrs:Object;
   /** 移动*/
   public static SPEED:number = 10;
   /**生命上限 */
   public static HP_MAX:number = 11;
   /** 生命*/
   public static HP:number = 12;
   /**攻击 */
   public static DMG:number = 13;
   /**防御 */
   public static DEFENCE:number = 14;
   /**破甲 */
   public static ARMOR:number = 15;
   /**命中 */
   public static HITRATE:number = 16;
   /**闪避 */
   public static EVASION:number = 17;
   /**暴击 */
   public static CRITRATE:number = 18;
   /**坚韧 */
   public static TENACITY:number = 19; 
   /**生命恢复 */
   public static RECOVER:number = 20; 
   /**经验加成 */
   public static EXP_PER:number = 21;
   /**伤害加深 */
   public static DMG_ENHANCE:number = 22;
   /**伤害减免 */
   public static DMG_REDUCE:number = 23;
   /**暴击加成 */
   public static CRITRATE_PER:number = 24;
   /**暴击减少 */
   public static ANTI_CRITRATE_PER:number = 25;
   /**暴伤加成 */
   public static CRITDMG_PER:number = 26;
   /**暴伤减免 */
   public static ANTI_CRITDMG_PER:number = 27;
   /**命中几率 */
   public static HITRATE_PER:number = 28;
   /**闪避几率 */
   public static EVASION_PER:number = 29;
   /**攻击加成 */
   public static DMG_PER:number = 30;
   /**防御加成 */
   public static DEFENCE_PER:number = 31;
   /**破甲加成 */
   public static ARMOR_PER:number = 32;
   /**生命加成 */
   public static HP_MAX_PER:number = 33;

    public constructor()
	{
        
    }

    public getinfo(id:number):AttrVoInfo
    {
        return this._attrs[id];
    }
    /**获得列表 */
    public get attrInfos():Array<AttrVoInfo>
    {
        let result = new Array<AttrVoInfo>();
        for(let key in this._attrs)
        {
            result.push(this._attrs[key]);
        }
        if(result.length > 1) result.sort((a:AttrVoInfo, b:AttrVoInfo) => { return (a.id > b.id ? 1 : -1);});
        return result;
    }
    public getNum(id:number):number
    {
        let i:number = 0;
        if(this._attrs==null) return i;
        let vo:AttrVoInfo = this._attrs[id];
        if(vo)
        {
            i = vo.num;
        }
        return i;
    }
    public getName(id:number):string
    {
        let str:string = "";
        if(this._attrs==null) return str;
        let vo:AttrVoInfo = this._attrs[id];
        if(vo)
        {
            str = vo.name;
        }
        return str;
    }
    /**获得战斗力 */
    public getFighting():number
    {
        let figList:Dictionary<number,number> = AttributeFightingCVO.getData();
        let self:SelfGameObjectInfo = Manager.model.self;
        let fightnum:number = 0;
        for(var obj in this._attrs)
        {
            let vo:AttrVoInfo = this._attrs[obj];
            if(vo.id >= 30)
            {
                //加成战斗力加成转换
                let v:number = 0;
                switch(vo.id)
                {
                    case 30:
                    case 38:
                        v = 11;
                        break;
                    case 31:
                    case 39:
                        v= 13;
                        break;
                    case 32:
                    case 40:
                        v = 14;
                        break;
                    case 33:
                    case 41:
                        v = 15;
                        break;
                    case 34:
                    case 42:
                        v = 16;
                        break;
                    case 35:
                    case 43:
                        v = 17;
                        break;
                    case 36:
                    case 44:
                        v = 18;
                        break;
                    case 37:
                    case 45:
                        v = 19;
                        break;
                }
                if(vo.id >=30 && vo.id <=37)
                {
                    fightnum += Math.floor(self.attrInfo.getValue(v) * figList.get(v) * vo.num/1000);
                }
                else if(vo.id >=38 && vo.id <=45)
                {
                    let level:number = Math.floor(self.attrInfo.level / 5);
                    fightnum += Math.floor(level * figList.get(v) * vo.num/1000);
                }
            }
            else
            {
                fightnum += vo.num * figList.get(vo.id);
            }
        }
        return Math.floor(fightnum);
    }
     /**
     * 
     * @param content 数据对象 ： 属性标识id，数量|属性标识id，数量
     *   
     * 属性标识id对应   attr_desc_data 表
     */
    public reuse(content:string):void
    {
        if(content && content != "")
        {
            this._attrs = {};
            let arr:Array<string> = content.split("|");
            for(let i:number=0;i<arr.length;i++)
            {
                let list:Array<string> = arr[i].split(",");
                if(list.length>1)
                {
                    let cvo:AttrCVO = AttrCVO.getInfo(Number(list[0]));
                    let vo:AttrVoInfo = new AttrVoInfo();
                    vo.name = cvo.name;
                    vo.shortName = cvo.shortName;
                    vo.type = cvo.type;
                    vo.id = cvo.id;
                    vo.format =cvo.format;
                    vo.showStar = cvo.showStar;
                    vo.num = Number(list[1]);
                    this._attrs[vo.id] = vo;
                }
            }
           
        }
    }

    public unuse():void
    {
        for(let key in this._attrs)
        {
            delete this._attrs[key];
        }
        this._attrs= null;
    }

    public dispose():void
    {
        this.unuse();
    }
}