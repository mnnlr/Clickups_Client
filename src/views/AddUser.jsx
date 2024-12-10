import { useEffect, useState } from 'react';
import { PlusIcon } from "@heroicons/react/24/solid";
import { useLocation } from 'react-router-dom';

function AddUser() {
    const [isFormVisible, setIsFormVisible] = useState(false);

    const handleAddUser = () => {
        setIsFormVisible(false);
    };

    const handleCancel = () => {
        setIsFormVisible(false);
    };

    const { state } = useLocation();

    useEffect(() => {
        console.log(state)
    }, [state]);

    return (
        <div>
            <div className='flex w-16'>
                <img
                    alt="user avatar"
                    className="rounded-full mr-2 z-5 absolute"
                    height="20"
                    src="https://storage.googleapis.com/a1aa/image/yyALZ0emoHzVd6YDEiKf8MCf6dLsyO6982Cz78pDze5Byt3OB.jpg"
                    width="30"
                />
                <div className='bg-red-100 rounded-full p-2 z-0 z-0 ml-6 cursor-pointer'
                    onClick={() => setIsFormVisible(true)}>
                    <PlusIcon className='h-4 w-4' />
                </div>
            </div>

            {isFormVisible && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-6 md:w-1/2">
                        <h2 className="text-lg font-semibold mb-4">Add Members</h2>
                        <div>
                            <label className="block text-sm font-medium mb-2">Search Members...</label>
                            <input
                                type="email"
                                placeholder="Enter Member's Email"
                                className="w-full p-2 border border-gray-300 rounded-md mb-4 custom-placeholder"
                            />
                        </div>
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={handleCancel}
                                className="bg-gray-300 text-white px-4 py-2 rounded-md"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddUser}
                                className="bg-blue-600 text-white px-4 py-2 rounded-md"
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AddUser;
