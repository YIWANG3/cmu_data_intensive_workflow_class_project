<template>
    <div class="nav-bar" :class="{shadow:showSearchPanel}">
        <div class="top-bar">
            <div class="logo">
                <img src="../assets/logo.svg"/>
            </div>
            <div class="menu-items">
                <div class="menu-item" v-for="item in menuConfig" @click="handleClick(item.link)" :key="item.index">
                    {{item.text}}
                </div>
                <div class="search-icon" @click="toggleSearchPanel" ref="searchIcon" v-if="this.$route.path!=='/'">
                    <img v-if="!showSearchPanel" src="../assets/search.svg"/>
                    <img v-if="showSearchPanel" src="../assets/close.svg"/>
                </div>
            </div>
        </div>
        <div class="search-panel-container" v-if="showSearchPanel">
            <search-panel @toggleSearchPanel="toggleSearchPanel"></search-panel>
        </div>
    </div>
</template>

<script>
import SearchPanel from './SearchPanel';

const menuConfig = [{
    text: 'Researcher',
    link: '/researcher',
    index: 0
}, {
    text: 'Paper',
    link: '/paper',
    index: 1
}, {
    text: 'Channel',
    link: '/channel',
    index: 2
}, {
    text: 'More',
    link: '/',
    index: 3
}];
export default {
    name: 'Nav-Bar',
    data() {
        return {
            menuConfig,
            showSearchPanel: false,
            showSearchIcon: true
        };
    },
    props: {},
    methods: {
        handleClick(link) {
            this.$router.push(link);
            this.showSearchPanel = false;
        },
        toggleSearchPanel() {
            console.log(this.showSearchPanel);
            this.showSearchPanel = !this.showSearchPanel;
        }
    },
    components: { SearchPanel }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .nav-bar {
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 100;
        &.shadow{
            box-shadow: 0 2px 8px 0 rgba(0,0,0,0.03);
        }
        background-color: white;
        .top-bar {
            height: 60px;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .logo {
                margin-left: 40px;

                img {
                    height: 40px;
                }
            }

            .menu-items {
                font-size: 14px;
                font-weight: 300;
                color: #999;
                display: flex;
                margin-right: 40px;

                .menu-item {
                    margin-left: 60px;
                    cursor: pointer;

                    &:hover {
                        color: #B70016;
                    }
                }

                .search-icon {
                    cursor: pointer;
                    margin-left: 60px;

                    img {
                        width: 18px;
                    }
                }
            }
        }
    }
</style>
