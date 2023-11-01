<template>
 <div>
  <!-- NOTE do the router link after making the details page:) -->
    <img class="img-fluid" :src="eventProp.coverImg" alt="">
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

</style>