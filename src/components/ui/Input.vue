<template>
  <div
    :class="{'error': error && error.status}"
    class="inpt"
  >
    <input
      :id="id"
      :type="type"
      :value="value"
      @input="$emit('input', $event.target.value)"
      :placeholder="holder"
      :class="[classEl, 'inpt__input']"
    >

    <transition
      name="fade"
      mode="out-in"
    >
      <div
        v-if="error && error.status"
        class="error__text"
      >
        {{ error.text }}
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Input',
  props: {
    id: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    holder: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Number],
      required: true
    },
    classEl: {
      type: String,
      default: ''
    },
    error: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
