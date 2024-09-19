import React, { useEffect, useState } from 'react';
import { FaUserPlus, FaEnvelope, FaUserCircle, FaTrashAlt, FaSearch } from 'react-icons/fa';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import Cookies from 'js-cookie';
import { axiosPrivate } from '../CustomAxios/customAxios';
import { showToast } from '../components/Toastconfig';

const InviteMember = () => {
  const [email, setEmail] = useState('');
  const [teamName, setTeamName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [members, setMembers] = useState([
    { id: 1, email: 'john.doe@example.com', teamName: 'Team A', name: 'John Doe' },
    { id: 2, email: 'jane.smith@example.com', teamName: 'Team B', name: 'Jane Smith' },
  ]);
  const [error, setError] = useState('');
  const [openTeams, setOpenTeams] = useState({});
  const [teams, setTeams] = useState([]);

  const token = Cookies.get("User");

  const getTeamsAndMembers = async () => {
    try {
      const response = await axiosPrivate.get("/api/teams", {
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${token}`
        },
      });
      setTeams(response.data.teams);
      const responseData = response.data.teams.flatMap(item =>
        item.members.map(member => ({
          id: member._id,
          email: member.email,
          name: member.name,
          teamId: item._id,
          teamName: item.teamName,
        }))
      );
      setMembers(responseData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {

    getTeamsAndMembers();
  }, [token]);

  const uniqueTeamNames = () => {
    const teamNamesFromMembers = members.map(member => member.teamName);
    const teamNamesFromTeams = teams.map(team => team.teamName);
    return [...new Set([...teamNamesFromMembers, ...teamNamesFromTeams])].filter(Boolean);
  }

  const handleInvite = async () => {
    setError(''); // Clear previous errors

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setError('Email is required.');
      return;
    } else if (!emailPattern.test(email)) {
      setError('Please enter a valid email address.');
      return;
    } else if (!teamName) {
      setError('Team name is required.');
      return;
    } else if (members.some((member) => member.email === email)) {
      setError(`The member "${email}" already exists in the same team or is added to a different team.`);
      return;
    } else {
      console.log(email, teamName);
      try {
        const teamExists = uniqueTeamNames().includes(teamName);
        let response;

        if (teamExists) {
          // PATCH request for adding member to an existing team
          response = await axiosPrivate.patch('/api/teams/',
            { memberEmail: email, teamName },
            {
              headers: {
                'Content-Type': 'application/json',
                "authorization": `Bearer ${token}`
              },
              withCredentials: true
            }
          );
        } else {
          // POST request for creating a new team and adding the member
          response = await axiosPrivate.post('/api/teams/',
            { memberEmail: email, teamName },
            {
              headers: {
                'Content-Type': 'application/json',
                "authorization": `Bearer ${token}`
              },
              withCredentials: true
            }
          );
        }

        console.log('Invitation sent successfully:', response.data);
        if (response.data.success) {
          getTeamsAndMembers();
          showToast(teamExists ? "Member added successfully" : "Team created and member added successfully","success");
          window.location.reload();
        }
      } catch (error) {
        console.error('Error inviting member:', error);
        setError('Failed to invite member. Please try again.');
      }
    }
  };

  const handleRemoveMember = (id) => {
    (members.filter(async (member) => {
      if (member.id === id) {
        console.log(member.teamName, member.email)
        console.log(token)
        try {
          await axiosPrivate.delete(`/api/teams/delete-member`, {
            data: { teamName: member.teamName, email: member.email },
            headers: {
              'Content-Type': 'application/json',
              'authorization': `Bearer ${token}`
            },
            withCredentials: true
          }).then(response => {
            console.log(response)
            if (response.status === 200) {
              setMembers(members.filter(member => member.id !== id));
              getTeamsAndMembers();
            showToast("Member removed successfully","successs")
            }
          })
        } catch (err) {
          console.log(err)
          alert("Failed to remove member")
        }
      }
    }))
  };

  const toggleTeam = (teamName) => {
    setOpenTeams((prevState) => ({
      ...prevState,
      [teamName]: !prevState[teamName],
    }));
  };

  const filteredMembers = members.filter(member => {
    if (searchQuery !== "") {
      return (member.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (member.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (member.teamName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (member.id.toString().includes(searchQuery))
    }
    else {
      return member
    }
  })

  // const groupedMembers = filteredMembers.reduce((acc, member) => {
  //   if (!acc[member.teamName]) {
  //     acc[member.teamName] = [];
  //   }
  //   acc[member.teamName].push(member);
  //   return acc;
  // }, {});

  const handleDeleteTeam = async (teamId, teamName) => {
    if (window.confirm(`Are you sure you want to delete the team "${teamName}"?`)) {
      try {
        await axiosPrivate.delete(`/api/teams/`, {
          data: {
            teamId
          },
          headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
          },
          withCredentials: true
        });
        setTeams(teams.filter(team => team._id !== teamId));
        setMembers(members.filter(member => member.teamId !== teamId));
        showToast("Team deleted successfully","success");
      } catch (err) {
        console.log(err);
        alert("Failed to delete team");
      }
    }
  };

  return (
    <div className="relative pt-16 pb-6 bg-gray-100 dark:bg-gray-900 h-screen overflow-auto md:ml-16 lg:ml-20">
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
    <h2 className="text-xl font-medium mb-4 text-gray-900 dark:text-gray-100">Invite New Member in the Team</h2>
    <div className="flex items-center space-x-4">
      <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg p-2">
        <FaEnvelope className="text-gray-500 dark:text-gray-400 mr-2" />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
          className="focus:outline-none bg-transparent text-gray-900 dark:text-gray-100"
        />
      </div>
      <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg p-2">
        <svg className="text-gray-500 dark:text-gray-400 mr-2" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="gray" d="M12 10a4 4 0 1 0 0-8a4 4 0 0 0 0 8m-6.5 3a2.5 2.5 0 1 0 0-5a2.5 2.5 0 0 0 0 5M21 10.5a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0m-9 .5a5 5 0 0 1 5 5v6H7v-6a5 5 0 0 1 5-5m-7 5c0-.693.1-1.362.288-1.994l-.17.014A3.5 3.5 0 0 0 2 17.5V22h3zm17 6v-4.5a3.5 3.5 0 0 0-3.288-3.494c.187.632.288 1.301.288 1.994v6z" /></svg>
        <input
          type="text"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          placeholder="Enter team name"
          className="focus:outline-none bg-transparent text-gray-900 dark:text-gray-100"
        />
      </div>
      <div className="flex items-center border border-gray-300 dark:border-gray-600 w-1/6 rounded-lg p-2">
        <select
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          className="focus:outline-none w-full bg-transparent text-gray-900 dark:text-gray-100"
        >
          <option value="" className="text-gray-900 dark:text-gray-100">Select a team</option>
          {uniqueTeamNames().map((teamName, index) => (
            <option key={index} value={teamName} className="text-gray-900 dark:text-gray-100">{teamName}</option>
          ))}
        </select>
      </div>
      <button
        onClick={handleInvite}
        className="bg-blue-500 dark:bg-blue-600 text-white p-2 rounded-lg flex items-center"
      >
        <FaUserPlus className="mr-2" /> Invite
      </button>
    </div>

    {/* Error Message */}
    {error && (
      <div className="mt-4 text-red-500 dark:text-red-400">
        {error}
      </div>
    )}
  </div>

      {/* <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-medium mb-4">Search Members</h2>
        <div className="flex items-center border border-gray-300 rounded-lg p-2">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Name, Email, Team Name, or ID"
            className="focus:outline-none w-full"
          />
        </div>
      </div> */}

<div className="bg-white dark:bg-gray-800 p-6 rounded-sm shadow-md">
  <h2 className="text-xl font-medium mb-4 text-gray-900 dark:text-gray-100">Teams and Members</h2>
  <div className="w-full mb-4">
    <div className="relative">
      <FaSearch className="absolute top-3 left-3 text-gray-400 dark:text-gray-500" />
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search by Name, Email, or Team Name"
        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:border-indigo-400 dark:focus:ring-indigo-800 transition bg-transparent text-gray-900 dark:text-gray-100"
      />
    </div>
  </div>
  {teams.map((team) => (
    <div key={team._id} className="mb-2 bg-white dark:bg-gray-700 rounded-lg shadow border border-gray-200 dark:border-gray-600">
      <div className="flex justify-between items-center px-6 py-4 bg-gray-200 dark:bg-gray-600 text-black dark:text-white rounded-t-lg">
        <button
          onClick={() => toggleTeam(team.teamName)}
          className="flex-grow text-left focus:outline-none"
        >
          <span className="text-lg font-medium">
            {team.teamName} ({team.members.length} Members)
          </span>
        </button>
        <div className="flex items-center">
          <button
            onClick={() => handleDeleteTeam(team._id, team.teamName)}
            className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-600 mr-4 focus:outline-none"
          >
            <FaTrashAlt />
          </button>
          <button
            onClick={() => toggleTeam(team.teamName)}
            className="focus:outline-none"
          >
            {openTeams[team.teamName] ? (
              <FiChevronUp className="w-6 h-6 dark:text-white" />
            ) : (
              <FiChevronDown className="w-6 h-6 dark:text-white" />
            )}
          </button>
        </div>
      </div>
      {openTeams[team.teamName] && (
        <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-gray-50 dark:bg-gray-800">
          {team.members.length > 0 ? (
            team.members
              .filter((member) =>
                member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                team.teamName.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((member) => (
                <div key={member._id} className="flex bg-gray-50 dark:bg-gray-900 rounded-lg flex-wrap justify-between shadow-md items-center p-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                  <div className="flex items-center">
                    <FaUserCircle className="text-gray-500 dark:text-gray-400 text-2xl mr-4" />
                    <div>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">{member.name ? member.name.charAt(0).toUpperCase() + member.name.slice(1) : "No Name"}</p>
                      <p className="text-lg font-medium text-gray-900 dark:text-gray-100">{member.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveMember(member._id)}
                    className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-600"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              ))
          ) : (
            <div className="col-span-full text-center text-gray-500 dark:text-gray-400">
              No members in this team
            </div>
          )}
        </div>
      )}
    </div>
  ))}
</div>
</div>
  );
};

export default InviteMember;
