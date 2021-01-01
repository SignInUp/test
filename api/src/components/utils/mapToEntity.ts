export default (from: any, matcher: object) : any => {
    const result : any = { }
    for (const field in matcher) {
        result[field] = from[field]
    }
    return result
}
