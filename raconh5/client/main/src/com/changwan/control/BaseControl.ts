class BaseControl
{
    public constructor()
    {
		this.addCMD();
	}

    protected addCMD():void
    {

    }

    protected send(protocol:number):void
    {
        Manager.socket.getCMD<BaseCMD>(protocol).send();
    }
}