import { useState } from 'react'

const BlogForm = ({ createNewBlog }) => {
  const [title, setTitel]= useState('')
  const [author, setAuthor]= useState('')
  const [url, setUrl]= useState('')

  const handleNewBlog = async (event) => {
    event.preventDefault()
    await createNewBlog(title, author, url)
    setTitel('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={ handleNewBlog }>
        <div>
          title:
          <input
            type='text'
            value={title}
            name='title'
            id='title'
            onChange={({ target }) => setTitel(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type='text'
            value={author}
            name='author'
            id='author'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type='text'
            value={url}
            name='url'
            id='url'
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type='submit' id='createBlog'>create</button>
      </form>
    </div>
  )
}

export default BlogForm
