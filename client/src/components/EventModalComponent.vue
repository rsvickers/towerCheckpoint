<template>
  <div class="modal fade" id="createEventModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="createEventModal">Create Event</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form @submit.prevent="createEvent()">
            <div class="mb-3">
              <label for="name" class="form-label">Name of event</label>
              <input v-model="editable.name" placeholder="Event name..." required type="text" class="form-control" id="name"/>
            </div>

            <div class="mb-3">
              <label for="coverImg" class="form-label">Image</label>
              <input v-model="editable.coverImg"  placeholder="Image..." required type="url" class="form-control" id="coverImg"/>
            </div>

            <div class="mb-3">
              <label for="location" class="form-label">Location</label>
              <input v-model="editable.location"  placeholder="Location..." required type="text" class="form-control" id="location"/>
            </div>
            

            <!-- TODO finish this please -->
            <!-- <div class="form-group">
                <label class="control-label" for="startDate">Start Date</label>
                <input class="form-control" id="startDate" name="date" placeholder="MM/DD/YYY" type="text"/>
            </div> -->
            
            <div class="mb-3">
                <label for="capacity" class="form-label">Capacity</label>
                <input v-model="editable.capacity" class="form-control"  placeholder="capacity..." id="capacity" max="5000"/> 
            </div>
            
            <div class="mb-3">
                <label for="startDate" class="form-label">Start Date</label>
                <input v-model="editable.startDate" class="form-control"  placeholder="capacity..." type="date" min="2000-01-01" id="startDate" /> 
                <!-- <input v-model="editable.startDate" class="form-control"  placeholder="capacity..." type="time" id="startDate" />  -->
            </div>

            <!-- class="form-control" type="date" min="1995-06-16" name="date-picker" id="date-picker" -->

            <div class="mb-3">
                <label for="type" class="form-label">Type of Event</label>
                <select v-model="editable.type" class="form-select" name="" id="">
                <option v-for="types in types" :key="types.id" :value="types">
                {{ types }}
                </option>
                </select>
            </div>
            
            <div class="mb-3">
                <label for="description" class="form-label">Description</label>
                <textarea v-model="editable.description" class="form-control"  placeholder="Event details..." id="description" maxlength="500" rows="3"></textarea>
            </div>




            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="submit" class="btn btn-success">Create</button>
            </div>

        </form>
      </div>
    </div>
  </div>
</div>
</template>


<script>
import { ref } from 'vue';
import { Modal } from "bootstrap";
import { eventsService } from '../services/EventsService.js';
import Pop from '../utils/Pop';
import { useRouter } from "vue-router";
// import { AppState } from '../AppState';
// import { computed, reactive, onMounted } from 'vue';
export default {
    setup(){
        const editable = ref({})
        const types = ["concert", "convention", "sport", "digital"]
        const router = useRouter()
        // const router = useRouter()
    return { 
        types, 
        editable,

        
        async createEvent() {
          try {
          const eventData = editable.value
          const event = await eventsService.createEvent(eventData)
          Pop.success('Created Event')
          editable.value = {}
          Modal.getOrCreateInstance('#createEventModal').hide()
        router.push({ name: 'Event', params: {eventId: event.id}})
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