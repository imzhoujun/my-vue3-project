declare interface Cloud {
  add<T>(dbname: st, option: T): Promise<any>
  deleteID(dbname: st, id: st): Promise<any>
  deleteWhere<T>(dbname: st, where: T): Promise<any>
  dbupdate<T>(dbname: st, id: st, options: T): Promise<any>
  whereUpdate<T, U>(dbname: st, where: T, option: U): Promise<any>
  idFind(dbname: st, id: st): Promise<any>
  lookFor(dbname: st, pageNo?: number, pageSize?: number): Promise<any>
  find<T>(
    dbname: st,
    where: T,
    pageNo?: number,
    pageSize?: number,
  ): Promise<any>
  twoFind<T, U>(
    option1: { dbname: string; where?: T; field?: string },
    option2: { dbname: string; where?: U; field: string },
  )
}

type UserData = {
  userimg: st
  _id: st
  username: st
  useropenid?: st
  register_date?: number
}

declare module 'uview-plus' {
  global {
    interface Uni {
      $cloud: Cloud
      $userData: UserData
    }
  }
}
declare type st = string
