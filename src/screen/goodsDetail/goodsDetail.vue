<!-- eslint-disable vue/v-on-event-hyphenation -->
<template>
  <!-- 商品详情 -->
  <div v-if="data.length == 1">
    <div id="image_box" style="border: 1px solid rgba(0, 0, 0, 0.1)">
      <div id="swiper_box">
        <div class="img_one">
          <image :src="data[0].goods_thumb" style="width: 100%; height: 375px">
          </image>
        </div>
      </div>
    </div>
    <div id="info">
      <div id="info_box" class="bg-white">
        <div class="price pb-[12px] flex items-center">
          <div id="CNY" class="text-[13px] textColor self-end">￥</div>
          <div id="CNYnum" class="text-[24px] textColor">
            {{ data[0].market_price }}
          </div>
        </div>
        <div id="discount" class="flex justify-between items-center mb-[12px]">
          <div id="discountList" class="text-[14px] textColor flex">
            <span class="max-w-[270px] ellipsis-1 inline-block">
              <span
                class="discount_bg px-[6px] inline-block h-[20px] leading-[20px]"
                >满300减20</span
              >
              <span
                class="discount_bg px-[6px] ml-[6px] inline-block h-[20px] leading-[20px]"
                >满300减20</span
              >
              <span
                class="discount_bg px-[6px] ml-[6px] inline-block h-[20px] leading-[20px]"
                >满300减5</span
              >
            </span>
          </div>
          <div id="discount_detail">
            <div class="flex items-center textColor">
              <div>优惠</div>
              <div class="ml-[3px]">
                <uni-icons type="right" size="12" color="#4a90e2"></uni-icons>
              </div>
            </div>
          </div>
        </div>
        <div id="title" class="flex justify-between">
          <div id="title_left" class="mr-[30px]">
            <div id="title_text" class="text-[16px]">{{ data[0].name }}</div>
          </div>
          <div id="title_right" class="flex-shrink-0">
            <div id="share" class="flex flex-col items-center">
              <div id="icons">
                <uni-icons type="redo-filled" size="18"></uni-icons>
              </div>
              <p>分享</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="comment" class="px-[10px] bg-white pb-[50px]">
      <div class="com_top flexCenter justify-between mt-[10px] py-[10px]">
        <div class="text-[16px]">用户评价</div>
        <div>
          <text>16条评论</text>
          <uni-icons type="right" size="12"></uni-icons>
        </div>
      </div>
      <div class="user_comment">
        <div class="tags flexCenter my-[5px]">
          <div id="isImg" class="pd10">
            <text>有图</text>
            <text>12</text>
          </div>
          <div id="isLike" class="pd10">
            <uni-icons
              color="yellow"
              type="hand-up-filled"
              size="12"
            ></uni-icons>
            <text>11</text>
          </div>
          <div id="unlike" class="pd10">
            <uni-icons
              color="white"
              type="hand-down-filled"
              size="12"
            ></uni-icons>
            <text>3</text>
          </div>
        </div>
        <div
          class="user-list flexCenter py-[10px]"
          style="border-bottom: 1px solid rgba(0, 0, 0, 0.1)"
        >
          <div class="img_left mr-[15px] self-start">
            <image src="@img/八宝粥.jpg" class="user_img"> </image>
          </div>
          <div class="content-right" style="flex-shrink: 0; flex: 1">
            <div class="name_content flexCenter justify-between">
              <div class="name text-[16px]">城南旧事</div>
              <div class="comment_time">2023.02.20</div>
            </div>
            <div class="islike">
              <div class="flexCenter">
                <div class="mr-[5px]">
                  <uni-icons
                    color="orange"
                    type="hand-down-filled"
                    size="12"
                  ></uni-icons>
                </div>
                <div class="my-[10px]" style="color: rgba(0, 0, 0, 0.5)">
                  踩了该商品
                </div>
              </div>

              <div class="flexCenter" style="display: none">
                <div class="mr-[5px]">
                  <uni-icons
                    color="yellow"
                    type="hand-up-filled"
                    size="12"
                  ></uni-icons>
                </div>
                <div style="color: rgba(0, 0, 0, 0.5)">赞了该商品</div>
              </div>
            </div>
            <div class="user_text mb-[10px] text-[13px]">
              <text
                >伊利冰淇淋巧乐兹经典巧恋果雪糕冰棍冰激凌75g5支伊利冰淇淋巧乐兹经典巧恋果雪糕冰棍冰激凌75g5支</text
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="AddCart">
      <uni-goods-nav
        ref="goods"
        :fill="true"
        :options="options"
        :button-group="customButtonGroup"
        @click="onClick"
        @buttonClick="buttonClick"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartMachine } from '../../store/useCartMachine'
import debounce from '@/hooks/debounce'

type LikeClick = {
  index: number
  content: { text: st; icon: st; backgroundColor: st }
}

type DataInfo = {
  category_id: st
  comment_count: number
  goods_thumb: st
  is_best: boolean
  is_hot: boolean
  is_new: boolean
  is_on_sale: boolean
  is_real: boolean
  name: string
  month_sell_count: number
  remain_count: number
  total_sell_count: number
}

type GetData = DataInfo & {
  _id: {
    _value: st
    'opendb-mall-sku': {
      goods_id: st
      is_seckill: boolean
      market_price: number
      price: number
      _id: st
    }[]
  }
}

type SetData = DataInfo & {
  goods_id: st
  is_seckill: boolean
  market_price: number
  price: number
  _id: st
}

const { state, send } = useCartMachine()

const options = ref([
  {
    icon: 'chat',
    text: '客服',
  },
  // {
  //   icon: 'cart',
  //   text: '购物车',
  //   info: 2,
  // },
  {
    text: '收藏',
    icon: 'star-filled',
    backgroundColor: 'red',
  },
])
const customButtonGroup = ref([
  {
    text: '加入购物车',
    backgroundColor: 'linear-gradient(90deg, #1E83FF, #0053B8)',
    color: '#fff',
  },
  {
    text: '立即购买',
    backgroundColor: 'linear-gradient(90deg, #60F3FF, #088FEB)',
    color: '#fff',
  },
])
const data = ref<SetData[]>([])
const optionObj = ref<{ id: st; name: st }>()
const color = ref('#646566')
const likeFlag = ref(false)

watch(likeFlag, (n, _o) => {
  if (n) {
    color.value = 'red'
  } else if (n == false) {
    color.value = '#646566'
  }
})

const onClick = debounce((e: LikeClick) => {
  if (e.content.text == '收藏') {
    likeFlag.value = !likeFlag.value
    if (likeFlag.value) {
      uni.$cloud
        .add('user-like', {
          user_id: uni.$userData._id,
          goods_id: optionObj.value?.id,
        })
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      uni.$cloud
        .deleteWhere(
          'user-like',
          `user_id=="${uni.$userData._id}"&&goods_id=="${optionObj.value?.id}"`,
        )
        .then((res) => {
          console.log(res, '删除成功')
        })
        .catch((err) => {
          console.log(err, '删除失败')
        })
    }
  }
}, 500)

const buttonClick = (e: {
  index: number
  content: {
    text: st
    backgroundColor: st
    color: st
  }
}) => {
  // console.log(e.index)

  if (e.index === 0) {
    // 加入购物车
    updateIndex()

    // send('addItem', {
    //   user_id: '64532023e766bb0085032f8b',
    //   goods_id: optionObj.value?.id,
    //   sku_id: data.value[0]._id['opendb-mall-sku'][0]._id,
    // })
    // await uni.$cloud
    //   .add('user-cart', {
    //     user_id: '64532023e766bb0085032f8b',
    //     goods_id: optionObj.value?.id,
    //     sku_id: data.value[0]._id['opendb-mall-sku'][0]._id,
    //   })
    //   .then((_res: any) => {
    //     console.log(_res, '加入购物车成功')
    //   })
    //   .catch((_err: Error) => {
    //     console.log(_err, '加入购物车失败')
    //   })
    // await uni.$cloud
    //   .find('user-cart', {
    //     user_id: '64532023e766bb0085032f8b',
    //     goods_id: optionObj.value?.id,
    //     sku_id: data.value[0]._id['opendb-mall-sku'][0]._id,
    //   })
    //   .then((res) => {
    //     // console.log('有没有', res)
    //     if (res.result.data.length === 0) {
    //       return uni.$cloud.add('user-cart', {
    //         user_id: '64532023e766bb0085032f8b',
    //         goods_id: optionObj.value?.id,
    //         sku_id: data.value[0]._id['opendb-mall-sku'][0]._id,
    //       })
    //     } else if (res.result.data.length > 0) {
    //       db.collection('user-cart')
    //         .where({
    //           _id: '"6460904ef5cf3a2df4f6b097"',
    //         })
    //         .update({
    //          index:dbCmd.inc(1)
    //         })
    //     }
    //   })
    //   .then((res1) => {
    //     console.log(res1, '加入/更新购物车成功')
    //   })
    //   .catch((err1) => {
    //     console.log(err1, '加入购物车失败')
    //   })
  } else if (e.index === 1) {
    // 立即购买
  }
}

// 更新购物车收藏数
const updateIndex = () => {
  uniCloud
    .callFunction({
      name: 'cartIndexUpdate',
      data: {
        where: {
          user_id: uni.$userData._id,
          goods_id: optionObj.value?.id,
        },
      },
    })
    .then((res) => {
      // console.log(res, '数据请求')
      if (res.result.updated == 1) {
        // console.log('数据库中存在')
        send({ type: 'addItem', value: data.value })
        // console.log(state.value)
      } else if (res.result.updated == 0) {
        // console.log('数据库中不存在')
        AddCartItem()
      }
    })
}

const AddCartItem = async () => {
  return await uni.$cloud
    .add('user-cart', {
      user_id: '64532023e766bb0085032f8b',
      goods_id: optionObj.value?.id,
      sku_id: data.value[0]._id,
    })
    .then((_res: any) => {
      console.log(_res, '加入购物车成功')
      send({ type: 'addItem', value: data.value })
    })
    .catch((_err: Error) => {
      console.log(_err, '加入购物车失败')
    })
}

onLoad((options) => {
  const query = decodeURIComponent(options?.query)
  //页面传参
  const obj = JSON.parse(query)
  optionObj.value = obj
})

onMounted(async () => {
  const db1 = uni.$cloud
    .twoFind(
      {
        dbname: 'opendb-mall-goods',
        where: `_id=="${optionObj.value?.id}"`,
        field:
          '_id,category_id,name,keywords,goods_desc,goods_thumb,remain_count,month_sell_count,total_sell_count,comment_count,is_real,is_on_sale,is_best,is_new,is_hot',
      },
      {
        dbname: 'opendb-mall-sku',
        field: 'goods_id,market_price,price,is_seckill',
      },
    )
    .get()

  const db2 = uni.$cloud.find(
    'user-like',
    `user_id=="${uni.$userData._id}"&&goods_id=="${optionObj.value?.id}"`,
  )

  await Promise.all([db1, db2]).then((res) => {
    const getRes: GetData[] = res[0].result.data
    // console.log(getRes)
    data.value = [{ ...getRes[0], ...getRes[0]._id['opendb-mall-sku'][0] }]
    console.log(data.value, 'data')

    if (res[1].result.data.length > 0) {
      likeFlag.value = true
    }
  })

  if (state.value.context.cartList.length === 0) {
    send('Fetch')
  }
  // console.log(state,'xstate');
})
</script>

<style scoped lang="scss">
::v-deep.uniui-star-filled {
  color: v-bind(color) !important;
}

#image_box {
  width: 100%;
  height: 375px;
}
#info_box {
  padding: 16px 15px 14px;
}

.textColor {
  color: #4a90e2;
}
.discount_bg {
  background-color: rgba(74, 144, 226, 0.08);
}

#AddCart {
  position: fixed;
  width: 100%;
  bottom: 0;
}
.pd10 {
  padding: 2px 5px;
  background: orange;
  margin-right: 10px;
  border-radius: 05px;
}
.user_img {
  border-radius: 50%;
  width: 35px;
  height: 35px;
  border: 1px solid rgba(0, 0, 0, 0.1);
}
</style>
