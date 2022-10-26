const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let likes = 0
    blogs.forEach(blog => {
        likes += blog.likes
    });

    return likes
}

const favoriteBlog = (blogs) => {
    let favorite = blogs[0] || undefined
    blogs.forEach(blog => {
        if(blog.likes > favorite.likes) {
            favorite = blog
        }
    })

    return favorite
}

module.exports = {dummy, totalLikes, favoriteBlog}