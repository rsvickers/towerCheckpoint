<template>
   <div class="container-fluid">
    <section v-if="event" class="coolBg row mt-4">
        <div  class="col-4 p-4">
            <!-- TODO work on disabling if canceled -->
            <img :disabled="event.isCanceled == true" class="cover-img" :src="event.coverImg" alt="">
        </div>
        <div class="col-8 p-4">
        <div class="d-flex justify-content-between">
            <h3 class="p-2">{{ event.name }}</h3>
            <h4 class="p-2"> {{ event.startDate.toDateString() }}</h4>
            </div>
            <div class="d-flex justify-content-between">
                <h4>{{ event.location }}</h4>
                <h5>Starting at {{ event.startDate.toLocaleTimeString() }}</h5>
            </div>
            <div class="mt-4">
                <p class="">{{ event.description }}</p>
            </div>
            <div class="d-flex justify-content-between">
                <p ><b>{{ event.capacity }} </b> Tickets Left</p>
                <button @click="getTicketForEvent()" class="btn btn-warning">Grab a Ticket! <i class="mdi mdi-ticket"></i> </button>
            </div>
        </div>          
    </section>

    <section class="row mt-4 bg-secondary">
        <h5 class="p-2 text-light">See who is attending</h5>
        <div  v-for="ticket in tickets" :key="ticket.id" class=" col-md-1 col-6">
                <img class="avatar rounded-circle" :title="ticket.profile.name" :src="ticket.profile.picture" alt="">
        </div>
    </section>
        
    <div class="container">
        <section class="row">
            
        </section>
    </div>    
    
   </div>
</template>


<script>
import { useRoute } from 'vue-router';
import { eventsService } from '../services/EventsService.js';
import { ticketsService } from '../services/TicketsService.js'
import Pop from '../utils/Pop.js';
import { computed, onMounted } from 'vue';

import { AppState } from '../AppState';
// import { computed, reactive, onMounted } from 'vue';
export default {
    setup(){
        const route = useRoute()

        onMounted(() => {
            getEventById();
            getTicketsOnEvent();
        })

        async function getEventById() {
           try {
            const eventId = route.params.eventId
            await eventsService.getEventById(eventId)
           } catch (error) {
            Pop.error(error)
           }
        }

        async function getTicketsOnEvent() {
            try {
                const eventId = route.params.eventId
            await ticketsService.getTicketsOnEvent(eventId)
            } catch (error) {
                Pop.error(error)
            }
        }


    return {
        route,
        event: computed(() => AppState.activeEvent),
        comments: computed(() => AppState.comments),
        account: computed(() => AppState.account),
        tickets: computed(() => AppState.tickets),
        isAttending: computed(() => AppState.tickets.find(
            (ticket) => ticket.accountId == AppState.account.id
        )),
        isCanceled: computed(() => AppState.events.find(
        (event) => event.accountId == AppState.account.id
        )),

        async getTicketForEvent(){
            try {
                const eventId = route.params.eventId;
                await ticketsService.getTicketForEvent(eventId)
            } catch (error) {
                Pop.error(error)
            }
        }
      }
    }
};
</script>


<style lang="scss" scoped>

.cover-img {
    height: 35dvh;
    width: 100%;
    object-fit: cover;
    object-position: center;
    
}
.coolBg{
    background-color: rgba(1, 1, 85, 0.54);
}

.avatar {
    height: 10vh;
    width: 10vh;
}
</style>