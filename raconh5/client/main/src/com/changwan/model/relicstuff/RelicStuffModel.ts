/**
 * 神器model
 * pzx
 * create 2018-3-9
*/
class RelicStuffModel extends egret.EventDispatcher
{
    public constructor()
    {
        super();
        this.addEvent();
    }

    private addEvent():void
    {

    }
    public query():void
    {
        this.dispatchEvent(new RelicStuffEvent(RelicStuffEvent.RELICSTUFF_QUERY_EVENT));
    }
    /**
     * type 激活类型 1-碎片 2-神器'),
     */
    public setActivity(type:number,id:number):void
    {
        if(type == RelicStuffType.DEBRIS_TYPE)
        RelicStuffDebrisCVO.setActivity(id);
        else if(type == RelicStuffType.RELICSTUFF_TYPE)
        RelicStuffCVO.setActivity(id);
        let any:any={type:type,id:id}
        this.dispatchEvent(new RelicStuffEvent(RelicStuffEvent.RELICSTUFF_ACTIVITY_EVENT,any));
    }
    /** 检测是否有可激活的 */
    public checkActivity():boolean
    {
        let arr:RelicStuffCVO[] = RelicStuffCVO.cvos();
        for(let cvo of arr)
        {
            if(cvo.checkIsActivity())
            {
                return true;
            }
        }
        let any:any = RelicStuffDebrisCVO.allcvos();
        for(let key in any)
        {
            let cvo1:RelicStuffDebrisCVO = any[key];
            if(cvo1.checkisActivity())
            {
                return true;
            }
        }
        return false;
    }

    public getRelicStuff():RelicStuffCVO
    {
        let recvo:RelicStuffCVO;
        let arr:RelicStuffCVO[] = RelicStuffCVO.cvos();
        let ln:number = arr.length;
        for(let i:number = 0;i<ln;i++)
        {
            recvo = arr[i];
            if(recvo.isActivity()) recvo = null;
            else break;
        }
        return recvo;
    }
    
}