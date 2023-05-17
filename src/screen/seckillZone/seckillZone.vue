<template>
  <div>
    <section id="count_down_top">
      <div id="bg" class="h-[100px] bg-[#4a90e2]">
        <div id="title" class="flex items-center">
          <div class="line mr-[12px]"></div>
          <div class="text-[15px] text-white">距离活动结束仅剩</div>
          <div class="line ml-[12px]"></div>
        </div>
        <div class="count_down">
          <secKill :end-time="endTime" class="flex justify-around"> </secKill>
        </div>
      </div>
    </section>
    <section id="secKillList">
      <div class="list mt-[-20px]">
        <div
          v-for="(item, index) in seckill"
          :key="index"
          class="content mx-[10px] mb-[6px] bg-white rounded-[5px]"
        >
          <template v-if="item.remain_count != 0">
            <div class="items p-[10px] flexCenter">
              <div class="items_left relative">
                <div>
                  <image
                    :src="item.goods_thumb"
                    class="w-[116px] h-[116px] rounded-[5px]"
                  >
                  </image>
                </div>
                <div class="count_down_box absolute bottom-0 w-[100%]">
                  <secKill
                    :end-time="endTime"
                    :is-default="false"
                    class="flex justify-around"
                  >
                    <template #right
                      ><div class="ml-[4px] text-white">结束</div></template
                    >
                  </secKill>
                </div>
              </div>
              <div class="items_right flex flex-col w-[194px] ml-[5px]">
                <div class="title_top mb-[36px] text-[15px]">
                  {{ item.name }}
                </div>
                <div class="price_btn_bottom flex items-center justify-between">
                  <div class="bottom_left">
                    <text class="textColor text-[14px]"
                      >￥{{ item._id['opendb-mall-sku'][0].price }}</text
                    >
                    <text
                      class="text-[#999999] ml-[5px]"
                      style="text-decoration-line: line-through"
                      >￥{{ item._id['opendb-mall-sku'][0].market_price }}</text
                    >
                  </div>
                  <div class="bottom_right">
                    <button class="btn textColor">立即秒杀</button>
                  </div>
                </div>
              </div>
            </div></template
          >
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const endTime = ref('2023-06-30')
const seckill = ref<any[]>([])

onMounted(async () => {
  await uni.$cloud
    .twoFind(
      { dbname: 'opendb-mall-goods', where: { is_seckill: true } },
      { dbname: 'opendb-mall-sku', field: 'goods_id,price,market_price' },
    )
    .skip((1 - 1) * 10)
    .limit(10)
    .get({ getCount: true })
    .then((res: any) => {
      console.log(res)

      seckill.value = res.result.data
    })
    .catch((err: Error) => {
      console.log(err)
    })
})
</script>

<style scoped lang="scss">
#bg {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
#title {
  height: 35px;
  line-height: 35px;
}
.line {
  width: 50px;
  height: 1px;
  background: #fff;
  opacity: 0.3;
}
.count_down {
  height: 48px;
}

.btn {
  height: 26px;
  line-height: 24px;
  font-size: 12px;
  padding: 0;
  width: 67px;
  border: 1px solid #4a90e2;
  background-color: transparent;
  border-radius: 24px;
  position: relative;
  right: -10px;
  &:active {
    background-color: #dedede;
    color: rgba(0, 0, 0, 0.6);
  }
}
.title_top {
  height: 42px;
  overflow: hidden;
  line-height: 1.4;
}
.count_down_box {
  height: 26px;
  line-height: 26px;
  background: rgba(0, 0, 0, 0.5);
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}
</style>
