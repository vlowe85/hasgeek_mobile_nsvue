import Vue from 'nativescript-vue';
import Vuex, {Module} from 'vuex'

import {createConnection} from 'typeorm/browser'

import * as HG from '@/models/HasGeekAPI'
import hgapi from './modules/HGAPIModule'
import appSession from './modules/AppSession'

Vue.use(Vuex);

createConnection({
  database: 'hasgeek.db',
  type: 'nativescript',
  logging: true,
  entities: [
    HG.Event, HG.Conference
  ]
}).then((connection) => connection.synchronize(false))
  .catch(console.error)

const store = new Vuex.Store({
  state: {},
  modules: {
    hgapi,
    appSession
  }
});
Vue.prototype.$store = store;

export default store