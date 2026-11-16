import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders title and author', () => {
  const blog = {
    title: 'Blog created for testing',
    author: 'Test Person',
    url: 'http://www.testblog.com',
    likes: 10,
  }

  const testUser = {
    username: 'testuser',
    name: 'Test User'
  }

  const { container } = render(<Blog blog={blog} user={testUser} />)

  const elements = screen.getAllByText('Blog created for testing', { exact: false })
  expect(elements[0]).toBeDefined()

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent('Test Person')

  const detailsDiv = container.querySelector('.blogDetails') 
  expect(detailsDiv).toHaveStyle('display: none')
})

test('clicking the view button displays all blog details', async () => {
  const blog = {
    title: 'Blog created for testing',
    author: 'Test Person',
    url: 'http://www.testblog.com',
    likes: 10,
  }
  const testUser = {
    username: 'testuser',
    name: 'Test User'
  }

  const { container } = render(<Blog blog={blog} user={testUser} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const detailsDiv = container.querySelector('.blogDetails') 
  expect(detailsDiv).not.toHaveStyle('display: none')
})
