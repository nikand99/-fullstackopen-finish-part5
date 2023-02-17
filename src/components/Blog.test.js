import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    title: 'title',
    author: 'author',
    url: 'http://url-test.se',
    likes: 0,
    id: 'blog-id-31244312',
    user: {
      username: 'username',
      name: 'name',
    },
  }

  let component
  const mockHandler = jest.fn()

  beforeEach(() => {
    component = render(<Blog key={blog.id} blog={blog}  updateLikes={mockHandler} />)
  })

  test('Make a test, which ensures that if the like button is clicked twice step3', async () => {
    const user = userEvent.setup()
    const viewButton = component.getByText('view')
    await user.click(viewButton)

    const likeButton = component.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })

  test('checks that the blogs URL and number of likes are shown when the button view been pressed step2', async  () => {
    const element = screen.getByText(blog.url)
    expect(component.queryByText(element)).not.toBeInTheDocument()

    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const bloglikes = component.container.querySelector('.likes')
    await expect(bloglikes).toBeInTheDocument()

    const blogurl = component.container.querySelector('.url')
    await expect(blogurl).toBeInTheDocument()

  })

  test('Component displaying a blog renders the blogs title and author, but does not render its URL or number of likes by default. step1', () => {

    expect(component.container.querySelector('.title')).toHaveTextContent(
      blog.title
    )
    expect(component.container.querySelector('.author')).toHaveTextContent(
      blog.author
    )

    expect(component.container.querySelector('.url')).toHaveTextContent(
      blog.url
    )
    expect(component.queryByText('likes')).not.toBeInTheDocument()

    const element = screen.getByText(blog.url)
    expect(component.queryByText(element)).not.toBeInTheDocument()

  })
})
