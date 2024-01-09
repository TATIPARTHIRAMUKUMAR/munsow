import './TopicSubTopicList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faPlusCircle, faPencil, faEyeSlash, faTrashCan, faEye, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import React, {useState, useEffect, useRef} from 'react';


function App() {
  let data = [{
    'id' : 1,
    'topic' : "Topic 1 - Heading",
    'isHidden' : false,
    'subtopics' : [
      {
        'id' : 1,
        'subtopic' : 'Topic 1.1',
        'isHiddenSub' : false,
        'desc' : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
      }
    ]
  },
  {
    'id' : 2,
    'topic' : "Topic 2 - Heading"
  }
]

const [isModalOpen, setModalOpen] = useState(false);
const [isSubModalOpen, setSubModalOpen] = useState(false);
const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
const [isSubDeleteModalOpen, setSubDeleteModalOpen] = useState(false);

const [newTopic, setNewTopic] = useState({ topic: '' });
const [newSubTopic, setNewSubTopic] = useState({ subtopic: '' , desc : ''});
let [Topicdata, setData] = useState(data);
const [isButtonDisabled, setButtonDisabled] = useState(true);

const [inputClassName, setInputClassName] = useState('valid');
const [descClassName, setDescClassName] = useState('validDesc')

const openModal = () => {
  setInputClassName('valid')
  setNewTopic({topic:''})
  setModalOpen(true);
};

const deleteId = useRef(0);

const openDeleteModal = (id) => {
  deleteId.current = id;
  setDeleteModalOpen(true);
};

const subDeleteId = useRef(0);
const topicIndex = useRef(0);

const openSubDeleteModal = (subTopicId, TopicIndex) => {
  subDeleteId.current = subTopicId;
  topicIndex.current = TopicIndex;
  setSubDeleteModalOpen(true);
};

const iRef = useRef(0);

const openSubModal = (index) => {
  setDescClassName('validDesc') 
  setInputClassName('valid')
  iRef.current = index;
  setSubModalOpen(true);
};

const closeModal = () => {
  setModalOpen(false);
};

const closeDeleteModal = () => {
  setDeleteModalOpen(false);
};

const closeSubDeleteModal = () => {
  setSubDeleteModalOpen(false);
};

const closeSubModal = () => {
  setSubModalOpen(false);
};

const handleSubTopicInputChange = (e) => {

  const { name, value } = e.target;
  if(name === 'subtopic')
  {
    if(value.length > 0)
    {
      setInputClassName('valid');
      setNewSubTopic((prevSubTopic) => ({
        ...prevSubTopic,
        [name]: value,
      }));
      setButtonDisabled(!value.trim());
    }
    else
    {
      setInputClassName('invalid');
    }
  }
  else
  {
    if(value.length > 0)
    {
      setDescClassName('validDesc');
      setNewSubTopic((prevSubTopic) => ({
        ...prevSubTopic,
        [name]: value,
      }));
      setButtonDisabled(!value.trim());
    }
    else
    {
      setDescClassName('invalidDesc');
    }
  }
};

const handleInputChange = (e) => {
  const { name, value } = e.target;
  if(value.length > 0)
  {
    setInputClassName('valid')
    setNewTopic((prevTopic) => ({
      ...prevTopic,
      [name]: value,
    }));
    setButtonDisabled(false);
  }
  else
  {
    setInputClassName('invalid')
  }
};

const handleSave = () => {
    if(newTopic.topic === '')
    {
      setInputClassName('invalid')
    }
    else
    {
      setInputClassName('valid')
      setData((prevData) => [...prevData, {id : prevData.length + 1, topic : newTopic.topic, isHidden : false}]);
      closeModal();
    }
};

const handleSubTopicSave = () => {
  if(iRef.current >= 0)
  {
    const currentTopic = Topicdata[iRef.current];

    if (currentTopic.subtopics === undefined) {
      currentTopic.subtopics = [];
    } 
    
    if(newSubTopic.subtopic === '' && newSubTopic.desc === '')
    {
      setInputClassName('invalid')
      setDescClassName('invalidDesc')
    }

    else if(newSubTopic.subtopic === '')
    {
      setInputClassName('invalid')
    }
    else if(newSubTopic.desc === '')
    {
      setDescClassName('invalidDesc')
    }
    else
    {
      setInputClassName('valid')
      setDescClassName('validDesc')
      const newSubtopicItem = { id: currentTopic.subtopics.length + 1, isHiddenSub : false, ...newSubTopic };
      currentTopic.subtopics.push(newSubtopicItem);

      setData([...Topicdata]);
      closeSubModal();
      iRef.current = 0;
      setNewSubTopic({subtopic : '', desc : ''})
    }
  }
  else
  {
    console.log("Topic Not Available")
  }
}

const handleDelete = () => {
  const topicIndex = Topicdata.findIndex((topic) => topic.id === deleteId.current)
  Topicdata = [...Topicdata.slice(0, topicIndex), ...Topicdata.slice(topicIndex + 1)];
  setData(Topicdata)
  closeDeleteModal();
};

const handleSubDelete = () => {
  const subTopicIndex = Topicdata[topicIndex.current].subtopics.findIndex((subtopic) => subtopic.id === subDeleteId.current)

  let updatedSubtopics = [...Topicdata[topicIndex.current].subtopics.slice(0, subTopicIndex), ...Topicdata[topicIndex.current].subtopics.slice(subTopicIndex + 1)];
  const updatedTopic = { ...Topicdata[topicIndex.current], subtopics: updatedSubtopics };

  Topicdata = [...Topicdata.slice(0, topicIndex.current), updatedTopic, ...Topicdata.slice(topicIndex.current + 1)];

  setData(Topicdata)
  closeSubDeleteModal();
}

// ------------------------------------------------------ Modal to Create Topic ----------------------------------------------------------

useEffect(() => {
  console.log('Updated Data:', Topicdata);
}, [Topicdata]);


// ----------------------------------------------------------- Update Topic ---------------------------------------------------------------

const [editingIndex, setEditingIndex] = useState(null);
const [editedTopic, setEditedTopic] = useState('');

const startEditing = (index, topic) => {
  setEditingIndex(index);
  setEditedTopic(topic);
};

const cancelEditing = () => {
  setEditingIndex(null);
  setEditedTopic('');
};

const saveEditing = (index) => {
  Topicdata[index].topic = editedTopic;

  setEditingIndex(null);
  setEditedTopic('');

  setData(Topicdata);
};

// Update SubTopic
const [editedSubTopic, setEditedSubTopic] = useState('');
const [editingSubIndex, setEditingSubIndex] = useState(null);

const startEditingSubTopic = ( subTopicIndex, subTopic) => {
  setEditingSubIndex(subTopicIndex);
  setEditedSubTopic(subTopic);
};

const cancelEditingSubTopic = () => {
  setEditingSubIndex(null);
  setEditedSubTopic('');
};

const saveEditingSubTopic = (topicIndex, subTopicIndex) => {
  Topicdata[topicIndex].subtopics[subTopicIndex].subtopic = editedSubTopic;

  setEditingSubIndex(null);
  setEditedSubTopic('');

  setData(Topicdata);
};




// ----------------------------------------------------------- Delete Topic ----------------------------------------------------

// const deleteTopic = (id) => {
//   console.log('ID : ', id)
//   const topicIndex = Topicdata.findIndex((topic) => topic.id === id)

//   Topicdata = [...Topicdata.slice(0, topicIndex), ...Topicdata.slice(topicIndex + 1)];
//   setData(Topicdata)
// }



// Delete SubTopic

// const deleteSubTopic = (subTopicId, TopicIndex) => {
//   const subTopicIndex = Topicdata[TopicIndex].subtopics.findIndex((subtopic) => subtopic.id === subTopicId)

//   let updatedSubtopics = [...Topicdata[TopicIndex].subtopics.slice(0, subTopicIndex), ...Topicdata[TopicIndex].subtopics.slice(subTopicIndex + 1)];
//   const updatedTopic = { ...Topicdata[TopicIndex], subtopics: updatedSubtopics };

//   Topicdata = [...Topicdata.slice(0, TopicIndex), updatedTopic, ...Topicdata.slice(TopicIndex + 1)];

//   setData(Topicdata)
// }

// ---------------------------------------------------------- Hide & Show --------------------------------------------------------------


const toggleVisibility = (index) => {

  const updatedTopicData = [...Topicdata];
  const topic = updatedTopicData[index];
  
  topic.isHidden = true;
  if (topic.subtopics) {
    topic.subtopics.forEach(subtopic => {
      subtopic.isHiddenSub = true;
    });
  }

  setData(updatedTopicData);

};

const visible = (index) => {
  const updatedTopicData = [...Topicdata];
  const topic = updatedTopicData[index];

  topic.isHidden = false;
  if (topic.subtopics) {
    topic.subtopics.forEach(subtopic => {
      subtopic.isHiddenSub = false;
    });
  }

  setData(updatedTopicData);
};

const toggleVisibilitySubTopic = (topicIndex, subTopicIndex) => {
  const updatedTopicData = [...Topicdata];
  updatedTopicData[topicIndex].subtopics[subTopicIndex].isHiddenSub = true;
  
  if(updatedTopicData[topicIndex].subtopics.length > 1)
  {
    if(updatedTopicData[topicIndex].subtopics.every(subtopic => subtopic.isHiddenSub === true ))
    {
      updatedTopicData[topicIndex].isHidden = true;
    }
  }

  setData(updatedTopicData)
};


const visibleSubTopic = (topicIndex, subTopicIndex) => {
  const updatedTopicData = [...Topicdata];
  updatedTopicData[topicIndex].subtopics[subTopicIndex].isHiddenSub = false;

  if(updatedTopicData[topicIndex].subtopics.length > 1)
  {
    if(updatedTopicData[topicIndex].subtopics.some(subtopic => subtopic.isHiddenSub === false ))
    {
      updatedTopicData[topicIndex].isHidden = false;
    } 
    else
    {
      updatedTopicData[topicIndex].isHidden = true;
    }
  }

  setData(updatedTopicData);
};

// --------------------------------------------------------- Drag & Drop --------------------------------------------------------------

const onDragStart = (e, index, isSubTopic) => {
  e.dataTransfer.setData('text/plain', JSON.stringify({ index, isSubTopic }));
  const draggedItem = e.target;
  draggedItem.classList.add('dragged');
};

const onDragOver = (e) => {
  e.preventDefault();
  const dropTarget = e.target;
  dropTarget.classList.add('drop-target');
};

const onDragLeave = (e) => {
  const dropTarget = e.target;
  dropTarget.classList.remove('drop-target');
};

const onDragEnd = (e) => {
  const draggedItem = e.target;
  draggedItem.classList.remove('dragged');
};

const handleDrop = (e, destinationIndex, subIndex, isSubDrop) => {
  e.preventDefault();

  const draggedItem = JSON.parse(e.dataTransfer.getData('text/plain'));
  const { index, isSubTopic } = draggedItem;

  const updatedData = [...Topicdata];

  if (isSubTopic && isSubDrop) {

    const parentTopic = updatedData[destinationIndex];

    const [draggedSubtopic] = parentTopic.subtopics.splice(index, 1);

    parentTopic.subtopics = parentTopic.subtopics || [];
    parentTopic.subtopics.splice(subIndex, 0, draggedSubtopic);
  } else if (!isSubTopic && !isSubDrop) {
    const [draggedTopic] = updatedData.splice(index, 1);
    updatedData.splice(destinationIndex, 0, draggedTopic);
  }

  setData(updatedData);
};

// ---------------------------------------------------------- Subtopic Description ----------------------------------------------------------------

// const [activeAccordions, setActiveAccordions] = useState([]);

// const toggleAccordion = (index, subIndex) => {
//   const newActiveAccordions = Array(Topicdata[index].subtopics.length).fill(false);  // Here is the problem!!
//   console.log('///', newActiveAccordions)
//   newActiveAccordions[subIndex] = !newActiveAccordions[subIndex];
//   console.log('//', newActiveAccordions)
//   setActiveAccordions(newActiveAccordions);
// };

const [activeAccordions, setActiveAccordions] = useState(() => {
  return Topicdata.map(() => Array(Topicdata[0].subtopics.length).fill(false));
});

const toggleAccordion = (index, subIndex) => {
  console.log('Function Called...')
  setActiveAccordions((prevAccordions) => {
    const newAccordions = [...prevAccordions];
    newAccordions[index][subIndex] = !newAccordions[index][subIndex];
    return newAccordions;
  });
};

// ---------------------------------------------------------- Display List -------------------------------------------------------------


const topicNames = Topicdata.map((topic, index) => 
<>
  <li 
  className={`topic ${topic.isHidden ? 'hidden' : ''}`} 
  key={topic.id} 
  draggable
  onDragStart={(e) => onDragStart(e, index, false)}
  onDragOver={(e) => onDragOver(e)}
  onDragEnd={onDragEnd}
  onDrop={(e) => handleDrop(e, index, null, false)}
  onDragLeave={(e) => onDragLeave(e)}>
        {editingIndex === index ? (
        <>
          <tr>
            <td style={{backgroundColor: 'white', width:'1100px'}}>
              <FontAwesomeIcon style={{backgroundColor:'white', marginRight:'15px', color:'gray'}} icon={faBars} />
              <input
                type="text"
                value={editedTopic}
                onChange={(e) => setEditedTopic(e.target.value)}
                className='editText'
              />
            </td>
            <td style={{backgroundColor: 'white', width:'20%'}}>
            <button onClick={cancelEditing} className='cancelEditButton'>Cancel</button>
              <button onClick={() => saveEditing(index)} className='saveEditButton'>Save</button>
            </td>
          </tr>
        </>
      ) : (
        <>
          {Topicdata[index].isHidden ? (
          <div className='hidden'>
            <tr className='hidden'>
              
              <td className='hidden'>
                <FontAwesomeIcon className='hidden' style={{ marginRight:'15px'}} icon={faBars}/>
              </td>

              <td className='hidden' style={{width:'1200px'}}>
                <span className='hidden'>{topic.topic}</span>
              </td>

              <td className='hidden' style={{width:'15%', paddingLeft:'95px'}}>
                <button className='functionButton' onClick={() => visible(index)}>
                  <FontAwesomeIcon style={{backgroundColor:'#d9d9d9', fontSize:'20px'}} icon={faEye}/>
                </button>
              </td>

            </tr>
          </div>
      ) : (
          <div style={{backgroundColor: 'white'}}>
            <tr>
              <td style={{backgroundColor: 'white', width:'1200px'}}>
                <FontAwesomeIcon style={{backgroundColor:'white', marginRight:'15px', color:'gray'}} icon={faBars} />
                {topic.topic}
              </td>
              <td style={{backgroundColor: 'white', width:'15%'}}>
                <button className='functionButton' onClick={() => openSubModal(index)}>
                  <FontAwesomeIcon style={{backgroundColor:'white', marginLeft:'20px', fontSize:'20px'}} icon={faPlusCircle}/>
                </button>

                <button onClick={() => startEditing(index, topic.topic)} className='functionButton'>
                  <FontAwesomeIcon style={{backgroundColor:'white', marginLeft:'20px', fontSize:'20px'}} icon={faPencil}/>
                </button>

                <button onClick={() => toggleVisibility(index)} className='functionButton'>
                  <FontAwesomeIcon style={{backgroundColor:'white', marginLeft:'20px', fontSize:'20px'}} icon={faEyeSlash}/>
                </button>
                
                <button onClick={() => openDeleteModal(topic.id)} className='functionButton' style={{}}>
                  <FontAwesomeIcon style={{backgroundColor:'white', marginLeft:'20px', color:'red', fontSize:'20px'}} icon={faTrashCan}/>
                </button>
              </td>
            </tr>
          </div>
          )}
        </>

        )}
  </li>

{/* ------------------------------------------------------ SubTopic Display ------------------------------------------------------- */}

    {topic.subtopics && topic.subtopics.map((subtopic, subIndex) => (
      <li 
      className={`subTopic ${subtopic.isHiddenSub ? 'hidden' : ''}`} 
      key={subIndex}
      draggable
      onDragStart={(e) => onDragStart(e, subIndex, true)}
      onDragOver={(e) => onDragOver(e)}
      onDragEnd={onDragEnd}
      onDrop={(e) => handleDrop(e,index, subIndex, true)}
      onDragLeave={(e) => onDragLeave(e)}>
        {editingSubIndex === subIndex ? (
        <>
          <tr>
            <td style={{backgroundColor: 'white', width:'1100px'}}>
              <FontAwesomeIcon style={{backgroundColor:'white', marginRight:'15px', color:'gray'}} icon={faBars} />
              <input
                type="text"
                value={editedSubTopic}
                onChange={(e) => setEditedSubTopic(e.target.value)}
                className='editText'
              />
            </td>
            <td style={{backgroundColor: 'white', width:'20%'}}>
            <button onClick={cancelEditingSubTopic} className='cancelEditButton'>Cancel</button>
              <button onClick={() => saveEditingSubTopic(index, subIndex)} className='saveEditButton'>Save</button>
            </td>
          </tr>
        </>
      ) : (
        <>
        {Topicdata[index].subtopics[subIndex].isHiddenSub ? (
          <div className='hidden'>
            <tr>
              <td className='hidden'>
                <FontAwesomeIcon className='hidden' style={{marginRight:'15px'}} icon={faBars}/>
              </td>

              <td className='hidden' style={{width:'1200px'}}>
                <span className='hidden'>{subtopic.subtopic}</span>
              </td>

              <td className='hidden' style={{width:'15%', paddingLeft:'74px'}}>
                <button className='functionButton' onClick={() => visibleSubTopic(index, subIndex)}>
                  <FontAwesomeIcon style={{ backgroundColor:'#d9d9d9', fontSize:'20px'}} icon={faEye}/>
                </button>
              </td>

            </tr>
          </div>
      ) : (
        <tr>
          <button className={`accordion ${activeAccordions[index][subIndex] ? 'active' : ''}`} 
          onClick={() => toggleAccordion(index, subIndex)}>
            <td style={{backgroundColor: 'white', width:'1200px', border:'none'}}>
              <FontAwesomeIcon style={{backgroundColor:'white', marginRight:'15px', color:'gray'}} icon={faBars} />
              {subtopic.subtopic}
              <FontAwesomeIcon className={`downButton ${activeAccordions[index][subIndex] ? 'rotateDownButton' : ''}`} icon={faChevronDown} />
            </td>
          </button>
          <div className={`panel ${activeAccordions[index][subIndex] ? 'active' : ''}`}>
            <p className='subTopicDesc'>{subtopic.desc}</p>
          </div>


          <td style={{backgroundColor: 'white', width:'19.5%'}}>

            <button onClick={() => startEditingSubTopic(subIndex, subtopic.subtopic)} className='functionButton'>
              <FontAwesomeIcon style={{backgroundColor:'white', marginLeft:'20px', fontSize:'20px'}} icon={faPencil}/>
            </button>

            <button onClick={() => toggleVisibilitySubTopic(index, subIndex)} className='functionButton'>
              <FontAwesomeIcon style={{backgroundColor:'white', marginLeft:'20px', fontSize:'20px'}} icon={faEyeSlash}/>
            </button>
            
            <button onClick={() => openSubDeleteModal(subtopic.id, index)} className='functionButton' style={{}}>
              <FontAwesomeIcon style={{backgroundColor:'white', marginLeft:'20px', color:'red', fontSize:'20px'}} icon={faTrashCan}/>
            </button>
          </td>
        </tr>
        )}
        </>
        )}
      </li>
    ))}
</>
);


// -------------------------------------------------- Design -------------------------------------------------------------

return (
  <div className="App">

    <div className='header'>
      <h1 className='topHeading'>Topic & SubTopic Creation</h1>
      <button type='button' className='createButton' onClick={openModal}>
        Create Topic
        <FontAwesomeIcon style={{backgroundColor:'transparent', marginLeft:'20px'}} icon={faPlusCircle}/>
      </button>
    </div>

    {/* Create Topic */}

    {isModalOpen && (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeModal}>
            &times;
          </span>
          <h1 className='modalCreateHead'>Add Topic Details</h1>
          <label htmlFor="topicName">Topic Name</label><br/>
          <input
            className={inputClassName}
            type="text"
            id="topicName"
            name="topic"
            value={newTopic.name}
            onChange={handleInputChange}
            placeholder='e.g., Topic 3 - Heading'
          /> <br/>
          <button onClick={cancelEditing} className='cancelEditButton' style={{marginLeft:'290px'}}>Cancel</button>
          <button onClick={handleSave} disabled={isButtonDisabled} className='saveEditButton'>Confirm</button>
        </div>
      </div>
    )}

{/* Create Sub-Topic */}
{isSubModalOpen && (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeSubModal}>
            &times;
          </span>
          <h1 className='modalCreateHead'>Add Sub-Topic Details</h1>
          <label htmlFor="topicName">Sub-Topic Name</label><br/>
          <input
            type="text"
            id="topicName"
            name="subtopic"
            value={newSubTopic.subtopic}
            onChange={handleSubTopicInputChange}
            placeholder='e.g., Topic 3.1 - Heading'
            className={inputClassName}
          /> <br/>

          <label htmlFor="topicName">Sub-Topic Description</label><br/>
          {/* <p style={{backgroundColor:'white', float:'right', marginTop:'0px'}}>{`${newSubTopic.desc.length}/300`}</p></label><br/> */}
          <textarea
            id="topicName"
            name="desc"
            value={newSubTopic.desc}
            onChange={handleSubTopicInputChange}
            placeholder='Elaborate on the sub-topic with a brief description...'
            rows={5}
            cols={50}
            className={descClassName}
          />
          <br/><br/>

          <button onClick={cancelEditing} className='cancelEditButton' style={{marginLeft:'290px'}}>Cancel</button>
          <button onClick={handleSubTopicSave} disabled={isButtonDisabled} className='saveEditButton'>Confirm</button>
        </div>
      </div>
    )}

{/* Delete Confirmation */}
{isDeleteModalOpen && (
    <div className="modal">
      <div className="modals-content">
        <span className="close" onClick={closeDeleteModal}>
          &times;
        </span>
        <h1 className='modalCreateHead'>Deletion Conformation</h1>
        <p className='deleteLabel'>Are You Sure You Want To Delete This Topic?</p><br/>
        <button onClick={closeDeleteModal} className='cancelEditButton' style={{marginLeft:'290px'}}>Cancel</button>
        <button onClick={handleDelete} className='saveEditButton'>Delete</button>
      </div>
    </div>
  )}

  {/*Sub Topic Delete Confirmation */}
{isSubDeleteModalOpen && (
    <div className="modal">
      <div className="modals-content">
        <span className="close" onClick={closeSubDeleteModal}>
          &times;
        </span>
        <h1 className='modalCreateHead'>Deletion Conformation</h1>
        <p className='deleteLabel'>Are You Sure You Want To Delete This Sub-Topic?</p><br/>
        <button onClick={closeSubDeleteModal} className='cancelEditButton' style={{marginLeft:'290px'}}>Cancel</button>
        <button onClick={handleSubDelete} className='saveEditButton'>Delete</button>
      </div>
    </div>
  )}


    <ul className='topicList'>
      {topicNames}
    </ul>

  </div>
);
}

export default App;
