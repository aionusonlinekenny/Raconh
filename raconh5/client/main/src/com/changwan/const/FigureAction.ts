class FigureAction
{
    public static STAND:string = "stand";
    public static WALK:string = "walk";
    public static JUMP:string = "jump";
    public static DEAD:string = "dead";
    public static HITED:string = "hited";
	public static ATTACK1:string = "attack1";
	public static ATTACK2:string = "attack2";
	public static ATTACK3:string = "attack3";
    public static SIT:string = "sit";
    public static SLIDE:string = "slide";
    public static KITE:string = "kite";
    public static WATER:string = "water";

    public static getWrapMode(name:string):number
    {
        switch(name)
        {
            case FigureAction.STAND:
            case FigureAction.WALK:
            case FigureAction.SIT:
            case FigureAction.SLIDE:
            case FigureAction.KITE:
                return WrapMode.LOOP;
            case FigureAction.ATTACK1:
            case FigureAction.ATTACK2:
            case FigureAction.ATTACK3:
                return WrapMode.ATTACK;
            case FigureAction.DEAD:
            case FigureAction.JUMP:
            case FigureAction.HITED:
            case FigureAction.WATER:
                return WrapMode.ONCE;
        }
        return WrapMode.ONCE;
    }

    public static isAttackAction(name:string):boolean
    {
        return name.indexOf("attack") != -1;
    }

    public static getResGroupShortName(name:string):string
    {
        switch(name)
        {
            case FigureAction.WALK:
                return "w";
            case FigureAction.STAND:
            case FigureAction.KITE:
                return "s";
            case FigureAction.JUMP:
            case FigureAction.WATER:
                return "j";
            case FigureAction.ATTACK1:
                return "a1";
            case FigureAction.ATTACK2:
                return "a2";
            case FigureAction.ATTACK3:
                return "a3";
            case FigureAction.HITED:
                return "h";
            case FigureAction.DEAD:
                return "d";
            case FigureAction.SIT:
                return "t";
            case FigureAction.SLIDE:
                return "e";
        }
        return "s";
    }
}