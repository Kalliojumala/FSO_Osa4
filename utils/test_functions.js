const dummy = (blogs) => {
    return 1
}

//Calculate total likes from array of blogs.
const totalLikes = (blogs) => {
    let likes = 0
    blogs.forEach(blog => {
        likes += blog.likes
    });

    return likes
}

//Iterate array of blogs, return blog entry with most likes
//Empty array returns undefined
//If most likes shared by several entries, return the first one in the array
const favoriteBlog = (blogs) => {
    let favorite = blogs[0] || undefined
    blogs.forEach(blog => {
        if (blog.likes > favorite.likes) {
            favorite = blog
        }
    })

    return favorite
}

const mostBlogs = (blogs) => {
    if (blogs.length < 1) {
        return undefined
    }
    //Sum up total blogs per writer
    let bloggers = {}
    blogs.forEach(({ author }) => {

        if (author in bloggers) {
            bloggers[author] += 1
        }
        else {
            bloggers[author] = 1
        }
    })

    //Sort bloggers Object in descending order, index 0 will
    //always contain max entry count and author name
    const sortedBloggersByValue = Object.entries(bloggers).sort(([, v1], [, v2]) => v2 - v1);

    //Name is at sBBV[0][0] and value at sBBV[0][1]
    return {author: sortedBloggersByValue[0][0], blogs: sortedBloggersByValue[0][1]}
}

const mostLikes = (blogs) => {
    if (blogs.length < 1) {
        return undefined
    }
    //Sum up total blogs per writer
    let bloggers = {}
    blogs.forEach(({ author, likes }) => {

        if (author in bloggers) {
            bloggers[author] += likes
        }
        else {
            bloggers[author] = likes
        }
    })

    //Sort bloggers Object in descending order, index 0 will
    //always contain max entry count and author name
    const sortedBloggersByValue = Object.entries(bloggers).sort(([, v1], [, v2]) => v2 - v1);

    //Name is at sBBV[0][0] and value at sBBV[0][1]
    return {author: sortedBloggersByValue[0][0], likes: sortedBloggersByValue[0][1]}
}



module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }