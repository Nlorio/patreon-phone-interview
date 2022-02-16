/* Rate Limiter
 *
 * We want to protect an API endpoint with an in-memory rate limiter
 *
 * The rate limiter should be initialized with a value that represents the maximum requests per second we want to allow. Let's assume we measure time in millisecond resolution.
 *
 * When a request hits the API endpoint, it asks the rate limiter whether it has capacity to process this request and rejects if there isn't. 
 * Assume that API requests come in sequentially (i.e., no need to worry about concurrent requests or identical timestamps).
 *
 * Design the API and implement the logic for the rate limiter.
 *
 * notes & approach
 * ----------------
 *
 *  * time in milliseconds
 *  * maxRequests = number of requests per second that we want to allow
 *  * requests received sequentially (no identical timestamps or concurrent requests)
 *  
 *  * update seenMap with timestamp as key and request as value (key = time received at), if key in 1000 millisecond interval 
 *  * keep memory of seen messages for 1 seconds (load data into hash table) (reset every second)
 *  * if seenMap.size >= maxRequests => return false
 *
 */


class RateLimiter {
    constructor(maxRequests) {
        this.time = Date.now();
        this.maxRequests = maxRequests;
        this.seenMap = new Map();
    }

    hasCapacity(timestamp, message) {

        if (timestamp - this.time > 1000) {
            this.seenMap.clear();
            this.time = timestamp;
        }

        if (this.seenMap.size >= this.maxRequests) {
            return false;
        }

        this.seenMap.set(timestamp, message);
        return true;
    }
}


/* simple testing */
const testRateLimiter = (rateLimiter, timestamp, messageInterval) => {
    let requestCount = 0;
    let hasCapacity = rateLimiter.hasCapacity(timestamp, "")
    while (hasCapacity) {
        requestCount += 1;
        timestamp += messageInterval;
        hasCapacity = rateLimiter.hasCapacity(timestamp, "");
    }
    return [hasCapacity, requestCount];
}

const rateLimiter = new RateLimiter(5);

// reach maxRequests within 1 second interval
const result = testRateLimiter(rateLimiter, Date.now(), 100);
console.assert(result[0]  == false, "failure to limit requests in time interval");
console.assert(result[1]  == 5, "failure to limit requests in time interval");

// confirm reset
console.assert(rateLimiter.hasCapacity(new Date(Date.now() + 1100), "") == true, "failure to reset time interval");
