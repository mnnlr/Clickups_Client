import React from "react";

const Modal = ({ title, children, onClose }) => {
  return (
    <div className="fixed inset-0 px-96 flex justify-center items-center z-50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 w-full rounded-lg shadow-lg">
        <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >
            ✖
          </button>
        </div>
        <div className="p-4 text-gray-800 dark:text-gray-300">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
