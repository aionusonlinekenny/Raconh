/**
 * 装扮model
 * liangyan
 * create 2017-11-28
*/
class DressModel extends egret.EventDispatcher
{
    public constructor()
	{
		super();
        this.titleModel = new TitleModel();
		this.fashionModel = new FashionModel();
	}

	public titleModel:TitleModel;
	public fashionModel:FashionModel;

	/**检测可操作（称号、时装） */
    public checkCanOperate():boolean
    {
        let bol = this.titleModel.hasCanActive;
        if(bol) return true;
        else bol = this.fashionModel.hasCanActive;
        if(bol) return true;
        else return false;
    }
}