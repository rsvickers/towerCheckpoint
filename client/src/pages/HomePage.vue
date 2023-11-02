<template>
  <div class="container-fluid">
    <section class="row">
      <div class="col-12 ">
        
      </div>
      <div class="col-12 p-4">
        <div class="bg-secondary rounded-pill p-3 d-flex justify-content-around">
          <button class="btn btn-outline-light" @click="changeType('')">All</button>
          <button class="btn btn-outline-light" @click="changeType(types)" v-for="types in types" :key="types" >{{ types }}</button>
        </div>
      </div>
    </section>
    <section class="row">

      <div v-for="event in events" :key="event.id" class="col-md-3 col-12">
        <EventCardComponent :eventProp="event" />
      </div>
    </section>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import Pop from '../utils/Pop.js';
import { eventsService } from '../services/EventsService'
import { AppState } from '../AppState';
import EventCardComponent from '../components/EventCardComponent.vue';

export default {
    setup() {
      const types = ["concert", "convention", "sport", "digital"]
      const filteredType = ref("")
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
          types,
          filteredType,
            // NOTE will change this computed later with the filter
            events: computed(() => {
              if (filteredType.value) {
                return AppState.events.filter((event) => event.type == filteredType.value)
              } else {
                return AppState.events
              }
            }),



            changeType(type) {
              filteredType.value = type
            },
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

   .myImg {
    height: 25vh;
   }
  }
}
</style>
