

<script>
import { ref, onMounted } from "vue";
import { Icon } from '@iconify/vue';
import { ElLoading } from 'element-plus'
// import { useStore } from "vuex";
export default {
  name: "HomePage",
  components: {
    Icon
  },
  setup() {
    // const store = useStore();

    let dt = ref(null);
    let start = () => {
      dt.value = Date.now();
      console.log("starting timer...");
    };
    let stop = () => {
      const dt2 = Date.now();
      dt.value = dt2 - dt.value;
      console.log("viewed for:", dt.value / 1000);
    };


    onMounted(async () => {
      const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      // let myarray = ["test1,", "test2", "test3"]
      // let myarray2 = []
      // for (let i = 0; i < myarray.length; i++) {
      //   console.log(myarray[i])
      //   myarray2.push(myarray[i])
      // }
      // console.log(myarray2)
      loading.close()


    })
    return {
      dt,
      start,
      stop,

    };
  }
}
</script>

<template>
  <div id="app">
    <h2>Top Uploads</h2>
    <h2>Newest Uploads</h2>
    <p>Here is a list of popular rated videos, and searchable </p>
    <button @click="start()">Start</button>
    <button @click="stop()">Stop</button>
    <Icon icon="uil:check" />
  </div>
</template>