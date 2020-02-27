<template>
  <label>
    <slot></slot>
    <input :value="value" @input="input" />
  </label>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'

@Component({ name: 'AppInput' })
export default class AppInput extends Vue {
  @Prop({ required: true })
  value!: string

  @Emit()
  input(event: Event) {
    return (event.target as HTMLInputElement)?.value
  }
}
</script>

<style scoped></style>
