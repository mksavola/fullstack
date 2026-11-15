import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }
  return <div className={notification.type}>{notification.message}</div>
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      setNotification({
        message: 'wrong username or password',
        type: 'error',
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    const returnedBlog = await blogService.create(blogObject)

    const blogByLoggedUser = {
      ...returnedBlog,
      user: {
        username: user.username,
        name: user.name,
      },
    }

    setBlogs(blogs.concat(blogByLoggedUser))
    setNotification({
      message: `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
      type: 'success',
    })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const addLike = async (id, blogObject) => {
    const updatedBlog = await blogService.update(id, blogObject)
    setBlogs(
      blogs.map((blog) =>
        blog.id === id ? { ...updatedBlog, user: blog.user } : blog,
      ),
    )
  }

  const sortByLikes = (a, b) => {
    return b.likes - a.likes
  }

  const handleRemove = async (blogToRemove) => {
    if (
      window.confirm(
        `Remove blog ${blogToRemove.title} by ${blogToRemove.author}?`,
      )
    ) {
      await blogService.remove(blogToRemove.id)
      setBlogs(blogs.filter((blog) => blog.id !== blogToRemove.id))
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification notification={notification} />
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />
      <div>
        <p>
          {user.name} logged in
          <button onClick={handleLogout}>logout</button>
        </p>
        <Togglable buttonLabel="create new blog">
          <BlogForm createBlog={addBlog} />
        </Togglable>
        {[...blogs].sort(sortByLikes).map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            addLike={addLike}
            handleRemove={handleRemove}
            user={user}
          />
        ))}
      </div>
    </div>
  )
}
export default App
