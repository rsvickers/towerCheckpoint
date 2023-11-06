<template>
    <div class="p-3 ">

    <img class="img-fluid" :src="ticketProp.event.coverImg" alt="">
        <div class="bg-secondary">
            <p class="p-1"><b>{{ ticketProp.event.name }}</b></p>
            <p class="p-1">{{ ticketProp.event.location }}</p>
            <button @click="refundTicket(ticketProp.id)" class="btn btn-danger">Refund Ticket</button>
        </div>
    </div>
</template>


<script>
// import { AppState } from '../AppState';
// import { computed, reactive, onMounted } from 'vue';
import Pop from '../utils/Pop.js';
import { Ticket } from '../models/Ticket.js';
import { ticketsService} from '../services/ticketsService.js';
export default {
    props:
    { ticketProp: { type: Ticket, required: true }},
    setup(){
    return {
        async refundTicket(ticketId) {
            try {
              const yes = await Pop.confirm('Are you sure you want to refund your ticket?')
              if(!yes) {
                return
              }

              await ticketsService.refundTicket(ticketId)
              Pop.success('Refunded Ticket!')
            } catch (error) {
                Pop.error(error)
            }
        }
      }
    }
};
</script>


<style lang="scss" scoped>

</style>