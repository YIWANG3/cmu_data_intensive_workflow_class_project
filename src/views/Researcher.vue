<template>
    <div class="researcher-page common-page">
        <div class="researcher-info-container">
            <div class="section-basic section">
                <div class="avatar">
                    <div class="img" :style="{backgroundImage: 'url(' + researcher.avatar + ')' }"></div>
                </div>
                <div class="name">
                    {{researcher.name}}
                </div>
                <div class="title" v-if="researcher.title">
                    {{researcher.title}}
                </div>
                <div class="affiliation" v-if="researcher.affiliation">
                    {{researcher.affiliation}}
                </div>
                <div class="email" v-if="researcher.email">
                    {{researcher.email}}
                </div>
            </div>
            <div class="section-interests section"
                 v-if="researcher.researchInterests && researcher.researchInterests.length > 0">
                <div class="section-title">Research interests</div>
                <div class="section-content">
                    <div class="interests-container">
                        <div class="interests" v-for="(interest,index) in researcher.researchInterests" :key="index">
                            {{interest}}
                        </div>
                    </div>
                </div>
            </div>
            <div class="section-bio section" v-if="researcher.biography">
                <div class="section-title">Biography</div>
                <div class="section-content">
                    {{researcher.biography}}
                </div>
            </div>
            <div class="section-pub section" v-if="researcher.publications">
                <div class="section-title">Publications</div>
                <div class="section-content">
                    <div class="publication" v-for="(item,index) in researcher.publications" :key="index">
                        <div class="pub-title">
                            {{item.title}}
                        </div>
                        <div class="authors">
                            <div class="author" v-for="(name,index) in item.authors" :key="index">
                                {{name}}
                            </div>
                        </div>
                        <div class="channel">
                            {{item.channel}}
                        </div>
                    </div>
                </div>
            </div>
            <div class="section-statistic section"
                 v-if="researcher.publicationStatistic && researcher.publicationStatistic.length > 0">
                <div class="section-title">Publications per year</div>
                <div class="section-content">
                    <div class="year-range-selection">
                        <div class="single-selection">
                            <div class="text">From</div>
                            <el-select v-model="publicationFromYear" placeholder="select year" size="small">
                                <el-option
                                    v-for="year in publicationYears"
                                    :key="year"
                                    :label="year"
                                    :value="year">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="single-selection">
                            <div class="text">To</div>
                            <el-select v-model="publicationToYear" placeholder="select year" size="small">
                                <el-option
                                    v-for="year in publicationYears"
                                    :key="year"
                                    :label="year"
                                    :value="year">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="search-btn" @click="updatePublicationStatistic">
                            Search
                        </div>
                    </div>
                    <div class="statistic-graph" id="statistic-graph"></div>
                </div>
            </div>
            <div class="section-collaboration section" v-if="researcher.collaborations">
                <div class="section-title">Collaborations</div>
                <div class="section-content">
                    Collaborations Here
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
const echarts = require('echarts');

function drawGraph(dom, data) {
    const chart = echarts.init(dom);
    const xAxis = data.map(item => item.year);
    const yData = data.map(item => item.count);
    chart.setOption({
        xAxis: {
            data: xAxis
        },
        yAxis: {},
        series: [{
            name: 'Count',
            type: 'bar',
            data: yData,
            barWidth: 20,
            itemStyle: {
                color: '#9c0010'
            }
        }],
        grid: {
            left: 20,
            right: 0,
            top: 40
        }
    });
}

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
        this.$store.dispatch('GET_RESEARCHER_INFO', params);
    },
    updated() {
        if (!this.graphInit) {
            drawGraph(document.getElementById('statistic-graph'), this.researcher.publicationStatistic);
            this.graphInit = true;
        }
    },
    computed: {
        researcher() {
            return this.$store.state.currentResearcher;
        },
        publicationStatistic() {
            return this.$store.state.currentResearcher.publicationStatistic;
        },
        publicationYears() {
            return this.$store.state.publicationYears;
        },
        publicationFromYear: {
            get() {
                return this.$store.state.publicationFromYear;
            },
            set(v) {
                this.$store.commit('UPDATE_PUBLICATION_FROM_YEAR', v);
            }
        },
        publicationToYear: {
            get() {
                return this.$store.state.publicationToYear;
            },
            set(v) {
                this.$store.commit('UPDATE_PUBLICATION_TO_YEAR', v);
            }
        }
    },
    methods: {
        updatePublicationStatistic() {
            if (this.publicationFromYear <= this.publicationToYear) {
                let allPublicationsData = this.researcher.publicationStatistic;
                let startIndex = allPublicationsData.findIndex(item => item.year === this.publicationFromYear);
                let endIndex = allPublicationsData.findIndex(item => item.year === this.publicationToYear);
                let newData = allPublicationsData.slice(startIndex, endIndex + 1);
                drawGraph(document.getElementById('statistic-graph'), newData);
            }
        }
    },
    components: {
        CustomFooter
    }
};
</script>
<style lang="less">
    .el-select-dropdown.el-popper{
        .el-select-dropdown__item.selected{
            color: #B70016;
        }
    }

    .el-select-dropdown__item.hover, .el-select-dropdown__item:hover{
        background-color: #f5f5f5;
    }

    .researcher-page {
        .researcher-info-container {
            width: 800px;
            margin: 0 auto;
            font-size: 14px;
            padding-top: 80px;

            .section {
                margin-bottom: 80px;

                .section-title {
                    font-size: 28px;
                    font-weight: 800;
                    color: #B70016;
                    margin-bottom: 30px;
                }
            }

            .section-basic {
                display: flex;
                flex-direction: column;
                align-items: center;
                margin-bottom: 120px;

                .avatar {
                    margin-bottom: 30px;

                    .img {
                        width: 120px;
                        height: 120px;
                        border-radius: 50%;
                        background-size: cover;
                    }
                }

                .name {
                    font-size: 24px;
                    font-weight: 600;
                    margin-bottom: 10px;
                }

                .title, .affiliation, .email {
                    font-size: 16px;
                    margin-bottom: 4px;
                }
            }

            .section-interests {
                .section-content {
                    .interests-container {
                        display: flex;
                        flex-wrap: wrap;

                        .interests {
                            font-weight: 600;
                            margin-right: 24px;
                            margin-bottom: 4px;
                        }
                    }
                }
            }

            .section-bio {
                .section-content {
                    line-height: 24px;
                    color: #666;
                }
            }

            .section-pub {
                .section-content {
                    .publication {
                        border-bottom: 1px solid #f5f5f5;
                        padding-bottom: 20px;
                        margin-bottom: 30px;

                        .pub-title {
                            font-weight: 600;
                            margin-bottom: 12px;
                        }

                        .authors {
                            color: #666;
                            display: flex;
                            margin-bottom: 4px;

                            .author {
                                margin-right: 20px;
                            }
                        }

                        .channel {
                            color: #666;
                        }
                    }
                }
            }

            .section-statistic {
                .section-content {
                    .year-range-selection {
                        display: flex;
                        align-items: center;

                        .single-selection {
                            display: flex;
                            align-items: center;

                            .text {
                                font-weight: 600;
                                margin-right: 10px;
                            }

                            .el-select {
                                width: 80px;
                                margin-right: 40px;

                                .el-input__inner {
                                    border-radius: 0;

                                    &:focus {
                                        border-color: #B70016;
                                    }
                                }

                                .el-select .el-input.is-focus .el-input__inner {
                                    border-color: #B70016;
                                }
                            }
                        }

                        .search-btn {
                            width: 80px;
                            height: 32px;
                            cursor: pointer;
                            font-weight: 800;
                            background-color: #B70016;
                            color: white;
                            text-align: center;
                            line-height: 32px;
                        }
                    }

                    .statistic-graph {
                        height: 400px;
                        width: 100%;
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
