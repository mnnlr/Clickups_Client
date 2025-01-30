import React from 'react';

const ConfirmationPage = ({
    message,
    confirmText,
    cancelText = "Cancel",
    onConfirm,
    onCancel,
}) => {
    return (
        <div
            className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50 backdrop-blur-sm"
        >
            <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                    {/* Question Mark Icon */}
                    <svg
                        className="text-yellow-500 w-11 h-11 mb-3.5 mx-auto"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8.93-3.36a1 1 0 011.4-.15c.93.77 1.5 1.7 1.5 2.51 0 .83-.33 1.43-.85 1.91-.34.31-.77.55-1.07.79-.2.16-.28.28-.35.45-.07.18-.07.41-.07.95a1 1 0 11-2 0c0-.8 0-1.35.26-1.83.25-.46.65-.8 1.06-1.11.37-.27.64-.46.86-.67.24-.22.38-.43.38-.79 0-.31-.26-.77-.91-1.35a1 1 0 01-.15-1.4zM10 14a1 1 0 100 2 1 1 0 000-2z"
                            clipRule="evenodd"
                        />
                    </svg>

                    {/* Message */}
                    <p className="mb-4 text-gray-500 font-bold dark:text-gray-300">
                        {message}
                    </p>

                    {/* Buttons */}
                    <div className="flex justify-center items-center space-x-4">
                        <button
                            onClick={onConfirm}
                            className="py-2 px-3 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-900"
                        >
                            {confirmText}
                        </button>

                        <button
                            onClick={onCancel}
                            className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                        >
                            {cancelText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationPage;
