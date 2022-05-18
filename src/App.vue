<script>
import { onBeforeMount, computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { Icon } from "@iconify/vue";

export default {
  components: {
    Icon,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const path = computed(() => route.path);
    // use vuex store data to get that information and to load it up
    const profile = ref("jc")
    const videos = ref(1)

    const redirect = (location) => {
      router.push({ path: location });
      store.commit(
        "SET_SEARCHRESULT",
        document.querySelector("#searchField").value
      );
    }

    onBeforeMount(() => {
      store.dispatch("fetchUser");
      store.dispatch("loadProfileData")
    });
    return {
      path,
      redirect,
      profile,
      videos,
      userName: computed(() => store.state.userName),
    };
  },
};
</script>
<template>
  <!-- v-if store.state.user (to view nav) -->
  <div id="navbar" v-if="$store.state.session">
    <div class="grid-container-header">
      <div class="grid-item">
        <h1 id="navtitle">Media System</h1>
      </div>
      <div class="grid-item1">
        <el-input id="searchField" v-model="input" @keyup.enter="redirect('/SearchMedia/')"
          placeholder="Search for Media" clearable />
      </div>
      <div class="grid-item2">
        <Icon id="SI" icon="il:search" width="24" height="24" @click="redirect('/SearchMedia/')" />
      </div>


      <div class="grid-item3">
        <h4 id="userName" style="justify-self: end;">{{ userName }}</h4>
      </div>
      <div class="grid-item4">
        <el-dropdown id="DD" :hide-on-click="false">
          <span class="el-dropdown-link">
            <Icon icon="ci:settings" width="24" height="24" />
            <el-icon class="el-icon--right">
            </el-icon>
          </span>
          <template #dropdown>
            <div class="grid-item5">
              <el-dropdown-menu>
                <el-dropdown-item @click="$store.dispatch('logout')">Logout</el-dropdown-item>
                <el-dropdown-item @click="redirect(`/UserProfile/${profile}`)">View Profile</el-dropdown-item>
                <el-dropdown-item>Settings</el-dropdown-item>
              </el-dropdown-menu>
            </div>
          </template>



        </el-dropdown>
      </div>
    </div>
    <div class="grid-item6">

      <el-button round @click="redirect('/')">Home</el-button>
      <el-button round @click="redirect(`/VideoBrowser/${videos}`)">Videos</el-button>
      <el-button round @click="redirect('/SubmitMedia/')">Submit media</el-button>

    </div>



  </div>
  <router-view />

</template>

<!-- <template>

 </div>
 

</template> -->

<style>
.grid-container-header {
  display: flex;
  position: relative;
  grid-template-columns: auto auto auto auto auto;
  place-items: center;
  padding: 5px;
  margin-left: auto;
  margin-right: auto;
  column-gap: rem;
  justify-content: flex-start;
  /* justify-content: space-between; */
  gap: 10px
}

.grid-item {
  flex: 0 0 15em;
  /* gap: -5px */
}

.grid-item1 {
  flex: 0 0 25em;
  gap: -5px
}

.grid-item2 {
  text-align: left;
  flex: 0 0 13em;
}

.grid-item3 {
  text-align: right;
  flex: 0 0 5em;
}

.grid-item4 {
  text-align: right;
  flex: 0 0 3em;
}




/* #userName{
  background: black;
} */

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #777f88;
  margin-top: 5px;
  /* margin-left: auto;
  margin-right: auto; */
  background-color: rgb(255, 255, 255);
  border-radius: 3px;
  padding: 10px;
  height: fit-content;
  /* width: fit-content; */

}

#navbar {
  border-style: solid;
  border-color: #dddcdc;
  border-radius: 10px;
  padding: 10px
}

.iconify:hover {
  color: rgb(153, 156, 153);
}

/* #logout{
  position: absolute;
  bottom: 5%;
} */
</style>

