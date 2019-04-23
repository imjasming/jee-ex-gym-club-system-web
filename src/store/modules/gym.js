import {setStore} from '@/utils/localStorage'

const gym = {
  state: {
    gyms: null,
    trainers: null,

  },
  mutations: {
    SET_GYMS: (state, gymList) => {
      state.gyms = gymList
      setStore('gymList', gymList)
    },
    SET_TRAINERS: (state, trainerList) => {
      state.trainers = trainerList
      setStore('trainerList', trainerList)
    },
    ADD_GYMS: (state, gymList) => {
      state.gyms = [...gymList]
      setStore('gymList', state.gyms)
    },
    ADD_TRAINERS: (state, trainerList) => {
      state.gyms = [...trainerList]
      setStore('gymList', state.gyms)
    },
  }
}
