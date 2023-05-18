const db = uniCloud.database()

// class Mycloud implements Cloud {
//   //添加数据
//   async add<t>(dbname: st, addObj: t) {
//     const res = await db.collection(dbname).add(addObj)
//     return res
//   }

//   //通过指定文档ID删除
//   async deleteID(dbname: st, id: st) {
//     const res = await db.collection(dbname).doc(`${id}`).remove()
//     return res
//   }

//   //条件查找文档后删除
//   async deleteWhere<t>(dbname: st, where: t) {
//     //例子
//     // .where("a>2")
//     // .where({
//     //   _id: dbCmd.neq(null)
//     // })

//     const res = await db.collection(dbname).where(where).remove()
//     return res
//   }

//   //更新单条数据
//   async dbupdate<t>(dbname: st, id: st, dbupdate: t): Promise<any> {
//     return await db.collection(dbname).doc(`${id}`).update(dbupdate)
//   }

//   // 更新多条数据
//   async updateds<a>(dbname: st, where: a, update: object) {
//     const res = await db.collection(dbname).where(where).update(update)
//     return res
//   }

//   // 根据id查找
//   async idFind(dbname: st, id: string): Promise<any> {
//     return await db.collection(dbname).doc(`${id}`).get()
//   }

//   //查找数据带分页
//   async find<t>(
//     dbname: st,
//     where: t,
//     pageNo?: number,
//     pageSize?: number,
//   ): Promise<any> {
//     let res!: Promise<any>
//     if (pageNo === undefined && pageSize === undefined) {
//       res = await db.collection(dbname).where(where).get()
//     } else {
//       res = await db
//         .collection(dbname)
//         .where(where)
//         .skip((pageNo - 1) * pageSize)
//         .limit(pageSize)
//         .get()
//     }
//     return res
//   }

//   //两表联合查询根据id查单条数据
//   async twoFind(
//     option1: TwoFind,
//     option2: { dbname: string; where?: any; field: string },
//   ) {
//     const db1 = db.collection(option1.dbname).where(option1.where).getTemp()
//     const db2 = db.collection(option2.dbname).field(option2.field).getTemp()
//     const res = await db.collection(db1, db2).get()
//     return res
//   }
// }

class Mycloud implements Cloud {
  //添加数据
  add<T>(dbname: st, option: T): Promise<any> {
    return db.collection(dbname).add(option)
  }

  //通过指定文档ID删除
  deleteID(dbname: st, id: st): Promise<any> {
    return db.collection(dbname).doc(`${id}`).remove()
  }

  //条件查找文档后删除
  deleteWhere<T>(dbname: st, where: T): Promise<any> {
    //例子
    // .where("a>2")
    // .where({
    //   _id: dbCmd.neq(null)
    // })
    return db.collection(dbname).where(where).remove()
  }

  //根据id更新数据
  dbupdate<T>(dbname: st, id: st, option: T): Promise<any> {
    return db.collection(dbname).doc(`${id}`).update(option)
  }

  //按照条件更新
  whereUpdate<T, U>(dbname: st, where: T, option: U): Promise<any> {
    return db.collection(dbname).where(where).update(option)
  }

  // 根据id查找
  idFind(dbname: st, id: st): Promise<any> {
    return db.collection(dbname).doc(`${id}`).get({ getCount: true })
  }

  //单纯查找不带条件
  lookFor(dbname: st, pageNo = 1, pageSize = 10): Promise<any> {
    return db
      .collection(dbname)
      .skip((pageNo - 1) * pageSize)
      .limit(pageSize)
      .get({ getCount: true })
  }

  //查找数据带分页
  find<T>(dbname: st, where: T, pageNo = 1, pageSize = 10): Promise<any> {
    return db
      .collection(dbname)
      .where(where)
      .skip((pageNo - 1) * pageSize)
      .limit(pageSize)
      .get({ getCount: true })
  }

  //两表联合查询根据id查单条数据
  twoFind<T, U>(
    option1: { dbname: string; where?: T; field?: string },
    option2: { dbname: string; where?: U; field: string },
  ) {
    const db1 = db.collection(option1.dbname)?.where(option1.where).getTemp()
    const db2 = db
      .collection(option2.dbname)
      ?.where(option2.where)
      .field(option2.field)
      .getTemp()
    return db.collection(db1, db2)
  }
}

export default new Mycloud()

//获取首页全部商品id
export const getCategoryId = async () => {
  let b!: any
  const db = uniCloud.database()
  await db
    .collection('opendb-mall-categories')
    .get()
    .then((res: any) => {
      const arr: any[] = []
      let obj: {
        [k: string]: any
      } = {}
      res.result.data.map((item: any) => {
        obj = item
        obj['value'] = item['_id']
        delete obj['_id']
        arr.push(obj)
      })
      arr.unshift({ value: '0', name: '全部商品' })
      b = arr
    })
    .catch((err: ErrorEvent) => {
      uni.showToast({
        title: err.message,
        icon: 'error',
        duration: 2000,
      })
    })
  return b
}

export const getAllGoods = async (pageNo?: number, pageSize?: number) => {
  let data!: any
  const file = `_id  ,category_id  ,last_modify_date,add_date,name,_id,month_sell_count,total_sell_count,comment_count,is_hot,goods_thumb,remain_count,is_real,is_on_sale,is_alone_sale,is_new,is_best`
  const db = uniCloud.database()
  const shangpingleibie = db
    .collection('opendb-mall-categories')
    .field('_id')
    .getTemp()
  const goods = db.collection('opendb-mall-goods').field(file).getTemp()
  const sku = db
    .collection('opendb-mall-sku')
    .field('goods_id,market_price,_id')
    .getTemp()

  if (!pageNo && !pageSize) {
    await db
      .collection(goods, sku, shangpingleibie)
      .get()
      .then((res) => {
        data = res
      })
      .catch((err) => {
        console.error(err)
      })
  } else {
    await db
      .collection(goods, sku, shangpingleibie)
      .skip((pageNo - 1) * pageSize)
      .limit(pageSize)
      .get()
      .then((res) => {
        data = res
      })
      .catch((err) => {
        console.error(err)
      })
  }
  return data
}

export const category = (
  categoryId: string | number,
  pageNo = 1,
  pageSize = 10,
): Promise<any> => {
  const db = uniCloud.database()
  const goods = db
    .collection('opendb-mall-goods')
    .where(`category_id=="${categoryId}"`)
    .getTemp()
  const sku = db
    .collection('opendb-mall-sku')
    .field('goods_id,market_price,_id')
    .getTemp()

  return db
    .collection(goods, sku)
    .skip((pageNo - 1) * pageSize)
    .limit(pageSize)
    .get()
  //   .then((res: any) => {
  //     data = res.result.data
  //     console.log('00000000', res.result.data)
  //   })
  // return data
}

// 根据关键词搜索icongoods商品
export const searchValue = (
  keyword: string,
  id?: string | number,
  pageNo = 1,
  pageSize = 10,
) => {
  const file = `_id  ,category_id  ,last_modify_date,add_date,name,_id,month_sell_count,total_sell_count,comment_count,is_hot,goods_thumb,remain_count,is_real,is_on_sale,is_alone_sale,is_new,is_best`
  const db = uniCloud.database()
  const good = db.collection('opendb-mall-goods').field(file).getTemp()
  const sku = db
    .collection('opendb-mall-sku')
    .field('goods_id,market_price,_id')
    .getTemp()

  if (id) {
    return db
      .collection(good, sku)
      .where(
        `${new RegExp(keyword, 'i')}.test(name)&&
  category_id=="${id}"`,
      )
      .skip((pageNo - 1) * pageSize)
      .limit(pageSize)
      .get()
  } else {
    return db
      .collection(good, sku)
      .where(`${new RegExp(keyword, 'i')}.test(name)`)
      .skip((pageNo - 1) * pageSize)
      .limit(pageSize)
      .get()
  }
}
