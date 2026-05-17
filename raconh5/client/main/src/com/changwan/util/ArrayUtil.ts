class ArrayUtil
{
    /**
     * 多属性排序
     * @param arrProperty 属性列表
     * @param arrSort 排序方式(默认正序) 0正序 1倒序
     * @return 排序后的数组
     */
    public static sortOn(arr:Array<any>, arrProperty:Array<string>, arrSort:Array<number> = null):Array<any>
    {
        if(arr == null || arr.length == 0) return arr;

        return arr.sort(function(obj1, obj2){
            var len:number = arrProperty.length;
            var property:string = "";
            var sortLen:number = arrSort ? arrSort.length : 0;
            if(sortLen > len) sortLen = len;

            var sortType:number = 0;
            var result:number = 0;
            for(var i:number = 0; i < len; i++)
            {
                property = arrProperty[i];
                sortType = 0;

                if(i < sortLen) sortType = arrSort[i];
                
                result = Number(obj1[property]) - Number(obj2[property]);
                if(result == 0) continue;

                if(sortType == 0) return result;

                return -result;
            }

            return 0;
        });
    }
    public static parseStringToArray(str:string,splitStr:string=","):number[]
    {
        var reg:RegExp = /{|}| /g;
        str = str.replace(reg,"");
        var arr:string[] = str.split(splitStr);
        var result:number[] = [];
        for(let i:number = 0; i < arr.length; i++)
        {
            result.push(parseInt(arr[i]));
        }
        return result;
    }
}