<template>
  <div>
    <template v-if="state.matches({ idle: 'success' })">
      <checkbox-group @change="change"
        ><label
          v-for="(item, index) in products"
          :key="index"
          class="flex box-border p-[10px] bg-white mb-[10px]"
        >
          <checkbox
            class="round red"
            :value="item.goods_id"
            :checked="item.ischeck"
          />
          <div>{{ item.name }}</div>
        </label>
      </checkbox-group>
    </template>
    <div v-for="(item, index) in products" :key="index">{{ item.ischeck }}</div>
    {{ totalPrice }}
  </div>
</template>

<script setup lang="ts">
import { useCartMachine } from '@/machine/useCartMachine'
const { state, send } = useCartMachine()
const products = ref<any>()
products.value = computed(() => state.value.context.cartList).value
const change = (e) => {
  const arr = products.value
  const checkedArr = e.detail.value
  console.log(arr)

  products.value.forEach((item: any, index: number) => {
    if (checkedArr.includes(item.goods_id)) {
      item.ischeck = true
      //   console.log(index)
      //   products.value[index].ischeck = true
    } else {
      item.ischeck = false
      //   products.value[index].ischeck = false
    }
  })
}

const totalPrice = computed(() =>
  products.value.reduce((acc, item) => {
    console.log(item)
    if (item.ischeck) {
      return acc + item.market_price * item.index
    } else {
      return acc
    }
  }, 0),
)

onMounted(async () => {
  if (state.value.context.cartList.length === 0) {
    send('Fetch')
  }
})
</script>

<style scoped></style>
