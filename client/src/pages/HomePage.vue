<template>
  <div class="container-fluid">
    <section class="row">
      <div class="col-12">Will put stuff here later</div>
      <div class="col-12">Will put navbar thingy here later</div>
    </section>
    <section class="row">

      <div v-for="event in events" :key="event.id" class="col-md-3 col-12">
        <EventCardComponent :eventProp="event" />
      </div>
    </section>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import Pop from '../utils/Pop.js';
import { eventsService } from '../services/EventsService'
import { AppState } from '../AppState';
import EventCardComponent from '../components/EventCardComponent.vue';

export default {
    setup() {
        onMounted(() => {
            getEvents();
        });
        async function getEvents() {
            try {
                await eventsService.getEvents();
            }
            catch (error) {
                Pop.error(error);
            }
        }
        return {
            // NOTE will change this computed later with the filter
            events: computed(() => AppState.events)
        };
    },
    components: { EventCardComponent }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
