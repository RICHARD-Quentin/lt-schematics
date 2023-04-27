import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
  HttpStatus,
  HttpException,
} from '@nestjs/common'
import { Request, Response } from 'express'
import { <%= classify(name) %>Dto } from './dto/<%= dasherize(name) %>.dto'
import { <%= classify(name) %> } from './schemas/<%= dasherize(name) %>.schema'
import { <%= classify(name) %>Service } from './<%= dasherize(name) %>.service'
import { DeleteResult } from 'mongodb'

@Controller('<%= camelize(name) %>')
export class <%= classify(name) %>Controller {
  constructor(private readonly service: <%= classify(name) %>Service) {}

  @Get()
  async search(
    @Req() req: Request,
    @Res() res: Response,
    @Query() query: any,
    @Query('itemsPerPage') itemsPerPage?: string,
    @Query('page') page?: string,
    @Query('sorts') sorts?: string | string[],
  ):Promise<Response<{ data: <%= classify(name) %>[]; total: number }>> {
    const payload = {
      data: [],
      total: 0,
    }

    const limit = parseInt(itemsPerPage) > 0 ? parseInt(itemsPerPage) : 999
    const skip = parseInt(page) > 0 ? limit * (parseInt(page) - 1) : 0
    const sort = sorts || { date: -1 }
    const projection = null
    try {
      const [data, total]: [<%= classify(name) %>[], number] = await this.service.search({
        query,
        projection,
        limit,
        skip,
        sort,
      })

      return res.status(HttpStatus.OK).json({
        data,
        total,
      })
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }

  @Get(':id')
  async read(@Param('id') id: string, @Res() res: Response): Promise<Response<{ data: <%= classify(name) %> }>> {
    try {
      const data = await this.service.read(id)
      return res.status(HttpStatus.OK).json(data)
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }

  @Post()
  async create(@Body() dto: <%= classify(name) %>Dto, @Res() res: Response): Promise<Response<{ data: <%= classify(name) %> }>> {
    try {
      const data = await this.service.create(dto)
      return res.status(HttpStatus.CREATED).json(data)
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: <%= classify(name) %>Dto, @Res() res: Response): Promise<Response<{ data: <%= classify(name) %> }>> {
    try {
      const result = await this.service.update(id, dto)
      return res.status(HttpStatus.OK).json(result)
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response): Promise<Response<{ data: DeleteResult }>> {
    try {
      const data = await this.service.remove(id)
      return res.status(HttpStatus.OK).json(data)
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }
}