<template>
    <!-- <form @submit.prevent="createComment()">
        <div class="mb-3">
            <label for="body" class="form-label text-light">Join the conversation</label>
                <textarea v-model="editable.body" class="form-control"  placeholder="Tell the people..." id="description" maxlength="200" rows="3"></textarea>
            </div>
            <div class="text-end">
                <button type="submit" class="btn btn-success mb-4">post comment</button>
            </div>
        </form> -->
        <section class="row"></section>

    <div>
                
            </div>
            
                <img class="rounded-circle avatar p-3" :src="comment.creator.picture" :title="comment.creator.name" alt="">
                <div class="text-light  p-3 ">
                    <h5>{{ comment.creator.name }}</h5>
                    <p>{{ comment.body }}</p>
                </div >
                <div v-if="comment.creatorId == account.id" >
                    <button @click="deleteComment(comment.id)" class="btn btn-danger" title="delete comment">🗑️</button>
                </div>
            

</template>


<script>
import { ref } from 'vue';
import { AppState } from '../AppState';
import { useRoute } from 'vue-router';
import { computed, } from 'vue';
import { Comment } from '../models/Comment';
import { commentsService } from '../services/CommentsService';
import Pop from '../utils/Pop.js';
export default {
    props: {
        comment: {type: Comment, required: true },
    },
    setup(){
        const editable = ref({})
        const route = useRoute()
    return {  
        editable,
        account: computed(() => AppState.account),
        // async createComment() {
        //   try {
        //     const commentData = editable.value
        //     // commentData.eventId = route.params.eventId
        //     await commentsService.createComment(commentData)
        //     Pop.success('Comment made!')
        //     editable.value = {}
        //   } catch (error) {
        //     Pop.error(error)
        //   }
        // },

        async deleteComment(commentId) {
        try {
            const wantsToDelete = await Pop.confirm('Are you sure about that?')
            if (!wantsToDelete) {
                return
            }
            await commentsService.deleteComment(commentId)
            
        } catch (error) {
            Pop.error(error)
        }

    },

    }
    }
};
</script>


<style lang="scss" scoped>

</style>