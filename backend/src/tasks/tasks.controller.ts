import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';


// handles api endpoints
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}                         // dependency injection

  @Post()
  async createTask(                                                                   // create a new task
    @Body()                                                                           // extracting data from request body
    body: {
      title: string;
      description?: string
    }
  ): Promise<Task> {
    const { title, description } = body;                                              // destructure body
    return this.tasksService.createTask(title, description);                          // call the service to create task
  }

  @Get()
  async getTasks(                                                                     // retrieve tasks
    @Query('status')                                                                  // extracting data from query param
    status?: 'Pending' | 'Completed'
  ): Promise<Task[]> {
    return this.tasksService.getTasks(status);                                        // call the service to retrieve tasks
  }

  @Put(':id')
  async updateTask(                                                                   // update/modify tasks
    @Param('id')                                                                      // extracting data from param
    id: number,
    @Body()                                                                           // extracting data from request body
    body: {
      title?: string;
      description?: string;
      status?: 'Pending' | 'Completed'
    },
  ): Promise<Task> {
    const { title, description, status } = body;                                      // destructure body
    return this.tasksService.updateTask(+id, title, description, status);             // call the service to modify task
  }

  @Delete(':id')
  async deleteTask(                                                                   // delete tasks
    @Param('id')                                                                      // extracting data from param
    id: number
  ): Promise<void> {
    return this.tasksService.deleteTask(+id);                                         // call the service to delete task
  }
}
