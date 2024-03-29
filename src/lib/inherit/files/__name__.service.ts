import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { <%= classify(name) %> } from './schemas/<%= dasherize(name) %>.schema'
import { Model } from 'mongoose'
import { <%= classify(inheritName) %>Service } from '<%= inheritPath %>.service'

@Injectable()
export class <%= classify(name) %>Service extends <%= classify(inheritName)%>Service {
  constructor(@InjectModel(<%= classify(name) %>.name) protected model: Model<<%= classify(name) %>>,
  ) {
    super()
  }
}
