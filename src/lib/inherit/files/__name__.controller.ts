import { Controller } from '@nestjs/common'
import { <%= classify(name) %>Dto } from './dto/<%= dasherize(name) %>.dto'
import { <%= classify(name) %>Service } from './<%= dasherize(name) %>.service'
import { <%= classify(inheritName) %>Controller } from '<%= inheritPath %>.controller'

@Controller('<%= camelize(name) %>')
export class <%= classify(name) %>Controller extends <%= classify(inheritName) %>Controller {  
  constructor(private readonly service: <%= classify(name) %>Service) {
    super()
  }
}