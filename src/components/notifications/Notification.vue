<template>
    <div class="notification">
        <transition-group name="transition-animate" tag="div">
            <div
                class="notification__content"
                v-for="message in messages"
                :key="message.id"
                :class="message.icon"
            >
                <div class="content__text">
                    <span>{{message.name}}</span>
                    <i class="material-icons">{{message.icon}}</i>
                </div>
                <div class="content__buttons">
                    <button v-if="rightButton.length">{{rightButton}}</button>
                    <button v-if="leftButton.length">{{leftButton}}</button>
                </div>
            </div>
        </transition-group>
    </div>
</template>

<script>
export default {
    name: "Notification",
    props: {
        messages: {
            type: Array,
            default: () => {
                return []
            }
        },
        rightButton: {
            type: String,
            default: ''
        },
        leftButton: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            
        }
    },
    methods: {
        hideNotification() {
            let vm = this
            if(this.messages.length) {
                setTimeout(function() {
                    vm.messages.splice(vm.messages.length - 1, 1)
                }, 3000)
            }
        }
    },
    watch: {
        messages: {
            handler: function() {
                this.hideNotification()
            }, deep: true
        },
    },
    mounted() {
        this.hideNotification()
    }
}
</script>

<style lang="scss" scoped>
</style>