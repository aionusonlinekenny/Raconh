/**
 * 称号model
 * liangyan
 * create 2017-11-28
*/
class TitleModel extends egret.EventDispatcher
{
    public constructor()
    {
        super();
        Manager.control.getDress().titleRequest();
    }

    public get hasCanActive():boolean
    {
        if(!OpenCVO.isOpen(OpenConst.ID_TITLE)) return false;
        let cvos = TitleCVO.getAll();
        for(let i = 0; i < cvos.length; i++)
        {
            if(cvos[i].loss.isEnough()) return true;
        }
        return false;
    }

    /**默认选中 */
    public defaultData:TitleCVO;
}