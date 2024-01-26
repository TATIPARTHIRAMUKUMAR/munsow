

const ConformDeleteModal = ({ topicIndex, topics, setTopics, setShowDeleteModal }) => {

    const deleteTopic = () => {      
        try {
          const updatedTopics = topics.filter(topic => topic.id !== topicIndex);    
            setTopics(updatedTopics);
            setShowDeleteModal(false);
            //console.log(updatedTopics);
         } catch (error) {
            console.error("Error deleting topic:", error);
         }
    };
   
    return (
       <div className="fixed z-10 inset-0">
         <div className="flex items-center justify-center min-h-screen">
           <div className="bg-white rounded-lg p-5 m-5">
             <p className="text-center mb-8">
               Are you sure you want to delete this topic?
             </p>
             <div className="flex justify-center space-x-4">
               <button
                 onClick={() => setShowDeleteModal(false)}
                 className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded shadow-sm"
               >
                 Cancel
               </button>
               <button
                 onClick={deleteTopic}
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

   export default ConformDeleteModal;