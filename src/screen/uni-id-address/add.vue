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
          placeholder="手机号码"
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

<script lang="ts" setup>
import useAdress from '@/hooks/useadress'

const { dataLength, form, formData, onchange, switchChange, rules } =
  useAdress()

const db = uniCloud.database()
const dbCollectionName = 'uni-id-address'

//表单验证
const submit = () => {
  uni.showLoading({
    mask: true,
  })
  form.value
    .validate()
    .then((res: Response) => {
      let data: {
        [key: string]: any
      } = {}
      if (dataLength.value == 0) {
        data = {
          user_id: uni.getStorageSync('userData')._id,
          area_name: formData.value.area_name,
          ...res,
          is_default: true,
        }
      } else if (dataLength.value > 0) {
        data = {
          user_id: uni.getStorageSync('userData')._id,
          area_name: formData.value.area_name,
          ...res,
        }
      }
      return submitForm(data)
    })
    .catch(() => {})
    .finally(() => {
      uni.hideLoading()
    })
}

const submitForm = async (value: unknown) => {
  console.log(value, 'v')

  // 使用 clientDB 提交数据
  return await db
    .collection(dbCollectionName)
    .add(value)
    .then((_) => {
      uni.showToast({
        icon: 'none',
        title: '新增成功',
      })

      setTimeout(() => uni.navigateBack(), 500)
    })
    .catch((err) => {
      uni.showModal({
        content: err.message || '请求服务失败',
        showCancel: false,
      })
    })
}

onReady(() => {
  form.value.setRules(rules.value)
})
onLoad((e: any) => {
  dataLength.value = e.length
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
