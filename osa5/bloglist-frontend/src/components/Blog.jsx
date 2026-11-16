import { useState } from 'react'

const Blog = ({ blog, addLike, handleRemove, user }) => {
  const handLike = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    addLike(blog.id, updatedBlog)
  }

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const showRemoveButton = blog.user?.username === user.username

  return (
    <div className="blog">
      <div style={hideWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible} className="blogDetails">
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>hide</button>
        <p>{blog.url}</p>
        <p>
          likes {blog.likes}
          <button onClick={handLike}>like</button>
        </p>
        <p>{blog.user?.name}</p>
        {showRemoveButton && (
          <button onClick={() => handleRemove(blog)}>remove</button>
        )}
      </div>
    </div>
  )
}

export default Blog
