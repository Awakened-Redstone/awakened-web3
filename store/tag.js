export const state = () => ({
  categories: [],
  loaders: [],
  gameVersions: [],
  licenses: [],
  donationPlatforms: [],
})

export const mutations = {
  SET_CATEGORIES(state, categories) {
    state.categories = categories
  },
  SET_LOADERS(state, loaders) {
    state.loaders = loaders
  },
  SET_GAME_VERSIONS(state, gameVersions) {
    state.gameVersions = gameVersions
  },
  SET_LICENSES(state, licenses) {
    state.licenses = licenses
  },
  SET_DONATION_PLATFORMS(state, donationPlatforms) {
    state.donationPlatforms = donationPlatforms
  },
}

export const actions = {
  async fetchAllTags({ commit }) {
    const [categories, loaders, gameVersions, licenses, donationPlatforms] = (
      await Promise.all([
        this.$axios.get(`https://api.modrinth.com/v2/tag/category`),
        this.$axios.get(`https://api.modrinth.com/v2/tag/loader`),
        this.$axios.get(`https://api.modrinth.com/v2/tag/game_version`),
        this.$axios.get(`https://api.modrinth.com/v2/tag/license`),
        this.$axios.get(`https://api.modrinth.com/v2/tag/donation_platform`),
      ])
    ).map((it) => it.data)

    commit('SET_CATEGORIES', categories)
    commit('SET_LOADERS', loaders)
    commit('SET_GAME_VERSIONS', gameVersions)
    commit('SET_LICENSES', licenses)
    commit('SET_DONATION_PLATFORMS', donationPlatforms)
  },
}
