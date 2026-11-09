const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }
  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  const reducer = blogs.reduce((favorite, item) => {
    if (item.likes > favorite.likes) {
      return item
    }
    else {
      return favorite
    }
  })

  return {
    title: reducer.title,
    author: reducer.author,
    likes: reducer.likes,
    url: reducer.url
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}