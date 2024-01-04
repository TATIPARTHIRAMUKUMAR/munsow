import React, { useEffect, useState } from 'react'
import xmark from '../../assets/icons/xmark.svg'

function Subtopic({ title, subtopicId, setSubtopics, setShowModal }) {
  const [subTopic, setSubTopic] = useState([]);
  const [subTopicDesc, setSubTopicDesc] = useState([]);

  const saveSubtopic = () => {
    setSubtopics([{subTopic, subTopicDesc, title, subtopicId}])
    setShowModal(false);
    //console.log(title);
  };
  

  const escFunction = (event) => {
    if (event.key === "Escape") {
      setShowModal(false)
    }
  }
  useEffect(() => {
    document.getElementById('modal').showModal();
    return () => {
      document.addEventListener("keydown", escFunction, false);
    }

  }, [])

  return (

    <dialog id="modal" className="modal ">
      <div className="modal-box">
        <div className="modal-action ">
          <div
            className="justify-center w-full items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-3xl shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">

                <div className="flex items-start justify-between p-5">
                  <h3 className="text-xl font-semibold">
                    Add Sub topics Details
                  </h3>
                  <button
                    className="p-1 ml-auto border-0 float-right  leading-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <img src={xmark} alt="xmark" className='w-5 h-5' />
                  </button>

                </div>
                <div className='flex items-start justify-between px-5'>
                  <h4 className='text-xl text-gray-500'>{title}</h4>
                </div>
                <form>

                  <div className="flex items-start justify-between mt-5 px-5">
                    <label htmlFor='Sub Topic' className='font-semibold text-lg text-gray-500'>Sub Topic</label>

                  </div>
                  <div className="flex w-full items-start justify-between px-5">
                    <input
                      type="text"
                      className='w-[50%] p-2 border border-gray-300 rounded-md'
                      required
                      placeholder='Choose a name for your audience'
                      onChange={(e) => setSubTopic(e.target.value)}
                    />
                  </div>
                  <div className="flex items-start justify-between mt-5 px-5">
                    <label htmlFor='SubTopicDesc' className='font-semibold text-lg text-gray-500'>Sub Topic Desc</label>

                  </div>
                  <div className="flex w-full items-start justify-between px-5">
                    <textarea
                      rows="3"
                      cols="100"
                      className="block p-2.5 w-full h-[116px] text-balance text-gray-900 rounded border border-neutral-400"
                      required
                      placeholder='Choose a name for your audience'
                      onChange={(e) => setSubTopicDesc(e.target.value)}
                    >
                    </textarea>
                  </div>
                  <div className="flex items-center justify-end p-6">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Cance
                    </button>
                    <button
                      className="bg-gray-500 text-gray-400 font-bold text-sm px-6 py-2 rounded-xl "
                      type="button"
                      onClick={() => saveSubtopic()}
                    >
                      Confirm
                    </button>

                  </div>
                </form>
              </div>
            </div>
          </div>

        </div>
      </div>
    </dialog>

  )
}

export default Subtopic