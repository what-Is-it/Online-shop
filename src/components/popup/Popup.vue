<template>
    <div class="popup__wrapper" ref="popup_wrapper">
        <div class="popup">
            <div class="popup__header">
                <span>{{ popupTitle }}</span>
                <span
                    ><i class="material-icons" @click="closePopup"
                        >close</i
                    ></span
                >
            </div>
            <div class="popup__main"><slot></slot></div>
            <div class="popup__footer">
                <button class="popup__close" @click="closePopup">Close</button>
                <button class="popup__submit" @click="addBtn">
                    {{ addBtnTitle }}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Popup',
    props: {
        popupTitle: {
            type: String,
            default: 'Popup Name',
        },
        addBtnTitle: {
            type: String,
            default: 'OK',
        },
    },
    data() {
        return {}
    },
    methods: {
        closePopup() {
            this.$emit('closePopup')
        },
        addBtn() {
            this.$emit('addBtn')
        },
    },
    mounted() {
        let vm = this
        document.addEventListener('click', function (e) {
            if (e.target === vm.$refs['popup_wrapper']) {
                vm.closePopup()
            }
        })
    },
}
</script>

<style lang="scss" scoped></style>
