/**
 * 装扮控制器
 * liangyan
 * create 2017-11-28
*/
class DressControl extends BaseControl
{
    public constructor()
    {
        super();
    }

    protected addCMD():void
    {
        Manager.socket.addCMD(Protocol.TITLE_REQUEST, TitleListCMD);
        Manager.socket.addCMD(Protocol.TITLE_WEAR, TitleWearCMD);
        Manager.socket.addCMD(Protocol.TITLE_TAKE_OFF, TitleTakeOffCMD);
        Manager.socket.addCMD(Protocol.TITLE_ACTIVE, TitleActiveCMD);
        Manager.socket.addCMD(Protocol.TITLE_GAIN, TitleGainCMD);
        Manager.socket.addCMD(Protocol.TITLE_DELETE, TitleDeleteCMD);

        Manager.socket.addCMD(Protocol.FASHION_INIT, FashionInitCMD);
        Manager.socket.addCMD(Protocol.FASHION_ACTIVE, FashionActiveCMD);
        Manager.socket.addCMD(Protocol.FASHION_WEAR, FashionWearCMD);
        Manager.socket.addCMD(Protocol.FASHION_UP, FashionUpCMD);
        Manager.socket.addCMD(Protocol.FASHION_TIMEOUT, FashionTimeoutCMD);
    }

    /**请求称号信息 */
    public titleRequest():void
    {
        let cmd = Manager.socket.getCMD(Protocol.TITLE_REQUEST) as TitleListCMD;
        cmd.send();
    }
    /**佩戴称号 */
    public wearTitle(id:number):void
    {
        let cmd = Manager.socket.getCMD(Protocol.TITLE_WEAR) as TitleWearCMD;
        cmd.id = id;
        cmd.send();
    }
    /**卸下称号 */
    public takeoffTitle(id:number):void
    {
        let cmd = Manager.socket.getCMD(Protocol.TITLE_TAKE_OFF) as TitleTakeOffCMD;
        cmd.id = id;
        cmd.send();
    }
    /**激活称号 
     * @param 物品类型
     * @param 物品id
     * */
    public actTitle(type:number, id:number):void
    {
        let cmd = Manager.socket.getCMD(Protocol.TITLE_ACTIVE) as TitleActiveCMD;
        cmd.type = type;
        cmd.id = id;
        cmd.send();
    }


    //服饰start------------------------------------------------------------------------------
    /**请求服饰初始化信息 */
    public fashionInit():void
    {
        let cmd = Manager.socket.getCMD(Protocol.FASHION_INIT) as FashionInitCMD;
        cmd.send();
    }
    /**
     * 服饰激活
     * @param id 服饰id
     **/
    public fashionActive(id:number):void
    {
        let cmd = Manager.socket.getCMD(Protocol.FASHION_ACTIVE) as FashionActiveCMD;
        cmd.id = id;
        cmd.send();
    }
    /**
     * 服饰穿戴与卸下
     * @param id 服饰id
     **/
    public fashionWear(id:number):void
    {
        let cmd = Manager.socket.getCMD(Protocol.FASHION_WEAR) as FashionWearCMD;
        cmd.id = id;
        cmd.send();
    }
    /**
     * 服饰升星或增加时效
     * @param id 服饰id
     **/
    public fashionUp(id:number):void
    {
        let cmd = Manager.socket.getCMD(Protocol.FASHION_UP) as FashionUpCMD;
        cmd.id = id;
        cmd.send();
    }
    //服饰end----------------------------------------
}