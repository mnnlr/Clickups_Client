import React, { useState } from 'react';

const Inbox = () => {
  // Sample inbox data
  const [inboxItems, setInboxItems] = useState([
    { id: 1, title: 'Important Email 1', content: 'This is an important email.', category: 'Important' },
    { id: 2, title: 'Other Email 1', content: 'This is another email.', category: 'Other' },
    { id: 3, title: 'Snoozed Email 1', content: 'This email is snoozed.', category: 'Snoozed' },
    { id: 4, title: 'Cleared Email 1', content: 'This email is cleared.', category: 'Cleared' },
    { id: 5, title: 'Important Email 2', content: 'Another important email.', category: 'Important' },
  ]);

  // Filter items by category
  const categorizedItems = {
    Important: inboxItems.filter(item => item.category === 'Important'),
    Other: inboxItems.filter(item => item.category === 'Other'),
    Snoozed: inboxItems.filter(item => item.category === 'Snoozed'),
    Cleared: inboxItems.filter(item => item.category === 'Cleared'),
  };

  const handleClear = (itemId) => {
    setInboxItems((prevItems) => prevItems.filter(item => item.id !== itemId));
  };

  return (
    <div className="relative p-6 bg-gray-100 h-screen ml-16 overflow-auto md:ml-16 lg:ml-20">
      <h1 className="text-2xl font-semibold mb-6">Inbox</h1>

      {Object.keys(categorizedItems).map((category) => (
        <div key={category} className="mb-6">
          <h2 className="text-xl font-semibold mb-4">{category}</h2>
          {categorizedItems[category].map(item => (
            <div key={item.id} className="bg-white p-4 rounded-lg shadow-md mb-4 relative">
              <h3 className="text-lg font-medium">{item.title}</h3>
              <p className="text-gray-600">{item.content}</p>
              <button
                onClick={() => handleClear(item.id)}
                className="absolute top-2 right-2 px-3 py-1 bg-red-500 text-white rounded text-sm"
              >
                Clear
              </button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Inbox;
