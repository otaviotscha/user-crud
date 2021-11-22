import { Authorized, Body, CurrentUser, Delete, Get, HttpCode, JsonController, OnUndefined, Param, Post, Put } from 'routing-controllers'
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi'

/**
 * Types.
 */
import { CreateAddressBody, CreateAddressResponse } from './@types/createAddress'
import { GetAddressResponse } from './@types/getAddress'
import { UpdateAddressBody, UpdateAddressResponse } from './@types/updateAddress'
import { UserInfo } from '~/api/helpers/@types/userInfo'

/**
 * Services.
 */
import * as addressService from './service'

/**
 * Controller.
 */
@JsonController('/user/addresses')
export class AddressesController {
  @Get()
  @Authorized()
  @OpenAPI({ summary: `Returns all logged user's addresses`, security: [{ bearerAuth: [] }] })
  @ResponseSchema(GetAddressResponse, { isArray: true })
  @HttpCode(200)
  @OnUndefined(404)
  getAll(@CurrentUser() user: UserInfo) {
    return addressService.findMany(user.id)
  }

  @Get('/:id')
  @Authorized()
  @OpenAPI({ summary: `Returns one logged user's address`, security: [{ bearerAuth: [] }] })
  @ResponseSchema(GetAddressResponse)
  @HttpCode(200)
  @OnUndefined(404)
  getOne(@CurrentUser() user: UserInfo, @Param('id') addressId: string) {
    return addressService.findOne(user.id, addressId)
  }

  @Post()
  @Authorized()
  @OpenAPI({ summary: `Adds a new address to the current user`, security: [{ bearerAuth: [] }] })
  @ResponseSchema(CreateAddressResponse)
  @HttpCode(201)
  @OnUndefined(400)
  post(@CurrentUser() user: UserInfo, @Body() addresses: CreateAddressBody) {
    return addressService.create(user.id, addresses)
  }

  @Put('/:id')
  @Authorized()
  @OpenAPI({ summary: `Updates a logged user's address`, security: [{ bearerAuth: [] }] })
  @ResponseSchema(UpdateAddressResponse)
  @HttpCode(200)
  @OnUndefined(400)
  put(@CurrentUser() user: UserInfo, @Param('id') addressId: string, @Body() data: UpdateAddressBody) {
    return addressService.update(user.id, addressId, data)
  }

  @Delete('/:id')
  @Authorized()
  @OpenAPI({ summary: `Deletes a logged user's address`, security: [{ bearerAuth: [] }] })
  @HttpCode(204)
  @OnUndefined(204)
  remove(@CurrentUser() user: UserInfo, @Param('id') addressId: string) {
    return addressService.remove(user.id, addressId)
  }
}
