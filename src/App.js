import { useState, useEffect, useRef } from 'react'
import './index.css'

import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a, b) => b.likes - a.likes) )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // console.log('blogs', blogs)
  const handleLogout = () => {
    console.log('handleLogout')
    // window.localStorage.clear()
    window.localStorage.removeItem('loggedBlogappUser')
    window.location.reload(false)
  }

  const handleLogin = async (event) => {
    console.log('innan inloggning', username, password)
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)

    } catch (exception) {
      setErrorMessage('wrong usernamne or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 2000)
    }
  }

  const createNewBlog = async (title, author, url) => {
    console.log('handleNewBlog', title, author, url)
    try {
      const blog = await blogService.create({
        title,
        author,
        url,
      })
      console.log('setBlogs', blog)
      setBlogs(blogs.concat(blog))
      setSuccessMessage(`a new blog ${blog.title} by ${blog.author} added`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 1000)
      // setTitel('')
      // setAuthor('')
      // setUrl('')
    }
    catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 2000)
    }
  }

  const updateLikes = async (blogId, blogToUpddate) => {
    // event.preventDefault()
    try {
      console.log('blogToUpddate.likes', blogToUpddate.likes)
      const updatedBlog = await blogService.update(blogId, blogToUpddate)
      blogService.getAll().then(blogs =>
        setBlogs( blogs.sort((a, b) => b.likes - a.likes) )
      )
      setSuccessMessage(`updated likes for title: ${updatedBlog.title}`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 1000)
    }
    catch (exception) {
      setErrorMessage('updated likes exception' + exception)
      setTimeout(() => {
        setErrorMessage(null)
      }, 2000)
    }
  }

  const deleteBlog = async (blogId) => {
    try {
      await blogService.remove(blogId)

      const updatedBlogs = blogs.filter((blog) => blog.id !== blogId)
      setBlogs( updatedBlogs.sort((a, b) => b.likes - a.likes) )
      setSuccessMessage('blog deleted')
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    }
    catch (exception) {
      setErrorMessage('updated likes exception' + exception)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification successMessage={successMessage} errorMessage={errorMessage}/>
        <form onSubmit={handleLogin}>
          <div>
            username:
            <input
              type='text'
              id='username'
              value={username}
              name='Username'
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password:
            <input
              type='password'
              id='password'
              value={password}
              name='Password'
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type='submit' id='login-button'>login</button>
        </form>
      </div>
    )
  }

  const blogFormRef = useRef()

  return (
    <div>
      {!user && loginForm()}
      {user && <div>
        <h2>blogs</h2>
        <Notification successMessage={successMessage} errorMessage={errorMessage}/>
        <p>{user.name} logged in <button id='logout' onClick={handleLogout}  >logout</button></p>
        <Togglable buttonLabel='new blog' ref={blogFormRef} >
          <BlogForm createNewBlog={createNewBlog} />  {/*title={title} setTitel={setTitel} author={author} setAuthor={setAuthor} url={url} setUrl={setUrl}/> */}
        </Togglable>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} updateLikes={updateLikes} deleteBlog={deleteBlog} username={username} />
        )}
      </div>
      }

    </div>
  )
}

export default App

// CI=true npm test
// npm run cypress:open
