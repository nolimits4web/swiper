var LinearSpline = function (x, y) {
    this.x = x;
    this.y = y;
    this.lastIndex = x.length - 1;
    

    // Given an x value (x2), return the expected y2 value:
    // (x1,y1) is the known point before given value,
    // (x3,y3) is the known point after given value.
    var i1, i3;
    var l = this.x.length;

    this.interpolate = function (x2) {
        if (!x2) return 0;

        // Get the indexes of x1 and x3 (the array indexes before and after given x2):
        i3 = binarySearch(this.x, x2);
        i1 = i3 - 1;

        // We have our indexes i1 & i3, so we can calculate already:
        // y2 := ((x2−x1) × (y3−y1)) ÷ (x3−x1) + y1
        return ((x2 - this.x[i1]) * (this.y[i3] - this.y[i1])) / (this.x[i3] - this.x[i1]) + this.y[i1];
    };

    var binarySearch = (function() {
        var maxIndex, minIndex, guess;
        return function(array, val) {
            minIndex = -1;
            maxIndex = array.length;
            while (maxIndex - minIndex > 1)
                if (array[guess = maxIndex + minIndex >> 1] <= val) {
                    minIndex = guess;
                } else {
                    maxIndex = guess;
                }
            return maxIndex;
        };
    })();
};