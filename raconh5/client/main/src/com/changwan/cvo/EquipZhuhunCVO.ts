class EquipZhuhunCVO
{
    public id:number;
    public equipPos:number;
    public level:number;
    public itemList:Array<GainLossVO>;
    public rate:number;
    public career:number;
    public zhuhunAttrList:Array<Array<number>>;
    public levelAttrList:Array<Array<number>>;

    private static _cvos = {};

    public static parse(bytes:egret.ByteArray):void
    {
        let tableCount:number = bytes.readByte();
        for(let i:number = 0 ; i<tableCount; i ++)
        {
            let cvoCount = bytes.readShort();
            if(i == 0)
            {
                for(let j:number=0; j<cvoCount; j++)
                {
                    let id:number = bytes.readShort();
                    let equipPos:number = bytes.readShort();
                    let level:number = bytes.readShort();
                    let item:string = bytes.readUTF();
                    let itemList:Array<GainLossVO> = [];
                    let arr:Array<string> = item.split("|");
                    
                    for(let k:number=0; k<arr.length; k++)
                    {
                        itemList.push( new GainLossVO(arr[k]) );
                    }
                    let rate:number = bytes.readShort();

                    for(let k:number=0; k<2; k++)
                    {
                        let info:EquipZhuhunCVO = new EquipZhuhunCVO();
                        info.id = id;
                        info.equipPos = equipPos;
                        info.level = level;
                        info.itemList = itemList;
                        info.rate = rate;
                        info.career = k + 1;
                        info.zhuhunAttrList = [];
                        info.levelAttrList = [];
                        this._cvos[info.career + "_" + info.equipPos + "_" + info.level] = info;
                    }
                }
            }
            else if(i == 1)
            {
                for(let j:number=0; j<cvoCount; j++)
                {
                    let id:number = bytes.readShort();
                    let career:number = bytes.readByte();
                    let equipPos:number = bytes.readShort();
                    let level:number = bytes.readShort();
                    let arr:string = bytes.readUTF();
                    let info:EquipZhuhunCVO = this._cvos[career + "_" + equipPos + "_" + level];
                    if(info)
                    {
                        if(arr.length != 0)
                        {
                            let arr1:Array<string> = arr.split("|");
                            for(let k=0; k<arr1.length; k++)
                            {
                                let arr2:Array<string> = arr1[k].split(",");
                                let list:Array<number> = [];
                                list.push(Number(arr2[0]));
                                list.push(Number(arr2[1]));
                                info.zhuhunAttrList.push(list);
                            }
                        }
                    }
                }
            }
            else if(i == 2)
            {
                for(let j:number=0; j<cvoCount; j++)
                {
                    let id:number = bytes.readShort();
                    let career:number = bytes.readByte();
                    let level:number = bytes.readShort();
                    let arr:string = bytes.readUTF();
                    for(let l:number=0; l<8; l++)
                    {
                        let info:EquipZhuhunCVO = this._cvos[career + "_" + (l + 1) + "_" + level];
                        if(info)
                        {
                            if(arr.length != 0)
                            {
                                let arr1:Array<string> = arr.split("|");
                                for(let k=0; k<arr1.length; k++)
                                {
                                    let arr2:Array<string> = arr1[k].split(",");
                                    let list:Array<number> = [];
                                    list.push(Number(arr2[0]));
                                    list.push(Number(arr2[1]));
                                    info.levelAttrList.push(list);
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    public static getInfo(career:number, equipPos:number, curLevel:number):EquipZhuhunCVO
    {
        if(!curLevel) curLevel = 0;
        return this._cvos[career + "_" + equipPos + "_" + curLevel];
    }
}