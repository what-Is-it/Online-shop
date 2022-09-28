<template>
    <div class="busket-item">
        <img
            class="busket-item__image"
            :src="require('../assets/images/' + busket_item_data.image)"
            alt="img"
        />
        <div class="busket-item__info">
            <p>{{ busket_item_data.name }}</p>
            <p>{{ formattedPrice(busket_item_data.price) }}</p>
            <p>{{ busket_item_data.article }}</p>
        </div>
        <div class="busket-item__quantity">
            QTY:
            <p @click="decrementItem" class="quantity__btn">-</p>
            {{ busket_item_data.quantity }}
            <p @click="incrementItem" class="quantity__btn">+</p>
        </div>
        <button @click="deleteFromBusket">Delete</button>
    </div>
</template>

<script>
import formattedPrice from '../utils/priceFormat'
export default {
    name: 'Busket-item',
    components: {},
    props: {
        busket_item_data: {
            type: Object,
            default() {
                return {}
            },
        },
    },
    mounted() {},
    computed: {},
    data() {
        return {}
    },
    methods: {
        deleteFromBusket() {
            this.$emit('deleteFromBusket')
        },
        decrementItem() {
            this.$emit('decrement')
        },
        incrementItem() {
            this.$emit('increment')
        },
        formattedPrice,
    },
}
</script>

<style lang="scss" scoped></style>
