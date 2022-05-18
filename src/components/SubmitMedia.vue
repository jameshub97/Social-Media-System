<script>
import { db } from "../firebase/index.js";
import { collection, addDoc, query, getDocs } from "firebase/firestore";
import { ref, reactive } from "vue";
import { onMounted } from "@vue/runtime-core";
// import { useStore } from "vuex";
export default {
  name: "SubmitMedia",
  setup() {
    // const store = useStore()
    const placeholder = ref(null);
    const media = ref(null);
    const comment = ref(null);
    const mediaContent = reactive([{}]);
    let pageEntry = ref(null);
    const addMedia = async (media, comment, pageEntry) => {
      if (comment != null && media != null) {
        try {
          await addDoc(collection(db, "media"), {
            mediaID: pageEntry,
            name: "User 1",
            media: media,
            comment: comment,
          });
          alert("sucessfully uploaded");
        } catch (e) {
          alert("Error adding document: check fields are populated ", e);
        }
        // location.reload();
      }
    }
    const loadMedia = async () => {
      const q = query(collection(db, "media"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        var videoData = {
          mediaID: doc.data().mediaID,
          name: doc.data().name,
          media: doc.data().media,
          comment: doc.data().comment,
        };
        pageEntry = querySnapshot.size;
        mediaContent.push(JSON.parse(JSON.stringify(videoData)));
      });
      pageEntry = mediaContent.length;
    };
    onMounted(async() => {
      // loadMedia()
    })
    return {
      addMedia,
      loadMedia,
      placeholder,
      media,
      comment,
      mediaContent,
      pageEntry,
    };
  }
}
</script>

<template>
  <div id="app">
    <h2>Submit Media</h2>
    <p>
    </p>
    <input v-model="media" placeholder="enter video link" />
    <input v-model="comment" placeholder="enter comment " />
    <button @click="addMedia(media, comment, pageEntry)">
      Enter Video
    </button>
    <button @click="loadMedia()">Load Video</button>
    <!-- <div v-if="mediaContent !=null"> -->
  </div>
</template>