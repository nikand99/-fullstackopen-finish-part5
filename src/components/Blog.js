import { useState } from 'react'

const Blog = ({ blog, updateLikes, deleteBlog, username }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [viewVisible, setViewVisible]= useState(false)

  const hideWhenVisible = { display: viewVisible ? 'none' : '' }
  const showWhenVisible = { display: viewVisible ? '' : 'none' }


  const handelLikes = () => {
    // console.log('blog.likes', blog.likes)
    const blogToUpddate = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
    }
    // console.log('blogToUpddate.likes', blogToUpddate.likes)
    updateLikes(blog.id, blogToUpddate)
  }

  const handelDeleteBlog = () => {
    if(window.confirm(`remowe blog ${ blog.title } by ${ blog.author }`)) {
      deleteBlog(blog.id)
    }
  }
  console.log('blog.user.username', blog.user.username)
  console.log('username', username)
  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        <span className='title'>{ blog.title } </span>
        <span className='author'>{ blog.author } </span>
        <button id='viewOneBlog' onClick={() => setViewVisible(true)}>view</button>
      </div>
      <div style={showWhenVisible} className="togglableContent" >
        <div>{ blog.title } { blog.author } <button id='blogHide' onClick={() => setViewVisible(false)}>hide</button></div>
        <div className='likes'>likes: { blog.likes } <button id='buttonLike' className='buttonLike' onClick={() => handelLikes()} >like</button></div>
        <div className='url'>{ blog.url }</div>
        <div>{blog.user.name}</div>
        {blog.user.username === username && (
          <div><button id='removeBlog' onClick={() => handelDeleteBlog()} >remove</button></div>
        )}
      </div>
    </div>
  )
}

export default Blog
