<template>
   <div  class="container-fluid">
    
    <section v-if="event" class="coolBg row mt-4">
        
        <div v-if="event.creatorId == account.id" class="col-12 col-md-4 text-end p-3">
            <button @click="cancelEvent()" class="btn btn-danger">Cancel Event</button>
        </div>
        <div v-if="!event.isCanceled" class="col-12 col-md-4 p-4">
            
            <img  class="cover-img" :src="event.coverImg" alt="">
        </div>
        <div v-else>
            <img class="img-fluid" src="https://media.istockphoto.com/id/1227115202/photo/a-red-stamp-on-a-white-background-cancelled.webp?b=1&s=170667a&w=0&k=20&c=RPueqU4VVfs98bOCqlCPifC7EcKze6CksprK4o_K3no="  >
        </div>
        <div class="col-10 p-4">
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
            <div v-if="ticketsLeft(event)" class="d-flex justify-content-between">
                <p ><b>   {{ event.capacity - event.ticketCount  }} </b> Tickets Left</p>
                
                <button :disabled="!account.id || event.isCanceled" @click="getTicketForEvent()" class="btn btn-warning">Grab a Ticket! <i class="mdi mdi-ticket"></i> </button>
                
            </div>
            <div v-else>
                <h4 class="text-end">Tickets are sold out</h4>
            </div>
            <p class="text-success text-end p-1" v-if="isAttending">You are attending this event!</p>
        </div>          
    </section>

    <section class="row mt-4 bg-secondary">
        <h5 class="p-2 text-light">See who is attending</h5>
        <div  v-for="ticket in tickets" :key="ticket.id" class="col-md-1 col-6 p-3">
                <img class="avatar rounded-circle" :title="ticket.profile.name" :src="ticket.profile.picture" alt="">
               
        </div>
    </section>
        
   
     
        <section class="row mt-5  coolBg">
            <div class="col-10">

                <form @submit.prevent="createComment()">
                    <div class="mb-3 ">
                        <label for="body" class="form-label text-light">Join the conversation</label>
                        <textarea v-model="editable.body" class="form-control"  placeholder="Tell the people..." id="description" maxlength="200" rows="3"></textarea>
                    </div>
                    <div class="text-end ">
                        <button type="submit" class="btn btn-success mb-4">post comment</button>
                    </div>
                </form>
                <div v-for="comment in comments" :key="comment.id" class="bg-secondary d-flex justify-content-evenly align-items-center mb-5">
                    <img class="rounded-circle avatar p-3" :src="comment.creator.picture" :title="comment.creator.name" alt="">
                    <div class="text-light  p-3 ">
                        <h5>{{ comment.creator.name }}</h5>
                        <p>{{ comment.body }}</p>
                    </div >
                    <div v-if="comment.creatorId == account.id" >
                        <button @click="deleteComment(comment.id)" class="btn btn-danger" title="delete comment">🗑️</button>
                    </div>
                </div>
                
            </div>

            
            <!-- <div>
                <h5 class="text-light">What people are saying</h5>
            </div>
            <div v-for="comment in comments" :key="comment.id" class="col-12 bg-secondary d-flex justify-content-evenly align-items-center mb-5">
                <img class="rounded-circle avatar p-3" :src="comment.creator.picture" :title="comment.creator.name" alt="">
                <div class="text-light  p-3 ">
                    <h5>{{ comment.creator.name }}</h5>
                    <p>{{ comment.body }}</p>
                </div >
                <div v-if="comment.creatorId == account.id" >
                    <button @click="deleteComment()" class="btn btn-danger" title="delete comment">🗑️</button>
                </div>
            </div> -->
        </section>
    </div>
   
</template>


<script>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { eventsService } from '../services/EventsService.js';
import { ticketsService } from '../services/TicketsService.js'
import Pop from '../utils/Pop.js';
import { computed, onMounted } from 'vue';
import { logger } from "../utils/Logger.js";
import { AppState } from '../AppState';
import { commentsService } from '../services/CommentsService.js';
import CommentComponent from '../components/CommentComponent.vue';
export default {
    setup() {
        const editable = ref({})
        const route = useRoute();
        const router = useRouter();
        onMounted(() => {
            getEventById();
            getTicketsOnEvent();
            getCommentsByEventId();
        });
        async function getEventById() {
            try {
                const eventId = route.params.eventId;
                await eventsService.getEventById(eventId);
            }
            catch (error) {
                Pop.error(error);
            }
        }
        async function getTicketsOnEvent() {
            try {
                const eventId = route.params.eventId;
                await ticketsService.getTicketsOnEvent(eventId);
            }
            catch (error) {
                Pop.error(error);
            }
        }
        async function getCommentsByEventId() {
            try {
                const eventId = route.params.eventId;
                await commentsService.getCommentsByEventId(eventId);
            }
            catch (error) {
                Pop.error(error);
            }
        }
        return {
            editable,
            route,
            event: computed(() => AppState.activeEvent),
            comments: computed(() => AppState.comments),
            comment: computed(() => AppState.myComments),
            account: computed(() => AppState.account),
            tickets: computed(() => AppState.tickets),
            isAttending: computed(() => AppState.tickets.find((ticket) => ticket.accountId == AppState.account.id)),
            // isCanceled: computed(() => AppState.events.find((event) => event.creatorId == AppState.event.id)),
           
            async getTicketForEvent() {
                try {
                    const eventId = route.params.eventId;
                    await ticketsService.getTicketForEvent(eventId);
                    route.params.tickets --
                    getEventById()

                }
                catch (error) {
                    Pop.error(error);
                }
            },

            async createComment() {
          try {
            const commentData = editable.value
            // commentData.eventId = route.params.eventId
            await commentsService.createComment(commentData)
            Pop.success('Comment made!')
            editable.value = {}
          } catch (error) {
            Pop.error(error)
          }
        },

            async deleteComment(commentId) {
        try {
            const wantsToDelete = await Pop.confirm('Are you sure about that?')
            if (!wantsToDelete) {
                return
            }
            
            await commentsService.deleteComment(commentId)
            getCommentsByEventId(route.params.eventId)
            
        } catch (error) {
            Pop.error(error)
        }

    },

    async cancelEvent() {
        try {
            const yes = await Pop.confirm('Are you sure you want to Cancel Event?')
            if(!yes) {
                return
            }

            const eventId = route.params.eventId
            await eventsService.cancelEvent(eventId)
            router.push({ name: 'Home' })
        } catch (error) {
            Pop.error(error)
        }
    },

    ticketsLeft(event){
        return event.capacity - event.ticketCount > 0;
    },

    buttonDisabled(event, account){
        logger.log(account)
        return event.isCanceled 
    }



        };
    },
    // components: { CommentComponent }
};
</script>


<style lang="scss" scoped>

.cover-img {
    height: 35dvh;
    width: 85%;
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