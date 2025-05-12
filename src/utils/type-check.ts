export function isBoolean(data?: unknown): data is boolean {
    return typeof data === 'boolean';
}

export function isString(data?: unknown): data is string {
    return typeof data === 'string';
}
