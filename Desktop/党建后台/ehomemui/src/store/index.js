import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
 const store= new Vuex.Store({
  state:{
    myUser:{
    }
  },
  mutations:{
   'CHANGE_user'(state,payload){
     state.myUser=payload
   }
  }
})
export default store
