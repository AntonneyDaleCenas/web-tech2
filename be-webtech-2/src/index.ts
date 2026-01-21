import { Hono } from 'hono'
import studentsRoute from './students/students.route'
import { testConnection } from './config/database'

const app = new Hono()

// Test database connection on startup
testConnection()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/', studentsRoute)

export default app