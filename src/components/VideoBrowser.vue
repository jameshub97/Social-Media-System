<script>
import { db } from "../firebase/index.js";
import {
  collection,
  query,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  // setDoc,
} from "firebase/firestore";
import { computed, ref, reactive, onMounted, watch, onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElLoading } from 'element-plus'
import { useStore } from "vuex";



import { Icon } from "@iconify/vue";
export default {
  name: "VideoBrowser",
  components: {
    Icon,
  },
  setup() {
    // isolate video loading to own component for easy importing across other components..
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const routevalue = ref(route.params.id);
    const visible = ref(false);
    const message = ref(null);
    const newComment = ref(null);
    const mediaContent = reactive([]);
    const rows = reactive([{}]);
    const hiddenRows = reactive([{}]);
    const medialink = ref(null);
    const headerComment = ref(null);
    const headerID = ref(null);
    const player = ref(null);
    const player2 = ref(null);
    const player3 = ref(null);
    const player4 = ref(null);
    let page = ref(localStorage.getItem("PAGE"));
    let pageEntry = ref(4);
    let videoLink = ref(null);
    let editBoolean = ref(false)

    const path = computed(() => route.path);
    let result = JSON.parse(path.value.split("/")[2])


    // watch(() => router.)

    watch(route, async (currentValue) => {
      if (currentValue.params.id == null) {
        localStorage.setItem("RENDERED", false)
        return
      }
      else {
        loadComments()
        await loadMedia()
        router.go()
      }

    });

    const redirect = (location) => {
      router.push({ path: location });
    }


    const loadMedia = async () => {
      const q = query(collection(db, "media"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        if (doc.data().mediaID == routevalue.value) {
          var videoData = {
            mediaID: doc.data().mediaID,
            name: doc.data().name,
            media: doc.data().media,
            comment: doc.data().comment,
          };
          pageEntry.value = querySnapshot.size;
          mediaContent.push(JSON.parse(JSON.stringify(videoData)));
          videoLink.value = mediaContent[0].media.split("/")[4];
        }
      });
    };
    const loadComments = async () => {
      const q = query(collection(db, "comments"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        if (doc.data().mediaID == routevalue.value) {
          var userData = {
            mediaID: doc.data().mediaID,
            name: doc.data().name,
            comment: doc.data().comment,
            datetime: doc.data().datetime,
            upvotes: doc.data().upvotes,
            downvotes: doc.data().downvotes,
            docRef: doc.id,
          };
          if (rows != null) {
            hiddenRows.push(userData);
          }
        }
      });
      hiddenRows.forEach((element) => {
        if (element.mediaID == routevalue.value) {
          rows.push(element)
        }
        if (element.mediaID != routevalue.value) {
          rows.pop(element)
        }
      })
    };
    const addComment = async (message) => {
      var today = new Date();
      var time = today.getHours() + ":" + today.getMinutes();
      try {
        await addDoc(collection(db, "comments"), {
          mediaID: routevalue.value,
          name: "test",
          comment: message,
          datetime: time,
          upvotes: 0,
          downvotes: 0,
        });
        console.log("successfully added");
      } catch (e) {
        alert("Error adding document: ", e);
      }
      router.go()

    };
    const deleteComment = async (reference) => {
      const userRef = doc(db, "comments", reference);
      await deleteDoc(userRef);
      router.go()
    };
    const editComment = (position, cancel, placeholder) => {
      // editBoolean.value = true;
      position = position + 1;
      console.log(placeholder)
      document.querySelector("#Table").rows[position].querySelector("#input-edit").style.display = "block"
      document.querySelector("#Table").rows[position].querySelector("#main-comment").style.display = "none"
      if (cancel == true) {
        document.querySelector("#Table").rows[position].querySelector("#input-edit").style.display = "none"
        document.querySelector("#Table").rows[position].querySelector("#main-comment").style.display = "block"

      }
    };
    const saveChanges = async (reference, comment) => {
      const userRef = doc(db, "comments", reference);
      try {
        await updateDoc(userRef, {
          comment: comment,
        });
      } catch (e) {
        console.log(e);
      }
      editBoolean.value = false;
      router.go()
    };
    // FUTURE STUFF FOR ADMINISTRATIVE ANALYTICS
    // const onPlayerStateChange = (event) => {
    //   if (event.data == window.YT.PlayerState.PLAYING && !done.value) {
    //     setTimeout(stopVideo, 6000);
    //     done.value = true;
    //   }
    //   if (event.data == window.YT.PlayerState.PAUSED) {
    //     console.log("timing paused");
    //   }
    // };
    // function stopVideo() {
    //   player.value.stopVideo();
    // }

    const loadVideo = (link) => {
      window.onYouTubeIframeAPIReady = function () {
        player.value = new window.YT.Player("player1", {
          height: "390",
          width: "640",
          videoId: link,
          playerVars: {
            playsinline: 1,
          },
        });
        player2.value = new window.YT.Player("player2", {
          height: "390",
          width: "640",
          videoId: link,
          playerVars: {
            playsinline: 1,
          },
        });
        player3.value = new window.YT.Player("player3", {
          height: "390",
          width: "640",
          videoId: link,
          playerVars: {
            playsinline: 1,
          },
        });
        player4.value = new window.YT.Player("player4", {
          height: "390",
          width: "640",
          videoId: link,
          playerVars: {
            playsinline: 1,
          },

        });
      }
    }

    const forward = () => {
      result++
      router.push(`/VideoBrowser/${result}`)
    }
    const backward = () => {
      result--
      router.push(`/VideoBrowser/${result}`)
    }
    const test = () => {
      return JSON.stringify("test")
    }

    onBeforeMount(() => {
    })



    onMounted(async () => {
      store.dispatch("loadProfileData")
      document.querySelector("table").rows[1].style.display = "none";
      const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      await loadMedia()
      loadComments()
      var tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      loadVideo(videoLink.value);
      loading.close();

      let rendered = JSON.parse(JSON.stringify(localStorage.getItem("RENDERED")))
      console.log("RENDER1", rendered)
      if (rendered === "false") {
        console.log("RENDER2", rendered)
        localStorage.setItem("RENDERED", true)
        router.go()
      }
      else if (rendered === "true") {
        console.log("RENDER3", rendered)

        return
      }

    })
    return {
      visible,
      page,
      pageEntry,
      message,
      mediaContent,
      medialink,
      headerComment,
      headerID,
      rows,
      newComment,
      addComment,
      deleteComment,
      saveChanges,
      editComment,
      loadMedia,
      videoLink,
      routevalue,
      redirect,
      result,
      forward,
      backward,
      test,
      editBoolean,
    };
  },
};
</script>
<template>
  <div class="app">
    page: {{ result }}

    <br />
    <b>{{ headerID }}</b>
    <br />
    <div class="grid-container">
      <div class="grid-item">
        <h2>Video 1(Title/Submission Name)</h2>
        <div class="wrap">
          <div id="player1"></div>
        </div>
      </div>
      <div class="grid-item">
        <div v-if="!visible">
          <div class="comment-container">
            <table id="Table">
              <thead>
                <tr>
                  <th></th>
                </tr>
              </thead>
              <tbody class="comments">
                <tr v-for="(row, i) in rows" :key="i">
                  <div v-bind:id="dynamicId"></div>
                  <div class="test">{{ row.name }}</div>

                  <el-tooltip placement="right-start">
                    <template #content>
                      <span>{{ row.datetime }}</span>
                    </template>
                    <el-menu :default-active="activeIndex" class="test2" mode="vertical" @select="handleSelect">
                      <!-- <el-menu-item index="1">Processing Center</el-menu-item> -->

                      <el-sub-menu index="2-4">
                        <template #title>
                          <span id="main-comment" :autosize="{ minRows: 2, maxRows: 4 }">{{ row.comment }} </span>
                          <!-- <span>{{ row.upvotes }} {{ row.downvotes }}</span> -->
                          <div class="edit-container">
                            <span id="input-edit" size="number" style="display:none">
                              <el-input :autosize="{ minRows: 2, maxRows: 4 }" id="input-field" v-model="newComment"
                                placeholder="change comment"></el-input>
                              
                                <Icon icon="line-md:confirm-circle" @click="saveChanges(row.docRef, newComment)" height="24" />
                                <Icon icon="ic:round-cancel"  @click="editComment(i, true)" height="24"/>
                            </span>
                          </div>
                        </template>


                        <Icon @click="upvoteClicked(i, row.name)" icon="dashicons:thumbs-up" />
                        <Icon @click="downvoteClicked(i, row.name)" icon="dashicons:thumbs-up" :rotate="2" />
                        <Icon icon="ep:delete-filled" @click="deleteComment(row.docRef)" />
                        <Icon id="editbutton" @click="editComment(i, false, row.comment)" icon="bx:comment-edit" />
                      </el-sub-menu>
                    </el-menu>
                  </el-tooltip>



                  <!-- <div id="editor" style="display: none">
                    <input v-model="newComment" placeholder="enter your comment" />
                  </div> -->


                  <div style="display: none">
                    <div class="comment-item2">

                      <div class="time-item">

                      </div>
                    </div>

                  </div>

                  <td id="cancel" style="display: none">
                    <button @click="editComment(i, true)">Cancel</button>
                    <Icon id="editbutton" @click="editComment(i)" icon="bx:comment-edit" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <p>{{ message }}</p>
        <input id="commentInput" v-model="message" placeholder="enter your comment"
          @keyup.enter="addComment(message)" />
        <Icon type="primary" circle id="addComment" @click="addComment(message)" icon="fluent:comment-add-48-regular"
          data-icon="fluent:cursor-hover-20-filled" height="25" />
      </div>
    </div>

    <Icon @click="backward()" type="submit" value="forward" icon="bi:arrow-right-square-fill" height="25" :rotate="2" />
    <Icon @click="forward()" type="submit" value="backward" icon="bi:arrow-right-square-fill" height="25" />

    <Icon @click="visible = !visible" icon="typcn:arrow-minimise" height="25" />
  </div>



</template> 
<style>
.grid-container {
  display: grid;
  grid-template-columns: auto auto;
  place-items: center;
  border: groove;
  height: auto;
  /* width: 540; */
  width: 100%;
  margin-left: auto;
  margin-right: auto;

}

.comment-container {
  font-size: larger;
  text-align: left;
  display: flex;
  grid-template-columns: auto auto;
  border-style: groove;
  justify-content: flex-start;
  gap: 10px 20px;
  border-radius: 5px;
  padding: 10px;
  width: 300px;

}

.test {
  font-weight: bold;
  width: 300px;
  text-align: left;
  /* flex: 0 0 40em; */
  background-color: #dddcdcab;
  padding: 3px;
  gap: 1px;
  border-block: grooved;
}

.test2 {
  padding: 1px;
  border-color: #f1f0f0;
  justify-content: flex-end;
  width: auto;
  border-bottom-left-radius: 5;
}


.edit-container {
  width: 175px;
}



/* #Table {
  border-style: solid;
  border-color: #dddcdc;
  border-radius: 10px;
  padding: 10px;
  margin-left: 10px;
  padding: 10px;

} */
</style>
