import React, { useEffect, useState } from 'react'
import xmark from '../../../assets/icons/xmark.svg'
import { Editor } from '@tinymce/tinymce-react';

function Subtopic({ setTopics, topicIndex, subtopic, setShowModal,subIndex }) {
  console.log( topicIndex, subtopic)
  const [subTopic, setSubTopic] = useState([]);
  const [subTopicDesc, setSubTopicDesc] = useState([]);

  const saveSubtopic = () => {
    setTopics((prevTopics) => {
      const newTopics = [...prevTopics];
      const updatedTopic = { ...newTopics[topicIndex] };
      updatedTopic.subtopics.push({
        name: subTopic, // Replace with your actual key1 and value1
        content: subTopicDesc, // Replace with your actual key2 and value2
      });
      newTopics[topicIndex] = updatedTopic;

      // newTopics[topicIndex].subtopics.push(subtopic);
      return newTopics;
    });
    setShowModal(false);
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
                  <h4 className='text-xl text-gray-500'>{subtopic}</h4>
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
                      placeholder='Enter the name of the sub topic'
                      onChange={(e) => setSubTopic(e.target.value)}
                    />
                  </div>
                  <div className="flex items-start justify-between mt-5 px-5">
                    <label htmlFor='SubTopicDesc' className='font-semibold text-lg text-gray-500'>Sub Topic Desc</label>

                  </div>
                  <div className="flex w-full items-start justify-between px-5" style={{zIndex:"999999"}}>


                    {/* <Editor
                      apiKey='6uslfnqkm6qjxxn3v1cwgpc27eto4yqyjp5d7opih9vunxz7'
                      initialValue="<p>Start Writing ... </p>"
                      init={{
                        height: 200,
                        menubar: true,
                        branding: false,
                        plugins: [
                          'advlist autolink lists link image charmap print preview anchor',
                          'searchreplace visualblocks code fullscreen',
                          'insertdatetime media table paste code help wordcount',
                          'formatpainter textcolor emoticons pagebreak hr spellchecker',
                          'table imagetools media file'
                        ],
                        toolbar: 'undo redo | formatselect | ' +
                          'bold italic backcolor forecolor | alignleft aligncenter ' +
                          'alignright alignjustify | bullist numlist outdent indent | ' +
                          'removeformat | help | ' +
                          'link image media | table | formatpainter | ' +
                          'emoticons charmap | fontsizeselect fontselect | ' +
                          'spellchecker | pagebreak hr fullscreen | code | ' +
                          'inserttable tableprops tabledelete | tableinsertrowbefore tableinsertrowafter ' +
                          'tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol',


                        image_title: true,
                        automatic_uploads: true,
                        file_picker_types: 'image',
                        file_picker_callback: function (cb, value, meta) {
                          var input = document.createElement('input');
                          input.setAttribute('type', 'file');
                          input.setAttribute('accept', 'image/*');

                          input.onchange = function () {
                            var file = this.files[0];
                            var reader = new FileReader();

                            reader.onload = function () {
                              var id = 'blobid' + (new Date()).getTime();
                              var blobCache = tinymce.activeEditor.editorUpload.blobCache;
                              var base64 = reader.result.split(',')[1];
                              var blobInfo = blobCache.create(id, file, base64);
                              blobCache.add(blobInfo);

                              cb(blobInfo.blobUri(), { title: file.name });
                            };
                            reader.readAsDataURL(file);
                          };

                          input.click();
                        }
                      }}
                      onEditorChange={(content, editor) => setSubTopicDesc(content)}
                      /> */}
                      <Editor
                        apiKey='v3p3slquhsr94j0hcp7okhz2p39x9dslnf2uwtgrfh9yqep7'
                        init={{
                          height:200,
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
                          // plugins: [
                          //   'advlist', 'autolink', 'link', 'image', 'charmap', 'preview',
                          //   'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                          //   'insertdatetime', 'media', 'table', 'help', 'wordcount'
                          // ],
                          // toolbar: 'undo redo | blocks | ' +
                          // 'bold italic backcolor | alignleft aligncenter ' +
                          // 'alignright alignjustify | bullist numlist outdent indent | ' +
                          // 'removeformat | help',
                          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }',
                          plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
                          toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                          tinycomments_mode: 'embedded',
                          tinycomments_author: 'Author name',
                          mergetags_list: [
                            { value: 'First.Name', title: 'First Name' },
                            { value: 'Email', title: 'Email' },
                          ],
                          ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
                        }}
                        initialValue="Welcome to TinyMCE!"
                        onEditorChange={(content, editor) => setSubTopicDesc(content)}
                      />

                  </div>
                  <div className="flex items-center justify-end p-6">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
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