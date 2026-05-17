namespace cw
{
    export class MathUtil
    {
        /**
         * 返回介于min,max的值，其中max一定大于min
         */
        public static clamb(min:number, max:number, value:number):number
        {
            if(value <= min)return min;
            if(value >= max)return max;
            return value;
        }
    }
}