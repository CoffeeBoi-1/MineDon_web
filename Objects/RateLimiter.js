class RateLimiter {
    constructor() {
        this.ips = {}
    }

    RequestIsLimited(ip, requestRout, rateTime) {
        if (!this.ips[ip]) return false
        if (!this.ips[ip][requestRout]) return false
        if (Date.now() - this.ips[ip][requestRout].date > rateTime) return false
        return true
    }

    AddIpLimit(ip, requestRout) {
        if (!this.ips[ip]) this.ips[ip] = {}
        this.ips[ip][requestRout] = { date: Date.now() }
    }
}

module.exports = RateLimiter