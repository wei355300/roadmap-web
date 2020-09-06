export namespace NTaskInterfaces {

  export interface ITask {
    id: string
    owner: string
    name: string
    description: string
    workspaceId: string
    creator: string
    status: string
    developer: string
    priority: string
    iterationId: string
  }

}