import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';


// tasks services
@Injectable()
export class TasksService {
  constructor(                                                                        // dependency injection
    @InjectRepository(Task)                                                           // inject task repo to typeorm
    private readonly taskRepository: Repository<Task>,                                // provide database operations
  ) {}

  async createTask(                                                                   // create new task function
    title: string,                                                                    // task title
    description?: string                                                              // task description
  ): Promise<Task> {
    const task = this.taskRepository.create({ title, description });                  // create new task instance
    return this.taskRepository.save(task);                                            // save to database
  }

  async getTasks(                                                                     // retrieve task function
    status?: 'Pending' | 'Completed'                                                  // task status
  ): Promise<Task[]> {
    if (status)                                                                       // status not null
      return this.taskRepository.find({ where: { status } });                         // get tasks for the status
    return this.taskRepository.find();                                                // get all tasks
  }

  async updateTask(                                                                   // modify task function
    id: number,                                                                       // task id
    title?: string,                                                                   // task title
    description?: string,                                                             // task description
    status?: 'Pending' | 'Completed',                                                 // task status
  ): Promise<Task> {
    const task = await this.taskRepository.findOneBy({ id });                         // get task for the id
    if (!task) throw new NotFoundException(`Task with ID ${id} not found`);           // if no id

    if (title) task.title = title;                                                    // modify title
    if (description) task.description = description;                                  // modify description
    if (status) task.status = status;                                                 // modify status

    return this.taskRepository.save(task);                                            // save to database
  }

  async deleteTask(                                                                   // delete task function
    id: number                                                                        // task id
  ): Promise<void> {
    const result = await this.taskRepository.delete(id);                              // delete task
    if (result.affected === 0)                                                        // if no results deleted
      throw new NotFoundException(`Task with ID ${id} not found`);                    // throw error
  }
}
