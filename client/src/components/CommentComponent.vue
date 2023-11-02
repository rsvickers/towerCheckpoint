<template>
    <div></div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Comment } from '../models/Comment';
export default {
    props: {
        comment: {type: Comment, required: true },
    },
    setup(){
    return {  }
    }
};
</script>


<style lang="scss" scoped>

</style>