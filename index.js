import levi from '@levi'

import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} from '@controllers/project.controller'

const port = 8082
const app = levi()

app.get('/', (req, res) => {
  res.json({ message: 'Hello' })
})

app.get('/projects', getProjects)
app.get('/projects/:id', getProject)
app.post('/projects', createProject)
app.put('/projects/:id', updateProject)
app.omit('/projects/:id', deleteProject)

app.listen(port, () => {
  console.log(`Server running at port ${port}`)
})
