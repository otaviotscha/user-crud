import { Body, Delete, Get, HttpCode, JsonController, OnUndefined, Param, Post, Put } from 'routing-controllers'
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi'

/**
 * Types.
 */
import { CreateAddressBody, CreateAddressResponse } from './@types/createAddress'
import { GetAddressResponse } from './@types/getAddress'
import { UpdateAddressBody, UpdateAddressResponse } from './@types/updateAddress'

/**
 * Services.
 */
import * as addressService from './service'

/**
 * Controller.
 */
@JsonController('/users/addresses')
export class AddressesController {
  @Get()
  @OpenAPI({ summary: 'Returns all addresses' })
  @ResponseSchema(GetAddressResponse, { isArray: true })
  @HttpCode(200)
  @OnUndefined(404)
  getAll() {
    return addressService.findMany()
  }

  @Get('/:id')
  @OpenAPI({ summary: 'Returns an address' })
  @ResponseSchema(GetAddressResponse)
  @HttpCode(200)
  @OnUndefined(404)
  getOne(@Param('id') id: string) {
    return addressService.findOne(id)
  }

  @Post()
  @OpenAPI({ summary: 'Creates an address' })
  @ResponseSchema(CreateAddressResponse)
  @HttpCode(201)
  @OnUndefined(400)
  post(@Body() addresses: CreateAddressBody) {
    return addressService.create(addresses)
  }

  @Put('/:id')
  @OpenAPI({ summary: 'Updates an address' })
  @ResponseSchema(UpdateAddressResponse)
  @HttpCode(200)
  @OnUndefined(400)
  put(@Param('id') id: string, @Body() data: UpdateAddressBody) {
    return addressService.update(id, data)
  }

  @Delete('/:id')
  @OpenAPI({ summary: 'Deletes an address' })
  @HttpCode(204)
  @OnUndefined(204)
  remove(@Param('id') id: string) {
    return addressService.remove(id)
  }
}
