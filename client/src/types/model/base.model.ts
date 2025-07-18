import { Id } from '@/types/other.type'

type BaseModel = {
  id: Id
} & MetaDataModel

type MetaDataModel = {
  dtCreated?: Date
  dtModified?: Date
  deleted: boolean
  createdBy?: string
  modifiedBy?: string
  deletedBy?: string
}

export type { BaseModel, MetaDataModel }
