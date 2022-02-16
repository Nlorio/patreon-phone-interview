/* Merge overlapping intervals
 *
 * [[100, 200], [300, 500], [400, 600]] -> [[100, 200], [300, 600]]
 * [[100, 200], [300, 500], [400, 600], [700, 800]] -> [[100, 200], [300, 600], [700, 800]]
 *
 *
 * algo
 * ----
 *
 *  input validation
 *  * assume sorted intervals array
 *  * null array -> null
 *  * empty -> empty
 *
 *  approach
 *  * initialize mergeInterval as first interval (
 *  * initialize result array
 *  * iterate through each interval (check current interval and next interval) (interval.length - 1)
 *  * if curr_end >= next_start => mergeInterval[1] = next_end
 *  * else push mergeInterval to results & set mergeInterval = next
 *  
 *  * at end of loop results.push(mergeInterval);
 *  
 *  * return results
 */


const mergeIntervals = (intervals) => {
    let results = [];

    if (!intervals || intervals.length == 0) {
        return results;
    }

    let mergeInterval = intervals[0];
    for (let i = 0; i < intervals.length - 1; i++) {
        let curr = intervals[i];
        let next = intervals[i+1];
        if (curr[1] >= next[0]) {
            mergeInterval[1] = next[1];
        } else {
            results.push(mergeInterval);
            mergeInterval = next;
        }
    }

    results.push(mergeInterval);
    return results;
}


/* simple testing outputs */
console.log(mergeIntervals(null)); // -> []
console.log(mergeIntervals([])); // -> []
console.log(mergeIntervals([[100, 200], [300, 500], [400, 600]])); // -> [[100, 200],[300,600]]
console.log(mergeIntervals([[100, 200], [300, 500], [400, 600], [700, 800]])); // -> [[100,200],[300,600],[700,800]]
console.log(mergeIntervals([[100, 200], [300, 500], [400, 700], [600, 800], [900, 1000]])); // -> [[100,200],[300,800],[900,1000]]
