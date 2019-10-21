<template>
    <div class="paper-page common-page">
        <div class="paper-info-container">
            <div class="section-title-abstract section">
                <div class="paper-title">
                    {{paper.title}}
                </div>
                <div class="abstract">
                    {{paper.abstract}}
                </div>
            </div>
            <div class="section-basic section">
                <div class="section-title">Basic Information</div>
                <div class="section-content">
                    <div class="basic-info-item" v-for="(item,index) in paper.basicInfo" :key="index">
                        <div class="attr">{{item.attr}}</div>
                        <div class="value" v-if="item.type==='text'">{{item.value}}</div>
                        <div class="value" v-if="item.type==='link'">
                            <a target='_blank' :href="item.value">
                                {{item.value}}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="section-keywords section"
                 v-if="paper.keywords && paper.keywords.length > 0">
                <div class="section-title">Keywords</div>
                <div class="section-content">
                    <div class="keywords-container">
                        <div class="keyword" v-for="(word,index) in paper.keywords" :key="index">
                            {{word}}
                        </div>
                    </div>
                </div>
            </div>
            <div class="section-authors section"
                 v-if="paper.authors && paper.authors.length > 0">
                <div class="section-title">Authors</div>
                <div class="section-content">
                    <div class="authors-container">
                        <div class="author" v-for="(author,index) in paper.authors" :key="index">
                            <div class="name">{{author.name}}</div>
                            <div class="affiliation">{{author.affiliation}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="section-references section"
                 v-if="paper.references && paper.references.length > 0">
                <div class="section-title">References</div>
                <div class="section-content">
                    <div class="references-container">
                        <div class="reference" v-for="(ref,index) in paper.references" :key="index">
                            {{ref.title}}
                        </div>
                    </div>
                </div>
            </div>
            <div class="blank"></div>
        </div>
        <custom-footer type="red"></custom-footer>
    </div>
</template>

<script>
import CustomFooter from '../components/CustomFooter';
const queryString = require('query-string');

export default {
    name: 'home',
    data() {
        return {
            graphInit: false
        };
    },
    beforeMount() {
        let params = {};
        let parsed = queryString.parse(location.hash.split('?')[1]);
        params.id = parsed.id || null;
        this.$store.dispatch('GET_PAPER_INFO', params);
    },
    updated() {},
    computed: {
        paper() {
            return this.$store.state.currentPaper;
        }
    },
    methods: {
    },
    components: {
        CustomFooter
    }
};
</script>
<style lang="less">
    .paper-page {
        .paper-info-container {
            width: 800px;
            margin: 0 auto;
            font-size: 14px;

            .section {
                margin-bottom: 80px;

                .section-title {
                    font-size: 28px;
                    font-weight: 800;
                    color: #B70016;
                    margin-bottom: 30px;
                }
            }
            .section-title-abstract{
                .paper-title{
                    font-weight: 800;
                    font-size: 36px;
                    margin-bottom: 40px;
                }
                .abstract{
                    color: #666;
                    line-height: 24px;
                }
            }

            .section-basic{
                .section-content{
                    .basic-info-item{
                        display: flex;
                        height: 80px;
                        line-height: 80px;
                        border-bottom: 1px solid #f5f5f5;
                        .attr{
                            width: 200px;
                        }
                        .value{
                            font-weight: 600;
                            a{
                                color: #B70016;
                            }
                        }
                    }
                }
            }

            .section-keywords{
                .keywords-container{
                    display: flex;
                    flex-wrap: wrap;
                    .keyword{
                        font-weight: 600;
                        margin-right: 24px;
                        margin-bottom: 4px;
                    }
                }
            }

            .section-authors{
                .authors-container{
                    .author{
                        display: flex;
                        height: 40px;
                        line-height: 40px;
                        .name{
                            font-weight: 600;
                            width: 200px;
                        }
                    }
                }
            }

            .section-references{
                .references-container{
                    .reference{
                        font-weight: 600;
                        padding: 32px 0;
                        border-bottom: 1px solid #f5f5f5;
                    }
                }
            }

            .blank {
                height: 120px;
                width: 100%;
            }
        }
    }
</style>
