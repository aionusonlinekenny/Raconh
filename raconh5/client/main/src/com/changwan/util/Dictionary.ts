class Dictionary<T, V>
{
	private _keys : Array<T>;
    private _values: Array<V>;
    private _map:any;

    constructor() {
        this._keys = [];
        this._values = [];
        this._map = {};
    }

	public get(key: T):V {
		return this._map[key];
	}

    public add(key: T, value: V) {
        this._map[key] = value;
        this._keys.push(key);
        this._values.push(value);
    }

    public remove(key: T):V 
    {
        var index = this._keys.indexOf(key, 0);
        var value:V = this._values[index];
        this._keys.splice(index, 1);
        this._values.splice(index, 1);

        delete this._map[key];
        return value;
    }

    public keys(): T[]
    {
        return this._keys;
    }

    public values(): V[] 
    {
        return this._values;
    }

    public containsKey(key: T):boolean 
    {
        return !!this._map[key];
    }
}