<template>
 <div class="m-4 coolBg">
  <!-- NOTE do the router link after making the details page:) and later on make this a background img -->
    <img class="img-fluid" :src="eventProp.coverImg" alt="">
    <p class="p-1"><b>{{ eventProp.name }}</b></p>
    <p class="p-1">{{ eventProp.location }}</p>
    <p class="p-1">@ {{ eventProp.startDate.toLocaleString() }}</p>
 </div>
</template>


<script>
import { Event } from '../models/Event.js';

// import { AppState } from '../AppState';
// import { computed, reactive, onMounted } from 'vue';
export default {
    props: {eventProp: {type: Event, required: true} },
    setup(){
    return {  }
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