<template>
  <div v-if="eventProp.capacity - eventProp.ticketCount === 0 && !eventProp.isCanceled">
  <router-link :to="{name: 'Event', params: {eventId: eventProp.id}}" >
    <h1>Event is at capacity</h1>
  </router-link>
    <p class="p-1"><b>{{ eventProp.name }}</b></p>
    <p class="p-1">{{ eventProp.location }}</p>
    <p class="p-1">@ {{ eventProp.startDate.toLocaleString() }}</p>
</div>
 <div v-else-if="!eventProp.isCanceled" class="m-4 coolBg">
  <!-- NOTE do the router link after making the details page:) and later on make this a background img -->
  <router-link :to="{name: 'Event', params: {eventId: eventProp.id}}" >
    <img class="img-fluid" :src="eventProp.coverImg" alt="">
  </router-link>
    <p class="p-1"><b>{{ eventProp.name }}</b></p>
    <p class="p-1">{{ eventProp.location }}</p>
    <p class="p-1">@ {{ eventProp.startDate.toLocaleString() }}</p>
    
 </div>
 
 <div v-else class="m-4 coolBg">
  <!-- NOTE do the router link after making the details page:) and later on make this a background img -->
  <router-link :to="{name: 'Event', params: {eventId: eventProp.id}}" >
    <img class="img-fluid" src="https://media.istockphoto.com/id/1227115202/photo/a-red-stamp-on-a-white-background-cancelled.webp?b=1&s=170667a&w=0&k=20&c=RPueqU4VVfs98bOCqlCPifC7EcKze6CksprK4o_K3no=" alt="">
  </router-link>
    <p class="p-1"><b>{{ eventProp.name }}</b></p>
    <p class="p-1">{{ eventProp.location }}</p>
    <p class="p-1">@ {{ eventProp.startDate.toLocaleString() }}</p>
    
 </div>



</template>


<script>
import { Event } from '../models/Event.js';

import { AppState } from '../AppState';
import { computed } from 'vue';
import Pop from '../utils/Pop';
import { eventsService } from '../services/EventsService';
export default {
    props: {
      eventProp: {type: Event, required: true},
     },
    setup(props){
    return { 
      account: computed(() => AppState.account),

      async removeEvent() {
             try {
                    const yes = await Pop.confirm('Are you sure you want to cancel event?')
                    if(!yes){
                        return
                    }    
                const eventId = props.eventProp.id
                await eventsService.removeEvent(eventId)
             } catch (error) {
                Pop.error(error)
                    }
                },



     }
    }
};
</script>


<style lang="scss" scoped>
p {
  margin-bottom: 0;
}

.coolBg {
  background-color: rgba(0, 63, 0, 0.649);
  color: white;
}
</style>