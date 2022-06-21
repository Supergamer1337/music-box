export default class CachedRequest<T> {
    private timestamp: number
    private staleTime: number
    private data: T

    /**
     * This class represents a cached GET request.
     *
     * @param staleTime The time to wait before re-fetching the data.
     * @param data The data to cache.
     */
    constructor(staleTime: number, data: T) {
        this.timestamp = Date.now()
        this.staleTime = staleTime
        this.data = data
    }

    /**
     * Gets the cached data.
     *
     * @returns The cached data.
     */
    public getData(): T {
        return this.data
    }

    /**
     * Checks if the cached data is stale.
     *
     * @returns True if the data is stale, false otherwise.
     */
    public isStale(): boolean {
        return Date.now() - this.timestamp > this.staleTime
    }
}
