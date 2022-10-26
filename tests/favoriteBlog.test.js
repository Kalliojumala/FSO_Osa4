//Import function
const favoriteBlog = require('../utils/test_functions').favoriteBlog

//Import test/input data
const {noBlogs, singleBlog, blogsMultiple} = require('./testData')

describe('favorite blog', () => {
    //Test empty array
    test('return undefined with empty array', () => {
        result = favoriteBlog(noBlogs)
        expect(result).toBe(undefined)
    })

    //Test single blog array
    test('return the single item from the arr', () => {
        result = favoriteBlog(singleBlog)
        expect(result).toEqual(singleBlog[0])
    })

    //Test multiple blogs array
    test('return single correct blog item from the arr', () => {
        result = favoriteBlog(blogsMultiple)
        expect(result).toEqual(blogsMultiple[2])
    })
})