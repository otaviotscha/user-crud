import { Body, Delete, Get, HttpCode, JsonController, OnUndefined, Param, Post, Put } from 'routing-controllers'

/**
 * Types.
 */
import { UserCreationData, UserUpdateData } from './@types/User'

/**
 * Services.
 */
import * as userService from './service'

/**
 * Controller.
 */
@JsonController('/users')
export class UsersController {
  @Get('')
  @OnUndefined(204)
  getAll() {
    return userService.findMany()
  }

  @Get('/:id')
  @OnUndefined(500)
  getOne(@Param('id') id: string) {
    return userService.findOne(id)
  }

  @Post('')
  @HttpCode(201)
  @OnUndefined(500)
  post(@Body() users: UserCreationData) {
    return userService.create(users)
  }

  @Put('/:id')
  @HttpCode(200)
  @OnUndefined(204)
  put(@Param('id') id: string, @Body() data: UserUpdateData) {
    return userService.update(id, data)
  }

  @Delete('/:id')
  @OnUndefined(204)
  remove(@Param('id') id: string) {
    return userService.remove(id)
  }
}
