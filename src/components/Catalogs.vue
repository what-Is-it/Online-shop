<template>
    <div class="catalog">
        <Notification :messages="messages" rightButton="OK" />
        <router-link :to="{name: 'Busket'}">
            <div class="catalog__to-busket btn">
                Busket: {{ BUSKET.length }}
            </div>
        </router-link>

        <h1>Catalog</h1>
        <div class="catalog__main">
            <div class="filters">
                <Select
                    :options="options"
                    @select="sortByCategories"
                    :selected="selected"
                    :isExpanded="IS_DESKTOP"
                />
                <div class="range-slider">
                    <input
                        type="range"
                        min="0"
                        max="10000"
                        step="100"
                        v-model.number="minPrice"
                        @change="setRangeSlider"
                    />
                    <input
                        type="range"
                        min="0"
                        max="10000"
                        step="100"
                        v-model.number="maxPrice"
                        @change="setRangeSlider"
                    />
                </div>
                <div class="range-val">
                    <p>Min: {{ minPrice }}</p>
                    <p>Max: {{ maxPrice }}</p>
                </div>
            </div>
            <div class="catalog__list">
                <CatalogItem
                    v-for="product of filteredProducts"
                    :key="product.article"
                    v-bind:product_data="product"
                    @addToBusket="addToBusket"
                    @productClick="productClick"
                />
            </div>
        </div>
    </div>
</template>

<script>
import Select from './Select'
import CatalogItem from './CatalogItem'
import Notification from './notifications/Notification'
export default {
    name: 'Catalogs',
    components: {CatalogItem, Select, Notification},
    props: {},
    methods: {
        productClick(article) {
            this.$router.push({name: 'Product', query: {product: article}})
        },
        addToBusket(data) {
            this.$store.dispatch('ADD_TO_CARD', data).then(() => {
                let timeStamp = Date.now().toLocaleString()
                this.messages.unshift({
                    name: 'Товар добавлен в корзину',
                    icon: 'check_circle',
                    id: timeStamp,
                })
            })
        },
        sortByCategories(option) {
            /* this.selected = option.name
            this.sortedProducts = []
            if(option.name === 'Все') {
                this.sortedProducts = this.PRODUCTS
            } else {
                this.PRODUCTS.map((item) => {
                if(item.category === option.name) {
                    this.sortedProducts.push(item)
                    console.log(this.sortedProducts);
                }
            })
            } */
            let vm = this
            console.log(this.sortedProducts)
            this.sortedProducts = this.PRODUCTS
            console.log(this.sortedProducts)
            this.sortedProducts = this.sortedProducts.filter(function (item) {
                return item.price >= vm.minPrice && item.price <= vm.maxPrice
            })
            if (option) {
                this.sortedProducts = this.sortedProducts.filter(function (e) {
                    vm.selected = option.name
                    return e.category === option.name
                })
            }
        },
        setRangeSlider() {
            if (this.minPrice > this.maxPrice) {
                let temp = this.maxPrice
                this.maxPrice = this.minPrice
                this.minPrice = temp
            }
            this.sortByCategories()
        },
        sortProductsBySearchValue(value) {
            this.sortedProducts = this.PRODUCTS
            if (value) {
                this.sortedProducts = this.sortedProducts.filter(function (
                    item
                ) {
                    return item.name.toLowerCase().includes(value.toLowerCase())
                })
            } else {
                this.sortedProducts = this.PRODUCTS
            }
        },
    },
    async mounted() {
        await this.$store.dispatch('FETCH_PRODUCTS')
        this.sortProductsBySearchValue(this.SEARCH_VALUE)
    },
    watch: {
        SEARCH_VALUE() {
            this.sortProductsBySearchValue(this.SEARCH_VALUE)
        },
    },
    data() {
        return {
            options: [
                {name: 'Все', value: 'Все'},
                {name: 'Мужские', value: 'М'},
                {name: 'Женские', value: 'Ж'},
            ],
            selected: 'Все',
            sortedProducts: [],
            minPrice: 0,
            maxPrice: 10000,
            messages: [],
        }
    },
    computed: {
        SEARCH_VALUE: function () {
            return this.$store.state.searchValue
        },
        BUSKET: function () {
            return this.$store.getters.BUSKET
        },
        PRODUCTS: function () {
            return this.$store.getters.PRODUCTS
        },
        filteredProducts() {
            if (this.sortedProducts.length) {
                return this.sortedProducts
            } else {
                return this.PRODUCTS
            }
        },
        IS_DESKTOP: function () {
            return this.$store.state.isDesktop
        },
    },
}
</script>

<style lang="scss" scoped></style>
