import React, { useEffect, useState } from 'react';

import "./Carousel.css";

const DomainChart = () => {

    useEffect(() => {

    Highcharts.chart('container3', {
        chart: {
            type: 'column'
        },
        title: {
            align: 'center',
            text: 'Domain based Skill Evaluation for Student1'
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
        },
        yAxis: {
            tickInterval: 2,
            title: {
                text: 'Interview Scores'
            }
    
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                pointStart: 1,
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
                name: 'Domain',
                colorByPoint: true,
                data: [
                    {
                        name: 'Interview 1',
                        y: 4,
                        drilldown: 'Int 1'
                    },
                    {
                        name: 'Interview 2',
                        y: 6,
                        drilldown: 'Int 2'
                    },
                    {
                        name: 'Interview 3',
                        y: 8,
                        drilldown: 'Int 3'
                    },
                    
                ]
            }
        ],
        drilldown: {
            // xAxis: {
            //     type: 'category',
            //     categories: ['Adaptability', 'Collaboration', 'Integrity', 'Resilience'],
            // },
            breadcrumbs: {
                position: {
                    align: 'right'
                }
            },
            series: [
                {
                    name: 'Interview 1',
                    id: 'Int 1',
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
                {
                    name: 'Interview 2',
                    id: 'Int 2',
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
                {
                    name: 'Interview 3',
                    id: 'Int 3',
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
            <div id="container3"></div>
            <p className="highcharts-description p-5">
                This is Drilldown Chart for Domain Based Skill.
            </p>
        </figure>
    );

}

export default DomainChart;