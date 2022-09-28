<template>
    <div class="busket">
        <router-link :to="{name: 'Catalog'}">
            <div class="busket__to-catalog btn">Back to Catalog</div>
        </router-link>
        <h2>Busket</h2>
        <p v-if="!BUSKET.length">There are no products in Busket...</p>
        <BusketItem
            v-for="(item, index) of BUSKET"
            :key="item.article"
            :busket_item_data="item"
            @deleteFromBusket="deleteFromBusket(index)"
            @increment="increment(index)"
            @decrement="decrement(index)"
        />
        <div class="busket__total">
            <p class="total_name">Total:</p>
            <p>{{ formattedPrice(BUSKET_TOTAL) }}</p>
        </div>
    </div>
</template>

<script>
import formattedPrice from '../utils/priceFormat'
import BusketItem from './Busket-item'
export default {
    name: 'Busket',
    components: {BusketItem},
    props: {
        busket_data: {
            type: Array,
            default() {
                return []
            },
        },
    },
    data() {
        return {}
    },
    methods: {
        deleteFromBusket(index) {
            this.$store.dispatch('DELETE_FROM_BUSKET', index)
        },
        decrement(index) {
            this.$store.dispatch('DECREMENT_BUSKET_ITEM', index)
        },
        increment(index) {
            this.$store.dispatch('INCREMENT_BUSKET_ITEM', index)
        },
        formattedPrice,
    },
    computed: {
        BUSKET() {
            return this.$store.getters.BUSKET
        },
        BUSKET_TOTAL() {
            let result = []
            if (this.$store.getters.BUSKET.length) {
                for (let item of this.$store.getters.BUSKET) {
                    result.push(item.price * item.quantity)
                }
                result = result.reduce(function (sum, el) {
                    return sum + el
                })
                return result
            } else {
                return 0
            }
        },
    },
}
</script>

<style lang="scss" scoped></style>
