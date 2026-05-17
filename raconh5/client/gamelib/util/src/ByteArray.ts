namespace cw
{
    export class ByteArray extends egret.ByteArray
    {
        public readInt64():number
        {
            return this.readUnsignedInt() * Math.pow(2, 32) + this.readUnsignedInt();
        }

        public writeInt64(value:number):void
        {
            this.writeUnsignedInt(value / 0xffffffff);
            this.writeUnsignedInt(value);
        }
    }
}