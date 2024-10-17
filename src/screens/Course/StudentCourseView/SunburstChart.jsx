import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsMore from 'highcharts/highcharts-more';
import sunburst from 'highcharts/modules/sunburst';
import { loadDetailedCourse } from '../../../redux/action';
import CourseOverview from '../CourseOverview';
import noData from '../../../assets/NoData.jpeg';

highchartsMore(Highcharts);
sunburst(Highcharts);

const SunburstChart = ({ courseId, courseData }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { detailedCourse } = useSelector((state) => state?.data);

    useEffect(() => {
        dispatch(loadDetailedCourse(id));
    }, [dispatch, id]);
    
    // const chartData = detailedCourse?.content_data;
    console.log(detailedCourse,"detailed course");

    // Prepare chart data from content_data
    const chartData = [
    { id: 'Course', parent: '', name: detailedCourse?.name, color: 'white' },
    ...(detailedCourse?.content_data?.map(topic => ({
        id: `topic-${topic.id}`,
        parent: 'Course',  // Ensure the parent is 'Course'
        name: topic.name
    })) || []),
    ...(detailedCourse?.content_data?.flatMap(topic =>
        (topic.subtopics || []).map(subtopic => ({
            id: `subtopic-${topic.id}-${subtopic.id}`,  // Create unique ids for subtopics
            parent: `topic-${topic.id}`,  // Correctly reference the parent topic
            name: subtopic.name,
            value: 1
        }))
    ) || [])
    ];

    console.log(chartData,"chartData");
    // Check if chartData contains any subtopics
    const hasSubtopics = chartData.some(item => item.parent.startsWith('topic-') && item.id.startsWith('subtopic-'));

    const data = [
        { id: 'Course', parent: '', name: 'Course', color: 'white' },
        { id: 'Topic 1', parent: 'Course', name: 'Topic 1' },
        { id: 'Topic 2', parent: 'Course', name: 'Topic 2' },
        { id: 'Topic 3', parent: 'Course', name: 'Topic 3' },
        { id: 'Topic 4', parent: 'Course', name: 'Topic 4' },
        { id: 'Topic 5', parent: 'Course', name: 'Topic 5' },
        { id: 'Topic 6', parent: 'Course', name: 'Topic 6' },
        { id: 'Topic 7', parent: 'Course', name: 'Topic 7' },
        { id: 'Topic 8', parent: 'Course', name: 'Topic 8' },
        { id: 'Topic 9', parent: 'Course', name: 'Topic 9' },
        { parent: 'Topic 1', name: 'SubTopic 1.1', value: 1 },
        { parent: 'Topic 1', name: 'SubTopic 1.2', value: 1 },
        { parent: 'Topic 2', name: 'SubTopic 2.1', value: 1 },
        { parent: 'Topic 2', name: 'SubTopic 2.2', value: 1 },
        { parent: 'Topic 3', name: 'SubTopic 3.1', value: 1 },
        { parent: 'Topic 3', name: 'SubTopic 3.2', value: 1 },
        { parent: 'Topic 4', name: 'SubTopic 4.1', value: 1 },
        { parent: 'Topic 4', name: 'SubTopic 4.2', value: 1 },
        { parent: 'Topic 5', name: 'SubTopic 5.1', value: 1 },
        { parent: 'Topic 5', name: 'SubTopic 5.2', value: 1 },
        { parent: 'Topic 6', name: 'SubTopic 6.1', value: 1 },
        { parent: 'Topic 6', name: 'SubTopic 6.2', value: 1 },
        { parent: 'Topic 7', name: 'SubTopic 7.1', value: 1 },
        { parent: 'Topic 7', name: 'SubTopic 7.2', value: 1 },
        { parent: 'Topic 8', name: 'SubTopic 8.1', value: 1 },
        { parent: 'Topic 8', name: 'SubTopic 8.2', value: 1 },
        { parent: 'Topic 9', name: 'SubTopic 9.1', value: 1 },
        { parent: 'Topic 9', name: 'SubTopic 9.2', value: 1 }
      ];

    // Handle point click
    const handlePointClick = (point) => {
        if (point.id.startsWith('subtopic')) {
            const subtopicId = point.id.split('-')[1];
            // Navigate to detailed course view using the subtopic id
            navigate(`/studentCourseList/view/${id}`);
        }
    };

    const chartOptions = {
        chart: {
            height: '100%'
        },
        title: {
            text: `${detailedCourse?.name} Sunburst Chart`,
            style: {
                fontSize: '22px' // Increase title font size
            }
        },
        series: [{
            type: 'sunburst',
            data: chartData,
            allowDrillToNode: true,
            cursor: 'pointer',
            dataLabels: {
                format: '{point.name}',
                rotationMode: 'circular',
                style: {
                    fontSize: '16px', 
                    fontWeight: 'bold'
                }
            },
            levels: [
                { level: 1, levelIsConstant: false },
                { level: 2, colorByPoint: true },
                { level: 3, colorVariation: { key: 'brightness', to: -0.5 } },
                { level: 4, colorVariation: { key: 'brightness', to: 0.5 } }
            ]
        }],
        plotOptions: {
            series: {
                point: {
                    events: {
                        click: function (event) {
                            handlePointClick(this);
                        }
                    }
                }
            }
        },
        tooltip: {
            headerFormat: '',
            pointFormat: '<b>{point.options.name}</b>',
            style: {
                fontSize: '14px' // Increase tooltip font size
            }
        }
    };


    return (
        <div>
            {detailedCourse && (
                <div className="p-8">
                    <CourseOverview course={detailedCourse} show={true} text={"Back"} />
                </div>
            )}
            <div className="p-8" style={{
                    height: '850px',  // Set desired height
                    width: '100%',    // Full width
                    maxWidth: '800px', // Optional: set a max width
                    margin: '0 auto'  // Center the chart
                    }}>
                {hasSubtopics ? (
                    // Render the Sunburst chart if data is present
                    <HighchartsReact
                    highcharts={Highcharts}
                    options={chartOptions}
                />
                ) : (
                    // Show "No Data Found" if no topics or subtopics are present
                    <div className='flex flex-col items-center'>
                        <img src={noData} alt='noData-img' style={{height:"300px"}}/>
                        <h1 className="text-center text-2xl font-bold text-red mt-5">No Data Found</h1>
                    </div>
                )}
            </div>
        </div>
    );
    
};


export default SunburstChart;