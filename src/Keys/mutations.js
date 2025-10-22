export const taskMutationKeys = {
  add: () => ['addTasks'],
  update: (taskId) => ['deleteTask', taskId],
  delete: (taskId) => ['deleteTask', taskId],
}
