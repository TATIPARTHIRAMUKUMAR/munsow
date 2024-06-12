import React, { useEffect, useState, } from 'react'
import circleplus from '../../../assets/icons/circleplus.svg'
import edit from '../../../assets/icons/edit.svg'
import eye from '../../../assets/icons/eye.svg'
import trash from '../../../assets/icons/trash.svg'
import equals from '../../../assets/icons/equals.svg'

import Subtopic from './Subtopic'
import ConformDeleteModal from './ConformDeleteModal'
import SubTopicDeleteModal from './SubTopicDeleteModal'

function TopicandSubtopic({topics, setTopics}) {
  const [newTopicTitle, setNewTopicTitle] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [topicIndex, setTopicIndex] = useState();
  const [subTopic, setSubTopic] = useState();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteSubModal, setShowDeleteSubModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editTopicId, setEditTopicId] = useState(null);
  const [highlightedIndex, setHighlightedIndex] = useState(null);

  const addSubtopic = (topicIndex, subtopic) => {
    setTopicIndex(topicIndex);
    setSubTopic(subtopic);
    setShowModal(true);
  };

  const addTopic = () => {
    setShowInput(true);
    setEditMode(false);
  };

  const handleInputChange = (e) => {
    setNewTopicTitle(e.target.value);
  };

  const handleCreateTopic = () => {
    if (newTopicTitle.trim() !== '') {
      if (editMode) {
        // Update existing topic when in edit mode
        setTopics((prevTopics) =>
          prevTopics.map((topic) =>
            topic.id === editTopicId
              ? { ...topic, name: newTopicTitle }
              : topic
          )
        );
        setEditMode(false);
      } else {
        // Create new topic when in create mode
        setTopics((prevTopics) => [
          ...prevTopics,
          {
            id: prevTopics.length + 1,
            name: newTopicTitle,
            subtopics: []
          }
        ]);
      }

      setNewTopicTitle('');
      setShowInput(false);
    }
  };
  const handleCancel = () => {
    setNewTopicTitle('');
    setShowInput(false);
    setEditMode(false);
  };

  const handleEditTopic = (topic) => {
    setNewTopicTitle(topic.name);
    setEditMode(true);
    setEditTopicId(topic.id);
    setShowInput(true);
  };

  const deleteTopic = (topicIndex) => {
    setTopicIndex(topicIndex + 1);
    setShowDeleteModal(true);
  };
  const deleteSubTopic = (subIndex) => {
    console.log(subIndex);
    setShowDeleteSubModal(true);
  };
  const handleEyeButtonClick = (index) => {
    setHighlightedIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  

useEffect(()=>{
console.log("topics",topics)
},[topics])

  return (    
    <div className='bg-gray-200 w-full h-screen p-5'>
      <div className="relative w-full bg-white rounded-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div className="inline-flex items-center space-x-2 ">
            <span className='text-2xl text-black font-semibold'>
              Topic & Subtopic Creation
            </span>

          </div>

          <div >
            <button
              type="button"
              className="rounded-xl bg-[#0FE1D2] flex w-full px-7 py-1 text-lg font-semibold text-black shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              onClick={addTopic}
            >
              Create Topic
              <img src={circleplus} alt="" className='w-5 h-5 ml-5 mt-1' />
            </button>

          </div>
        </div>
      </div>
      <div className="relative w-full mt-5">
        {topics.map((topic, index) => (
          <div key={index} >
            <div className={`mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8 bg-white rounded-full mt-2 p-4 ${highlightedIndex === index ? 'bg-[rgb(0,0,0,0.12)]' : ''}`}>
              <div className="inline-flex items-center space-x-2">
                <button>
                  <img src={equals} alt="" className='w-5 h-5' />
                </button>
                <div className='w-auto pl-5'>
                  {topic.name}
                </div>
              </div>
              <div className='flex justify-between gap-7'>
                {showModal && (
                  <Subtopic
                    setTopics={setTopics}
                    topicIndex={topicIndex}
                    subtopic={subTopic}
                    setShowModal={setShowModal}
                  />
                )}

                <button onClick={() => addSubtopic(index, `${topic.name} ${index + 1}.${topic.subtopics.length + 1}`)}>
                  <img src={circleplus} alt="circleplus" className='w-5 h-5' />
                </button>
                {/* Edit button */}
                <button onClick={()=> handleEditTopic(topic)}>
                  <img src={edit} alt="edit" className='w-5 h-5' />
                </button>
                {/* eye button */}
                <button onClick={() => handleEyeButtonClick(index)}>
                  <img src={eye} alt="eye" className='w-5 h-5' />
                </button>

                {showDeleteModal && (
                    <ConformDeleteModal
                      topicIndex={topicIndex}
                      setShowDeleteModal={setShowDeleteModal}
                      topics={topics}
                      setTopics={setTopics}
                    />
                  )}

                <button onClick={() => deleteTopic(index)}>
                  <img src={trash} alt="trash" className='w-5 h-5' />
                </button>
              </div>
            </div>

            <div className="relative w-full pl-20 mb-5">
              {topic.subtopics?.map((subtopic, subIndex) => (
                <div className='mx-auto flex max-w-7xl items-center justify-between px-2 py-2 sm:px-6 lg:px-8 bg-white  rounded-full mt-2 p-4' key={subIndex}>
                  <div className='inline-flex items-center space-x-2'>
                    <button className=''>
                      <img src={equals} alt="" className='w-5 h-5' />
                    </button>
                    <div className="ml-5" >
                      {subtopic?.name}
                    </div>
                  </div>

                  <div className='flex gap-7'>

                    <button>
                      <img src={edit} alt="edit" className='w-5 h-5' />
                    </button>

                    <button>
                      <img src={eye} alt="eye" className='w-5 h-5' />
                    </button>

                    {/* {showDeleteSubModal && (
                    <SubTopicDeleteModal
                      subtopic={subtopic}
                      subIndex={subIndex}
                      setShowDeleteSubModal={setShowDeleteSubModal}
                      topicIndex={topicIndex}
                      subtopics={topic.subtopics}
                      setSubtopics={setTopics}
                      topics={topics}
                      setTopics={setTopics}
                    />
                      
                  )} */}

                    <button onClick={() => deleteSubTopic(subIndex)}>
                      <img src={trash} alt="trash" className='w-5 h-5' />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        ))}
        {showInput && (
          <div className="mx-auto flex max-w-7xl items-center justify-between px-2 sm:px-2 lg:px-4 bg-white  rounded-full mt-2">
          <div className="inline-flex items-center space-x-2">
            <button>
              <img src={equals} alt="" className='w-5 h-5' />
            </button>
            <input
                className='w-auto ml-5 pl-3 mt-2 mb-2'
                required
                autoFocus={true}
                
                type="text"
                placeholder="Enter Topic Title"
                value={newTopicTitle}
                onChange={handleInputChange}
              />
          </div>
          <div className='flex justify-between gap-7'>
            <button className="text-red-700" onClick={handleCancel}>
                  Cancel
                </button>

                <button
                  type="button"
                  className="rounded-full bg-[#0FE1D2] flex w-full h-7 text-center py-1 px-10 text-base font-semibold text-black shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  onClick={handleCreateTopic}
                >
                  Save
                </button>
          </div>
        </div>
        )}
      </div>
    </div>
  )
}

export default TopicandSubtopic