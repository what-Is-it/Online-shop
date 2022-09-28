import {createStore} from 'vuex'
import axios from 'axios'

export default createStore({
    state: {
        products: [],
        searchValue: '',
        busket: [],
        isMobile: false,
        isDesktop: true,
    },
    mutations: {
        SET_SEARCH_VALUE: (state, value) => {
            state.searchValue = value
        },
        SET_PRODUCTS: (state, products) => {
            state.products = products
        },
        SET_CARD: (state, product) => {
            if (state.busket.length) {
                let isProductExists = false
                state.busket.map(function (item) {
                    if (item.article === product.article) {
                        isProductExists = true
                        item.quantity++
                    }
                })
                if (!isProductExists) {
                    state.busket.push(product)
                }
            } else {
                state.busket.push(product)
            }
        },
        REMOVE_FROM_BUSKET: (state, index) => {
            state.busket.splice(index, 1)
        },
        INCREMENT: (state, index) => {
            state.busket[index].quantity++
        },
        DECREMENT: (state, index) => {
            if (state.busket[index].quantity !== 0) {
                state.busket[index].quantity--
            } else {
                state.busket[index].quantity = 0
            }
        },
        SWITCH_MOBILE: (state) => {
            state.isMobile = true
            state.isDesktop = false
        },
        SWITCH_DESKTOP: (state) => {
            state.isMobile = false
            state.isDesktop = true
        },
    },
    actions: {
        async FETCH_PRODUCTS({commit}) {
            await axios
                .get('http://localhost:3000/products')
                .then((response) => {
                    console.log(response)
                    commit('SET_PRODUCTS', response.data)
                    return response
                })
                .catch((error) => {
                    console.log(error)
                    return error
                })
        },
        ADD_TO_CARD({commit}, product) {
            let quantity = 1
            product = {...product, quantity}
            commit('SET_CARD', product)
        },
        DELETE_FROM_BUSKET({commit}, index) {
            commit('REMOVE_FROM_BUSKET', index)
        },
        INCREMENT_BUSKET_ITEM({commit}, index) {
            commit('INCREMENT', index)
        },
        DECREMENT_BUSKET_ITEM({commit}, index) {
            commit('DECREMENT', index)
        },
    },
    getters: {
        SEARCH_VALUE(state) {
            return state.searchValue
        },
        PRODUCTS(state) {
            return state.products
        },
        BUSKET(state) {
            return state.busket
        },
    },
    modules: {},
})
