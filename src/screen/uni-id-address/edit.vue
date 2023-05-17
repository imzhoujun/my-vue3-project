<template>
  <view class="uni-container">
    <uni-forms
      ref="form"
      :model="formData"
      validate-trigger="submit"
      err-show-type="toast"
    >
      <uni-forms-item name="name" label="收货人" required>
        <uni-easyinput
          v-model="formData.name"
          placeholder="收货人"
          trim="both"
        ></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="mobile" label="手机号" required>
        <uni-easyinput
          v-model="formData.mobile"
          placeholder="手机号码，加密存储"
          trim="both"
        ></uni-easyinput>
      </uni-forms-item>

      <uni-forms-item name="area_code" label="省市区" required>
        <uni-data-picker
          v-model="formData.area_code"
          self-field="code"
          parent-field="parent_code"
          collection="mintz-city-data"
          orderby="value asc"
          field="code as value, name as text, eq(type, 2) as isleaf"
          @change="onchange"
        ></uni-data-picker>
      </uni-forms-item>
      <uni-forms-item name="address" label="详细住址" required>
        <uni-easyinput
          v-model="formData.address"
          placeholder="省市区后面的详细住址，包含街道小区房间号"
          trim="both"
        ></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="is_default" label="默认地址">
        <switch :checked="formData.is_default" @change="switchChange"></switch>
      </uni-forms-item>
      <view class="uni-button-group">
        <button type="primary" class="uni-button" @click="submit">提交</button>
      </view>
    </uni-forms>
  </view>
</template>

<script setup lang="ts">
import useAdress from '@/hooks/useadress'
import MyRouter from '@/util/router'

const { userId, dataLength, form, formData, onchange, switchChange, rules } =
  useAdress()

const formDataId = ref<string>('')
// const isFlag = ref<boolean>(false)

// 表单验证
const submit = () => {
  uni.showLoading({
    mask: true,
  })
  form.value
    .validate()
    .then((res: Response) => {
      console.log(res, '验证返回的数据')
      let data: {
        [key: string]: any
      } = {}
      if (dataLength.value > 1) {
        data = {
          area_name: formData.value.area_name,
          ...res,
        }
      } else if (dataLength.value == 1) {
        data = {
          ...res,
          area_name: formData.value.area_name,
          is_default: true,
        }
      }
      return submitForm(data)
    })
    .catch(() => {})
    .finally(() => {
      uni.hideLoading()
    })
}

//验证成功提交数据
const submitForm = async (value: any) => {
  const db = uniCloud.database()
  const dbCollectionName = 'uni-id-address'
  if (dataLength.value > 1 && formData.value.is_default == true) {
    await db
      .collection(dbCollectionName)
      .where(`user_id=="${userId.value}"&&is_default==true`)
      .update({ is_default: false })
      .then((res: Response) => {
        console.log('修改成功', res)
        MyRouter.back()
      })
      .catch((err) => {
        uni.showModal({
          content: err.message || '请求服务失败',
          showCancel: false,
        })
      })
  }

  await uni.$cloud
    .dbupdate('uni-id-address', formDataId.value, value)
    .then((res: Response) => {
      console.log('修改成功', res)
    })
    .catch((err: Error) => {
      uni.showModal({
        content: err.message || '请求服务失败',
        showCancel: false,
      })
    })
}

const getDetail = (id: string) => {
  uni.showLoading({
    mask: true,
  })
  uni.$cloud
    .idFind('uni-id-address', id)
    .then((res) => {
      const data = res.result.data[0]
      if (data) {
        formData.value = data
      }
    })
    .catch((err) => {
      uni.showModal({
        content: err.message || '请求服务失败',
        showCancel: false,
      })
    })
    .finally(() => {
      uni.hideLoading()
    })
}

onLoad((e: any) => {
  if (e.id) {
    const id = e.id
    formDataId.value = id
    dataLength.value = e.length
    getDetail(id)
  }
})

onReady(() => {
  form.value.setRules(rules.value)
})
</script>

<style>
.uni-container {
  padding: 15px;
}

.uni-input-border,
.uni-textarea-border {
  width: 100%;
  font-size: 14px;
  color: #666;
  border: 1px #e5e5e5 solid;
  border-radius: 5px;
  box-sizing: border-box;
}

.uni-input-border {
  padding: 0 10px;
  height: 35px;
}

.uni-textarea-border {
  padding: 10px;
  height: 80px;
}

.uni-button-group {
  margin-top: 50px;
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  justify-content: center;
}

.uni-button {
  width: 184px;
}
</style>
