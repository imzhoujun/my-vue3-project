<template>
  <view class="p-[10px]">
    <view class="example">
      <!-- 自定义表单校验 -->
      <uni-forms
        ref="customForm"
        :rules="customRules"
        label-width="80px"
        :model-value="customFormData"
      >
        <uni-forms-item label="姓名" required name="name">
          <uni-easyinput
            v-model="customFormData.name"
            placeholder="请输入姓名"
          />
        </uni-forms-item>
        <uni-forms-item label="手机" required name="phone">
          <uni-easyinput
            v-model="customFormData.phone"
            placeholder="请输入手机号"
          />
        </uni-forms-item>
        <uni-forms-item label="所在地区" required name="address">
          <uni-data-picker
            v-model="classes"
            placeholder="请选择地址"
            popup-title="请选择所在地区"
            :preload="true"
            :step-searh="true"
            :localdata="dataTree"
            self-field="code"
            parent-field="parent_code"
            collection="mintz-city-data"
            orderby="value asc"
            field="code as value, name as text, eq(['$type', 4]) as isleaf"
            @change="onchange"
          >
            <!-- collection="mintz-city-data"这里是unicloud 的数据表的名称,eq(['$type', 3]) as isleaf 这里的3表示省市县镇四级,改成2就表示到省市县三级  改成4就表示到省市县镇村五级 -->
          </uni-data-picker>
        </uni-forms-item>
        <uni-forms-item label="详细地址" name="fullAddress" required>
          <uni-easyinput
            v-model="customFormData.fullAddress"
            type="textarea"
            placeholder="详细地址"
          />
        </uni-forms-item>
      </uni-forms>
      <button type="primary" @click="submit()">提交</button>
    </view>
  </view>
</template>

<script lang="ts" setup>
const customForm = ref()
const customFormData = ref({
  name: '',
  phone: '',
  address: '',
  fullAddress: '',
})
const customRules = ref({
  name: {
    rules: [
      {
        required: true,
        errorMessage: '姓名不能为空',
      },
    ],
  },
  phone: {
    rules: [
      {
        required: true,
        errorMessage: '手机号不能为空',
      },
      {
        validateFunction(
          rule: any,
          value: string,
          data: any,
          callback: Function,
        ) {
          const iphoneReg =
            /^(13[0-9]|14[1579]|15[0-3,5-9]|16[6]|17[0123456789]|18[0-9]|19[89])\d{8}$/ //手机号码
          if (!iphoneReg.test(value)) {
            callback('手机号码格式不正确，请重新填写')
          }
        },
      },
    ],
  },
  fullAddress: {
    rules: [
      {
        required: true,
        errorMessage: '详细地址不能为空',
      },
    ],
  },
})

const classes = ref('110101001001')

interface Tree {
  text: string
  value: string
  children?: Tree[]
}

const dataTree = ref<Tree[]>([
  {
    text: '北京市',
    value: '110000',
    children: [
      {
        text: '东城区',
        value: '110101',
        children: [
          {
            text: '东华门街道',
            value: '110101001',
            children: [
              {
                text: '多福巷社区',
                value: '110101001001',
              },
            ],
          },
        ],
      },
    ],
  },
])
const onchange = (e: any) => {
  console.log(e)
}

const submit = () => {
  customForm.value
    .validate()
    .then((res: any) => {
      console.log('success', res)
      uni.showToast({
        title: `校验通过`,
      })
    })
    .catch((err: any) => {
      console.log('err', err)
    })
}
onReady(() => {
  customForm.value.setRules(customRules.value)

  const arr = [
    { text: '北京市', value: '110000' },
    { text: '东城区', value: '110101' },
    { text: '东华门街道', value: '110101001' },
    { text: '多福巷社区', value: '110101001001' },
  ]

  // 定义一个函数，用于将一个对象转换成一个带有children属性的对象
  const convert = (obj: { text: string; value: string }) => {
    // 创建一个新的对象，复制obj的text和value属性
    const newObj: Tree = { ...obj }
    // 如果obj有下一个元素，则说明下一个元素是obj的子元素
    const nextIndex = array.indexOf(obj) + 1
    if (nextIndex < array.length) {
      // 创建一个空数组，用于存放obj的子元素
      newObj.children = []
      // 将下一个元素转换成带有children属性的对象，并添加到newObj的children数组中
      newObj.children.push(convert(array[nextIndex]))
    }
    // 返回新的对象
    return newObj
  }

  // 定义一个数组，存放原始数据
  let array = [
    { text: '天津市', value: '120000' },
    { text: '河西区', value: '120103' },
    { text: '桃园街道', value: '120103003' },
    { text: '西楼北里社区', value: '120103003006' },
  ]

  // 定义一个空数组，用于存放转换后的数据
  const result = []

  // 对第一个元素调用convert函数，并将返回值添加到result数组中
  result.push(convert(array[0]))

  // 打印result数组
  console.log(result)
  // const y = uni.$cloud.add('user-id-address', {
  //   _id: '64532023e766bb0085032f8b',
  //   name: '李四',
  //   mobile: '11111111111',
  //   area_code: '110101',
  //   address: '水水水水水水',
  // })
  // console.log(y)
})
</script>

<style lang="scss">
::v-deep .uni-data-tree {
  max-width: 275px;
}
</style>
