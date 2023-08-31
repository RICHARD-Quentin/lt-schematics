import { Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { <%= classify(inheritName) %> } from '<%= inheritPath %>/schemas/abstract.schema'

export type <%= classify(name) %>Document = <%= classify(name) %> & Document

@Schema({ versionKey: false })
export class <%= classify(name) %> extends <%= classify(inheritName) %>Schema {}

export const <%= classify(name) %>Schema = SchemaFactory.createForClass(<%= classify(name) %>)
