const dummy = require('../utils/test_functions')

test('dummy returns one', () => {
    const blogs = []
    const result = dummy(blogs)
    expect(result).toBe(1)
})