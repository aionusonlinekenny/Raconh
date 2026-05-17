/**
 * 界面人物模型
 * Simon 2017.11.30
 */
class RoleAnimation extends Sprite
{
	//衣服样式
	private _clothesID:number;
	//武器样式
	private _weaponID:number;
	//披风样式
	private _wingID:number;

    // private _pifeng:Animation;
    private _body:Animation;
    private _weapon:Animation;

    public constructor()
    {
        super();
    }

    protected start():void
    {
        if(this._wingID > 0)
        {
            // this._pifeng = Manager.animation.createPanelPifengAnimation(this._wingID+"");
            // if(!this._pifeng.parent) this.addChild(this._pifeng);
        }

        if(this._clothesID > 0)
        {
            this._body = Manager.animation.createPanelBodyAnimation(this._clothesID+"");
            if(!this._body.parent) this.addChild(this._body);
        }

        if(this._weaponID > 0)
        {
            this._weapon = Manager.animation.createPanelWeaponAnimation(this._weaponID+"");
            if(!this._weapon.parent) this.addChild(this._weapon);
        }
    }

    public reuse(clothes:number, weapon:number=0, wing:number=0):void
    {
        this._clothesID = clothes;
        this._weaponID = weapon;
        this._wingID = wing;

        super.reuse();
    }

    public unuse():void
    {
        super.unuse();
        // if(this._pifeng) Manager.pool.push(this._pifeng);
        // this._pifeng = null;

        if(this._body) Manager.pool.push(this._body);
        this._body = null;

        if(this._weapon) Manager.pool.push(this._weapon);
        this._weapon = null;
    }

    public dispose():void
    {
        super.dispose();

        // if(this._pifeng) Manager.pool.push(this._pifeng);
        // this._pifeng = null;

        if(this._body) Manager.pool.push(this._body);
        this._body = null;

        if(this._weapon) Manager.pool.push(this._weapon);
        this._weapon = null;
    }
}