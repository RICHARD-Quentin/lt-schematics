import { DeleteResult } from 'mongodb'
import { Test, TestingModule } from '@nestjs/testing'
import { <%= classify(name) %>Service } from './<%= dasherize(name) %>.service'
import { getModelToken } from '@nestjs/mongoose'
import { <%= classify(name) %> } from './schemas/<%= dasherize(name) %>.schema'
import { Model, Types } from 'mongoose'

describe('<%= classify(name) %>Service', () => {
  let service: <%= classify(name) %>Service
  let model: Model<<%= classify(name) %>>
  const _id = new Types.ObjectId()
  const date = new Date()
  const mock<%= classify(name) %>: <%= classify(name) %> = {
    _id,
    metadata: {
      createdAt: date,
      createdBy: 'console',
      lastUpdateAt: date,
      lastUpdateBy: 'console',
    },
    info: [],
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        <%= classify(name) %>Service,
        {
          provide: getModelToken(<%= classify(name) %>.name),
          useValue: Model,
        },
      ],
    }).compile()
    service = module.get<<%= classify(name) %>Service>(<%= classify(name) %>Service)
    model = module.get<Model<<%= classify(name) %>>>(getModelToken(<%= classify(name) %>.name))
  })

  describe('create', () => {
    it('should create a new record', async () => {
      const createTest = {}
      jest.spyOn(model, 'create').mockImplementationOnce(() => Promise.resolve(mock<%= classify(name) %>))
      const result = await service.create(createTest)
      expect(result).toEqual(mock<%= classify(name) %>)
    })
  })

  describe('search', () => {
    it('should return an array of records and total count', async () => {
      const expected = [mock<%= classify(name) %>]
      const total = 1
      jest.spyOn(model, 'countDocuments').mockResolvedValueOnce(total)
      jest.spyOn(model, 'find').mockResolvedValueOnce(expected)
      const [result, resultTotal] = await service.search()
      expect(result).toEqual(expected)
      expect(resultTotal).toEqual(total)
    })

    it('should return an empty array if no records are found', async () => {
      const expected = []
      const total = 0
      jest.spyOn(model, 'countDocuments').mockResolvedValueOnce(total)
      jest.spyOn(model, 'find').mockResolvedValueOnce(expected)
      const [result, resultTotal] = await service.search()
      expect(result).toEqual(expected)
      expect(resultTotal).toEqual(total)
    })
  })

  describe('read', () => {
    it('should return a <%= classify(name) %> record by ID', async () => {
      const expected = mock<%= classify(name) %>
      jest.spyOn(model, 'findById').mockResolvedValueOnce(expected)
      const result = await service.read(_id.toString())
      expect(result).toEqual(expected)
    })

    it('should return null if <%= classify(name) %> record is not found', async () => {
      const expected = null
      jest.spyOn(model, 'findById').mockResolvedValueOnce(expected)
      const result = await service.read('123')
      expect(result).toEqual(expected)
    })
  })

  describe('update', () => {
    it('should update a <%= classify(name) %> record by ID with metadata', async () => {
      const <%= dasherize(name) %>Dto = { info: { key: 'updated value' } }
      const newObject = { ...mock<%= classify(name) %> }
      const expected = newObject.info.push(<%= dasherize(name) %>Dto.info)
      jest.spyOn(model, 'findByIdAndUpdate').mockResolvedValueOnce(expected)
      const result = await service.update(_id.toString(), <%= dasherize(name) %>Dto)
      expect(result).toEqual(expected)
    })
  })

  describe('remove', () => {
    it('should remove a <%= classify(name) %> record by ID', async () => {
      const id = '123'
      const deleteResult: DeleteResult = { acknowledged: true, deletedCount: 1 }
      jest.spyOn(model, 'deleteOne').mockResolvedValueOnce(deleteResult)
      const result = await service.remove(id)
      expect(result).toEqual(deleteResult)
    })
  })
})
