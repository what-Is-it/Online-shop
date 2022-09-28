<template>
    <div class="shop-header">
        <router-link :to="{name: 'Home'}">
            <img src="../assets/logo.png" alt="logo" />
        </router-link>

        <div class="search-field">
            <input
                type="text"
                v-model="searchValue"
                placeholder="Поиск по названию"
            />
            <button class="search-btn">
                <i class="material-icons" @click="search(searchValue)"
                    >search</i
                >
            </button>
            <button class="search-btn">
                <i class="material-icons" @click="clearSearchField">cancel</i>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Header',
    props: {},
    data() {
        return {
            searchValue: '',
        }
    },
    methods: {
        search(value) {
            this.$store.commit('SET_SEARCH_VALUE', value)
            if (this.$route.path !== '/catalog') {
                this.$router.push('/catalog')
            }
        },
        clearSearchField() {
            this.searchValue = ''
            this.$store.commit('SET_SEARCH_VALUE', '')
            console.log(this.$store.state.searchValue)
            if (this.$route.path !== '/catalog') {
                this.$router.push('/catalog')
            }
        },
    },
}
</script>

<style lang="scss" scoped></style>
