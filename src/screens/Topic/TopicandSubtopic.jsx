import React, { useEffect, useState } from "react";
import circleplus from "../../assets/icons/circleplus.svg";
import edit from "../../assets/icons/edit.svg";
import eye from "../../assets/icons/eye.svg";
import trash from "../../assets/icons/trash.svg";
import equals from "../../assets/icons/equals.svg";
import ArrowDown from "../../assets/icons/ArrowDown.png";
import ArrowUp from "../../assets/icons/ArrowUp.png";

import Subtopic from "./Subtopic";
import ConformDeleteModal from "./ConformDeleteModal";
import SubTopicDeleteModal from "./SubTopicDeleteModal";

function TopicandSubtopic() {
  const [topics, setTopics] = useState([]);
  const [newTopicTitle, setNewTopicTitle] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [topicIndex, setTopicIndex] = useState();
  const [subTopic, setSubTopic] = useState();
  const [subTopicIndex, setSubTopicIndex] = useState();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteSubModal, setShowDeleteSubModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editTopicId, setEditTopicId] = useState(null);
  const [highlightedIndex, setHighlightedIndex] = useState(null);
  const [showSubtopic, setShowSubtopic] = useState(false);
  const [subtopicVisibility, setSubtopicVisibility] = useState([]);
  const [todoItemDrag, setTodoItemDrag] = useState(null);
  const [todoItemDragOver, setTodoItemDragOver] = useState(null);

  const handleDragStart = (topicIndex, subIndex, event) => {
    if (subIndex === undefined) {
      // Dragging the main topic
      setTodoItemDrag({ type: "topic", index: topicIndex });
    } else {
      // Dragging a subtopic
      setTodoItemDrag({ type: "subtopic", topicIndex, subIndex });
    }
    const draggedElement = event.currentTarget;
    updateDraggedElementStyles(event.target, true);
    event.dataTransfer.setDragImage(event.target, 0, 0);
  };

  const handleDragEnter = (topicIndex, subIndex, event) => {
    if (subIndex === undefined) {
      // Dragging the main topic
      setTodoItemDragOver({ type: "topic", index: topicIndex });
    } else {
      // Dragging a subtopic
      setTodoItemDragOver({ type: "subtopic", topicIndex, subIndex });
    }
  };

  const handleDragLeave = () => {
    // Reset the styles when drag leaves the element
    const draggedElement = document.querySelector(".dragged-item");
    if (draggedElement) {
      updateDraggedElementStyles(draggedElement, false);
    }
  };

  const handleDragEnd = () => {
    if (todoItemDrag.type === "topic") {
      // Handle rearrangement for main topics
      const draggedItem = topics[todoItemDrag.index];
      const newTopics = [...topics];
      newTopics.splice(todoItemDrag.index, 1);
      newTopics.splice(todoItemDragOver.index, 0, draggedItem);
      setTopics(newTopics);
    } else if (todoItemDrag.type === "subtopic") {
      // Handle rearrangement for subtopics
      const sourceTopic = topics[todoItemDrag.topicIndex];
      const [draggedSubtopic] = sourceTopic.subtopics.splice(
        todoItemDrag.subIndex,
        1
      );
      const destinationTopic = topics[todoItemDragOver.topicIndex];
      destinationTopic.subtopics = destinationTopic.subtopics || [];
      destinationTopic.subtopics.splice(
        todoItemDragOver.subIndex,
        0,
        draggedSubtopic
      );

      setTopics([...topics]);
    }

    setTodoItemDrag(null);
    setTodoItemDragOver(null);

    const draggedElement = document.querySelector(".dragged-item");
    if (draggedElement) {
      updateDraggedElementStyles(draggedElement, false);
    }
  };

  // Reset the styles after the drag operation
  const updateDraggedElementStyles = (element, isDragging) => {
    element.style.border = isDragging ? "3px solid #000" : "";
    element.style.borderRadius = isDragging ? "6px" : "";
    element.style.boxShadow = isDragging ? "0px 0px 18px 3px #000" : "";
    element.style.backgroundColor = isDragging ? "white" : "";
    element.style.opacity = isDragging ? "1" : "";
    element.style.color = isDragging ? "black" : "";
    element.style.fontWeight = isDragging ? "bold" : "";
    element.style.fontSize = isDragging ? "16px" : "";
  };

  // Add these functions alongside your existing functions
  const handleSubtopicDragStart = (e, topicIndex, subIndex) => {
    e.dataTransfer.setData(
      "text/plain",
      JSON.stringify({ topicIndex, subIndex })
    );
    const draggedItem = e.target;
    draggedItem.classList.add("dragged-item");
  };

  const handleSubtopicDragOver = (e, topicIndex, subIndex) => {
    e.preventDefault();

    const draggedItem = todoItemDrag;
    if (
      draggedItem &&
      draggedItem.type === "subtopic" &&
      draggedItem.topicIndex === topicIndex &&
      draggedItem.subIndex !== subIndex
    ) {
      // Find the target subtopic
      const destinationTopic = topics[topicIndex];
      const destinationSubtopic = destinationTopic.subtopics[subIndex];

      // Find the source subtopic
      const sourceTopic = topics[draggedItem.topicIndex];
      const sourceSubtopic = sourceTopic.subtopics[draggedItem.subIndex];

      // Swap the subtopics in the array
      destinationTopic.subtopics[subIndex] = sourceSubtopic;
      sourceTopic.subtopics[draggedItem.subIndex] = destinationSubtopic;

      setTopics([...topics]);
    }
  };

  const handleSubtopicDragLeave = (e) => {
    const dropTarget = e.target;
    dropTarget.classList.remove("drop-target");
  };

  const handleSubtopicDragEnd = (e) => {
    const draggedItem = e.target;
    draggedItem.classList.remove("dragged-item");
  };

  const handleSubtopicDrop = (e, topicIndex, subIndex) => {
    e.preventDefault();

    const draggedItem = JSON.parse(e.dataTransfer.getData("text/plain"));
    const { topicIndex: sourceTopicIndex, subIndex: sourceSubIndex } =
      draggedItem;

    if (topicIndex === sourceTopicIndex) {
      const sourceTopic = topics[sourceTopicIndex];
      const [draggedSubtopic] = sourceTopic.subtopics.splice(sourceSubIndex, 1);

      const destinationTopic = topics[topicIndex];
      destinationTopic.subtopics = destinationTopic.subtopics || [];
      destinationTopic.subtopics.splice(subIndex, 0, draggedSubtopic);

      setTopics([...topics]);
    }

    setTodoItemDrag(null);
    setTodoItemDragOver(null);
  };

  //end drags
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
    if (newTopicTitle.trim() !== "") {
      if (editMode) {
        // Update existing topic when in edit mode
        setTopics((prevTopics) =>
          prevTopics.map((topic) =>
            topic.id === editTopicId
              ? { ...topic, title: newTopicTitle }
              : topic
          )
        );
        setEditMode(false);
      } else {
        // Create new topic when in create mode
        const newTopic = {
          id: topics.length + 1,
          title: newTopicTitle,
          subtopics: [],
          visibility: [], // Initialize visibility for subtopics
        };
        setTopics((prevTopics) => [...prevTopics, newTopic]);
        setSubtopicVisibility((prevVisibility) => [...prevVisibility, []]);
      }

      setNewTopicTitle("");
      setShowInput(false);
    }
  };
  const handleCancel = () => {
    setNewTopicTitle("");
    setShowInput(false);
    setEditMode(false);
  };

  const handleEditTopic = (topic) => {
    setNewTopicTitle(topic.title);
    setEditMode(true);
    setEditTopicId(topic.id);
    setShowInput(true);
  };

  const deleteTopic = (topicIndex) => {
    setTopicIndex(topicIndex + 1);
    setShowDeleteModal(true);
  };
  const deleteSubTopic = (subIndex) => {
    setSubTopicIndex(subIndex);
    setShowDeleteSubModal(true);
  };
  const handleEyeButtonClickTopic = (index) => {
    setHighlightedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleEyeButtonClickSubtopic = (topicIndex, subIndex) => {};

  const toggleSubtopicVisibility = (topicIndex, subIndex) => {
    setSubtopicVisibility((prevVisibility) => {
      const newVisibility = [...prevVisibility];
      newVisibility[topicIndex] = {
        ...newVisibility[topicIndex],
        [subIndex]: !newVisibility[topicIndex][subIndex],
      };
      return newVisibility;
    });
  };

  useEffect(() => {
    if (highlightedIndex !== null) {
      console.log("Updated highlightedIndex:", highlightedIndex);
    }
  }, [highlightedIndex]);

  return (
    <div className="bg-gray-200 w-full h-screen p-7">
      <div className="relative w-full bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
          <div className="inline-flex items-center space-x-2">
            <span className="text-2xl text-black font-semibold">
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
              <img src={circleplus} alt="" className="w-5 h-5 ml-5 mt-1" />
            </button>
          </div>
        </div>
      </div>
      <div className="relative w-full mt-10">
        {topics.map((topic, index) => (
          <div
            key={index}
            draggable
            onDragStart={(event) => handleDragStart(index, undefined, event)}
            onDragEnter={() => handleDragEnter(index, undefined)}
            onDragLeave={handleDragLeave}
            onDragEnd={handleDragEnd}
          >
            <div
              className={`mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8  rounded-full mt-2 p-4 ${
                highlightedIndex === index ? "bg-gray-300" : "bg-white"
              }`}
            >
              <div className="inline-flex items-center space-x-2">
                <button>
                  <img src={equals} alt="" className="w-5 h-5" />
                </button>
                <div className="w-auto pl-5">{topic.title}</div>
              </div>
              <div className="flex justify-between gap-7">
                {showModal && (
                  <Subtopic
                    setTopics={setTopics}
                    topicIndex={topicIndex}
                    subtopic={subTopic}
                    setShowModal={setShowModal}
                  />
                )}

                <button
                  onClick={() => addSubtopic(topic, topic.subtopics.length + 1)}
                >
                  <img src={circleplus} alt="circleplus" className="w-5 h-5" />
                </button>
                {/* Edit button */}
                <button onClick={() => handleEditTopic(topic)}>
                  <img src={edit} alt="edit" className="w-5 h-5" />
                </button>
                {/* eye button */}
                <button onClick={() => handleEyeButtonClickTopic(index)}>
                  <img src={eye} alt="eye" className="w-5 h-5" />
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
                  <img src={trash} alt="trash" className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="relative w-full px-7 mt-2 mb-5">
              {topic.subtopics.map((subtopic, subIndex) => (
                <div
                  key={`subtopic_${subIndex}`}
                  draggable
                  onDragStart={(e) =>
                    handleSubtopicDragStart(e, index, subIndex)
                  }
                  onDragOver={(e) => handleSubtopicDragOver(e, index, subIndex)}
                  onDragLeave={handleSubtopicDragLeave}
                  onDragEnd={handleSubtopicDragEnd}
                  onDrop={(e) => handleSubtopicDrop(e, index, subIndex)}
                >
                  <div
                    className={`mx-auto flex max-w-7xl items-center justify-between px-2 py-2 sm:px-6 lg:px-8   rounded-full mt-2 p-4 ${
                      highlightedIndex === index ? "bg-gray-300" : "bg-white"
                    }`}
                  >
                    <div className="inline-flex items-center space-x-2">
                      <button className="">
                        <img src={equals} alt="" className="w-5 h-5" />
                      </button>
                      <div className="ml-5 flex">
                        Sub- {topic.title} {subIndex + 1}
                        {/* show subtopic button */}
                        <button
                          onClick={() =>
                            toggleSubtopicVisibility(index, subIndex)
                          }
                        >
                          {subtopicVisibility[index] &&
                          subtopicVisibility[index][subIndex] ? (
                            <img
                              src={ArrowUp}
                              alt="ArrowUp"
                              className="w-5 h-5 ml-3 mt-1"
                            />
                          ) : (
                            <img
                              src={ArrowDown}
                              alt="ArrowDown"
                              className="w-5 h-5 ml-3 mt-1"
                            />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="flex gap-7">
                      <button>
                        <img src={edit} alt="edit" className="w-5 h-5" />
                      </button>

                      <button
                        onClick={() =>
                          handleEyeButtonClickSubtopic(index, subIndex)
                        }
                      >
                        <img src={eye} alt="eye" className="w-5 h-5" />
                      </button>

                      {showDeleteSubModal && (
                        <SubTopicDeleteModal
                          subtopic={subtopic}
                          subIndex={subTopicIndex}
                          setShowDeleteSubModal={setShowDeleteSubModal}
                          topicIndex={topicIndex}
                          subtopics={topic.subtopics}
                          topics={topics}
                          setTopics={setTopics}
                        />
                      )}

                      <button onClick={() => deleteSubTopic(subIndex)}>
                        <img src={trash} alt="trash" className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  {subtopicVisibility[index] &&
                  subtopicVisibility[index][subIndex] ? (
                    <div className="mx-auto flex flex-col max-w-7xl items-start justify-between px-2 py-2 sm:px-6 lg:px-8 bg-white  rounded-xl mt-1 p-4">
                      <div className="flex gap-5">
                        <span className="font-bold">Sub Title: </span>
                        <span>{subtopic.subTitle}</span>
                      </div>
                      <div className="flex mt-2 gap-5 ">
                        <span className="font-bold">Description:</span>
                        <span className="text-justify">{subtopic.subDesc}</span>
                      </div>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        ))}
        {showInput && (
          <div className="mx-auto flex max-w-7xl items-center justify-between px-2 sm:px-2 lg:px-4 bg-white  rounded-full mt-2">
            <div className="inline-flex items-center space-x-2">
              <button>
                <img src={equals} alt="" className="w-5 h-5" />
              </button>
              <input
                className="w-auto ml-5 pl-3 mt-2 mb-2"
                required
                autoFocus={true}
                type="text"
                placeholder="Enter Topic Title"
                value={newTopicTitle}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex justify-between gap-7">
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
  );
}

export default TopicandSubtopic;
