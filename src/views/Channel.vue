<template>
    <div class="channel-page common-page">
        <div class="channel-info-container">
            <div class="section-basic section">
                <div class="title">
                    {{channel.name}}
                </div>
                <div class="introduction">
                    {{channel.introduction}}
                </div>
            </div>
            <div class="section-statistic section" v-if="channel.statistic && channel.statistic.length > 0">
                <div class="section-title">Statistic</div>
                <div class="section-content">
                    <div class="statistic-graph" id="statistic-graph"></div>
                </div>
            </div>
            <div class="section-topic section" v-if="channel.allTopics && channel.allTopics.length > 0">
                <div class="section-title">Topics</div>
                <div class="section-content">
                    <div class="year-selection">
                        <div class="single-selection">
                            <div class="text">From</div>
                            <el-select v-model="currentTopicYear" placeholder="select year" size="small">
                                <el-option
                                    v-for="year in topicYears"
                                    :key="year"
                                    :label="year"
                                    :value="year">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="search-btn" @click="updateTopics">
                            Search
                        </div>
                    </div>
                    <div class="topic-graph" id="topic-graph">
<!--                        <canvas id="topic-graph-canvas"></canvas>-->
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
import wordCloud from 'wordcloud';

const queryString = require('query-string');
const echarts = require('echarts');

function drawGraph(dom, data) {
    const chart = echarts.init(dom);
    const xAxis = data.map(item => item.vol);
    const yData = data.map(item => item.count);
    chart.setOption({
        legend: {
            data: ['Authors per Volume'],
            align: 'left'
        },
        xAxis: {
            data: xAxis
        },
        yAxis: {},
        series: [{
            name: 'Authors per Volume',
            type: 'bar',
            data: yData,
            barWidth: 20,
            itemStyle: {
                color: '#9c0010'
            }
        }],
        grid: {
            left: 40,
            right: 0,
            top: 40
        }
    });
}

export default {
    name: 'home',
    data() {
        return {
            graphInit: false,
            topicGraphInit: false
        };
    },
    beforeMount() {
        let params = {};
        let parsed = queryString.parse(location.hash.split('?')[1]);
        params.id = parsed.id || null;
        this.$store.dispatch('GET_CHANNEL_INFO', params);
    },
    updated() {
        this.initStatisticGraph();
        if (!this.topicGraphInit) {
            this.updateTopics();
            this.topicGraphInit = true;
        }
    },
    computed: {
        channel() {
            return this.$store.state.currentChannel;
        },
        statistic() {
            return this.$store.state.currentChannel.statistic;
        },
        currentTopicYear: {
            get() {
                return this.$store.state.currentTopicYear;
            },
            set(v) {
                this.$store.commit('UPDATE_CURRENT_TOPIC_YEAR', v);
            }
        },
        topicYears() {
            return this.$store.state.currentChannel.topicYears;
        }
    },
    methods: {
        initStatisticGraph() {
            if (!this.graphInit) {
                drawGraph(document.getElementById('statistic-graph'), this.statistic);
                this.graphInit = true;
            }
        },
        updateTopics() {
            let allTopics = this.channel.allTopics;
            let yearIndex = allTopics.findIndex(item => item.year === this.currentTopicYear);
            let newData = allTopics[yearIndex].topics.map(item => [item.word, item.score]);
            let topScore = newData[0][1];
            wordCloud(document.getElementById('topic-graph'), { list: newData,
                color: function (word, weight) {
                    return (weight === topScore) ? '#f01700' : '#9c0010';
                },
                backgroundColor: '#f9f9f9',
                weightFactor: function (size) {
                    return size * 0.8;
                },
                rotateRatio: 0
            });
        }
    },
    components: {
        CustomFooter
    }
};
</script>
<style lang="less">
    .el-select-dropdown.el-popper {
        .el-select-dropdown__item.selected {
            color: #B70016;
        }
    }

    .el-select-dropdown__item.hover, .el-select-dropdown__item:hover {
        background-color: #f5f5f5;
    }

    .channel-page {
        .channel-info-container {
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

            .section-basic {
                .title {
                    font-weight: 800;
                    font-size: 36px;
                    margin-bottom: 40px;
                }

                .introduction {
                    color: #666;
                    line-height: 24px;
                }
            }

            .section-statistic {
                .statistic-graph {
                    height: 400px;
                    width: 100%;
                }
            }

            .section-topic {
                .section-content {
                    .year-selection {
                        display: flex;
                        align-items: center;
                        margin-bottom: 30px;

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

                    .topic-graph {
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
