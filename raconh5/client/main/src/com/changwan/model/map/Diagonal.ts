class Diagonal
{
    public static find(start_point:egret.Point, end_point:egret.Point):Array<egret.Point>
	{
        var w: number;
        var h: number;
        var _ox: number;
        var _oy: number;
        var _value: Array<egret.Point> = [];
        var _r: number;
        var _n1: number;
        var _n2: number;
        var _b1: boolean;
        var _b2: boolean;
        var _m: number;
        var _n: number = 0;
        var _d: boolean = (start_point.x < end_point.x) == (start_point.y < end_point.y);
        if (start_point.x < end_point.x) {
            _ox = start_point.x;
            _oy = start_point.y;
            w = end_point.x - _ox;
            h = Math.abs(end_point.y - _oy);
        }
        else {
            _ox = end_point.x;
            _oy = end_point.y;
            w = start_point.x - _ox;
            h = Math.abs(start_point.y - _oy);
        }
        if (w == h) {
            for (_m = 0; _m <= w; _m++) {
                _d ? _value.push(new egret.Point(_ox + _m, _oy + _m)) : _value.push(new egret.Point(_ox + _m, _oy - _m));
                if (_m > 0) {
                    _d ? _value.push(new egret.Point(_ox + _m - 1, _oy + _m)) : _value.push(new egret.Point(_ox + _m - 1, _oy - _m));
                }
                if (_m < w) {
                    _d ? _value.push(new egret.Point(_ox + _m + 1, _oy + _m)) : _value.push(new egret.Point(_ox + _m + 1, _oy - _m));
                }

            }
        }
        else if (w > h)
        {
            _r = h / w; //(h-1)/(w-1);
            _value.push(new egret.Point(_ox, _oy));
            for (_m = 1; _m <= w; _m++)
            {
                _n1 = (_m - 0.5) * _r;
                _n2 = (_m + 0.5) * _r;
                _b1 = _n1 > _n - 0.5 && _n1 < _n + 0.5;
                _b2 = _n2 > _n - 0.5 && _n2 < _n + 0.5;
                if (_b1 || _b2) {
                    _d ? _value.push(new egret.Point(_ox + _m, _oy + _n)) : _value.push(new egret.Point(_ox + _m, _oy - _n));
                    if (!_b2) {
                        _n++;
                        _d ? _value.push(new egret.Point(_ox + _m, _oy + _n)) : _value.push(new egret.Point(_ox + _m, _oy - _n));
                    }
                }
            }
        }
        else if (w < h) {
            _r = w / h; //(w-1)/(h-1);
            _value.push(new egret.Point(_ox, _oy));
            for (_m = 1; _m <= h; _m++) {
                _n1 = (_m - 0.5) * _r;
                _n2 = (_m + 0.5) * _r;
                _b1 = _n1 > _n - 0.5 && _n1 < _n + 0.5;
                _b2 = _n2 > _n - 0.5 && _n2 < _n + 0.5;
                if (_b1 || _b2) {
                    _d ? _value.push(new egret.Point(_ox + _n, _oy + _m)) : _value.push(new egret.Point(_ox + _n, _oy - _m));
                    if (!_b2) {
                        _n++;
                        _d ? _value.push(new egret.Point(_ox + _n, _oy + _m)) : _value.push(new egret.Point(_ox + _n, _oy - _m));
                    }
                }
            }
        }
        return _value;
    }
}