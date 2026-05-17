/**
 *author Anydo
 *create 2018-4-10
 *description 
*/
class SoundManager
{
    private _noMute:boolean;
    private _soundDic:any;
    private _bgmSound:SoundObject;

    public constructor()
	{
		this._noMute = true;
        this._soundDic = {};
	}

    public get noMute():boolean{ return this._noMute; }
    public set noMute(value:boolean)
    {
        if(this._noMute == value) return;
        this._noMute = value;
        if(this._bgmSound != null)
        {
            if(this._noMute)
            {
                this._bgmSound.continue();
            }
            else
            {
                this._bgmSound.pause();
            }
        }
    }

    public playBGM(path:PathInfo):void
    {
        if(Manager.global.lifecyclePause) return;
        if(this._bgmSound != null && this._bgmSound.path.url == path.url) return;
        if(this._bgmSound != null) this._bgmSound.stop();
        this._bgmSound = this._soundDic[path.url];
        if(this._bgmSound == null)
        {
            this._bgmSound = new SoundObject(path);
            this._bgmSound.load(egret.Sound.MUSIC, path.url);
            this._soundDic[path.url] = this._bgmSound;
        }
        if(!this._noMute) return;
        this._bgmSound.play();
    }

    public playEffect(path:PathInfo):void
    {
        if(!this._noMute) return;
        if(Manager.global.lifecyclePause) return;
        var effct:SoundObject = this._soundDic[path.url];
        if(effct == null)
        {
            effct = new SoundObject(path);
            effct.load(egret.Sound.EFFECT, path.url);
            this._soundDic[path.url] = effct;
        }
        effct.play(1);
    }

    public webFocusListener():void
    {
        if(!this._noMute) return;
        if(this._bgmSound == null) return;
        if(Manager.global.lifecyclePause)
        {
            this._bgmSound.pause();
        }
        else
        {
            this._bgmSound.continue();
        }
    }
}