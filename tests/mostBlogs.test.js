//Import function
const mostBlogs = require('../utils/test_functions').mostBlogs

//Import test/input data
const {noBlogs, singleBlog, blogsMultiple} = require('./testData')

describe('most blogs', () => {
    test('return undefined for no entries', () => {
        result = mostBlogs(noBlogs)
        expect(result).toBe(undefined)
    })


    //Single blog entry
    test('return correct object {author: x, blogs:y}', () => {
        mostBlogsExpected = {
            author: 'unknown',
            blogs: 1
        }
        result = mostBlogs(singleBlog)
        expect(result).toEqual(mostBlogsExpected)
    })

    //Multiple
    test('return correct object {author: x, blogs:y}', () => {
        mostBlogsExpected = {
            author: 'Robert C. Martin',
            blogs: 3
        }
        result = mostBlogs(blogsMultiple)
        expect(result).toEqual(mostBlogsExpected)
    })
})