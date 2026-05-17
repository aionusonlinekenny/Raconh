class ByteArrayExtend extends cw.ByteArray
{
    public setArrayBuffer(buffer: ArrayBuffer): void 
    {
        this.write_position = buffer.byteLength;
        this.buffer = buffer;
        this._position = 0;
    }
}