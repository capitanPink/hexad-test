export interface IPost {
  id?: string,
  text?: string,
  likes?: number,
  timeToRead?: string,
  author?: IAuthor,
  comments: IComment[],
}

export interface IAuthor {
  id?: number,
  firstName?: string,
  lastName?: string,
  username?: string,
}

export interface IComment {
  userId?: string,
  message?: string,
}
