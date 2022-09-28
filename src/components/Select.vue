<template>
    <div class="select">
        <p class="select__title" @click.stop="areOptionsVisible = !areOptionsVisible">{{selected}}</p>
        <div class="select__options" v-if="areOptionsVisible || isExpanded">
            <p
                v-for="option in options"
                :key="option.value"
                @click="selectOption(option)"
            >{{option.name}}</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Select',
        props: {
            options: {
                type: Array,
                default() {
                    return []
                }
            },
            selected: {
                type: String,
                default() {
                    return ''
                }
            },
            isExpanded: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                areOptionsVisible: false
            }
        },
        methods: {
            selectOption(option) {
                this.$emit('select', option)
                this.areOptionsVisible = false
            },
            /* toogleSelect(e) {
                if (document.querySelector(".select__title").contains(e.target)) {
                    this.areOptionsVisible = false;
                }
            }, */
            hideSelect() {
                this.areOptionsVisible = false
            }
        },
        mounted() {
            document.addEventListener('click', this.hideSelect)
        },
        beforeUnmount() {
            document.removeEventListener('click', this.hideSelect)
        }
    }
</script>

<style lang="scss" scoped>
</style>