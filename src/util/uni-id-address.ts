// 表单校验规则由 schema2code 生成，不建议直接修改校验规则，而建议通过 schema2code 生成, 详情: https://uniapp.dcloud.net.cn/uniCloud/schema

const validator = {
  user_id: {
    rules: [
      {
        format: 'string',
      },
    ],
  },
  name: {
    rules: [
      {
        required: true,
      },
      {
        format: 'string',
      },
    ],
    title: '收货人',
    label: '收货人',
  },
  mobile: {
    rules: [
      {
        required: true,
      },
      {
        format: 'string',
      },
      {
        pattern: '^\\+?[0-9-]{3,20}$',
      },
    ],
    title: '手机号',
    label: '手机号',
  },
  province_code: {
    rules: [
      {
        format: 'string',
      },
    ],
    title: '省',
    label: '省',
  },
  city_code: {
    rules: [
      {
        format: 'string',
      },
    ],
    title: '市',
    label: '市',
  },
  area_code: {
    rules: [
      {
        required: true,
      },
      {
        format: 'string',
      },
    ],
    title: '省市区',
    label: '省市区',
  },
  address: {
    rules: [
      {
        required: true,
      },
      {
        format: 'string',
      },
    ],
    title: '详细住址',
    label: '详细住址',
  },
  is_default: {
    rules: [
      {
        format: 'bool',
      },
    ],
    title: '默认地址',
    defaultValue: false,
    label: '默认地址',
  },
}

const enumConverter = {}

function filterToWhere(filter: any, command: any) {
  const where = {}
  for (const field in filter) {
    const { type, value } = filter[field]
    switch (type) {
      case 'search':
        if (typeof value === 'string' && value.length) {
          where[field] = new RegExp(value)
        }
        break
      case 'select':
        if (value.length) {
          const selectValue = []
          for (const s of value) {
            selectValue.push(command.eq(s))
          }
          where[field] = command.or(selectValue)
        }
        break
      case 'range':
        if (value.length) {
          const gt = value[0]
          const lt = value[1]
          where[field] = command.and([command.gte(gt), command.lte(lt)])
        }
        break
      case 'date':
        if (value.length) {
          const [s, e] = value
          const startDate = new Date(s)
          const endDate = new Date(e)
          where[field] = command.and([
            command.gte(startDate),
            command.lte(endDate),
          ])
        }
        break
      case 'timestamp':
        if (value.length) {
          const [startDate, endDate] = value
          where[field] = command.and([
            command.gte(startDate),
            command.lte(endDate),
          ])
        }
        break
    }
  }
  return where
}

export { validator, enumConverter, filterToWhere }
