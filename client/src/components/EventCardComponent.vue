<template>
 <div :disabled="eventProp.isCanceled == true" class="m-4 coolBg">
  <!-- NOTE do the router link after making the details page:) and later on make this a background img -->
  <router-link :to="{name: 'Event', params: {eventId: eventProp.id}}" >
    <img class="img-fluid" :src="eventProp.coverImg" alt="">
  </router-link>
    <p class="p-1"><b>{{ eventProp.name }}</b></p>
    <p class="p-1">{{ eventProp.location }}</p>
    <p class="p-1">@ {{ eventProp.startDate.toLocaleString() }}</p>
    <!-- <button v-if="account.id == eventProp.creator.id" class="btn btn-danger mt-3"  @click="removeEvent()"   title="remove event">Cancel Event</button> -->
    <!-- <i v-if="account.id == eventProp.creatorId" @click="removeEvent()" role="button" title="remove event"
                    class="fs-1 text-danger mdi mdi-delete-circle"></i> -->
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