class AttrDescTypeEx{
	public static getAttrName(value:number):string
    {
        let info:AttrCVO = AttrCVO.getInfo(value);
        if(info) return info.name;
        return "";
    }
}