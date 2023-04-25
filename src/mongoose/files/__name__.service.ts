import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { <%= classify(name) %>Dto } from './.dto/<%= dasherize(name) %>.dto'
import { <%= classify(name) %> } from './.schemas/<%= dasherize(name) %>.schema'
import { Model, FilterQuery, QueryOptions } from 'mongoose'
import { DeleteResult } from 'mongodb'

@Injectable()
export class <%= classify(name) %>Service {
  constructor(
    @InjectModel(<%= classify(name) %>.name)
    protected model: Model<<%= classify(name) %>>,
  ) {}

  async create(<%= classify(name) %>Dto: <%= classify(name) %>Dto): Promise<<%= classify(name) %>> {
    const metadata = {
      createdBy: 'console',
      createdAt: new Date(),
      lastUpdateBy: 'console',
      lastUpdateAt: new Date(),
    }
    const new<%= classify(name) %> = new this.model({ ...<%= classify(name) %>Dto, metadata })
    return await new<%= classify(name) %>.save()
  }

  async search(
    parameters?: FilterQuery<any>,
    projection?: any,
    options?: QueryOptions,
  ): Promise<[<%= classify(name) %>[], number]> {
    const total = await this.model.countDocuments(parameters).exec()
    const recs =
      total > 0
        ? await this.model.find(parameters, projection, options).exec()
        : []
    return [recs, total]
  }

  async read(id: string): Promise<<%= classify(name) %> | null> {
    return this.model.findById(id).exec()
  }

  async update(id: string, <%= classify(name) %>Dto: <%= classify(name) %>Dto): Promise<<%= classify(name) %> | null> {
    const metadata = {
      lastUpdateBy: 'console',
      lastUpdateAt: new Date(),
    }
    return this.model.findByIdAndUpdate(id, { ...<%= classify(name) %>Dto, metadata }, { new: true }).exec()
  }

  async remove(id: string): Promise<DeleteResult> {
    return await this.model.deleteOne({ _id: id }).exec()
  }
}
