<template>
    <div class="search-result-page common-page">
        <div class="result-container">
            <div class="result-title">
                Search Result for: "<span class="highlight">{{searchResult.searchWords}}</span>"
            </div>
            <div class="result-list">
                <div class="result-item" @click="gotoResult(item)" v-for="(item,index) in searchResult.results" :key="index">
                    <div class="result-item-title">{{item.title}}</div>
                    <div class="result-item-content" v-for="(content,index) in item.contents" :key="index">{{content}}</div>
                </div>
            </div>
            <div class="blank"></div>
        </div>
        <custom-footer type="red" :fixed="true"></custom-footer>
    </div>
</template>

<script>
import CustomFooter from '../components/CustomFooter';

const queryString = require('query-string');

export default {
    name: 'home',
    data() {
        return {};
    },
    beforeMount() {
        let params = {};
        let parsed = queryString.parse(location.hash.split('?')[1]);
        params.keywords = parsed.keywords || null;
        params.type = parsed.type || null;
        if (params.keywords && params.type) {
            this.$store.dispatch('SEARCH', params);
        }
    },
    computed: {
        searchResult() {
            return this.$store.state.searchResult;
        }
    },
    methods: {
        gotoResult(item) {
            switch (+this.searchResult.searchType) {
            case 0:
                window.location.hash = `/researcher?id=${item.id}`;
                break;
            case 1:
                window.location.hash = `/paper?id=${item.id}`;
                break;
            case 2:
                console.log(item);
                break;
            case 3:
                console.log(item);
                break;
            }
        }
    },
    components: {
        CustomFooter
    }
};
</script>
<style lang="less">
    .search-result-page{
        .result-container {
            width: 800px;
            margin: 0 auto;
            .result-title{
                font-size: 32px;
                font-weight: 800;
                margin-bottom: 40px;
                .highlight{
                    color: #B70016;
                }
            }
            .result-list{
                .result-item{
                    margin-bottom: 40px;
                    padding-bottom: 30px;
                    border-bottom: 1px solid #f5f5f5;
                    cursor: pointer;
                    .result-item-title{
                        font-size: 24px;
                        font-weight: 600;
                        margin-bottom: 12px;
                    }
                    .result-item-content{
                        font-size: 14px;
                        margin-bottom: 10px;
                        line-height: 20px;
                        color: #666;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                    }
                }
            }
            .blank{
                height: 120px;
                width: 100%;
            }
        }
    }
</style>
