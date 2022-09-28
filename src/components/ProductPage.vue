<template>
    <div class="product-page">
        <Notification :messages="messages" rightButton="OK" />
        <img
            class="catalog-item__img"
            :src="require('../assets/images/' + product.image)"
            alt="img"
        />
        <div>
            <p class="catalog-item__name">Product name: {{ product.name }}</p>
            <p class="catalog-item__price">Price : {{ formattedPrice(product.price) }}</p>
            <p class="catalog-item__price">{{ product.category }}</p>
        </div>
        <button class="catalog-item__add-btn btn" @click="addToBusket">Add to Busket</button>
    </div>
</template>

<script>
import formattedPrice from '../utils/priceFormat'
import Notification from './notifications/Notification'
    export default {
        name: 'Product',
        components: {Notification},
        props: {},
        data() {
            return {
                messages: []
            }
        },
        computed: {
            PRODUCTS() {
                return this.$store.getters.PRODUCTS
            },
            product() {
                let result = {}
                let vm = this;
                this.PRODUCTS.map(function(item) {
                    if(item.article == vm.$route.query.product) {
                        result = item
                    }
                })
                return result
            },
        },
        methods: {
            formattedPrice,
            addToBusket() {
                this.$store.dispatch('ADD_TO_CARD', this.product)
                .then(()=>{
                    let timeStamp = Date.now().toLocaleString()
                    this.messages.unshift({name:'Товар добавлен в корзину', icon: 'check_circle', id: timeStamp})
                })
            },
        }
        /* mounted() {
            this.$store.getters.PRODUCTS
        }, */
    }
</script>

<style lang="scss" scoped>
</style>