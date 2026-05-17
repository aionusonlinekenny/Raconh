/**
 * 装备强化表
 * Simon
 */
class EquipStrengthenCVO
{
    public id:number;
    /**
     * 部位
     */
    public equipPos:number;
    /**
     * 等级
     */
    public level:number;

    public itemGainLossInfo:GainLossVO;
    /**
     * 强化物品ID
     */
    public itemId:number;
    /**
     * 是否绑定
     */
    public isBind:boolean;
    /**
     * 强化物数量
     */
    public amount:number;
    /**
     * 属性
     */
    public attr:Array<Array<number>>;

    private static _bytes:egret.ByteArray;
    private static _cvos = {};
    private static _tableCount:number;
    private static _count:number = 0;
    private static _step:number = 0;

    public static parse(bytes:egret.ByteArray):void
    {
        this._bytes = new egret.ByteArray();
        this._bytes.writeBytes(bytes);
        this._bytes.position = 0;
        Manager.render.add(EquipStrengthenCVO.render,EquipStrengthenCVO);
        this._tableCount = this._bytes.readByte();
        this._count = this._bytes.readShort();
    }

    private static render(interval:number):void
    {
        if(this._step == 0)
        {
            let i:number = this._count;
            this._count = this._count - 200 < 0 ? 0 : this._count - 200;

            let info:EquipStrengthenCVO;
            let attr:string;
            let arr1:Array<string>;
            let arr2:Array<string>;
            let list:Array<number>;
            let attrList:Array<Array<number>>;
            while(i > this._count)
            {
                info = new EquipStrengthenCVO();
                info.id = this._bytes.readShort();
                info.equipPos = this._bytes.readShort();
                info.level = this._bytes.readShort();
                info.itemGainLossInfo = new GainLossVO(this._bytes.readUTF());
                if(info.itemGainLossInfo)
                {
                    info.itemId = info.itemGainLossInfo.baseId;
                    info.isBind = info.itemGainLossInfo.bind;
                    info.amount = info.itemGainLossInfo.num;
                }

                attr = this._bytes.readUTF();
                attrList = [];
                if(attr.length != 0)
                {
                    arr1 = attr.split("|");
                    for(let k=0; k<arr1.length; k++)
                    {
                        arr2 = arr1[k].split(",");
                        list = [];
                        list.push(Number(arr2[0]));
                        list.push(Number(arr2[1]));
                        attrList.push(list);
                    }
                }
                info.attr = attrList;

                this._cvos[info.equipPos + "_" + info.level] = info;

                i -= 1;
            }

            if(this._count == 0)
            {
                Manager.render.remove(this.render,this);
                Manager.cvo.complete();
                this._bytes.clear();
                this._bytes = null;
            }
        }
    }
    
    public static getInfo(equipPos:number, curLevel:number):EquipStrengthenCVO
    {
        if(!curLevel) curLevel = 0;
        return this._cvos[equipPos + "_" + curLevel];
    }

    /**满足所有进入消耗 */
    public isLossEnough(showTips:boolean = false, showItemTips:boolean = false):boolean
    {
        if(!this.itemGainLossInfo.isEnough(showTips, showItemTips))
            return false;
        else
            return true;
    }
}