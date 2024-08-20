import React from 'react';

const Inbox = () => {
  // Sample inbox data
  const inboxItems = [
    { id: 1, title: 'Important Email 1', content: 'This is an important email.', category: 'Important' },
    { id: 2, title: 'Other Email 1', content: 'This is another email.', category: 'Other' },
    { id: 3, title: 'Snoozed Email 1', content: 'This email is snoozed.', category: 'Snoozed' },
    { id: 4, title: 'Cleared Email 1', content: 'This email is cleared.', category: 'Cleared' },
    { id: 5, title: 'Important Email 2', content: 'Another important email.', category: 'Important' },
    // Add more items as needed
  ];

  // Filter items by category
  const importantItems = inboxItems.filter(item => item.category === 'Important');
  const otherItems = inboxItems.filter(item => item.category === 'Other');
  const snoozedItems = inboxItems.filter(item => item.category === 'Snoozed');
  const clearedItems = inboxItems.filter(item => item.category === 'Cleared');

  return (
    <div className="relative p-6 bg-gray-100 h-screen ml-16 overflow-auto md:ml-16 lg:ml-20">
      <h1 className="text-2xl font-semibold mb-6">Inbox</h1>

      {/* Important Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Important</h2>
        {importantItems.map(item => (
          <div key={item.id} className="bg-white p-4 rounded-lg shadow-md mb-4">
            <h3 className="text-lg font-medium">{item.title}</h3>
            <p className="text-gray-600">{item.content}</p>
          </div>
        ))}
      </div>

      {/* Other Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Other</h2>
        {otherItems.map(item => (
          <div key={item.id} className="bg-white p-4 rounded-lg shadow-md mb-4">
            <h3 className="text-lg font-medium">{item.title}</h3>
            <p className="text-gray-600">{item.content}</p>
          </div>
        ))}
      </div>

      {/* Snoozed Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Snoozed</h2>
        {snoozedItems.map(item => (
          <div key={item.id} className="bg-white p-4 rounded-lg shadow-md mb-4">
            <h3 className="text-lg font-medium">{item.title}</h3>
            <p className="text-gray-600">{item.content}</p>
          </div>
        ))}
      </div>

      {/* Cleared Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Cleared</h2>
        {clearedItems.map(item => (
          <div key={item.id} className="bg-white p-4 rounded-lg shadow-md mb-4">
            <h3 className="text-lg font-medium">{item.title}</h3>
            <p className="text-gray-600">{item.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inbox;
