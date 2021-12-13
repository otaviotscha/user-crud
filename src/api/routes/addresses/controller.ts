import {
  Authorized,
  Body,
  CurrentUser,
  Delete,
  Get,
  HttpCode,
  JsonController,
  OnUndefined,
  Param,
  Post,
  Put,
  QueryParams
} from 'routing-controllers'
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi'

/**
 * Types.
 */
import { CreateAddressRequest, CreateAddressResponse } from './@types/createAddress'
import { GetAddressQuery, GetAddressResponse } from './@types/getAddress'
import { UpdateAddressRequest, UpdateAddressResponse } from './@types/updateAddress'
import { UserInfo } from '~/api/helpers/@types/token'

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
  @OpenAPI({ summary: `Returns many logged user's addresses`, security: [{ bearerAuth: [] }] })
  @ResponseSchema(GetAddressResponse, { isArray: true })
  @HttpCode(200)
  @OnUndefined(404)
  getMany(@CurrentUser() user: UserInfo, @QueryParams() queryParams: GetAddressQuery) {
    return addressService.findMany(user.id, queryParams)
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
  post(@CurrentUser() user: UserInfo, @Body() addresses: CreateAddressRequest) {
    return addressService.create(user.id, addresses)
  }

  @Put('/:id')
  @Authorized()
  @OpenAPI({ summary: `Updates a logged user's address`, security: [{ bearerAuth: [] }] })
  @ResponseSchema(UpdateAddressResponse)
  @HttpCode(200)
  @OnUndefined(400)
  put(@CurrentUser() user: UserInfo, @Param('id') addressId: string, @Body() data: UpdateAddressRequest) {
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
