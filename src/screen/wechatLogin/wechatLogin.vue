<template>
  <div>
    <button open-type="getUserInfo" @getuserinfo="wechatLogin">
      获取头像昵称
    </button>
  </div>
</template>

<script setup lang="ts">
const data = ref<{
  useropenid?: string
  username: string
  userimg: string
  [key: string]: any
}>({
  username: '微信用户',
  userimg:
    'https://mp-6c0413ae-ffe0-416f-9cf2-a86c9d47758d.cdn.bspapp.com/cloudstorage/d5f5fa4c-6948-4d93-8daf-879a5bb73f6e.png',
})

const wechatLogin = () => {
  uni.showLoading({
    title: '加载中',
  })
  uni.login({
    provider: 'weixin', //使用微信登录
    success: async (res) => {
      const { code } = res

      await uniCloud
        .callFunction({
          name: 'getWeChatOpenid',
          data: { code },
        })
        .then(async (res1) => {
          // console.log(res1.result.openid, 'res1')
          data.value.useropenid = res1.result.openid
          const res2 = await uni.$cloud.find(
            'user-demo',
            `useropenid=="${res1.result.openid}"`,
          )
          // console.log(res2.result.data, '查找用户')
          if (res2.result.data.length < 1) {
            // 由于微信小程序政策无法获取用户的微信号的头像等信息,故当注册一个新用户时使用的是后台设置的默认头像和默认姓名
            try {
              const res3 = await uni.$cloud.add('user-demo', {
                useropenid: res1.result.openid,
              })
              console.log(res3, '创建用户成功')
              uni.setStorageSync('userData', data.value)
              uni.hideLoading()
            } catch (error) {
              uni.showToast({
                title: '创建用户失败',
              })
            }
            return
          }
          // console.log(res2.result.data[0], ',,,,,,,,,,,,,')

          data.value = { ...res2.result.data[0] }
          uni.setStorageSync('userData', data.value)
          uni.hideLoading()
          console.log(data.value, '11111111111111')
        })
    },
  })
}

onMounted(() => {})
</script>

<style scoped></style>
