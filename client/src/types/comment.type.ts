type CommentType = {
  id: string
  from: string
  message: string
  createdAt: Date
}

type CommentReqType = {
  content: string
}

type CommentResType = {
  id: string
  from: string
  content: string
  createdAt: Date
}

export type { CommentType, CommentReqType, CommentResType }
