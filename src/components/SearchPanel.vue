<template>
    <div class="search-panel">
        <div class="search-input-container">
            <el-input
                placeholder="What do you want to know?"
                v-model="searchInput">
                <div slot="suffix" class="search-icon-slot" @click="search">
                    <img src="../assets/search.svg"/>
                </div>
            </el-input>
        </div>
        <div class="radio-group-container">
            <el-radio-group v-model="searchType">
                <el-radio v-for="item in searchTypes" :label="item.id" :key="item.id">{{item.type}}</el-radio>
            </el-radio-group>
        </div>
    </div>
</template>

<script>
const searchTypes = require('../constant/searchTypes');
export default {
    name: 'Search-Panel',
    data() {
        return {
            searchInput: '',
            searchType: 0,
            searchTypes
        };
    },
    mounted() {
        const that = this;
        document.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                that.search();
            }
        });
    },
    props: {},
    methods: {
        search() {
            this.$emit('toggleSearchPanel');
            window.location.hash = `/search?keywords=${encodeURIComponent(this.searchInput)}&type=${this.searchType}`;
            if (window.location.hash.indexOf('#/search') === 0) {
                this.$store.dispatch('SEARCH', {
                    keywords: this.searchInput,
                    type: this.searchType
                });
            }
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
    .search-panel {
        .search-input-container {
            width: 800px;
            margin: 0 auto;
            margin-top: 60px;

            .el-input {
                .el-input__inner {
                    border-radius: 0;
                    height: 48px;
                    line-height: 48px;
                    padding-right: 48px;
                    font-size: 16px;
                    color: black;

                    &:focus {
                        border-color: #B70016;
                    }
                }

                .el-input__suffix {
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    width: 32px;

                    .el-input__suffix-inner {
                        position: relative;
                        top: 1px;
                    }
                }
            }
        }

        .radio-group-container {
            width: 800px;
            margin: 0 auto;
            margin-top: 40px;
            margin-bottom: 80px;

            .el-radio__input.is-checked + .el-radio__label {
                color: #B70016;
            }

            .el-radio__input.is-checked .el-radio__inner {
                background-color: #B70016;
                border-color: #B70016;
            }

            .el-radio__label {
                font-weight: 600;
            }

            .el-radio__inner {
                border-radius: 0;

                &:hover {
                    border-color: #B70016;
                }
            }

            .el-radio__inner::after {
                background-color: #B70016;
            }
        }
    }
</style>
