import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { <%= classify(name) %>Schema, <%= classify(name) %> } from './schemas/<%= dasherize(name) %>.schema'
import { <%= classify(name) %>Service } from './<%= dasherize(name) %>.service'
import { <%= classify(name) %>Controller } from './<%= dasherize(name) %>.controller'

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: <%= classify(name) %>.name,
        useFactory: () => <%= classify(name) %>Schema,
      },
    ]),
  ],
  providers: [<%= classify(name) %>Service],
  controllers: [<%= classify(name) %>Controller],
})
export class <%= classify(name) %>Module {}
