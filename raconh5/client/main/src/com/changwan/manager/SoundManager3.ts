/**
 *author Anydo
 *create 2018-4-8
 *description 
*/
class SoundManager3
{
    private _bgmSound:egret.Sound;
    private _bgmSoundChannel:egret.SoundChannel;

    private _path:PathInfo;
    private _openBgm:boolean;
    private _bgmLoaded:boolean;

    public constructor()
    {
        this._openBgm = true;
        this._bgmSound = new egret.Sound();
        this._bgmSound.type = egret.Sound.MUSIC;
        this._bgmSound.addEventListener(egret.Event.COMPLETE, this.__bgmLoadCompleteHandler, this);
        this._bgmSound.addEventListener(egret.IOErrorEvent.IO_ERROR, this.__bgmIoErrorHandler, this);
    }

    public playBGM(path:PathInfo):void
    {
        if(this._path != null && this._path.url == path.url) return;
        this._path = path;
        if(this._bgmSoundChannel != null)
        {
            this._bgmSoundChannel.stop();
            this._bgmSoundChannel = null;
        }
        this.loadBGM();
    }

    private loadBGM():void
	{
        this._bgmLoaded = false;
        this._bgmSound.close();
        this._bgmSound.load(this._path.url);
    }

    private __bgmLoadCompleteHandler(e:egret.Event):void
	{
        this._bgmLoaded = true;
        if(this._openBgm && !Manager.global.lifecyclePause)
        {
            this._bgmSoundChannel = this._bgmSound.play();
        }
    }

    private __bgmIoErrorHandler(e:egret.IOErrorEvent):void
	{
        
    }

    public get openBgm():boolean{return this._openBgm;};
    public set openBgm(value:boolean)
    {
        this._openBgm = value;
        this.webFocusListener();
    }

    public webFocusListener():void
    {
        if(this._openBgm && !Manager.global.lifecyclePause)
        {
            if(this._bgmSound && this._bgmLoaded)
            {
                this._bgmSoundChannel = this._bgmSound.play();
            }
        }
        else
        {
            if(this._bgmSoundChannel != null)
            {
                this._bgmSoundChannel.stop();
            }
        }
    }

    //==============================音效部分=====================================
    public openEffect:boolean;
    public playEffectMusic(path:PathInfo):void
    {
        if(!this.openEffect) return;
        let effSound:egret.Sound = new egret.Sound();
        effSound.type = egret.Sound.EFFECT;
        effSound.addEventListener(egret.Event.COMPLETE, this.__effectMusicLoadHandler, this);
        effSound.addEventListener(egret.IOErrorEvent.IO_ERROR, this.__effectMusicErrorHandler, this);
        effSound.load(path.url);
    }
    
    private __effectMusicLoadHandler(e:egret.Event):void
	{
        let effSound:egret.Sound = e.target as egret.Sound;
        effSound.removeEventListener(egret.Event.COMPLETE, this.__effectMusicLoadHandler, this);
        effSound.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.__effectMusicErrorHandler, this);
        if(this.openEffect)
        {
            effSound.play(0, 1);
        }
    }

    private __effectMusicErrorHandler(e:egret.IOErrorEvent):void
	{
        let effSound:egret.Sound = e.target as egret.Sound;
        effSound.removeEventListener(egret.Event.COMPLETE, this.__effectMusicLoadHandler, this);
        effSound.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.__effectMusicErrorHandler, this);
    }
}