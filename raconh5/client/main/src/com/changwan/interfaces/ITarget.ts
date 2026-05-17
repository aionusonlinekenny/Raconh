interface ITarget
{
    getType():number;
    getBlood():number;
	canHited(showMsg:boolean):boolean;
    x:number;
    y:number;
}