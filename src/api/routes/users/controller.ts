import { Authorized, Body, CurrentUser, Delete, Get, HttpCode, JsonController, OnUndefined, Post, Put } from 'routing-controllers'
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi'

/**
 * Types.
 */
import { UserInfo } from '~/api/helpers/@types/token'
import { CreateUserRequest, CreateUserResponse } from './@types/createUser'
import { GetUserResponse } from './@types/getUser'
import { UpdateUserRequest, UpdateUserResponse } from './@types/updateUser'

/**
 * Services.
 */
import * as userService from './service'

/**
 * Controller.
 */
@JsonController('/user')
export class UsersController {
  @Get()
  @OpenAPI({ summary: 'Returns the logged user', security: [{ bearerAuth: [] }] })
  @ResponseSchema(GetUserResponse)
  @Authorized()
  @HttpCode(200)
  @OnUndefined(404)
  getOne(@CurrentUser() user: UserInfo) {
    return userService.findOne(user.id)
  }

  @Post()
  @OpenAPI({ summary: 'Creates a new user' })
  @ResponseSchema(CreateUserResponse)
  @HttpCode(201)
  @OnUndefined(400)
  post(@Body() users: CreateUserRequest) {
    return userService.create(users)
  }

  @Put()
  @Authorized()
  @OpenAPI({ summary: 'Updates the logged user', security: [{ bearerAuth: [] }] })
  @ResponseSchema(UpdateUserResponse)
  @HttpCode(200)
  @OnUndefined(400)
  put(@CurrentUser() user: UserInfo, @Body() data: UpdateUserRequest) {
    return userService.update(user.id, data)
  }

  @Delete()
  @Authorized()
  @OpenAPI({ summary: 'Deletes the logged user', security: [{ bearerAuth: [] }] })
  @HttpCode(204)
  @OnUndefined(204)
  remove(@CurrentUser() user: UserInfo) {
    return userService.remove(user.id)
  }
}
