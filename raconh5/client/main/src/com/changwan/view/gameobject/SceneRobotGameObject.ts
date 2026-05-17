/**
 *author Anydo
 *create 2018-1-19
 *description 
*/
class SceneRobotGameObject extends GameObject
{
	private _txtName:egret.TextField;
	private _shadowMonster:BitmapRes;//怪物阴影
    private _sceneRobotInfo:SceneRobotGameObjectInfo;
    private _elementPlayer:ElementPlayerAnimation;
    private _elementMonster:ElementMonsterAnimation;

    public constructor()
    {
        super();
    }

    public start():void
    {
        super.start();
        this._sceneRobotInfo.randomPlayerStyle();
        
        this._elementPlayer = Manager.pool.create(ElementPlayerAnimation, this);
        this._elementPlayer.sceneRobotFlag = 1;

        if(this._sceneRobotInfo.cvo.monsterId != 0)
        {
            this._elementMonster = Manager.pool.create(ElementMonsterAnimation, this);
            this._elementMonster.sceneRobotFlag = 2;

            this._shadowMonster = Manager.pool.create(BitmapRes,"common_shadow_png");
            this._shadowMonster.x = (-117 >> 1) + this._sceneRobotInfo.cvo.posxMon;
            this._shadowMonster.y = (- 39 >> 1) + this._sceneRobotInfo.cvo.posyMon;
            this.addChild(this._shadowMonster);
        }
    }

    public reuse(info:GameObjectInfo):void
	{
        this._sceneRobotInfo = info as SceneRobotGameObjectInfo;
        super.reuse(info);
    }

    public unuse():void
    {
        super.unuse();
        if(this._elementPlayer)
        {
            Manager.pool.push(this._elementPlayer);
            this._elementPlayer = null;
        }
        if(this._elementMonster)
        {
            Manager.pool.push(this._elementMonster);
            this._elementMonster = null;
        }
		if(this._txtName)
		{
			Manager.pool.push(this._txtName);
			this._txtName = null;
		}
		if(this._shadowMonster)
		{
			Manager.pool.push(this._shadowMonster);
			this._shadowMonster = null;
		}
        this._sceneRobotInfo.isInMapFlag = false;
        this._sceneRobotInfo = null;
    }

    protected drawAll():void
    {
        super.drawAll();
		this.drawName();
        this._elementPlayer.drawPlayerAnimation();
        if(this._elementMonster) this._elementMonster.drawMonster();
    }

    private drawName():void
	{
        if(this._txtName == null)
        {
            this._txtName = Manager.pool.create(egret.TextField);
            this._txtName.text = this._sceneRobotInfo.infoPlayer.attrInfo.nickName;
            this._txtName.width = this._txtName.textWidth;
            this._txtName.x = - this._txtName.width >> 1;
            this._txtName.y = -180;
        }
        if(this._txtName.parent == null) this.addChild(this._txtName);
	}

    protected disposeSelf():void
    {
        super.disposeSelf();
        if(this._elementPlayer)
        {
            Manager.pool.push(this._elementPlayer);
            this._elementPlayer = null;
        }
        if(this._elementMonster)
        {
            Manager.pool.push(this._elementMonster);
            this._elementMonster = null;
        }
		if(this._txtName != null)
		{
			Manager.pool.push(this._txtName);
			this._txtName = null;
		}
		if(this._shadowMonster)
		{
			Manager.pool.push(this._shadowMonster);
			this._shadowMonster = null;
		}
        this._sceneRobotInfo.isInMapFlag = false;
        this._sceneRobotInfo = null;
    }
}