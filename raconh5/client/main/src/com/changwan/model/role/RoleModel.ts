class RoleModel
{
    public constructor()
    {}
    /**检测一键装备 */
    public checkOneKeyWear():boolean
    {
        let bol:boolean = false;
		if(OpenCVO.isOpen(OpenConst.ID_ONE_KEY_EQUIP))
		{
			bol = Manager.model.getItems().oneKeyUpgradeEquipList.length >= 2;
		}
		return bol;
    }
    /**检测可操作（一键装备、神兵、背饰） */
    public checkCanOperate():boolean
    {
        let bol = this.checkOneKeyWear();
        if(bol) return true;
        else bol = Manager.model.getSoldier().checkCanUpgrade();
        if(bol) return true;
        else bol = Manager.model.getCloak().checkActiveCloak();
        if(bol) return true;
        else return false;
    }
}