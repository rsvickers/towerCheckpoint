<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
   <EventModalComponent />
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'
import EventModalComponent from './components/EventModalComponent.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar, EventModalComponent }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root{
  --main-height: calc(100vh - 32px - 64px);
}


footer {
  display: grid;
  place-content: center;
  height: 32px;
  background-color: rgba(0, 63, 0, 0.649);
  color: white;
}
</style>
