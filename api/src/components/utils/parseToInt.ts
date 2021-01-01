export default (value: unknown) : number => {
    if (typeof value === 'string') {
        const result = parseInt(value)
        if (result !== NaN) return result
        throw new TypeError('Value is not string')
    }
    throw new TypeError('Value is not string')
}