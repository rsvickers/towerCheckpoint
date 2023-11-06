<template>
 <div class="container-fluid">

   <section class="row">
     
     <h1>My Events</h1>
     <div v-for="event in events" :key="event.id" class="col-md-3 col-12">
      <EventCardComponent :eventProp="event" />
    </div>
    
    <div>
      <h1>Events I am going to </h1>
      <div v-for="ticket in tickets" :key="ticket.id"  class=" col-md-4 col-12">
        <MyTicketsComponent :ticketProp="ticket" />
      </div>
    </div>
  </section>
</div>
  
  
  

</template>

<script>
import EventCardComponent from '../components/EventCardComponent.vue';
import MyTicketsComponent from '../components/MyTicketsComponent.vue';
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
      getMyEventTickets()
  
        });

        async function getMyEventTickets() {
          try {
            await ticketsService.getMyEventTickets()
        } catch (error) {
            Pop.error(error)
          }
        }

    



    return {
      account: computed(() => AppState.account),
      // events: computed(() => AppState.events)
      events: computed(() => AppState.myEvents),
      tickets: computed(() => AppState.myTickets)
    }
  },
  components: { EventCardComponent, MyTicketsComponent }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
