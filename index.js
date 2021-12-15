import levi from '@levi'
import routes from './router'

import { getProjects, getProject } from '@controllers/project.controller'

const port = 8082
const app = levi()

app.get('/', (req, res) => {
  res.send('Hello!')
})

app.get('/projects', getProjects)
app.get('/projects/:id', getProject)

app.listen(port, () => {
  console.log(`Server running at port ${port}`)
})
