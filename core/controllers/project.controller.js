const db = require('@shared/utils/db.js')

const getProjects = async (req, res) => {
  try {
    const projects = await db.project
      .findMany()
      .catch((e) => {
        throw e
      })
      .finally(async () => {
        await db.$disconnect()
      })
    return res.send(projects)
  } catch (error) {
    console.error(error)
  }
}

const getProject = async (req, res) => {
  const { id } = req.params
  try {
    const project = await db.project
      .findFirst({
        where: {
          id: {
            equals: id,
          },
        },
      })
      .catch((e) => {
        throw e
      })
      .finally(async () => {
        await db.$disconnect()
      })
    project === null ? res.send('Project not found') : res.send(project)
  } catch (e) {
    console.error(e)
  }
}

const createProject = async (req, res) => {
  const { name, description } = req.body
  try {
    const project = await db.project
      .create({
        data: {
          name,
          description,
        },
      })
      .catch((e) => {
        throw e
      })
      .finally(async () => {
        await db.$disconnect()
      })
    return res.send(`Project ${project.id} has been created successfully`)
  } catch (error) {
    console.error(error)
  }
}

const updateProject = async (req, res) => {
  const { id } = req.params
  try {
    const project = await db.project
      .updateMany({
        where: {
          id: id,
        },
        data: {
          ...req.body,
        },
      })
      .catch((e) => {
        throw e
      })
      .finally(async () => {
        await db.$disconnect()
      })
    project.count === 1
      ? res.send('Project has been updated successfully')
      : res.send('Project not found')
  } catch (error) {
    console.error(error)
  }
}

const deleteProject = async (req, res) => {
  const { id } = req.params
  try {
    const project = await db.project
      .deleteMany({
        where: {
          id: {
            equals: id,
          },
        },
      })
      .catch((e) => {
        throw e
      })
      .finally(async () => {
        await db.$disconnect()
      })
    project.count === 1
      ? res.send('Project has been deleted successfully')
      : res.send('Project not found')
  } catch (error) {
    console.error(error)
  }
}

module.exports = {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
}
