<template>
  <div>
    <div>用户资料</div>
  </div>
</template>

<script setup lang="ts">
interface GoodsId {
  add_date: number
  category_id: st
  comment_count: 0
  goods_thumb: st
  is_alone_sale: boolean
  is_best: boolean
  is_hot: boolean
  is_new: boolean
  is_on_sale: boolean
  is_real: boolean
  last_modify_date: number
  month_sell_count: number
  name: st
  remain_count: number
  total_sell_count: number
  _id: st
}
interface SkuId {
  is_seckill: boolean
  market_price: number
  price: number
  _id: st
}

interface DataItem {
  goods_id?: GoodsId[]
  index: number
  sku_id?: SkuId[]
  user_id?: st
  _id?: st
  combo_id?: st
  combo: DataItem[]
}

const db = uniCloud.database()
const db2 = db
  .collection('opendb-mall-sku')
  .field('_id,price,market_price,is_seckill')
  .getTemp()
const db3 = db
  .collection('user-cart')
  .where({
    user_id: '64532023e766bb0085032f8b',
  })
  .getTemp()

const newarr: DataItem[] = []
db.collection(db3, 'opendb-mall-goods', db2)
  .get()
  .then((res) => {
    // console.log(res)
    const a = res.result.data

    // 找到没有parentId的元素，作为根节点
    const root = a.find((item: DataItem) => !item.combo_id)

    // 如果存在根节点，将其添加到目标数组
    if (root) {
      newarr.push(root)
    }

    // 找到有parentId的元素，作为子节点
    const children = a.filter((item: DataItem) => item.combo_id)

    // 如果存在子节点，将其放入一个对象中，作为combo属性
    if (children.length > 0) {
      const combo = {
        combo: children,
        index: children[0].index,
      }
      // 将这个对象添加到目标数组
      newarr.push(combo)
    }
    console.log(newarr)
  })

// onMounted(async () => {
//   const cart = await db
//     .collection('user-cart')
//     .where({
//       user_id: '64532023e766bb0085032f8b',
//       goods_id: '6444a4ffe766bb00852f1343',
//     })
//     .get()

//   if (cart.result.data.length == 0) {
//     uni.$cloud
//       .add('user-cart', {
//         user_id: '64532023e766bb0085032f8b',
//         goods_id: '6444a4ffe766bb00852f1343',
//         sku_id: '64450713e766bb008555a638',
//       })
//       .then((res) => {
//         console.log(res)
//       })
//       .catch((err: Error) => {
//         console.log(err, '添加新数据报错啦')
//       })
//   } else {
//     uni.$cloud.dbupdate('user-cart', '645c6523f43e60d7b6fbf515', {
//       index: 2,
//     })
//   }
// })
</script>

<style scoped></style>
