/**
 * 物品表
 */
class ItemsCVO
{
    public id:number;
    /**物品名称*/
    public name:string;
    /**图片Id*/
    public imgId:number;
    /**描述*/
    public desc:string;
    /**品色(绿色：2 蓝色：3 紫色：4 橙色：5 红色：6*/
    public quality:number;
    public get color():number
    {
        switch(this.quality)
        {
            case 2: return Color.GREEN;
            case 3: return Color.BLUE;
            case 4: return Color.PURPLE;
            case 5: return Color.ORANGE;
            case 6: return Color.RED;
        }
        return Color.DEF;
    }

    public get colorStr():string
    {
         switch(this.quality)
        {
            case 2: return Color.GREEN_STR;
            case 3: return Color.BLUE_STR;
            case 4: return Color.PURPLE_STR;
            case 5: return Color.ORANGE_STR;
            case 6: return Color.RED_STR;
        }
        return Color.DEF_STR;
    }


    /**
     * 装备需要等级,包括转身。
     * 转身的返回大于1000的数
     * 不转身的返回少于1000的数
     * 1-999 1级为：000,10级为001,100级为010
     * 
     * 1转为1010,2转为1020
    */
    public  get needLevel():number
    {
        let  reilevLeve:number = Number(String(this.id).substr(2,1)); 
        if(reilevLeve == 0)
        {
            let leve:number = Number(String(this.id).substr(3,2));
            if(leve == 0) 
            {
                return 1;
            }
            else
            {
                return Number(String(this.id).substr(3,2)) * 10;
            }
        }
        else
        {
            return Number(String(this.id).substr(2,3)) * 10;
        }
    }
    /*** 所须要的转身或等级 */
    public get needLevelStr():string
    {
        let str:string;
        let leve:number = this.needLevel;
        if(leve<1000)
        {
            str = leve + LangCVO.getContent("common15");
        }
        else
        {
            str = Math.floor((leve-1000)/10)+ LangCVO.getContent("common14");
        }
        return str;
    }
    /**需要职业*/
    public needCarrer:number;
    //转生条件
    public transfer:string;
    //叠加数量
    public superposition:number;
    /**产出途径*/
    public desc_output:string;
    /**对应系统开放的id*/
    public openID:number;
    /**弹窗提示*/
    public prompt:string;
    /**是否重要物品*/
    public isImportant:boolean;
    /**商城Id*/
    public shopId:number;
    /**类型*/
    public type:number;
    /**群组 0:通用道具 1:人物装备 （对应ItemsConst.GROUP_xxx）*/
    public group:number
    /**可否熔炼 0否  可熔炼的话直接填熔炼值*/
    public smelt:GainLossVO;
    /**属性*/
    public attr:string;
    /**穿戴属性*/
    public attrList:Array<Array<number>>;
    /**装备部位*/
    public pos:number;
    /**限制条件*/
    public condition:string
    /**可否可直接使用 1是 0否  打开界面直接填界面ID*/
    public openView:number;
/**
 * 可否挂售
0否
可挂市场则直接填推荐价格（元宝） */
    public market:number;




    private static _data = {};

    public static parse(bytes:egret.ByteArray):void
    {
        let pageCount:number = bytes.readByte();
        let tableCount:number = bytes.readShort();
        var info:ItemsCVO;
        var attrList:Array<Array<number>>;
        for(let i:number = 0; i < tableCount; i++)
        {
            info = new ItemsCVO();
            info.id =(bytes.readUnsignedInt() << 32) | bytes.readUnsignedInt();
            info.imgId = (bytes.readUnsignedInt() << 32) | bytes.readUnsignedInt();
            info.name = bytes.readUTF();
            info.group = bytes.readByte();
            info.type = bytes.readByte();
            info.quality = bytes.readByte();
            info.openView = bytes.readShort();
            let smelt:string = bytes.readUTF();
            if(smelt != "0")
                info.smelt = new GainLossVO(smelt);
            //info.needLevel = bytes.readInt();
            info.condition = bytes.readUTF();
            info.needCarrer = Number(String(info.id).substr(1,1));
            info.attr = bytes.readUTF();
            attrList = [];
            if(info.attr)
            {
                let arr1:Array<string> = info.attr.split("|");
                for(let j:number=0; j<arr1.length; j++)
                {
                    let arr2:Array<string> = arr1[j].split(",");
                    attrList.push([Number(arr2[0]), Number(arr2[1])]);
                }
            }

            info.attrList = attrList;
            info.desc = bytes.readUTF();
            info.desc_output = bytes.readUTF();
            // info.prompt = bytes.readUTF();
            let promptStr:string = bytes.readUTF();
            let index:number = promptStr.indexOf("|");
            if(index != -1)
            {
                info.openID = parseInt(promptStr.slice(0, index));
                info.prompt = promptStr.slice(index + 1);
            }
            else 
            {
                info.openID = 0
                info.prompt = "";
            }


            info.pos = Number(String(info.id).substr(6,2));
            info.market = bytes.readShort();
            this._data[info.id] = info;
        }
    }

    public static getCvo(id:number):ItemsCVO
    {
        return this._data[id];
    }
    public static cvos():any
    {
        return this._data;
    }
}