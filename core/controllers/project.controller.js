const getProjects = (req, res) => {
  res.send('getProjects')
}

const getProject = (req, res) => {
  res.send(`Hello ${req.params.id}`)
}

module.exports = {
  getProjects,
  getProject,
}
