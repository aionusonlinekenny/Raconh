/**
 * 快捷菜单按钮
 * liangyan
 * create 2017-11-07
*/
class ShortcutMenuBtn extends Button
{
    public type:number;

    public constructor(type:number)
    {
        super();
        this.skinName = Manager.path.getSkinName("shortcut", "ShortcutButtonSkin");
        this.icon = ShortcutMenuFunType.getIconName(type);
        this.type = type;
    }

    public dispose():void
    {
        super.dispose();
    }
}