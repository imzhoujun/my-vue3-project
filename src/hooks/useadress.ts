import { validator } from '@/util/uni-id-address'
type form = {
  user_id: string
  name: string
  mobile: string
  area_code: string
  address: string
  is_default: boolean
  area_name: string
}

const useAdress = () => {
  const userId = ref(uni.getStorageSync('userData')._id)
  const form = ref()
  const formData = ref<form>({
    user_id: uni.getStorageSync('userData')._id,
    name: '',
    mobile: '',
    area_code: '',
    address: '',
    is_default: false,
    area_name: '',
  })
  const formOptions = ref({})
  const dataLength = ref<number>(0)

  const getValidator = (fields: any) => {
    const result: {
      [keys: string]: any
    } = {}
    for (const key in validator) {
      if (fields.indexOf(key) > -1) {
        result[key] = validator[key]
      }
    }
    return result
  }

  const rules = ref({
    ...getValidator(Object.keys(formData)),
  })

  const onchange = (e: any) => {
    let str = ''
    e.detail.value.map((item: any) => (str += item.text))
    formData.value.area_name = str
  }

  const switchChange = (e: any) => {
    formData.value.is_default = e.detail.value
  }
  return {
    userId,
    dataLength,
    form,
    formData,
    formOptions,
    onchange,
    switchChange,
    rules,
  }
}
export default useAdress
