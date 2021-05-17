<template>
  <div class="vuertual-numeric-keyboard " role="group">
    <button
        v-for="key in keys"
        :key="key"
        @click="press(key)"
        class="btn btn-lg shadow-none"
        :class="keyTheme"
    >{{ key }}</button>
    <button class="btn btn-lg shadow-none" :class="buttonTheme" @click="clear()">&larr;</button>
    <button class="btn btn-lg shadow-none" :class="buttonTheme" @click="clear('all')">C</button>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css';


export default {
  props: ['selfValue'],
  data() {
    return {
      value: '',
      keys: [...Array(10).keys()],
      keyTheme: 'btn-keyboard',
      buttonTheme: 'btn-danger',
    };
  },
  methods: {
    
    press(key) {
      this.value = `${this.value}${key}`;
      
    },
    clear(type) {
      if (type === 'all') this.value = '';
      else this.value = this.value.substring(0, this.value.length - 1);
    },
  },
  watch: {
    value() {
      this.$emit('pressed', this.value);
    },
    selfValue() {
      this.value = this.selfValue;
    },
  },
  created() {
   
  },
};
</script>

<style scoped>
.vuertual-numeric-keyboard {
  display: grid;
  grid-template-columns: auto auto auto;
  grid-gap: 1px;
  width: 5px;
  height: 5px;

}
.vuertual-numeric-keyboard .btn {
  font-weight: bold;
}
.btn-keyboard {
  background-color: #80b6ff;
  color: #ffffff;
}
</style>
