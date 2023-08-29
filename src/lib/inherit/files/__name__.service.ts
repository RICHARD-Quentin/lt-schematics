import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { <%= classify(name) %>Dto } from './dto/<%= dasherize(name) %>.dto'
import { <%= classify(name) %> } from './schemas/<%= dasherize(name) %>.schema'
import { Model } from 'mongoose'

@Injectable()
export class <%= classify(name) %>Service extends <%= classify(inheritName)%>Service {
  constructor(
    @InjectModel(<%= classify(name) %>.name)
    protected model: Model<<%= classify(name) %>>,
  ) {
    super()
  }
}
