import axios from 'axios'

const clientUrl = process.env.CLIENT_URL

// instantiated defaults on state
export const state = () => ({
  isConnected: false,
  message: null,
  nowPlaying: {},
  recentlyPlayed: {},
  trackProgress: 0,
  isPlaying: false
})

// we don’t edit the properties directly, we call a mutation method
export const mutations = {
  connectionChange(state, isConnected) {
    state.isConnected = isConnected
  },
  messageChange(state, message) {
    state.message = message
  },
  nowPlayingChange(state, nowPlaying) {
    state.nowPlaying = nowPlaying
  },
  isPlayingChange(state, isPlaying) {
    state.isPlaying = isPlaying
  },
  progressChange(state, { progress, duration }) {
    state.trackProgress = (progress / duration) * 100
  },
  recentlyPlayedChange(state, recentlyPlayed) {
    state.recentlyPlayed = recentlyPlayed
  }
}

// we can dispatch actions to edit a property and return its new state
export const actions = {
  async nuxtServerInit({ commit }) {
    try {
      const redisUrl = `${clientUrl}/api/spotify/data/`
      const {
        data: { is_connected }
      } = await axios.get(`${redisUrl}is_connected`)

      commit('connectionChange', is_connected)
      if (Boolean(is_connected)) {
        const {
          data: { item, is_playing }
        } = await axios.get(`${clientUrl}/api/spotify/now-playing`)

        commit('nowPlayingChange', item)
        commit('isPlayingChange', is_playing)
      }
    } catch (err) {
      console.error(err)
    }
  },
  updateProgress: ({ commit, state }, props) => {
    commit('progressChange', props)
    return state.trackProgress
  },
  updateTrack: ({ commit, state }, nowPlaying) => {
    commit('nowPlayingChange', nowPlaying)
    return state.nowPlaying
  },
  updateStatus: ({ commit, state }, isPlaying) => {
    commit('isPlayingChange', isPlaying)
    return state.isPlaying
  },
  updateConnection: ({ commit, state }, isConnected) => {
    commit('connectionChange', isConnected)
    return state.isConnected
  }
}
