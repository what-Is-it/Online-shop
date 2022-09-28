<template>
    <div class="catalog-item">
        <popup
            v-if="isPopupVisible"
            @closePopup="closePopup"
            addBtnTitle="Add to Busket"
            :popupTitle="product_data.name"
            @addBtn="addToBusket"
        >
            <img
                class="catalog-item__img"
                :src="require('../assets/images/' + product_data.image)"
                alt="img"
            />
            <div>
                <p class="catalog-item__name">{{ product_data.name }}</p>
                <p class="catalog-item__price">
                    Price : {{ formattedPrice(product_data.price) }}
                </p>
                <p class="catalog-item__price">{{ product_data.category }}</p>
            </div>
        </popup>
        <img
            @click="productClick"
            class="catalog-item__img"
            :src="require('../assets/images/' + product_data.image)"
            alt="img"
        />
        <p class="catalog-item__name">{{ product_data.name }}</p>
        <p class="catalog-item__price">
            Price : {{ formattedPrice(product_data.price) }}
        </p>
        <button class="catalog-item__show-info btn" @click="showPopup">
            Show info
        </button>
        <button class="catalog-item__add-btn btn" @click="addToBusket">
            Add to Busket
        </button>
    </div>
</template>

<script>
import formattedPrice from '../utils/priceFormat'
import Popup from './popup/Popup'
export default {
    name: 'CatalogItem',
    components: {Popup},
    props: {
        product_data: {
            type: Object,
            default() {
                return {}
            },
        },
    },
    data() {
        return {
            isPopupVisible: false,
        }
    },
    methods: {
        productClick() {
            this.$emit('productClick', this.product_data.article)
        },
        addToBusket() {
            this.$emit('addToBusket', this.product_data)
        },
        showPopup() {
            this.isPopupVisible = true
            document.body.classList.add('o_hidden')
        },
        closePopup() {
            this.isPopupVisible = false
            document.body.classList.remove('o_hidden')
        },
        formattedPrice,
    },
}
</script>

<style lang="scss" scoped></style>
