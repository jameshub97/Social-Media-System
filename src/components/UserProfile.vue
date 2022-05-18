
<script>
import { useRoute, useRouter } from "vue-router";
import { onMounted, watch, computed } from "vue";
import { useStore } from "vuex";
import { db } from "../firebase/index.js";
// import { getAuth } from "firebase/auth";

import { doc, setDoc } from "firebase/firestore";
export default {
  name: "UserProfile",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    const redirect = (location) => {
      router.push({ path: location });
    }
    watch(() => route.name, () => {
      console.log(route)
    });

    // adds profile data

    const addProfileData = async function (name) {
      const profile = JSON.parse(store.state.session)
      console.log("changing to", name)
      try {
        await setDoc(doc(db, "userProfile", profile.uid), {
          name: name,
        });
        alert("ADDED")
        console.log("successfully added");
        router.go()
      } catch (e) {
        console.log("Error adding document: ", e);
      }

    };

    onMounted(async () => {
      if (route.params.name == "jc") {
        console.log("specific data relating to JC")
      }
      store.dispatch("loadProfileData")
    });

    return {
      redirect,
      addProfileData,
      // userName: computed(() => store.state.details)
      userName: computed(() => JSON.parse(store.state.session))
    }
  },
};
</script>

<template>
  <div id="app">
    <h1>Edit your profile </h1>
    <div>
      <!-- <h1>Hello {{ this.name }}</h1> -->
      <p>EMAIL: {{ userName.uid}}</p>
      <p>UID: {{ userName.email }}</p>
      <br />

      <input id="userName" v-model="userNameInput" placeholder="enter your username"
        @keyup.enter="addProfileData(userNameInput)" />
      <button @click="addProfileData(userNameInput)">Change your Name</button>
    </div>
  </div>
</template>