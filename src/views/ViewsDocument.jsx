import React from 'react'


function ViewsDocument() {
    
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
    <div class="mt-6 flex items-center bg-gray-100">
        <iframe 
             
          src=""
          width="100%"
          height="550px"
          allowFullScreen                  
          title="Document Viewer"
          className="border rounded"
        ></iframe>
      </div>
    
  </>
  
  )
}

export default ViewsDocument;