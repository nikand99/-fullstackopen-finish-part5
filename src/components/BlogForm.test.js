import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'

import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('Test new blog form. Check the form calls the event handler it received as props with the right details when a new blog is created. step4', async () => {
  const mockHandler = jest.fn()
  const user = userEvent.setup()

  const { container } = render(<BlogForm createNewBlog={mockHandler} />)

  const inputTitle = container.querySelector('input[name=\'title\']')
  const inputAuthor = container.querySelector('input[name=\'author\']')
  const inputUrl = container.querySelector('input[name=\'url\']')

  const buttonSubmit = screen.getByText('create')

  await user.type(inputTitle, 'title')
  await user.type(inputAuthor, 'author')
  await user.type(inputUrl, 'http://test.se')
  await user.click(buttonSubmit)

  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler.mock.calls[0][0]).toBe('title')
  expect(mockHandler.mock.calls[0][1]).toBe('author')
  expect(mockHandler.mock.calls[0][2]).toBe('http://test.se')
})
