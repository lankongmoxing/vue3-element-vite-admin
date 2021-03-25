import { createStore } from 'vuex'
import app from './modules/app'
import permission from './modules/permission'
import settings from './modules/settings'


export default createStore({
  modules: {
    permission,
    settings,
    app
  }
})