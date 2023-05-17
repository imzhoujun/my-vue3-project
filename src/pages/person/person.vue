<template>
  <div>
    <section id="user_bg">
      <div class="user-bg">
        <div class="_bg relative">
          <image
            class="bg-[#4a90e2] w-[100%] h-[130px]"
            src="@img/person-bg.png"
          >
          </image>
          <div class="absolute pl-[20px] flex items-center h-[93px] top-0">
            <div class="user_img">
              <image class="w-[60px] h-[60px] rounded-full" src="@img/user.png">
              </image>
            </div>
            <div v-if="!userData" class="user_name pl-[13px]">
              <navigator url="../../screen/wechatLogin/wechatLogin">
                <div class="name flex items-center">
                  <div class="text-white">立即登录</div>
                  <div class="name_right">
                    <div class="edit_right cursor-pointer"></div>
                  </div>
                </div>
              </navigator>
            </div>
            <div v-else class="user_name pl-[13px]">
              <div class="name flex items-center">
                <div class="text-white">{{ userData.username }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="order">
      <div class="order_info p-[10px]">
        <div
          class="my_orders flex items-center mx-[15px] justify-between h-[35px] leading-[35px]"
          style="border-bottom: 1px solid #e8e8e8"
        >
          <div class="text-[14px]">我的订单</div>
          <div class="edit_right" style="border-color: #999"></div>
        </div>
        <div class="order_icons flex items-center justify-around py-[8px]">
          <div
            v-for="item in orderIcons.list"
            :key="item.id"
            class="icon_items w-[20%]"
          >
            <div class="imgs flex justify-center">
              <image
                class="w-[24px] h-[36px]"
                :src="`../../static/images/${item.name}.svg`"
              >
              </image>
            </div>
            <div class="title mt-[6px] text-center">{{ item.name }}</div>
          </div>
        </div>
      </div>
    </section>

    <section id="menus">
      <div class="menu_box px-[10px] pb-[10px]">
        <div class="pt-[20px] px-[8px]">
          <div
            v-for="item in orderIcons.menu"
            :key="item.id"
            class="menu_items"
          >
            <template v-if="item.id != 3">
              <navigator
                :url="`../../screen/${item.url}/${item.url}`"
                class="flex items-center justify-between items-center"
              >
                <div class="menu_left flex items-center">
                  <div class="svg p-[10px]">
                    <image
                      class="w-[24px] h-[24px]"
                      :src="`../../static/images/${item.name}.svg`"
                    >
                    </image>
                  </div>
                  <div class="menu_name">{{ item.name }}</div>
                </div>
                <div class="menu_right">
                  <div
                    class="menu_to edit_right"
                    style="border-color: #999"
                  ></div>
                </div>
              </navigator>
            </template>
            <template v-if="item.id == 3 && userData">
              <div
                class="flex items-center justify-between items-center"
                @click="clearStorage"
              >
                <div class="menu_left flex items-center">
                  <div class="svg p-[10px]">
                    <image
                      class="w-[24px] h-[24px]"
                      :src="`../../static/images/${item.name}.svg`"
                    >
                    </image>
                  </div>
                  <div class="menu_name">{{ item.name }}</div>
                </div>
                <div class="menu_right">
                  <div
                    class="menu_to edit_right"
                    style="border-color: #999"
                  ></div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
type items = { name: string; id: number; url?: string }
type List = {
  list: items[]
  menu: items[]
}

const orderIcons: List = reactive({
  list: [
    {
      name: '待付款',
      id: 0,
    },
    {
      name: '待发货',
      id: 1,
    },
    {
      name: '已发货',
      id: 2,
    },
    {
      name: '交易完成',
      id: 3,
    },
    {
      name: '交易关闭',
      id: 4,
    },
  ],
  menu: [
    {
      name: '我的优惠券',
      id: 0,
      url: '',
    },
    {
      name: '我的收藏',
      id: 1,
      url: '',
    },
    {
      name: '收货人地址',
      id: 2,
      url: 'userAddress',
    },
    {
      name: '退出登录',
      id: 3,
      url: '',
    },
  ],
})
const userData = ref(uni.getStorageSync('userData'))

const clearStorage = () => {
  uni.showModal({
    title: '确定退出登录?',
    success: (res) => {
      if (res.confirm) {
        console.log('用户点击确定')
        uni.removeStorageSync('userData')
        userData.value = uni.getStorageSync('userData')
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    },
  })
}
onMounted(() => {})
onShow(() => {
  userData.value = uni.getStorageSync('userData')
  // console.log(uni.getStorageSync('userData'), 'userdata')
})
</script>

<style lang="scss" scoped>
.edit_right {
  width: 6px;
  height: 6px;
  border-top: 1px solid #fff;
  border-right: 1px solid#fff;
  transform: rotate(45deg);
}
.menu_items {
  border-bottom: 1px solid #e8e8e8;
}
</style>
