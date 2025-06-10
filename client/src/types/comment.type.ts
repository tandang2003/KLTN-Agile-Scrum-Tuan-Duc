type CommentType = {
  id: string
  from: string
  message: string
  createdAt: Date
}

type CommentReqType = {
  content: string,
}

type CommentResType = {
  from: string,
  content: string
}

export type {CommentType, CommentReqType, CommentResType}
