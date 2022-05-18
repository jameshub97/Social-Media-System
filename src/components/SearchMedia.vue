<template>
<div id="app">
    <h1>Search Results</h1>
    First step: show boxes of videos
    Second step:
    {{ test }}
    </div>
</template>
<script>
import { useStore } from "vuex";
import { computed } from "vue"
export default {
    name: "SearchMedia",
    setup() {
        const store = useStore();
        return {
            test: computed(() => store.state.searchResults)
        }
    }
}
</script>