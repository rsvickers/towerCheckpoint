<template>

<section class="row">

  <h1>My Events</h1>
  <div v-for="event in events" :key="event.id" class="col-md-3 col-12">
    <EventCardComponent :eventProp="event" />
  </div>
</section>
  
  
  

</template>

<script>
import EventCardComponent from '../components/EventCardComponent.vue';
import { computed, onMounted } from 'vue';
import Pop from '../utils/Pop.js';
import { ticketsService } from '../services/ticketsService.js'
import { AppState } from '../AppState';
import { useRoute } from 'vue-router';
import { logger } from "../utils/Logger.js";
export default {
  setup() {
    const route = useRoute();
    onMounted(() => {
      // getTicketByUserId()
            // getEventById();
            logger.log(AppState.account)
            logger.log(AppState.events)
        });

 async function getTicketByUserId() {
  try {
    const ticketId = route.params.ticketId
    await ticketsService.getTicketByUserId(ticketId)
  } catch (error) {
    Pop.error(error)
  }
 }
    



    return {
      account: computed(() => AppState.account),
      events: computed(() => AppState.events)
    }
  },
  components: { EventCardComponent }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
