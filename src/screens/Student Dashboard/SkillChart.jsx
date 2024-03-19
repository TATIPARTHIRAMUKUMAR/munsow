// import Highcharts from 'highcharts';
// import 'highcharts/modules/drilldown';
import React, { useEffect, useState } from 'react';

import "./Carousel.css";

const SkillChart = () => {

    useEffect(() => {
        Highcharts.chart('container', {
            chart: {
                type: 'column'
            },
            title: {
                align: 'center',
                text: 'Skill Evaluation for Student1'
            },
            subtitle: {
                align: 'center',
                text: 'Source: <a href="https://www.munsow.com/" target="_blank">Munsow.com</a>'
            },
            accessibility: {
                announceNewData: {
                    enabled: true
                }
            },
            xAxis: {
                type: 'category',
                // labels: {
                //     style: {
                //         color: 'red' // Change the color to your desired color
                //     }
                // }
            },
            yAxis: {
                tickInterval: 2,
                title: {
                    text: 'interview Scores'
                }
        
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true,
                        
                        // format: '{point.y:.1f}%'
                    }
                }
            },
        
            // tooltip: {
            //     headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            //     pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
            // },
        
            series: [
                {
                    name: 'Scores',
                    colorByPoint: true,
                    data: [
                        {
                            name: 'Behavioural',
                            y: 4,
                            color: "#b772ba",
                            drilldown: 'Behavioural',
                            dataLabels: {
                                color: 'black' 
                            },
                        },
                        {
                            name: 'Practical',
                            y: 6,
                            color: "#f99a2a",
                            drilldown: 'Practical',
                            dataLabels: {
                                color: 'black' 
                            },
                        },
                        {
                            name: 'Domain',
                            y: 8,
                            color: "#7bb06c",
                            drilldown: 'Domain',
                            dataLabels: {
                                color: 'black' 
                            },
                        },
                    ],
                }
            ],
            drilldown: {
                breadcrumbs: {
                    position: {
                        align: 'right'
                    }
                },
                series: [
                    {
                        name: 'Behavioural',
                        id: 'Behavioural',
                        data: [
                            [
                                'Adaptability',
                                3,
                            ],
                            [
                                'Collaboration',
                                4
                            ],
                            [
                                'Integrity',
                                5
                            ],
                            [
                                'Resilience',
                                6
                            ],
                        ]
                    },
                    {
                        name: 'Practical',
                        id: 'Practical',
                        data: [
                            [
                                'Creativity',
                                3
                            ],
                            [
                                'Logic',
                                4
                            ],
                            [
                                'Decision Making',
                                5
                            ],
                            [
                                'Analytical Skills',
                                6
                            ],
                        ]
                    },
                    {
                        name: 'Domain',
                        id: 'Domain',
                        data: [
                            [
                                'Expertise',
                                3
                            ],
                            [
                                'Innovation',
                                4
                            ],
                            [
                                'Learning Ability',
                                5
                            ],
                            [
                                'Technical Skills',
                                6
                            ],
                            
                        ]
                    },
                ]
            }
            });
   
        
    }, []);

    return (
        <figure className="highcharts-figure">
            <div id="container"></div>
            <p className="highcharts-description p-5 text-center font-bold p-3">
            Explore deeper insights by clicking on any skill. Dive into specific parameters and metrics related to that skill to gain a comprehensive understanding of its performance and impact.
            </p>
        </figure>
    );

}

export default SkillChart;