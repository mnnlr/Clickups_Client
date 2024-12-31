import React from 'react'

const AvailableMembersShow = ({workspace}) => {
  const getInitial = (name) => {
    if (!name) return 'No User Assigneed';
    const nameParts = name.trim().split(' ');
    const initials = nameParts.map(part => part.charAt(0).toUpperCase());
    return initials.slice(0, 2).join('');
  };
  return (
    <div className="flex items-center">
  {workspace?.workspaceMembers && workspace?.workspaceMembers.length > 0 ? (
    workspace.workspaceMembers.slice(0, 3).map((member, index) => (
      <div
        key={index}
        className="rounded-full py-1 px-2 -ml-2 bg-blue-200 text-blue-800 flex items-center justify-center text-sm font-bold shadow-md shadow-black"
      >
        {getInitial(member?.name)}
      </div>
    ))
  ) : (
    <span className="text-gray-400 ml-2">No members</span>
  )}
  {workspace?.workspaceMembers && workspace.workspaceMembers.length > 3 && (
    <span className="text-gray-400 ml-2">+{workspace.workspaceMembers.length - 3}</span>
  )}
</div>

  )

}

export default AvailableMembersShow