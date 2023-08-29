import { Controller } from '@nestjs/common'
import { <%= classify(name) %>Dto } from './dto/<%= dasherize(name) %>.dto'
import { <%= classify(name) %> } from './schemas/<%= dasherize(name) %>.schema'
import { <%= classify(name) %>Service } from './<%= dasherize(name) %>.service'

@Controller('<%= camelize(name) %>')
export class <%= classify(name) %>Controller extends <%= classify(inheritName) %>Controller {  
  constructor(private readonly service: <%= classify(inheritName) %>Service) {
    super()
  }
}