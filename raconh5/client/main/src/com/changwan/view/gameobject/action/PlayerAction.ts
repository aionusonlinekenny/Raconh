class PlayerAction extends Action
{
    protected _player:PlayerGameObjectInfo;

    //↓↓↓↓↓跳跃相关start↓↓↓↓↓
    protected _jumpTargets:egret.Point[];
    protected _jumpComplete:Function;
    protected _jumpStartPos:egret.Point;
    protected _jumpEndPos:egret.Point;
	private _jumpLotus:JumpLotus;
	private _jumpCurrTime:number;
	
	private H:number = 250;
	public static T:number = 55 / 60;
    //↑↑↑↑↑跳跃相关end↑↑↑↑↑
    
    public reuse(info:AliveGameObjectInfo):void
    {
        this._player = info as PlayerGameObjectInfo;
        super.reuse(info);
    }

    public unuse():void
    {
		super.unuse();
        if(this._jumpLotus)
        {
            Manager.pool.push(this._jumpLotus);
            this._jumpLotus = null;
        }
        this._player = null;
		this._jumpCurrTime = 0;
    }

    protected render(interval:number):boolean
    {
        // let interval:number = runTime - this._lastTickTime;
		this.renderWalk(interval);
		this.renderJump(interval);
		// this._lastTickTime = runTime;
		return false;
    }

    public updateSpeed():void
    {
        if(this._finishPos != null) this.initSpeed(this._finishPos);
    }

    public walk(path:egret.Point[], walkType:number, complete?:Function, completeTarget?:any):void
    {
        this.forceCancelJump();//解决其他玩家还没跳完就更新走路过来，导致跳跃状态没取消的bug
        super.walk(path, walkType, complete, completeTarget);
    }

    private forceCancelJump():void
    {
        if(this._walkType == WalkType.JUMP)
        {
            this.disposeJumpLotus();
            // egret.stopTick(this.render,this);
            Manager.render.remove(this.render,this);
            this._player.needCanYing = false;
            if(this._player.isSelfGO)
            {
                Manager.jump.finishJump();
            }
            else
            {
                this._player.finishJump();
            }
            if(this._jumpComplete != null) this._jumpComplete();
        }
    }

    /**
	 * 跳跃
	 */
    public jump(startPos:egret.Point, targets:egret.Point[], complete?:Function):void
    {
        this._walkType = WalkType.JUMP;
        this._jumpStartPos = startPos.clone();
        this._jumpTargets = targets.concat();
		this._jumpComplete = complete;
        this._player.needCanYing = true;
        this._player.setActionStr(FigureAction.JUMP);
        this.jumpOneStep();
		this.addRenderTick();

        // this._jumpStartPos = startPos.clone();
        // this._jumpEndPos = endPos.clone();
		// this._jumpComplete = complete;
        // this._jumpCurrTime = 0;
        // this._player.needCanYing = true;
		// this.addRenderTick();
        // this.newJumpInitialize();
    }

    private jumpOneStep():void
    {
        this._jumpEndPos = this._jumpTargets.shift();
        this._jumpCurrTime = 0;
        this.newJumpInitialize();
    }

    private newJumpInitialize():void
    {
        var h:number = this._player.jumpHeigth > 0 ? this.H * 0.75 : this.H;
        this._jumpLotus = Manager.pool.create(JumpLotus, this._jumpStartPos, this._jumpEndPos, PlayerAction.T, h, this._player.jumpHeigth);
        this._player.setDirection(Direction.getDir(0,0, this._jumpLotus.s.x,this._jumpLotus.s.y));
    }

    private renderJump(interval:number):void
    {
		if(this._walkType != WalkType.JUMP) return;
        this._jumpCurrTime += interval * 0.001;
        var pos:egret.Point = this._jumpLotus.getPos(this._jumpCurrTime);
        var h:number = this._jumpLotus.getH(this._jumpCurrTime);
        this._player.updatePostion(pos.x, pos.y);
        this._player.updateJumpHeight(h);
        
        if(this._jumpCurrTime >= this._jumpLotus.tAll) this.jumpComplete();
    }

    private jumpComplete():void
    {
        if(this._jumpTargets.length > 0)
        {
            this.disposeJumpLotus();
            this._jumpStartPos = this._jumpEndPos;
            this.jumpOneStep();
        }
        else
        {
            this._walkType = 0;
            this.disposeJumpLotus();
            // egret.stopTick(this.render,this);
            Manager.render.remove(this.render,this);
            let figure:string = this._info.getAliveFlag() ? FigureAction.STAND : FigureAction.DEAD;
            this._info.setActionStr(figure);
            this._player.needCanYing = false;
            if(this._player.isSelfGO)
            {
                Manager.jump.finishJump();
            }
            else
            {
                this._player.finishJump();
            }
            if(this._jumpComplete != null) this._jumpComplete();
        }
    }

    private disposeJumpLotus():void
    {
        if(this._jumpLotus)
        {
            Manager.pool.push(this._jumpLotus);
            this._jumpLotus = null;
        }
    }

    public dispose():void
    {
        super.dispose();
        this.disposeJumpLotus();
        this._player = null;
    }
}