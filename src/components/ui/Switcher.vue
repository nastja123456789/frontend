<template>
  <div class="switcher">
    <label
      :for="id"
      class="switcher__box"
    >
      <slot />
      <input
        :id="id"
        type="checkbox"
        @input="$emit('input', $event.target.checked)"
        class="switcher__input"
      >
      <span
        class="switcher__btn"
      />
    </label>
  </div>
</template>

<script>
export default {
  name: 'Switcher',
  props: {
    id: {
      type: String,
      default: ''
    },
    value: {
      type: Boolean,
      default: false
    }
  }
}
</script>
