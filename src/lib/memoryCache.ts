type CacheEntry = {
    data: any; 
    expiresAt: number; 
};
class MemoryCache { 
    private cache: Map<string, CacheEntry> = new Map();
    set(key: string, data: any, ttlMs: number) { 
        this.cache.set(key, { 
            data, expiresAt: Date.now() + ttlMs, 
        }); 
    }
get(key: string): any | null { 
    const entry = this.cache.get(key); 
    if (!entry) return null;

    if (Date.now() > entry.expiresAt) {
  this.cache.delete(key);
  return null;
}

return entry.data;

    } 
}
export const memoryCache = new MemoryCache();