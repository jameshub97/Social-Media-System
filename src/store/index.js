import { createStore } from 'vuex'
import router from '../router'
import { auth } from '../firebase'
import { onAuthStateChanged } from "firebase/auth";

import { db } from "../firebase/index.js";
import { doc, getDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'

export default createStore({
  state: {
    user: null,
    session: localStorage.getItem("token"),
    loggedin: JSON.parse(localStorage.getItem("loggedin")),
    userName: null,
    confirmed: null,
    test: "hello world",
    email: null,
    testvalue: 0,
    details: null,
    searchResults: null,

  },
  mutations: {
    changevalue(state, value) {
      state.email = value
    },

    SET_USER(state, user) {
      state.user = user
    },
    CLEAR_USER(state) {
      state.user = null
    },

    SET_DETAILS(state, payload) {
      state.userName = payload
    },
    SET_SEARCHRESULT(state, info) {
      console.log(info)
      state.searchResults = info
    },
  },
  actions: {
    async login({ commit, dispatch }, details) {
      const { email, password } = details
      try {
        await signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            commit('SET_USER', userCredential)
            localStorage.setItem("token", userCredential)
            dispatch('loadProfileData')
            router.push('/')
          })
      } catch (error) {
        switch (error.code) {
          case 'auth/user-not-found':
            alert("User not found")
            break
          case 'auth/wrong-password':
            alert("Incorrect password")
            break
          default:
            alert("Something went wrong")
        }
        return
      }
      commit('SET_USER', auth.currentUser)
      localStorage.setItem('token', JSON.stringify(auth.currentUser))
    },

    async register({ commit }, details) {
      const { email, password } = details
      try {
        await createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            commit('SET_USER', userCredential)
            localStorage.setItem("loggedin", JSON.stringify(true))
            router.push('/')
          })
      } catch (error) {
        switch (error.code) {
          case 'auth/email-already-in-use':
            alert("Email already in use")
            break
          case 'auth/invalid-email':
            alert("Invalid email")
            break
          case 'auth/operation-not-allowed':
            alert("Operation not allowed")
            break
          case 'auth/weak-password':
            alert("Weak password")
            break
          default:
            alert("Something went wrong")
        }
        return
      }

    },

    async logout({ commit }) {
      await signOut(auth)
      localStorage.clear('token')
      commit('CLEAR_USER')
      router.go()
      router.push('/login')
    },

    async fetchUser({ commit }) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          commit('user', user)
          // localStorage.setItem('token', JSON.stringify(user))
        } else {
          console.log("logging out")
          router.push('/login')
        }
      })
    },
    async loadProfileData({ commit, state }) {
      const profile = JSON.parse(state.session)
      const docRef = doc(db, "userProfile", profile.uid);
      const docSnap = await getDoc(docRef);
      try {
        if (docSnap.exists) {
          commit('SET_DETAILS', docSnap.data().name);
        }
      }
      catch (e) {
        console.log("No profile Data available");
      }
    },
  },
})