// SubtopicPopover.js
import React, { forwardRef } from 'react';
import SubtopicCard from './SubtopicCard';

const SubtopicPopover = forwardRef(({ topic, onSubtopicClick }, ref) => {
    return (
        <div ref={ref} className="absolute z-20 -left-10 -mt-20 md:-left-20 lg:left-0 xl:left-10 2xl:left-20">
            <div className="w-64 bg-white rounded-xl shadow-2xl overflow-hidden">
                <div className="bg-blue-500 text-white text-lg font-semibold p-4">
                    {topic.name} Subtopics
                </div>
                <ul className="list-none p-0">
                    {topic.subtopics.map((subtopic) => (
                        <li key={subtopic.id} className="border-b border-gray-100 last:border-b-0">
                            <SubtopicCard
                                subtopic={subtopic}
                                onClick={() => onSubtopicClick(subtopic)}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
});

export default SubtopicPopover;
