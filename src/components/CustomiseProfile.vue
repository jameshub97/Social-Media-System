<template>
<div id="body">
    <p>lorem</p>
    <button @click="proceedtoMain">Confirm</button>
</div>
</template>
<script>
import { useStore } from "vuex";
import { onMounted } from "vue";
// import { useRoute } from "vue-router";


export default {
    setup() {
        const store = useStore();
        // const route = useRoute();
        const proceedtoMain = () => {
            console.log(store.commit("VIEWCONTENT", true))
            
        }
        onMounted( () => {
        });
        return{
            proceedtoMain
        }
    }
}
</script>