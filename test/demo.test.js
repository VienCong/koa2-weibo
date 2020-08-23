function sum(a, b) {
    return a + b
}
test('test demo1', () => {
    const res = sum(10, 20)
    expect(res).toBe(30)
})
test('test demo2', () => {
    const res = sum(10, 20)
    expect(res).not.toBe(40)
})