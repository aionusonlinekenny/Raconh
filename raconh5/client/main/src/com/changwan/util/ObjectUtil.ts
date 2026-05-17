class ObjectUtil
{
    public static createObj(cls:{new():any},...args:any[]):any
    {
        let result:any = new cls();
        if(result.reuse != null) result.reuse.apply(result,args);
        return result;
    }

    public static addOrRemove(obj:egret.DisplayObject, parent:egret.DisplayObjectContainer, isAdd:boolean):void
	{
        if(obj == null) return;
		if(isAdd)
		{
			if(obj.parent == null && parent) parent.addChild(obj);
		}
		else
		{
			if(obj.parent) obj.parent.removeChild(obj);
		}
	}


    public static remove(child:egret.DisplayObject, container:egret.DisplayObjectContainer = null):void
    {
        if(child == null)return;
        if(child instanceof egret.MovieClip) (child as egret.MovieClip).stop();
        if(child.parent != null && (container == child.parent || container == null))
        {
            child.parent.removeChild(child);
        }
    }
    
    public static removeBitmap(child:egret.Bitmap):void
    {
        if(child == null)return;
        if(child.parent != null) child.parent.removeChild(child);
        child.bitmapData = null;
        child.texture = null;
    }
    
    public static replacePos(child:egret.DisplayObject, pos:egret.DisplayObject):void
    {
        child.x = pos.x;
        child.y = pos.y;
        if(pos.parent != null) pos.parent.addChildAt(child, pos.parent.getChildIndex(pos));
        ObjectUtil.remove(pos);
    }
    public static replaceWH(child:egret.DisplayObject, pos:egret.DisplayObject):void
    {
        child.width = pos.width;
        child.height = pos.height;
        ObjectUtil.replacePos(child,pos);
    }
    
    public static setLocation(child:egret.DisplayObject, pos:egret.DisplayObject):void
    {
        child.width = pos.width;
        child.height = pos.height;
        child.x = pos.x;
        child.y = pos.y;
        ObjectUtil.remove(pos);
    }
    
    public static setPosition(child:egret.DisplayObject, pos:egret.DisplayObject, parent:egret.DisplayObjectContainer = null):void
    {
        pos.visible = false;
        child.x = pos.x;
        child.y = pos.y;
        if(parent != null) parent.addChild(child);
    }

    public static clearChilds(container:egret.DisplayObjectContainer):void
    {
        if(container == null)return;
        while(container.numChildren > 0)
        {
            container.removeChildAt(0);
        }
    }
    
    public static setPosAndWH(child:egret.DisplayObject, x:number, y:number, w:number, h:number, parent:egret.DisplayObjectContainer = null):void
    {
        if(child == null)return;
        child.x = x;
        child.y = y;
        child.width = w;
        child.height = h;
        if(parent != null) parent.addChild(child);
    }

    public static move(child:egret.DisplayObject, x:number, y:number):void
    {
        if(child == null)return;
        child.x = x;
        child.y = y;
    }
    public static moveCenter(parentW:number,parentH:number,childW:number,childH:number,child:egret.DisplayObject,childXLT:number = 0,childYLT:number = 0):void
    {
        var centerX:number = childW * 0.5;
        var centerY:number = childH * 0.5;
        centerX += childXLT;
        centerY += childYLT;
        centerX = parentW * 0.5 - centerX;
        centerY = parentH * 0.5 - centerY;
        ObjectUtil.move(child,centerX,centerY);
    }
    public static adds(container:egret.DisplayObjectContainer,...args):void
    {
        var i:number = 0 ;
        var len:number = args.length;
        while(i < len)
        {
            if(args[i] && container) container.addChild(args[i]);
            i++;
        }
    }
    public static removes(...args):void
    {
        var i:number = args.length-1;
        while(i >= 0)
        {
            ObjectUtil.remove(args[i]);
            i--;
        }
    }
    public static disposes(...args):void
    {
        var i:number = args.length-1;
        while(i >= 0)
        {
            ObjectUtil.dispose(args[i]);
            i--;
        }
    }
    public static dispose(obj:any):void
    {
        if(!obj) return;
        if(obj.dispose != null) obj.dispose();
        else if(obj instanceof egret.Bitmap)
        {
            if(obj.parent != null) obj.parent.removeChild(obj);
            obj.bitmapData = null;
            obj.texture = null;
        }
        else
        {
            if(obj instanceof egret.MovieClip) (obj as egret.MovieClip).stop();
            if(obj.parent != null)obj.parent.removeChild(obj);
            Trace.error("未写释放内存",egret.getQualifiedClassName(obj));
        }
    }
    
    public static pushes(...args):void
    {
        var i:number = args.length-1;
        while(i >= 0)
        {
            if(args[i]) Manager.pool.push(args[i]);
            i--;
        }
    }
    public static size(child:egret.DisplayObject, width:number, height:number):void
    {
        child.width = width;
        child.height = height;
    }

    public static rotateAroundExternalPoint(child:egret.DisplayObject, posX:number, posY:number, disX:number, disY:number, angleDegrees:number):void
    {
        var aa:egret.Matrix = child.matrix;
        aa.tx = -disX + posX;
        aa.ty = -disY + posY;

        aa.tx -= posX;
        aa.ty -= posY;
        aa.rotate(angleDegrees*(Math.PI/180));
        aa.tx += posX;
        aa.ty += posY;

        child.matrix = aa;
    }

    public static diff(obj1:any, obj2:any):boolean
	{
		var o1 = obj1 instanceof Object;
		var o2 = obj2 instanceof Object;
		if(!o1 || !o2)
			return obj1 === obj2;

		if(Object.keys(obj1).length !== Object.keys(obj2).length)
			return false;

		for(var attr in obj1)
		{
			var t1 = obj1[attr] instanceof Object;
			var t2 = obj2[attr] instanceof Object;
			if (t1 && t2)
				return this.diff(obj1[attr], obj2[attr]);
			else if (obj1[attr] !== obj2[attr])
				return false;
		}
		return true;
	}

    public static drawSector(mc:any, x:number, y:number, r:number, color:number, angle:number, startFrom:number):void
	{
		mc.graphics.clear();
		mc.graphics.beginFill(color, 1);
		mc.graphics.lineStyle(0, color);
		mc.graphics.moveTo(x,y);
		angle = (Math.abs(angle)>360)?360:angle;
		var n:number = Math.ceil(Math.abs(angle)/45);
		var angleA:number = angle/n;
		angleA = angleA*Math.PI/180;
		startFrom = startFrom*Math.PI/180;
		mc.graphics.lineTo(x+r*Math.cos(startFrom),y+r*Math.sin(startFrom));
		for (var i=1; i<=n; i++)
		{
			startFrom+=angleA;
			var angleMid=startFrom-angleA/2;
			var bx=x+r/Math.cos(angleA/2)*Math.cos(angleMid);
			var by=y+r/Math.cos(angleA/2)*Math.sin(angleMid);
			var cx=x+r*Math.cos(startFrom);
			var cy=y+r*Math.sin(startFrom);
			mc.graphics.curveTo(bx,by,cx,cy);
		}
		if(angle!=360)
		{
			mc.graphics.lineTo(x,y);
		}
		mc.graphics.endFill();
	}

    public static createConainer(touchEnabled:boolean = false,touchChildren:boolean = true):egret.DisplayObjectContainer
    {
        let result:egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
        result.touchEnabled = touchEnabled;
        result.touchChildren = touchChildren;
        return result;
    }

}