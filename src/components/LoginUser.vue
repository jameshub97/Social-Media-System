
<script>
import { ref } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const login_form = ref({});
    const register_form = ref({});
    const store = useStore();
    const login = () => {
      store.dispatch("loadProfileData")
      store.dispatch("login", login_form.value);
    };
    const register = () => {
      store.dispatch("register", register_form.value);
    };
    return {
      login_form,
      register_form,
      login,
      register,
    };
  },
};
</script>

<template>
  <div id="body">
    <main class="login">
      <section class="forms">
        <form class="register" @submit.prevent="register">
          <h2>Register</h2>
          <input type="email" placeholder="Email address" v-model="register_form.email" />
          <input type="password" placeholder="Password" v-model="register_form.password" />
          &nbsp;
          <input type="submit" value="Register" />
        </form>
        <br />
        <form class="login" @submit.prevent="login">
          <h2>Login</h2>
          <input type="email" placeholder="Email address" v-model="login_form.email" />
          <input type="password" placeholder="Password" v-model="login_form.password" />
          &nbsp;
          <input type="submit" value="Login" />
        </form>
      </section>
    </main>
    </div>
</template>

<style>
#body {
  text-align:left;
  position: fixed;
  /* display: block; */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* margin-top: 450px; */
  /* width: auto;
  margin: auto; */
  padding: 50px;
  border-style: groove;
  border-radius: 25px;
  background-color: rgb(253, 249, 249);
}



</style>

