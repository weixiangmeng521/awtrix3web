export function deepClone<T>(value: T, cache = new WeakMap()): T {
    if (value === null || typeof value !== 'object') {
        return value;
    }

    // 防止循环引用
    if (cache.has(value)) {
        return cache.get(value);
    }

    let result: any;

    // Array
    if (Array.isArray(value)) {
        result = [];
        cache.set(value, result);
        value.forEach((item, index) => {
            result[index] = deepClone(item, cache);
        });
        return result;
    }

    // Date
    if (value instanceof Date) {
        return new Date(value.getTime()) as any;
    }

    // RegExp
    if (value instanceof RegExp) {
        return new RegExp(value.source, value.flags) as any;
    }

    // Map
    if (value instanceof Map) {
        result = new Map();
        cache.set(value, result);
        value.forEach((v, k) => {
            result.set(deepClone(k, cache), deepClone(v, cache));
        });
        return result;
    }

    // Set
    if (value instanceof Set) {
        result = new Set();
        cache.set(value, result);
        value.forEach(v => {
            result.add(deepClone(v, cache));
        });
        return result;
    }

    // Object
    result = {};
    cache.set(value, result);
    Object.keys(value).forEach(key => {
        result[key] = deepClone((value as any)[key], cache);
    });
    return result;
}
