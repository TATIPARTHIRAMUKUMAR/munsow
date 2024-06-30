
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faPlusCircle, faPencil, faEyeSlash, faTrashCan, faEye, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import React, {useState, useEffect, useRef} from 'react';
import './TopicSubtopic.css';
import { Editor } from '@tinymce/tinymce-react';

function TopicSubtopic({ setTopics }) {
//   let data = [{
//     'id' : 1,
//     'name' : "Topic 1 - Heading",
//     'isHidden' : false,
//     'subtopics' : [
//       {
//         'id' : 1,
//         'name' : 'Topic 1.1',
//         'isHiddenSub' : false,
//         // 'isDescHidden' : false,
//         'content' : ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do ei usmod tempor incididunt ut labore et dolore magna aliqua']
//       }
//     ]
//   },
//   {
//     'id' : 2,
//     'name' : "Topic 2 - Heading",
//     'isHidden' : false,
//   }
// ]
let data = [];

const [isModalOpen, setModalOpen] = useState(false);
const [isSubModalOpen, setSubModalOpen] = useState(false);
const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
const [isSubDeleteModalOpen, setSubDeleteModalOpen] = useState(false);

const [isSubEditModalOpen, setSubEditModalOpen] = useState(false);

const [newTopic, setNewTopic] = useState({ name: '' });
const [newSubTopic, setNewSubTopic] = useState({ name: '' , content : []});
let [Topicdata, setData] = useState(data);

const [inputClassName, setInputClassName] = useState('valid');

const [validationMessage, setValidationMessage] = useState('');

const openModal = () => {
  setValidationMessage('')
  setInputClassName('valid')
  setNewTopic({name:''})
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

const topicEditIndex = useRef(null);
const subEditIndex = useRef(null);
const [editSubTopic, setEditSubTopic] = useState({ name: '' , content : []});

const openSubEditModal = (topicIndex, subTopicIndex, editSubtopic) => {
  setValidationMessage('')
  setInputClassName('valid')
  topicEditIndex.current = topicIndex
  subEditIndex.current = subTopicIndex
  setEditSubTopic(editSubtopic)
  setSubEditModalOpen(true);
}

const iRef = useRef(0);

const openSubModal = (index) => {
  setValidationMessage('')
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

const closeSubEditModal = () => {
  setSubEditModalOpen(false);
};

const closeSubModal = () => {
  setSubModalOpen(false);
};

let [subTopicDesc, setSubTopicDesc] = useState('');

const handleSubTopicInputChange = (e) => {
  const { name, value } = e.target;

  setNewSubTopic((prevSubTopic) => ({
    ...prevSubTopic,
    [name]: value,
  }));

  if (name === 'name') {
    if (value.length > 0) {
      setInputClassName('valid');
      setValidationMessage('');
    } else {
      setValidationMessage('Please enter a valid Sub-Topic name');
      setInputClassName('invalid');
    }
  }
};

const handleSubTopicEditInputChange = (e) => {

  const { name, value } = e.target;
  if(name === 'name')
  {
    if(value.length > 0)
    {
      setInputClassName('valid');
      setValidationMessage('')
      setEditSubTopic((prevSubTopic) => ({
        ...prevSubTopic,
        [name]: value,
      }));
    }
    else
    {
      setValidationMessage('Please enter a valid Sub-Topic name')
      setEditSubTopic((prevSubTopic) => ({
        ...prevSubTopic,
        [name]: '',
      }));
      setInputClassName('invalid');
    }
  }
  else
  {
    if(value.length > 0)
    {
      setEditSubTopic((prevSubTopic) => ({
        ...prevSubTopic,
        [name]: value,
      }));
    }
    else
    {
      setEditSubTopic((prevSubTopic) => ({
        ...prevSubTopic,
        [name]: '',
      }));
    }
  }
};

const handleInputChange = (e) => {
  const { name, value } = e.target;
  if(value.length > 0)
  {
    setInputClassName('valid')
    setValidationMessage('')
    setNewTopic((prevTopic) => ({
      ...prevTopic,
      [name]: value,
    }));
  }
  else
  {
    setValidationMessage('Please enter a valid Topic name')
    setNewTopic((prevTopic) => ({
      ...prevTopic,
      [name]: '',
    }));
    setInputClassName('invalid')
  }
};

const handleSave = () => {
    if(newTopic.name === '')
    {
      setInputClassName('invalid')
      setValidationMessage('Please enter a valid Topic name')
    }
    else
    {
      setInputClassName('valid')
      setValidationMessage('')
      setData((prevData) => [...prevData, {id : prevData.length + 1, name : newTopic.name, isHidden : false}]);
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
    
    if(newSubTopic.name === '')
    {
      setInputClassName('invalid')
      setValidationMessage('Please enter a valid Sub-Topic name')
    }
    else
    {
      setInputClassName('valid')
      const newSubtopicItem = { 
        id: currentTopic.subtopics.length + 1, 
        isHiddenSub : false, 
        isDescHidden : false, 
        name : newSubTopic.name,
        content : subTopicDesc
       };
      currentTopic.subtopics.push(newSubtopicItem);

      setData([...Topicdata]);
      closeSubModal();
      iRef.current = 0;
      setNewSubTopic({name : '', content : []})
    }
  }
  else
  {
    console.log("Topic Not Available")
  }
}

const handleDelete = () => {
  const topicIndex = Topicdata.findIndex((name) => name.id === deleteId.current)
  Topicdata = [...Topicdata.slice(0, topicIndex), ...Topicdata.slice(topicIndex + 1)];
  setData(Topicdata)
  closeDeleteModal();
};

const handleSubDelete = () => {
  const subTopicIndex = Topicdata[topicIndex.current].subtopics.findIndex((name) => name.id === subDeleteId.current)

  let updatedSubtopics = [...Topicdata[topicIndex.current].subtopics.slice(0, subTopicIndex), ...Topicdata[topicIndex.current].subtopics.slice(subTopicIndex + 1)];
  const updatedTopic = { ...Topicdata[topicIndex.current], subtopics: updatedSubtopics };

  Topicdata = [...Topicdata.slice(0, topicIndex.current), updatedTopic, ...Topicdata.slice(topicIndex.current + 1)];

  setData(Topicdata)
  closeSubDeleteModal();
}



// ------------------------------------------------------ Modal to Create Topic ----------------------------------------------------------

// useEffect(() => {
//   console.log('Updated Data:', Topicdata);
// }, [Topicdata]);
useEffect(() => {
  setTopics(Topicdata);
}, [Topicdata, setTopics]);


// ----------------------------------------------------------- Update Topic ---------------------------------------------------------------

const [editingIndex, setEditingIndex] = useState(null);
const [editedTopic, setEditedTopic] = useState('');

const startEditing = (index, name) => {
  setEditingIndex(index);
  setEditedTopic(name);
};

const cancelEditing = () => {
  setEditingIndex(null);
  setEditedTopic('');
  //to delete modal from cancel button
  closeModal();
  closeSubModal();
  closeSubEditModal();
};

const saveEditing = (index) => {
  Topicdata[index].name = editedTopic;

  setEditingIndex(null);
  setEditedTopic('');

  setData(Topicdata);
};

// Update SubTopic

const handleEdit = () => {
  if(editSubTopic.name === '')
    {
      setInputClassName('invalid')
      setValidationMessage('Please enter a valid Sub-Topic name')
    }
    else
    {
      Topicdata[topicEditIndex.current].subtopics[subEditIndex.current].name = editSubTopic.name;
      Topicdata[topicEditIndex.current].subtopics[subEditIndex.current].content = subTopicDesc;

      setData(Topicdata);
      closeSubEditModal();
    }
}



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
  const name = updatedTopicData[index];
  
  name.isHidden = true;
  if (name.subtopics) {
    name.subtopics.forEach(name => {
      name.isHiddenSub = true;
    });
  }
  setData(updatedTopicData);

};

const visible = (index) => {
  const updatedTopicData = [...Topicdata];
  const name = updatedTopicData[index];

  name.isHidden = false;
  if (name.subtopics) {
    name.subtopics.forEach(name => {
      name.isHiddenSub = false;
    });
  }

  setData(updatedTopicData);
};

const toggleVisibilitySubTopic = (topicIndex, subTopicIndex) => {
  const updatedTopicData = [...Topicdata];
  updatedTopicData[topicIndex].subtopics[subTopicIndex].isHiddenSub = true;
  
  if(updatedTopicData[topicIndex].subtopics.length > 0)
  {
    if(updatedTopicData[topicIndex].subtopics.every(name => name.isHiddenSub === true ))
    {
      updatedTopicData[topicIndex].isHidden = true;
    }
  }

  setData(updatedTopicData)
};


const visibleSubTopic = (topicIndex, subTopicIndex) => {
  const updatedTopicData = [...Topicdata];
  updatedTopicData[topicIndex].subtopics[subTopicIndex].isHiddenSub = false;

  if(updatedTopicData[topicIndex].subtopics.length > 0)
  {
    if(updatedTopicData[topicIndex].subtopics.some(name => name.isHiddenSub === false ))
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


const toggleAccordion = (index, subIndex) => {
  const updatedTopicData = [...Topicdata]
  updatedTopicData[index].subtopics[subIndex].isDescHidden = !Topicdata[index].subtopics[subIndex].isDescHidden;
  setData(updatedTopicData);
};


// ---------------------------------------------------------- Display List -------------------------------------------------------------


const topicNames = Topicdata.map((name, index) => 
<>
  <li 
  className={`topic ${name.isHidden ? 'hide' : ''}`} 
  key={name.id} 
  draggable
  onDragStart={(e) => onDragStart(e, index, false)}
  onDragOver={(e) => onDragOver(e)}
  onDragEnd={onDragEnd}
  onDrop={(e) => handleDrop(e, index, null, false)}
  onDragLeave={(e) => onDragLeave(e)}>
        {editingIndex === index ? (
        <>
          <tr className='flex flex-col md:flex-row justify-between'>
            <td style={{backgroundColor: 'white', display:"flex", alignItems:"center"}}>
              <FontAwesomeIcon style={{backgroundColor:'white', marginRight:'15px', color:'gray'}} icon={faBars} />
              <input
                type="text"
                value={editedTopic}
                onChange={(e) => setEditedTopic(e.target.value)}
                className='editText'
              />
            </td>
            <td style={{backgroundColor: 'white', display:"flex" ,gap:"10px"}}>
              <button onClick={cancelEditing} className='cancelEditButton'>Cancel</button>
              <button onClick={() => saveEditing(index)} className='saveEditButton'>Save</button>
            </td>
          </tr>
        </>
      ) : (
        <>
          {Topicdata[index].isHidden ? (
          <div>
            <tr>
              <td>
                <FontAwesomeIcon style={{ marginRight:'15px', color:'black'}} icon={faBars}/>
              </td>

              <td style={{width:'1200px'}}>
                <span>{name.name}</span>
              </td>

              <td style={{width:'15%', paddingLeft:'95px'}}>
                <button className='functionButton' onClick={() => visible(index)}>
                  <FontAwesomeIcon style={{backgroundColor:'#d9d9d9', fontSize:'20px'}} icon={faEye}/>
                </button>
              </td>

            </tr>
          </div>
      ) : (
          <div style={{backgroundColor: 'white'}}>
            <tr className='flex flex-col md:flex-row justify-between'>
              <td style={{backgroundColor: 'white', display:"flex", alignItems:"center"}}>
                <FontAwesomeIcon style={{backgroundColor:'white', marginRight:'15px', color:'gray'}} icon={faBars} />
                {name.name}
              </td>
              <td style={{backgroundColor: 'white', display:"flex", alignItems:"center"}}>
                <button className='functionButton' onClick={() => openSubModal(index)}>
                  <FontAwesomeIcon style={{backgroundColor:'white', marginLeft:'20px', fontSize:'20px'}} icon={faPlusCircle}/>
                </button>

                <button onClick={() => startEditing(index, name.name)} className='functionButton'>
                  <FontAwesomeIcon style={{backgroundColor:'white', marginLeft:'20px', fontSize:'20px'}} icon={faPencil}/>
                </button>

                <button onClick={() => toggleVisibility(index)} className='functionButton'>
                  <FontAwesomeIcon style={{backgroundColor:'white', marginLeft:'20px', fontSize:'20px'}} icon={faEyeSlash}/>
                </button>
                
                <button onClick={() => openDeleteModal(name.id)} className='functionButton'>
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

    {name.subtopics && name.subtopics.map((name, subIndex) => (
      <li 
      className={`subTopic ${name.isHiddenSub ? 'hide' : ''}`} 
      key={subIndex}
      draggable
      onDragStart={(e) => onDragStart(e, subIndex, true)}
      onDragOver={(e) => onDragOver(e)}
      onDragEnd={onDragEnd}
      onDrop={(e) => handleDrop(e,index, subIndex, true)}
      onDragLeave={(e) => onDragLeave(e)}>
        {(
        <>
        {Topicdata[index].subtopics[subIndex].isHiddenSub ? (
          <div className='hide'>
            <tr>
              <td className='hide'>
                <FontAwesomeIcon className='hide' style={{marginRight:'15px'}} icon={faBars}/>
              </td>

              <td className='hide' style={{width:'1200px'}}>
                <span className='hide'>{name.name}</span>
              </td>

              <td className='hide' style={{width:'15%', paddingLeft:'74px'}}>
                <button className='functionButton' onClick={() => visibleSubTopic(index, subIndex)}>
                  <FontAwesomeIcon style={{ backgroundColor:'#d9d9d9', fontSize:'20px'}} icon={faEye}/>
                </button>
              </td>

            </tr>
          </div>
      ) : (
        <tr style={{display:"flex", justifyContent:"space-between"}}>
            <td style={{}}>
          <button className={`accordion ${Topicdata[index].subtopics[subIndex].isDescHidden ? 'active' : ''}`} 
          onClick={() => toggleAccordion(index, subIndex)}>
            <td style={{backgroundColor: 'white',}}>
              <FontAwesomeIcon style={{backgroundColor:'white', marginRight:'15px', color:'gray', marginLeft:'7px'}} icon={faBars} />
              {name.name}

            </td>
            
            {/* <td style={{backgroundColor: 'white'}}>
              <FontAwesomeIcon className={`downButton ${Topicdata[index].subtopics[subIndex].isDescHidden ? 'rotateDownButton' : ''}`} icon={faChevronDown} />
            </td> */}
          </button>
          
          <div className={`panel ${Topicdata[index].subtopics[subIndex].isDescHidden ? 'active' : ''}`}>
            <div dangerouslySetInnerHTML={{ __html: name.content}} />
            </div>
          </td>


          <td style={{backgroundColor: 'white',borderRadius:'20px', display:"flex", alignItems:"center"}}>

            <button onClick={() => openSubEditModal(index, subIndex, {'name' : name.name, 'content' : name.content})} className='functionButton'>
              <FontAwesomeIcon style={{backgroundColor:'white', marginLeft:'20px', fontSize:'20px', marginTop:'-5px'}} icon={faPencil}/>
            </button>

            <button onClick={() => toggleVisibilitySubTopic(index, subIndex)} className='functionButton'>
              <FontAwesomeIcon style={{backgroundColor:'white', marginLeft:'20px', fontSize:'20px'}} icon={faEyeSlash}/>
            </button>
            
            <button onClick={() => openSubDeleteModal(name.id, index)} className='functionButton' style={{}}>
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
  <div className="Main">

    <div className='header'>
      <h1 className='text-lg md:text-3xl  topHeading'>Topic & SubTopic Creation</h1>
      <button type='button' className='text-lg md:text-xl createButton' onClick={openModal} style={{backgroundColor:'#10e4d4'}}>
        Create Topic<FontAwesomeIcon style={{backgroundColor:'transparent', marginLeft:'20px'}} icon={faPlusCircle}/>
      </button>
    </div>

    
    {/* Create Topic */}

    {isModalOpen && (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeModal}>
            &times;
          </span>
          <h1 className='text-xl md:text-3xl font-bold py-3 mb-3'>Add Topic Details</h1>
          <div className='inline-flex flex-col mb-5'>
          <label htmlFor="topicName">Topic Name</label>
          <input
            className={inputClassName}
            type="text"
            id="topicName"
            name="name"
            value={newTopic.name}
            onChange={handleInputChange}
            placeholder='e.g., Topic 3 - Heading'
          /> 
          {validationMessage && (
            <p className='invalidMessage'>
              {validationMessage}
            </p>
          )}
          </div>
          <div className='flex gap-4 items-center'>
            <button onClick={cancelEditing} className='cancelEditButton'>Cancel</button>
            <button onClick={handleSave} className='saveEditButton'>Save</button>
          </div>
        </div>
      </div>
    )}

{/* Create Sub-Topic */}
{isSubModalOpen && (
      <div className="modal" style={{overflow:"scroll"}}>
        <div className="modal-content" style={{overflow:"scroll"}}>
          <span className="close" onClick={closeSubModal}>
            &times;
          </span>
          <h1 className='text-xl md:text-3xl font-bold py-3 mb-3'>Add Sub-Topic Details</h1>
          <div className='inline-flex flex-col mb-5'>
          <label htmlFor="topicName">Sub-Topic Name</label>
          <input
            type="text"
            id="topicName"
            name="name"
            value={newSubTopic.name}
            onChange={handleSubTopicInputChange}
            placeholder='e.g., Topic 3.1 - Heading'
            className={inputClassName}
          />
          {validationMessage && (
            <p className='invalidMessage'>
              {validationMessage}
            </p>
          )}
          <label className='my-3' htmlFor="topicName">Sub-Topic Description</label>
          {/* <p style={{backgroundColor:'white', float:'right', marginTop:'0px'}}>{`${newSubTopic.desc.length}/300`}</p></label><br/> */}
          {/* <textarea
            id="topicName"
            name="desc"
            value={newSubTopic.desc}
            onChange={handleSubTopicInputChange}
            placeholder='Elaborate on the sub-topic with a brief description...'
            rows={5}
            cols={50}
            className={descClassName}
          />
          {validationDescMessage && (
            <p className='invalidMessage'>
              {validationDescMessage}
            </p>
          )} */}

          {/* Editor */}
          <Editor
            apiKey='yt4psixdarlldji11wwxwqlnkky6wk0zvsnwscxf8en1a30h'
            init={{
              menu: {
                file: { title: 'File', items: 'newdocument restoredraft | preview | importword exportpdf exportword | print | deleteallconversations' },
                edit: { title: 'Edit', items: 'undo redo | cut copy paste pastetext | selectall | searchreplace' },
                view: { title: 'View', items: 'code revisionhistory | visualaid visualchars visualblocks | spellchecker | preview fullscreen | showcomments' },
                insert: { title: 'Insert', items: 'image link media addcomment pageembed codesample inserttable | math | charmap emoticons hr | pagebreak nonbreaking anchor tableofcontents | insertdatetime' },
                format: { title: 'Format', items: 'bold italic underline strikethrough superscript subscript codeformat | styles blocks fontfamily fontsize align lineheight | forecolor backcolor | language | removeformat' },
                tools: { title: 'Tools', items: 'spellchecker spellcheckerlanguage | a11ycheck code wordcount' },
                table: { title: 'Table', items: 'inserttable | cell row column | advtablesort | tableprops deletetable' },
                help: { title: 'Help', items: 'help' }
              },
              plugins: [
                'advlist', 'autolink', 'link', 'image', 'charmap', 'preview',
                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                'insertdatetime', 'media', 'table', 'help', 'wordcount'
              ],
              toolbar: 'undo redo | blocks | ' +
              'bold italic backcolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | help',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }',
              // plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
              // toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
              tinycomments_mode: 'embedded',
              tinycomments_author: 'Author name',
              mergetags_list: [
                { value: 'First.Name', title: 'First Name' },
                { value: 'Email', title: 'Email' },
              ],
              ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
            }}
            initialValue={newSubTopic.content}
            onEditorChange={(content, editor) => setSubTopicDesc(content)}
          />
          </div>
          <div className='flex gap-4 items-center'>
            <button onClick={cancelEditing} className='cancelEditButton'>Cancel</button>
            <button onClick={handleSubTopicSave} className='saveEditButton'>Save</button>
          </div>
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
        <button onClick={closeDeleteModal} className='cancelEditButton mr-5' style={{marginLeft:'290px'}}>Cancel</button>
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
        <h1 className='modalCreateHead'>Confirm Delete</h1>
        <p className='deleteLabel'>Are You Sure You Want To Delete This Sub-Topic?</p><br/>
        <div className='flex gap-4 items-center'>
        <button onClick={closeSubDeleteModal} className='cancelEditButton'>Cancel</button>
        <button onClick={handleSubDelete} className='saveEditButton'>Delete</button>
        </div>
      </div>
    </div>
  )}

  {/* Edit Sub-Topic */}
  {isSubEditModalOpen && (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeSubEditModal}>
            &times;
          </span>
          <h1 className='text-xl md:text-3xl font-bold py-3 mb-3'>Edit Sub-Topic Details</h1>
          <div className='inline-flex flex-col mb-5'>
          <label htmlFor="topicName">Sub-Topic Name</label>
          <input
            type="text"
            id="topicName"
            name="name"
            value={editSubTopic.name}
            onChange={handleSubTopicEditInputChange}
            placeholder='e.g., Topic 3.1 - Heading'
            className={inputClassName}
          /> 
          {validationMessage && (
            <p className='invalidMessage'>
              {validationMessage}
            </p>
          )}

          <label className='my-3' htmlFor="topicName">Sub-Topic Description</label>
          {/* <p style={{backgroundColor:'white', float:'right', marginTop:'0px'}}>{`${newSubTopic.desc.length}/300`}</p></label><br/> */}
          {/* <textarea
            id="topicName"
            name="desc"
            value={editSubTopic.desc}
            onChange={handleSubTopicEditInputChange}
            placeholder='Elaborate on the sub-topic with a brief description...'
            rows={5}
            cols={50}
            className={descClassName}
          />
          {validationDescMessage && (
            <p className='invalidMessage'>
              {validationDescMessage}
            </p>
          )} */}
          {/* //editor */}
          <Editor
            apiKey='yt4psixdarlldji11wwxwqlnkky6wk0zvsnwscxf8en1a30h'
            init={{
              menu: {
                file: { title: 'File', items: 'newdocument restoredraft | preview | importword exportpdf exportword | print | deleteallconversations' },
                edit: { title: 'Edit', items: 'undo redo | cut copy paste pastetext | selectall | searchreplace' },
                view: { title: 'View', items: 'code revisionhistory | visualaid visualchars visualblocks | spellchecker | preview fullscreen | showcomments' },
                insert: { title: 'Insert', items: 'image link media addcomment pageembed codesample inserttable | math | charmap emoticons hr | pagebreak nonbreaking anchor tableofcontents | insertdatetime' },
                format: { title: 'Format', items: 'bold italic underline strikethrough superscript subscript codeformat | styles blocks fontfamily fontsize align lineheight | forecolor backcolor | language | removeformat' },
                tools: { title: 'Tools', items: 'spellchecker spellcheckerlanguage | a11ycheck code wordcount' },
                table: { title: 'Table', items: 'inserttable | cell row column | advtablesort | tableprops deletetable' },
                help: { title: 'Help', items: 'help' }
              },
              plugins: [
                'advlist', 'autolink', 'link', 'image', 'charmap', 'preview',
                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                'insertdatetime', 'media', 'table', 'help', 'wordcount'
              ],
              toolbar: 'undo redo | blocks | ' +
              'bold italic backcolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | help',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }',
              // plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
              // toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
              tinycomments_mode: 'embedded',
              tinycomments_author: 'Author name',
              mergetags_list: [
                { value: 'First.Name', title: 'First Name' },
                { value: 'Email', title: 'Email' },
              ],
              ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
            }}
            initialValue={editSubTopic.content}
            onEditorChange={(content, editor) => setSubTopicDesc(content)}
          />
          </div>
         
          <div className='flex gap-4 items-center'>
            <button onClick={cancelEditing} className='cancelEditButton'>Cancel</button>
            <button onClick={handleEdit} className='saveEditButton'>Save</button>
          </div>
        </div>
      </div>
    )}

    <ul className='topicList' style={{marginBottom:"0px", padding:"16px"}}>
      {topicNames}
    </ul>
    

  </div>
);
}

export default TopicSubtopic;