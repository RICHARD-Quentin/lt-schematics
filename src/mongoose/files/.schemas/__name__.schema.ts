import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

export type <%= classify(name) %>Document = <%= classify(name) %> & Document

@Schema({ versionKey: false })
export class <%= classify(name) %> {
  readonly _id: Types.ObjectId

  @Prop({ type: Map, default: {} })
  info: any

  @Prop({
    type: {
      createdBy: String,
      createdAt: Date,
      lastUpdateBy: String,
      lastUpdateAt: Date,
    },
    _id: false,
  })
  metadata: {
    createdBy: string
    createdAt: Date
    lastUpdateBy: string
    lastUpdateAt: Date
  }
}

export const <%= classify(name) %>Schema = SchemaFactory.createForClass(<%= classify(name) %>)
