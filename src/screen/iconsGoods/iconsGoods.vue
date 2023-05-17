<template>
  <div id="IconsGoods">
    <section id="search_bar" class="bg-white">
      <uni-search-bar
        v-model="keyword"
        radius="99"
        focus
        clear-button="auto"
        cancel-button="none"
        @confirm="search"
      />
    </section>
    <section id="select_bar" class="bg-white">
      <div class="barList flex items-center justify-around pb-[10px]">
        <div
          class="bar_item"
          :class="{ active: activeColor == 0 }"
          @click="activeColor = 0"
        >
          综合
        </div>
        <div
          class="bar_item"
          :class="{ active: activeColor == 1 }"
          @click="activeColor = 1"
        >
          销量
        </div>
        <div
          class="bar_item flex"
          :class="{ active: activeColor == 2 }"
          @click="heightOrlow"
        >
          价格
          <div class="arrowBox flexCenter justify-center flex-col ml-[5px]">
            <i class="arrow up" :class="{ border_active: !isHeight }"></i>
            <i class="arrow down" :class="{ border_active: isHeight }"></i>
          </div>
        </div>
      </div>
    </section>
    <section id="goods">
      <div id="goods-item" class="p-[15px]">
        <div>
          <div
            v-for="item in goods.defaultList"
            :key="item._id._value"
            class="_items p-[6px] flex white mb-[9px]"
          >
            <div class="goods_img">
              <image :src="item.goods_thumb" class="w-[114px] h-[114px]">
              </image>
            </div>
            <div class="goods_context pl-[10px] flex flex-col justify-between">
              <div class="goods_title text-[14px] h-[34px]">
                <text>{{ item.name }}</text>
              </div>
              <div class="goods_price flex pt-[6px]">
                <div class="price text-[#4a90e2] flex-1">
                  <text>￥</text>
                  <text class="text-[18px]">{{
                    item._id['opendb-mall-sku'][0].market_price
                  }}</text>
                </div>
                <div class="cart_icon">
                  <uni-icons type="cart" size="20" color="#4a90e2"></uni-icons>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  <div>
    <i class="arrow up"></i>
    <!-- <i class="arrow down"></i> -->
  </div>
</template>

<script setup lang="ts">
import { useDebouncedRef } from '@/hooks/debounce'
import { category, searchValue } from '@/util/unicloud'

type List = {
  [key: string]: any
}
type obj = {
  defaultList: List[]
  defaultList2: List[]
}

const goods: obj = reactive({
  defaultList: [],
  defaultList2: [],
})
const isHeight = ref(false)
const cateID = ref<string | number>('0')
const activeColor = ref<string | number>('0')
const keyword = useDebouncedRef('', 1000)
watch(activeColor, (New, _Old) => {
  if (New == 0) {
    goods.defaultList = goods.defaultList2
  } else if (New == 1) {
    goods.defaultList = moreSales.value
  }
})

watch(keyword, (_New, _Old) => {
  if (_New != '') {
    searchValue(keyword.value).then((res) => {
      goods.defaultList = res.result.data
      goods.defaultList2 = res.result.data
      if (activeColor.value == 2 && !isHeight.value) {
        return (goods.defaultList = lowPrice.value)
      } else if (activeColor.value == 2 && isHeight.value) {
        return (goods.defaultList = heightPrice.value)
      } else if (activeColor.value == 1) {
        return (goods.defaultList = moreSales.value)
      }

      // console.log(res, 'search')
    })
  }
})

const heightOrlow = () => {
  if (activeColor.value == 2) {
    isHeight.value = !isHeight.value
  }
  if (!isHeight.value) {
    goods.defaultList = lowPrice.value
  } else {
    goods.defaultList = heightPrice.value
  }
  activeColor.value = 2
}

// // 销量
const moreSales = computed(() => {
  const arr = JSON.parse(JSON.stringify(goods.defaultList))

  arr.sort((a: any, b: any) => {
    return b.total_sell_count - a.total_sell_count
  })
  return arr
})

// //高价格
const heightPrice = computed(() => {
  const arr = JSON.parse(JSON.stringify(goods.defaultList))
  arr.sort((a: any, b: any) => {
    return (
      b._id['opendb-mall-sku'][0].market_price -
      a._id['opendb-mall-sku'][0].market_price
    )
  })

  return arr
})

// //低价格
const lowPrice = computed(() => {
  const arr = JSON.parse(JSON.stringify(goods.defaultList))
  arr.sort((a: any, b: any) => {
    return (
      a._id['opendb-mall-sku'][0].market_price -
      b._id['opendb-mall-sku'][0].market_price
    )
  })
  return arr
})

onLoad((options) => {
  const query = decodeURIComponent(options?.query)
  //页面传参
  const obj = JSON.parse(query)
  cateID.value = obj.id
  console.log(cateID.value)
})

const search = () => {}
// 所有商品
const allCategory = async (pageNo = 1, pageSize = 10) => {
  const db = uniCloud.database()
  const db1 = db.collection('opendb-mall-goods').getTemp()
  const db2 = db
    .collection('opendb-mall-sku')
    .field('goods_id,market_price,_id')
    .getTemp()
  return await db
    .collection(db1, db2)
    .skip((pageNo - 1) * pageSize)
    .limit(pageSize)
    .get()
    .then((res: any) => {
      goods.defaultList = res.result.data
      goods.defaultList2 = res.result.data
    })
}

onMounted(async () => {
  if (cateID.value == '0') {
    allCategory()
  } else {
    await category(cateID.value).then((res) => {
      goods.defaultList = res.result.data
      goods.defaultList2 = res.result.data
    })
  }
})
</script>

<style scoped lang="scss">
.active {
  color: #4a90e2;
}

.goods_title {
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; /* 这里是超出几行省略 */
  overflow: hidden;
  line-height: 1.2;
}

.arrow {
  border: solid #ccc;
  border-width: 0 1px 1px 0;
  display: inline-block;
  // padding: 1px;
  width: 4px;
  height: 4px;
}
.border_active {
  border-color: black;
}
.up {
  transform: rotate(-135deg);
}

.down {
  transform: rotate(45deg);
}
</style>
