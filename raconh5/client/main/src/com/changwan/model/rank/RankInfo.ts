/**
 * 排行榜单个数据
 * luzhihong
 * create 2017-11-03
 */
class RankInfo
{
    /*排行榜类型*/
    public type:number;
    /*排名*/
    public rank:number;
    /*角色id*/
    public id:number;
    /*角色名*/
    public name:string;
    /*职业*/
    public career:number;
    /*头像*/
    public icon:number;
    /*转数*/
    // public zhuanshu:number;
    /*排行榜值*/
    public value:number;

    /*时装*/
    public fashion:number;
    /*武器*/
    public weapon:number;
    /*披风*/
    public cloak:number;
    /*宠物*/
    public pet:number;

	public constructor(type:number, pi:TCPPacketIn) 
	{
        //      array('name' => 'rankPos', 'type' => 'int16', 'desc' => '排名'),
        //     	array('name' => 'id', 'type' => 'int64', 'desc' => '角色id'),
        //     	array('name' => 'name', 'type' => 'string', 'desc' => '角色名'),
        //     	array('name' => 'career', 'type' => 'int8', 'desc' => '职业'),
        //     	array('name' => 'icon', 'type' => 'int8', 'desc' => '头像'),
        //     	array('name' => 'value1', 'type' => 'int32', 'desc' => '排行榜值 战力榜：战力  等级榜：等级  宠物榜：宠物战力'),
        //         array('name' => 'extra_info', 'type' => 'arr', 'record' => 'rank_extra_cli', 'desc' => '额外数据（长度0则没数据，否则有数据且长度是1，目前只有第一名有数据）', 'vars' => array(
        //             array('name' => 'fashion', 'type' => 'int16', 'desc' => '时装'),
        //             array('name' => 'weapon', 'type' => 'int16', 'desc' => '武器'),
        //             array('name' => 'cloak', 'type' => 'int16', 'desc' => '披风'),
                    // array('name' => 'pet_skin', 'type' => 'int16', 'desc' => '宠物皮肤id'),
        //         )),
        this.type = type;
        this.rank = pi.readShort();
        this.id = pi.readInt64();
        this.name = pi.readUTF();
        this.career = pi.readByte();
        this.icon = pi.readByte();
        // this.zhuanshu = pi.readByte();
        this.value = pi.readInt();

        let len:number = pi.readShort();
        if(len > 0)
        {
            this.fashion = pi.readShort();
            this.weapon = pi.readShort();
            this.cloak = pi.readShort();
            this.pet = pi.readShort();
        }
	}
	
}