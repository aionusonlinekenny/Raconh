class Direction
{
	public static TOP:string = "top";
	public static DOWN:string = "down";
	public static LEFT:string = "left";
	public static RIGHT:string = "right";
	public static LEFT_TOP:string = "leftTop";
	public static RIGHT_TOP:string = "rightTop";
	public static LEFT_DOWN:string = "leftDown";
	public static RIGHT_DOWN:string = "rightDown";

	/**
	 * 数组里面的方向位置不要改，策划有脚本控制出生怪物的朝向 按下面的顺序
	 */
	// public static get directions():string[]
	// {
	// 	return [this.DOWN, this.TOP, this.LEFT, this.RIGHT, this.LEFT_DOWN, this.LEFT_TOP, this.RIGHT_DOWN, this.RIGHT_TOP];
	// }
	public static get directions():string[]
	{
		return [this.LEFT, this.RIGHT, this.LEFT_DOWN, this.LEFT_TOP, this.RIGHT_DOWN, this.RIGHT_TOP];
	}

	public static getRandomDirection():string
	{
		return this.directions[Math.floor(Math.random() * this.directions.length)];
	}

	/** 
	 * 两点取方向
	 * @param p1 起始点
	 * @param p2 目标点
	 */
	public static getDir(x1:number,y1:number,x2:number,y2:number):string
	{
		var angle:number = PointUtil.getAngle(x1,y1,x2,y2);
		while(angle < 0){angle += 360;}
        angle = angle % 360;
		return this.getDirByAngle(angle);
	}

	public static getDirByAngle(angle:number):string
	{
		if(angle > 22.5 && angle <= 90) return this.RIGHT_DOWN;
		else if(angle > 90 && angle <= 157.5) return this.LEFT_DOWN;
		else if(angle > 157.5 && angle <= 202.5) return this.LEFT;
		else if(angle > 202.5 && angle <= 270) return this.LEFT_TOP;
		else if(angle > 270 && angle <= 337.5) return this.RIGHT_TOP;
		return this.RIGHT;
	}

    public static getAngleByDir(dir:string):number
    {
        if(dir == Direction.RIGHT) return 0;
        else if(dir == Direction.RIGHT_DOWN) return 45;
        else if(dir == Direction.DOWN) return 90;
        else if(dir == Direction.LEFT_DOWN) return 135;
        else if(dir == Direction.LEFT) return 180;
        else if(dir == Direction.LEFT_TOP) return 225;
        else if(dir == Direction.TOP) return 270;
        else if(dir == Direction.RIGHT_TOP) return 315;
        return 0;
    }
	
	public static isLeft(dir:string):boolean
	{
		return (dir == this.LEFT_TOP || dir == this.LEFT || dir == this.LEFT_DOWN);
	}

	public static isTop(dir:string):boolean
	{
		return (dir == this.LEFT_TOP || dir == this.TOP || dir == this.RIGHT_TOP);
	}

	public static getResGroupShortName(dir:string):number
	{
		switch(dir)
		{
			case this.TOP:
				return 0;
			case this.RIGHT_TOP:
			case this.LEFT_TOP:
				return 1;
			case this.RIGHT:
			case this.LEFT:
				return 2;
			case this.RIGHT_DOWN:
			case this.LEFT_DOWN:
				return 3;
			case this.DOWN:
				return 4;
		}
		return 0;
	}
}