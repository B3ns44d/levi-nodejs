const getProjects = (req, res) => {
  res.send('getProjects')
}

const getProject = (req, res) => {
  res.send(`Hello ${req.params.id}`)
}

const createProject = (req, res) => {
  res.send(`createProject ${req.body.name}`)
}

const updateProject = (req, res) => {
  res.send(`updateProject ${req.params.id}`)
}

const deleteProject = (req, res) => {
  res.send(`deleteProject ${req.params.id}`)
}

module.exports = {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
}
