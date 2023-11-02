<template>
    <form @submit.prevent="createComment()">
        <div class="mb-3">
                <label for="body" class="form-label text-light">Join the conversation</label>
                <textarea v-model="editable.body" class="form-control"  placeholder="Tell the people..." id="description" maxlength="200" rows="3"></textarea>
            </div>
            <div class="text-end">
                <button type="submit" class="btn btn-success">post comment</button>
            </div>
            <div>
                <!-- <button class="btn btn-danger" title="delete comment">🗑️</button> -->
            </div>
    </form>
</template>


<script>
import { ref } from 'vue';
// import { AppState } from '../AppState';

import { Comment } from '../models/Comment';
import { commentsService } from '../services/CommentsService';
import Pop from '../utils/Pop.js';
export default {
    props: {
        comment: {type: Comment, required: true },
    },
    setup(){
        const editable = ref({})
    return {  
        editable,

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
        }

    

    }
    }
};
</script>


<style lang="scss" scoped>

</style>