import { Body, Delete, Get, HttpCode, JsonController, OnUndefined, Param, Post, Put } from 'routing-controllers'
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi'

/**
 * Types.
 */
import { CreateUserBody, CreateUserResponse } from './@types/createUser'
import { GetUserResponse } from './@types/getUser'
import { UpdateUserBody, UpdateUserResponse } from './@types/updateUser'

/**
 * Services.
 */
import * as userService from './service'

/**
 * Controller.
 */
@JsonController('/users')
export class UsersController {
  @Get('/')
  @OpenAPI({ summary: 'Returns all users' })
  @ResponseSchema(GetUserResponse, { isArray: true })
  @HttpCode(200)
  @OnUndefined(204)
  getAll() {
    return userService.findMany()
  }

  @Get('/:id')
  @OpenAPI({ summary: 'Returns an user' })
  @ResponseSchema(GetUserResponse)
  @HttpCode(200)
  @OnUndefined(500)
  getOne(@Param('id') id: string) {
    return userService.findOne(id)
  }

  @Post('/')
  @OpenAPI({ summary: 'Creates an user' })
  @ResponseSchema(CreateUserResponse)
  @HttpCode(201)
  @OnUndefined(500)
  post(@Body() users: CreateUserBody) {
    return userService.create(users)
  }

  @Put('/:id')
  @OpenAPI({ summary: 'Updates an user' })
  @ResponseSchema(UpdateUserResponse)
  @HttpCode(200)
  @OnUndefined(204)
  put(@Param('id') id: string, @Body() data: UpdateUserBody) {
    return userService.update(id, data)
  }

  @Delete('/:id')
  @OpenAPI({ summary: 'Deletes an user' })
  @HttpCode(200)
  @OnUndefined(204)
  remove(@Param('id') id: string) {
    return userService.remove(id)
  }
}
