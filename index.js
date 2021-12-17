import levi from '@levi'
import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} from '@controllers/project.controller'
import { createTask, removeTask, getSingleTask, getTasks } from '@controllers/task.controller'

const app = levi()
const port = 8082

app.get('/', (req, res) => {
  res.json({ message: 'Hello' })
})

app.get('/projects', getProjects)
app.get('/projects/:id', getProject)
app.post('/projects', createProject)
app.put('/projects/:id', updateProject)
app.omit('/projects/:id', deleteProject)

app.get('/task/:taskId', getSingleTask)
app.get('/task/projects/:projectId', getTasks)
app.post('/task', createTask)
app.omit('/task/:id', removeTask)

app.listen(port, () => {
  console.log(`Server running at port ${port}`)
})
