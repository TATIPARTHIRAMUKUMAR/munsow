import React, { useState } from 'react'
import circleplus from '../assets/icons/circleplus.svg'
import edit from '../assets/icons/edit.svg'
import eye from '../assets/icons/eye.svg'
import trash from '../assets/icons/trash.svg'
import equals from '../assets/icons/equals.svg'

import Subtopic from './Subtopic'

function TopicandSubtopic() {
  const [topics, setTopics] = useState([]);
  const [topicInput, setTopicInput] = useState('');
  const [toggle, setToggle] = useState(-1);
  const [showModal, setShowModal] = useState(false);


  const addTopic = () => {

    setTopics([...topics, { id: Date.now(), title: 'New Topic' }]);
  };

  const toggleButton = (index) => {
    setToggle(toggle === index ? -1 : index);
  };

  const deleteTopic = (id) => {
    setTopics(topics.filter((topic) => topic.id !== id));
  };

  const saveTopic = (id) => {
    setTopics(topics.map((topic) => (topic.id === id ? { ...topic, title: topicInput } : topic)));
    setToggle(-1);
   }


  return (
    <>
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
              onClick={addTopic}
            >
              Create Topic
              <img src={circleplus} alt="" className='w-5 h-5 ml-5 mt-1' />
            </button>
          </div>
        </div>
      </div>
      <div className="relative w-full mt-10">
        {topics.map((topic, index) => (
          <div className="mx-auto flex items-center justify-between bg-white mt-2 rounded-full p-2" key={topic.id}>

            <div className="inline-flex w-[80%]  h-8 items-center space-x-2 pl-5" onClick={() => toggleButton(index)}>
              <button>
                <img src={equals} alt="" className='w-5 h-5' />
              </button>

              <input className='w-[100%] outline-none pl-5 ' onChange={(e) => setTopicInput(e.target.value)} />

            </div>

            {toggle === index ? (

              <div className='flex justify-between items-center gap-7 pr-2'>
                <p className="text-red-700">
                  Cancle
                </p>

                <button
                  type="button"
                  className="rounded-full bg-[#0FE1D2] flex w-full h-7 text-center py-1 px-10 text-base font-semibold text-black shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  onClick={() => saveTopic(topic.id)}
                >
                  Save
                </button>
              </div>
            ) : (
              <div className='flex justify-between gap-7 pr-10'>
                {showModal && <Subtopic topic={topic.title} id={topic.id}  setShowModal={setShowModal} />}
                <button onClick={() => setShowModal(true)}>
                  <img src={circleplus} alt="circleplus" className='w-5 h-5' />
                </button>
                <button>
                  <img src={edit} alt="edit" className='w-5 h-5' />
                </button>
                <button>
                  <img src={eye} alt="eye" className='w-5 h-5' />
                </button>
                <button onClick={() => deleteTopic(topic.id)}>
                  <img src={trash} alt="trash" className='w-5 h-5' />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  )
}

export default TopicandSubtopic