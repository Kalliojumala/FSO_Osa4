//Import function
const mostLikes = require('../utils/test_functions').mostLikes

//Import test/input data
const {noBlogs, singleBlog, blogsMultiple} = require('./testData')

describe('most likes', () => {
    test('return undefined for no entries', () => {
        result = mostLikes(noBlogs)
        expect(result).toBe(undefined)
    })


    //Single blog entry
    test('return correct object {author: x, Likes:y}', () => {
        mostLikesExpected = {
            author: 'unknown',
            likes: 5
        }
        result = mostLikes(singleBlog)
        expect(result).toEqual(mostLikesExpected)
    })

    //Multiple
    test('return correct object {author: x, Likes:y}', () => {
        mostLikesExpected = {
            author: 'Edsger W. Dijkstra',
            likes: 17
        }
        result = mostLikes(blogsMultiple)
        expect(result).toEqual(mostLikesExpected)
    })
})