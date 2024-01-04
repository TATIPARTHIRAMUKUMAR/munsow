import React, { useEffect, useState, useRef } from 'react'
import circleplus from '../../assets/icons/circleplus.svg'
import edit from '../../assets/icons/edit.svg'
import eye from '../../assets/icons/eye.svg'
import trash from '../../assets/icons/trash.svg'
import equals from '../../assets/icons/equals.svg'

import Subtopic from './Subtopic'
import ConformDeleteModal from './ConformDeleteModal'

function TopicandSubtopic() {
  const [topics, setTopics] = useState([]);
  const [topicInput, setTopicInput] = useState('0');
  const inputRef = useRef(null);
  const [toggle, setToggle] = useState(null);
  
  const [showModal, setShowModal] = useState(false);
  const [subtopics, setSubtopics] = useState([]);
  const [subtopicId, setSubtopicId] = useState();
  const [subtopicTitle, setsubtopicTitle] = useState();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTopicId, setDeleteTopicId] = useState();


  const addTopic = () => {
    if (topicInput.trim() === '') {
      return;
    } else {
      const newTopic = { id: topics.length + 1, title: topicInput };
      setTopics([...topics, newTopic]);
      setTopicInput('');
      //console.log(topic);
    }
  };

  const toggleButton = (index, toggle) => {
    setToggle(toggle === index ? null : index);
 };

  const saveTopic = (topicId, inputValue) => {
    if (topicInput.trim() === '') {
      return;
    } 
      setTopics(topics.map((topic) => (topic.id === topicId ? { ...topic, title: inputValue } : topic)));
  }

  const addSubtopic = (id, title) => {
    setSubtopicId(id);
    setsubtopicTitle(title);
    setShowModal(true);
    // setToggle(true);
  }

  const deleteTopic = (id) => {
    setDeleteTopicId(id);
    setShowDeleteModal(true);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
   }
  }, [addTopic])



  return (
    <div className='bg-gray-200 w-full h-screen p-7'>
      <div className="relative w-full bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
          <div className="inline-flex items-center space-x-2">
            <span className='text-2xl text-black font-semibold'>
              Topic & Subtopic Creation
            </span>

          </div>

          <div className="p-5">
            <button
              type="button"
              className="rounded-xl bg-[#0FE1D2] flex w-full px-7 py-1 text-lg font-semibold text-black shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              onClick={()=>[addTopic(), inputRef.current.focus()]}
            >
              Create Topic
              <img src={circleplus} alt="" className='w-5 h-5 ml-5 mt-1' />
            </button>
          </div>
        </div>
      </div>
      <div className="relative w-full mt-10">

        {topics.map((topic, index) => (
          <>
            <div className="mx-auto flex items-center justify-between bg-white  rounded-full mt-2 p-4 draggable" key={topic.id}>

              <div className="inline-flex w-[80%] h-8 items-center space-x-2 pl-5">
                <button>
                  <img src={equals} alt="" className='w-5 h-5' />
                </button>

                <input 
                  className='w-auto pl-5 outline-none border-none'
                  ref={inputRef}               
                  onChange={(e) => setTopicInput(e.target.value)}
                  onFocus={() => toggleButton(index, toggle)}
                  required 
                />

              </div>

              {toggle === index ? (

                <div className='flex justify-between items-center gap-7 pr-2'>
                  <p className="text-red-700">
                    Cancel
                  </p>

                  <button
                    type="button"
                    className="rounded-full bg-[#0FE1D2] flex w-full h-7 text-center py-1 px-10 text-base font-semibold text-black shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                    onClick={() => saveTopic(topic.id, topicInput)}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className='flex justify-between gap-7 pr-10'>

                  {showModal && (
                    <Subtopic 
                    title={subtopicTitle} 
                      subtopicId={subtopicId} 
                      setSubtopics={setSubtopics} 
                      setShowModal={setShowModal} 
                    />
                  )}

                  <button onClick={()=> addSubtopic(topic.id, topic.title)}>
                    <img src={circleplus} alt="circleplus" className='w-5 h-5' />
                  </button>

                  <button>
                    <img src={edit} alt="edit" className='w-5 h-5' />
                  </button>

                  <button>
                    <img src={eye} alt="eye" className='w-5 h-5' />
                  </button>
                  {showDeleteModal && (
                    <ConformDeleteModal
                      deleteTopicId={deleteTopicId}
                      setShowDeleteModal={setShowDeleteModal}
                      topics={topics}
                      setTopics={setTopics}
                    />
                  )}
                  <button onClick={() => deleteTopic(topic.id)}>
                    <img src={trash} alt="trash" className='w-5 h-5' />
                  </button>
                </div>
              )}
            </div>
          </>
        ))}
        <div className="relative w-full pl-5 mt-2">

          {subtopics.map((subtopic, index) => (
            <div className="mx-auto flex items-center justify-between bg-white mt-2 rounded-full p-2 draggable" key={index}>

              <div className="inline-flex w-[80%] h-8 items-center space-x-2 pl-5">
                <button>
                  <img src={equals} alt="" className='w-5 h-5' />
                </button>

                <h3>Sub {subtopic.title}</h3>

              </div>
              <div className='flex justify-between gap-7 pr-10'>
                <button>
                  <img src={edit} alt="edit" className='w-5 h-5' />
                </button>
                <button>
                  <img src={eye} alt="eye" className='w-5 h-5' />
                </button>
                <button>
                  <img src={trash} alt="trash" className='w-5 h-5' />
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>




    </div>
  )
}

export default TopicandSubtopic