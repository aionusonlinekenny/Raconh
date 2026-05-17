/**
 * 地图数据
 */
class MapData implements cw.IPool
{
    public source:Array<Array<number>>;

    public reuse(bytes:egret.ByteArray):void
    {
        this.parse(bytes);
    }

    public unuse():void
    {
        this.source = [];
    }

    public constructor()
    {
        this.source = [];
    }

    private parse(data:egret.ByteArray)
    {
        // var data:egret.ByteArray = new egret.ByteArray(bytes, bytes.byteLength);
        var version:number = data.readShort();
        var row = data.readShort();
        var col = data.readShort();
        for (var i = 0; i < row; i++)
        {
            var values = [];
            this.source.push(values);
            for (var j = 0; j < col; j++)
             {
                values.push(data.readByte());
            }
        }
    }

    public isEmpty(row:number, col:number):boolean
	{
        if (row < 0 || row >= this.source.length || col >= this.source[0].length || col < 0) return false;
        return this.source[row][col] == MapDataType.UN_WALK;
    }

    public dispose()
    {
        this.source = null;
    }
}