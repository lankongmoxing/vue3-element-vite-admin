import { createStore } from 'vuex'
import app from './modules/app'
import permission from './modules/permission'
import settings from './modules/settings'
import tagsView from './modules/tags-view'
import user from './modules/user'


export default createStore({
  modules: {
    permission,
    settings,
    app,
    user,
    tagsView
  }
})