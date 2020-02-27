<template>
  <button @click="clicked"><slot></slot></button>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator'

@Component({ name: 'AppButton' })
export default class AppButton extends Vue {
  @Emit()
  clicked(event: Event) {
    return event
  }
}
</script>

<style scoped></style>
