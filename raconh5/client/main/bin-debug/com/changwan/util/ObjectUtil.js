var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ObjectUtil = (function () {
    function ObjectUtil() {
    }
    ObjectUtil.createObj = function (cls) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var result = new cls();
        if (result.reuse != null)
            result.reuse.apply(result, args);
        return result;
    };
    ObjectUtil.addOrRemove = function (obj, parent, isAdd) {
        if (obj == null)
            return;
        if (isAdd) {
            if (obj.parent == null && parent)
                parent.addChild(obj);
        }
        else {
            if (obj.parent)
                obj.parent.removeChild(obj);
        }
    };
    ObjectUtil.remove = function (child, container) {
        if (container === void 0) { container = null; }
        if (child == null)
            return;
        if (child instanceof egret.MovieClip)
            child.stop();
        if (child.parent != null && (container == child.parent || container == null)) {
            child.parent.removeChild(child);
        }
    };
    ObjectUtil.removeBitmap = function (child) {
        if (child == null)
            return;
        if (child.parent != null)
            child.parent.removeChild(child);
        child.bitmapData = null;
        child.texture = null;
    };
    ObjectUtil.replacePos = function (child, pos) {
        child.x = pos.x;
        child.y = pos.y;
        if (pos.parent != null)
            pos.parent.addChildAt(child, pos.parent.getChildIndex(pos));
        ObjectUtil.remove(pos);
    };
    ObjectUtil.replaceWH = function (child, pos) {
        child.width = pos.width;
        child.height = pos.height;
        ObjectUtil.replacePos(child, pos);
    };
    ObjectUtil.setLocation = function (child, pos) {
        child.width = pos.width;
        child.height = pos.height;
        child.x = pos.x;
        child.y = pos.y;
        ObjectUtil.remove(pos);
    };
    ObjectUtil.setPosition = function (child, pos, parent) {
        if (parent === void 0) { parent = null; }
        pos.visible = false;
        child.x = pos.x;
        child.y = pos.y;
        if (parent != null)
            parent.addChild(child);
    };
    ObjectUtil.clearChilds = function (container) {
        if (container == null)
            return;
        while (container.numChildren > 0) {
            container.removeChildAt(0);
        }
    };
    ObjectUtil.setPosAndWH = function (child, x, y, w, h, parent) {
        if (parent === void 0) { parent = null; }
        if (child == null)
            return;
        child.x = x;
        child.y = y;
        child.width = w;
        child.height = h;
        if (parent != null)
            parent.addChild(child);
    };
    ObjectUtil.move = function (child, x, y) {
        if (child == null)
            return;
        child.x = x;
        child.y = y;
    };
    ObjectUtil.moveCenter = function (parentW, parentH, childW, childH, child, childXLT, childYLT) {
        if (childXLT === void 0) { childXLT = 0; }
        if (childYLT === void 0) { childYLT = 0; }
        var centerX = childW * 0.5;
        var centerY = childH * 0.5;
        centerX += childXLT;
        centerY += childYLT;
        centerX = parentW * 0.5 - centerX;
        centerY = parentH * 0.5 - centerY;
        ObjectUtil.move(child, centerX, centerY);
    };
    ObjectUtil.adds = function (container) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var i = 0;
        var len = args.length;
        while (i < len) {
            if (args[i] && container)
                container.addChild(args[i]);
            i++;
        }
    };
    ObjectUtil.removes = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var i = args.length - 1;
        while (i >= 0) {
            ObjectUtil.remove(args[i]);
            i--;
        }
    };
    ObjectUtil.disposes = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var i = args.length - 1;
        while (i >= 0) {
            ObjectUtil.dispose(args[i]);
            i--;
        }
    };
    ObjectUtil.dispose = function (obj) {
        if (!obj)
            return;
        if (obj.dispose != null)
            obj.dispose();
        else if (obj instanceof egret.Bitmap) {
            if (obj.parent != null)
                obj.parent.removeChild(obj);
            obj.bitmapData = null;
            obj.texture = null;
        }
        else {
            if (obj instanceof egret.MovieClip)
                obj.stop();
            if (obj.parent != null)
                obj.parent.removeChild(obj);
            Trace.error("未写释放内存", egret.getQualifiedClassName(obj));
        }
    };
    ObjectUtil.pushes = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var i = args.length - 1;
        while (i >= 0) {
            if (args[i])
                Manager.pool.push(args[i]);
            i--;
        }
    };
    ObjectUtil.size = function (child, width, height) {
        child.width = width;
        child.height = height;
    };
    ObjectUtil.rotateAroundExternalPoint = function (child, posX, posY, disX, disY, angleDegrees) {
        var aa = child.matrix;
        aa.tx = -disX + posX;
        aa.ty = -disY + posY;
        aa.tx -= posX;
        aa.ty -= posY;
        aa.rotate(angleDegrees * (Math.PI / 180));
        aa.tx += posX;
        aa.ty += posY;
        child.matrix = aa;
    };
    ObjectUtil.diff = function (obj1, obj2) {
        var o1 = obj1 instanceof Object;
        var o2 = obj2 instanceof Object;
        if (!o1 || !o2)
            return obj1 === obj2;
        if (Object.keys(obj1).length !== Object.keys(obj2).length)
            return false;
        for (var attr in obj1) {
            var t1 = obj1[attr] instanceof Object;
            var t2 = obj2[attr] instanceof Object;
            if (t1 && t2)
                return this.diff(obj1[attr], obj2[attr]);
            else if (obj1[attr] !== obj2[attr])
                return false;
        }
        return true;
    };
    ObjectUtil.drawSector = function (mc, x, y, r, color, angle, startFrom) {
        mc.graphics.clear();
        mc.graphics.beginFill(color, 1);
        mc.graphics.lineStyle(0, color);
        mc.graphics.moveTo(x, y);
        angle = (Math.abs(angle) > 360) ? 360 : angle;
        var n = Math.ceil(Math.abs(angle) / 45);
        var angleA = angle / n;
        angleA = angleA * Math.PI / 180;
        startFrom = startFrom * Math.PI / 180;
        mc.graphics.lineTo(x + r * Math.cos(startFrom), y + r * Math.sin(startFrom));
        for (var i = 1; i <= n; i++) {
            startFrom += angleA;
            var angleMid = startFrom - angleA / 2;
            var bx = x + r / Math.cos(angleA / 2) * Math.cos(angleMid);
            var by = y + r / Math.cos(angleA / 2) * Math.sin(angleMid);
            var cx = x + r * Math.cos(startFrom);
            var cy = y + r * Math.sin(startFrom);
            mc.graphics.curveTo(bx, by, cx, cy);
        }
        if (angle != 360) {
            mc.graphics.lineTo(x, y);
        }
        mc.graphics.endFill();
    };
    ObjectUtil.createConainer = function (touchEnabled, touchChildren) {
        if (touchEnabled === void 0) { touchEnabled = false; }
        if (touchChildren === void 0) { touchChildren = true; }
        var result = new egret.DisplayObjectContainer();
        result.touchEnabled = touchEnabled;
        result.touchChildren = touchChildren;
        return result;
    };
    return ObjectUtil;
}());
__reflect(ObjectUtil.prototype, "ObjectUtil");
//# sourceMappingURL=ObjectUtil.js.map