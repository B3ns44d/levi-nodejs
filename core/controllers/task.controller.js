const db = require('@shared/utils/db.js')

const createTask = async (req, res) => {
  const { projectId, name, description, status, priority } = req.body
  try {
    const task = await db.task
      .create({
        data: {
          name,
          description,
          status,
          priority,
          projectId,
        },
      })
      .catch((e) => {
        throw e
      })
      .finally(async () => {
        await db.$disconnect()
      })
    return res.json({ success: `Task ${task.id} has been created successfully` })
  } catch (error) {
    console.error(error)
  }
}

const removeTask = async (req, res) => {
  const { id } = req.params
  try {
    const task = await db.task
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
    task.count === 1
      ? res.json({ success: 'Task has been deleted successfully' })
      : res.json({ error: 'Task not found' })
  } catch (error) {
    console.error(error)
  }
}

const updateTask = async (req, res) => {
  const { id } = req.params
  try {
    const task = await db.task
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
    task.count === 1
      ? res.json({ success: 'Task has been updated successfully' })
      : res.json({ error: 'Task not found' })
  } catch (error) {
    console.error(error)
  }
}

const getSingleTask = async (req, res) => {
  const { taskId } = req.params
  try {
    const task = await db.task
      .findMany({
        where: {
          id: {
            equals: taskId,
          },
        },
      })
      .catch((e) => {
        throw e
      })
      .finally(async () => {
        await db.$disconnect()
      })
    task ? res.json(task) : res.json({ error: 'Task not found' })
  } catch (error) {
    console.error(error)
  }
}

const getTasks = async (req, res) => {
  const { projectId } = req.params
  try {
    const tasks = await db.task
      .findMany({
        where: {
          projectId: {
            equals: projectId,
          },
        },
      })
      .catch((e) => {
        throw e
      })
      .finally(async () => {
        await db.$disconnect()
      })
    tasks ? res.json(tasks) : res.json({ error: 'No tasks found' })
  } catch (error) {
    console.error(error)
  }
}

module.exports = { createTask, removeTask, getSingleTask, getTasks }
