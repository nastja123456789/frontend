<template>
  <div class="menu">
    <div class="menu__box">
      <table class="menu__table">
        <thead>
          <tr>
            <th>
              Наименование
            </th>
            <th>
              Цена
            </th>
            <th>
              Масса, г
            </th>
            <th>
              Калории
            </th>
          </tr>
        </thead>
        <tbody
          v-for="(item, i) in list"
          :key="i"
        >
          <tr class="menu__subhead">
            <td colspan="4">
              {{ i }}
            </td>
          </tr>
          <tr
            v-for="(child, c) in item"
            :key="c"
          >
            <td>
              {{ child.name }}
            </td>
            <td>
              {{ child.price }}
            </td>
            <td>
              {{ child.weight }}
            </td>
            <td>
              {{ child.calories }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageMenu',
  data () {
    return {
      list: null
    }
  },
  mounted () {
    this.getMenu()
  },
  methods: {
    async getMenu () {
      try {
        const response = await this.$api.get('/food')
        this.list = response.data && response.data.menu
      } catch (e) {
        console.log('err: ', e)
      }
    }
  }
}
</script>
