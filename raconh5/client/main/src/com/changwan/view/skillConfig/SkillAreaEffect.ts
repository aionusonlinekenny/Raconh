/**
 *author Anydo
 *create 2017-11-17
 *description 
*/
class SkillAreaEffect extends Sprite implements ISkillConfigEffect
{
    private _cons:SkillConfigSprite[];
    private _anis:Animation[];
    
    private _effectID:number;
    private _rotation:number;
    private _curLife:number;
    private _countCur:number;
    private _countTotal:number;
    private _infos:SkillAreaInfo[];
    
    private _isInFeet:boolean;
    public getIsInFeet():boolean{return this._isInFeet;}
    private _sortIndex:number;//图层排序
    public getSortIndex():number{return this._sortIndex;}

    public get url():string{ return Manager.path.getSkillPath("skill"+this._effectID).url; }

    /**
     * 区域技能特效
     * @param config type#特效id#层级index#地图层级0人物上层1人物下层#configStr
     * @param config type: 单线/扇形:1   圆形:2
     * @param config configStr: a,b,c,d,e,f,g|a,b,c,d,e,f,g..  (a特效距离中心点距离,b公转角度(360=360°),c出现时间(ms),d水平缩放,e垂直缩放,f自转角度(360=360°),g移动配置(延迟秒数&起始速度&加速度&相对起始点的X偏移&相对起始点的Y偏移))
     * @param rotation 对目标角度
     */		
    public reuse(config:string[],rotation:number=0):void
    {
        this._curLife = 0;
        this._countCur = 0;
        this._cons = [];
        this._anis = [];
        this.parseConfig(config, rotation);
        Manager.render.add(this.render, this);
        Manager.render.add(this.overtimeHandler, this, 4000, 1);
        super.reuse();
    }

    public unuse():void
	{
        super.unuse();
        Manager.render.remove(this.render, this);
        Manager.render.remove(this.overtimeHandler, this);
        Manager.render.remove(this.checkAllComplete, this);

        this._effectID = 0;
        this._rotation = 0;
        this._curLife = 0;
        this._countCur = 0;
        this._countTotal = 0;
        this._sortIndex = 0;
        this._isInFeet = false;
        for(let i:number = 0; i < this._anis.length; i++)
        {
            this._anis[i].removeEventListener(GlobalEvent.ANIMATION_LOAD_ERROR, this.playComplete, this);
            this._anis[i].removeEventListener(GlobalEvent.ANIMATION_PLAY_COMPLETE, this.playComplete, this);
            // Manager.pool.push(this._anis[i]);
            this._anis[i] = null;
        }
        this._anis = null;
        for(let j:number = 0; j < this._cons.length; j++)
        {
            Manager.pool.push(this._cons[j]);
            this._cons[j] = null;
        }
        this._cons = null;
        for(let k:number = 0; k < this._infos.length; k++)
        {
            Manager.pool.push(this._infos[k]);
            this._infos[k] = null;
        }
        this._infos = null;
	}
    
    private parseConfig(config:string[],rotation:number):void
    {
        this._infos = [];
        this._rotation = (config[0] == "2") ? 0 : GameUtil.getRotationDirectionByRotation(rotation);
        this._effectID = parseInt(config[1]);
        this._sortIndex = parseInt(config[2]);
        this._isInFeet = (config[3] == "1");
        var crr:string[] = config[4].split("|");
        for(let i:number = 0; i < crr.length; i++)
        {
            let info:SkillAreaInfo = Manager.pool.create(SkillAreaInfo, crr[i], this._rotation);
            this._infos.push(info);
        }
        this._countTotal = this._infos.length;
    }
    
    public render(interval:number):void
    {
        let that = this;
        let con:SkillConfigSprite;
        for(let i:number = 0; i < that._cons.length; i++)
        {
            con = that._cons[i];
            if(con.moveInfo == null) continue;
            if((con.x == con.moveInfo.targetX) && (con.y == con.moveInfo.targetY)) continue;
            var arr:number[] = con.moveInfo.getRunDiS(interval);
            var disX:number = arr[0];
            var disY:number = arr[1];
            var moveEnd:boolean;
            if(con.x != con.moveInfo.targetX)
            {
                moveEnd = false;
                con.x = con.moveInfo.startX + disX;
                if((con.moveInfo.startX < con.moveInfo.targetX) && (con.x > con.moveInfo.targetX)) moveEnd = true;
                else if((con.moveInfo.startX > con.moveInfo.targetX) && (con.x < con.moveInfo.targetX)) moveEnd = true;
                if(moveEnd) con.x = con.moveInfo.targetX;
            }
            if(con.y != con.moveInfo.targetY)
            {
                moveEnd = false;
                con.y = con.moveInfo.startY + disY;
                if((con.moveInfo.startY < con.moveInfo.targetY) && (con.y > con.moveInfo.targetY)) moveEnd = true;
                else if((con.moveInfo.startY > con.moveInfo.targetY) && (con.y < con.moveInfo.targetY)) moveEnd = true;
                if(moveEnd) con.y = con.moveInfo.targetY;
            }
        }
        
        that._curLife += interval;
        var one:SkillAreaInfo;
        for(let j:number = that._infos.length - 1; j >= 0; j--)
        {
            one = that._infos[j];
            if(one.showTime < that._curLife)
            {
                that.createOneEffect(one);
                Manager.pool.push(one);
                that._infos.splice(j, 1);
            }
        }
    }
    
    private createOneEffect(info:SkillAreaInfo):void
    {
        var con:SkillConfigSprite = Manager.pool.create(SkillConfigSprite, info.rotation, info.moveConfig);
        var ani:Animation = Manager.animation.createSkillAnimation(this._effectID);
        ani.addEventListener(GlobalEvent.ANIMATION_LOAD_ERROR, this.aniLoadFail, this);
        ani.addEventListener(GlobalEvent.ANIMATION_PLAY_COMPLETE, this.playComplete, this);
        con.addChild(ani);
		con.scaleX = info.scaleX;
		con.scaleY = info.scaleY;
        var ro:number = this._rotation + info.angleCom;
        var vd:Vector2D;
        vd = new Vector2D(1,0);
        vd.angle = ro * Math.PI / 180;
        vd.length = info.dis;
        con.x = vd.x;
        con.y = vd.y;
        con.rotation = info.angleSelf;
        this.addChild(con);
        this._anis.push(ani);
        this._cons.push(con);
        
        if(con.moveInfo != null) con.moveInfo.setStart(con.x,con.y);
    }
    
    private aniLoadFail(e:GlobalEvent):void
    {
        this._countCur ++;
        Manager.render.add(this.checkAllComplete, this, 100, 1, null, true);//加载失败时延迟执行checkAllComplete，避免对象池直接回收this，导致报错
    }
    
    private playComplete(e:GlobalEvent):void
    {
        this._countCur ++;
        this.checkAllComplete();
    }

    private checkAllComplete():void
    {
        if(this._countCur >= this._countTotal)
        {
            Manager.pool.push(this);
        }
    }

    private overtimeHandler(interval:number):void
    {
        Manager.pool.push(this);
    }
    
    protected disposeSelf():void
    {
        Manager.render.remove(this.render, this);
        Manager.render.remove(this.overtimeHandler, this);
        Manager.render.remove(this.checkAllComplete, this);
        
        super.disposeSelf();
        for(let i:number = 0; i < this._anis.length; i++)
        {
            this._anis[i].removeEventListener(GlobalEvent.ANIMATION_LOAD_ERROR, this.playComplete, this);
            this._anis[i].removeEventListener(GlobalEvent.ANIMATION_PLAY_COMPLETE, this.playComplete, this);
            Manager.pool.push(this._anis[i]);
            this._anis[i] = null;
        }
        this._anis = null;
        for(let j:number = 0; j < this._cons.length; j++)
        {
            Manager.pool.push(this._cons[j]);
            this._cons[j] = null;
        }
        this._cons = null;
        for(let k:number = 0; k < this._infos.length; k++)
        {
            Manager.pool.push(this._infos[k]);
            this._infos[k] = null;
        }
        this._infos = null;
    }
}