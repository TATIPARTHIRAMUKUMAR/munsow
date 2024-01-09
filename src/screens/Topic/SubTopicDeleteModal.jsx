
const SubTopicDeleteModal = ({ subIndex, setShowDeleteSubModal, topicIndex, topics, setTopics }) => {
  const deleteSubTopic = () => {
    try {
      const newTopics = [...topics];
      const topicToUpdate = newTopics[topicIndex];
      const newSubtopics = [...topicToUpdate.subtopics];
      newSubtopics.splice(subIndex, 1);
      topicToUpdate.subtopics = newSubtopics;
      newTopics[topicIndex] = topicToUpdate;
      setTopics(newTopics);
      setShowDeleteSubModal(false);
    } catch (error) {
      console.error("Error deleting subtopic:", error);
    }
  };

  return (
    <div className="fixed z-10 inset-0">
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-lg p-5 m-5">
          <p className="text-center mb-8">
            Are you sure you want to delete this subtopic?
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setShowDeleteSubModal(false)}
              className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded shadow-sm"
            >
              Cancel
            </button>
            <button
              onClick={deleteSubTopic}
              className="bg-red-600 text-white px-4 py-2 rounded shadow-sm"
            >
              Confirm Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubTopicDeleteModal;