//Import function from utils
const totalLikes = require('../utils/test_functions').totalLikes
//Import input/test data
const {noBlogs, singleBlog, blogsMultiple} = require('./testData')

describe('total likes', () => {
    //Test empty array
    test('zero blogs to return 0', () => {
        const result = totalLikes(noBlogs)
        expect(result).toBe(0)
    })
    //Test single item return value
    test('when list only has a single blog, totalLikes returns its likes', () => {
        const result = totalLikes(singleBlog)
        expect(result).toBe(5)
    })

    //Test multiple items
    test('likes of a bigger list are summed correctly', () => {
    result = totalLikes(blogsMultiple)
    expect(result).toBe(36)
    })

})