import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { useGetDocumentContent } from '../document-utils-and-hooks/useGetDocumentContent';
import { useCreateDocInCloud } from '../document-utils-and-hooks/useCreateDocInCloud.js';

function ViewsDocument() {
    const {DocumentId}=useParams();
    const [DocumentData,setDocumentData]=useState();

    const{ GetDocLoading, GetDocError, GetDocData,getDocumentContent } =useGetDocumentContent();
      const { CreateDocLoading, CreateDocError, createDocument } = useCreateDocInCloud({ documentId: DocumentId, data: DocumentData });
console.log(GetDocData)
    useEffect(() => {
     if(GetDocData){
      setDocumentData(GetDocData)
     }else if(GetDocError){
      setDocumentData("Error while fetching document.");
     }else{
      setDocumentData("Loading Document...");
     }
    }, [GetDocLoading, GetDocError, GetDocData])
    
    console.log(DocumentData)

    useEffect(() => {
      getDocumentContent(DocumentId);
    }, [])
    
  return (
    <>
    <nav className="bg-blue-400 dark:bg-gray-900 text-white flex items-center px-6 h-16 shadow-md fixed top-0 left-0 w-full z-20 transition-colors duration-300 ease-in-out">
    {/* Left Section: Logo */}
    <div className="flex items-center justify-center space-x-2 p-4 m-20">      
        <span className="font-bold text-2xl dark:text-white">
          MNNLR <span className="text-[#1D4ED8] font-serif dark:text-blue-500">Workspace</span>
        </span>     
    </div>   
  </nav> 
  <div className='w-auto m-40'>
      <div
                  className=""
                  dangerouslySetInnerHTML={
                    CreateDocLoading
                      ? { __html: "Loading..." }
                      : CreateDocError
                        ? { __html: "Error while creating or updating document." }
                        : {
                          __html: DOMPurify.sanitize(DocumentData, {}),
                        }
                  }
                ></div>
    </div>
  </>
  
  )
}

export default ViewsDocument;