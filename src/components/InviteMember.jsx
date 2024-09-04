import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaUserPlus, FaEnvelope, FaUserCircle, FaTrashAlt, FaSearch } from 'react-icons/fa';
import Cookies from 'js-cookie';
import { axiosPrivate } from '../CustomAxios/customAxios';

const InviteMember = () => {
  const [email, setEmail] = useState('');
  const [teamName, setTeamName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [members, setMembers] = useState([
    { id: 1, email: 'john.doe@example.com', teamName: 'Team A', name: 'John Doe' },
    { id: 2, email: 'jane.smith@example.com', teamName: 'Team B', name: 'Jane Smith' },
  ]);
  const [error, setError] = useState('');

  const token = Cookies.get("User");

  useEffect(() => {
    //------------------Get request for Team Members for adding in project-----------------
    const getMembers = async () => {
      try {
        await axiosPrivate.get("/api/teams", {
          headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`
          },
        }).then((response) => {
          // console.log(response)
          const responseData = response.data.teams.map(item => ({
            id: item.member._id,
            email: item.member.email,
            name: item.member.name,
            teamName: item.teamName,
            teamId: item._id
          }));
          // console.log(responseData)
          setMembers(responseData);
        })
      } catch (err) {
        console.log(err);
      }
    };
    getMembers();
  }, [token])

  const uniqueTeamNames = () => {
    // return [...new setTeamName(members.map(member => member.teamName))].filter(Boolean);
    const teamNames = members.map(member => member.teamName);
    return [...new Set(teamNames)].filter(Boolean);
  }
  // console.log(teamName)

  const handleInvite = async () => {
    setError(''); // Clear previous errors

    // Validate email format
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
      setError(`The member "${email}" is already exsist in the same team or added in the different team.`);
      return;
    } else {
      console.log(email, teamName)
      try {
        //-----------------Post request for adding member in the team-----------------
        await axiosPrivate.post('/api/teams/', { memberEmail: email, teamName, },
          {
            headers: {
              'Content-Type': 'application/json',
              "authorization": `Bearer ${token}`
            },
            withCredentials: true
          }
        ).then(response => {
          console.log('Invitation sent successfully:', response.data);
          if (response.status === 201) {
            alert("Member added successfully")
            window.location.reload();
          }
        })
      } catch (error) {
        console.error('Error inviting member:', error);
        setError('Failed to invite member. Please try again.');
      };
    }
  };

  const handleRemoveMember = (id) => {
    (members.filter(async (member) => {
      if (member.id === id) {
        console.log(member.teamName, member.email)
        console.log(token)
        try {
          await axiosPrivate.delete(`/api/teams`, {
            data: { teamName: member.teamName, memberEmail: member.email },
            headers: {
              'Content-Type': 'application/json',
              'authorization': `Bearer ${token}`
            },
            withCredentials: true
          }).then(response => {
            console.log(response)
            if (response.status === 200) {
              setMembers(members.filter(member => member.id !== id));
              alert("Member removed successfully")
            }
          })
        } catch (err) {
          console.log(err)
          alert("Failed to remove member")
        }
      }
    }))
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

  return (
    <div className="relative pt-16 pb-6 bg-gray-100 h-screen overflow-auto md:ml-16 lg:ml-20">
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-medium mb-4">Invite New Member in the Team</h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center border border-gray-300 rounded-lg p-2">
            <FaEnvelope className="text-gray-500 mr-2" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              className="focus:outline-none"
            />
          </div>
          <div className="flex items-center border border-gray-300 rounded-lg p-2">
            <svg className="text-gray-500 mr-2" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="gray" d="M12 10a4 4 0 1 0 0-8a4 4 0 0 0 0 8m-6.5 3a2.5 2.5 0 1 0 0-5a2.5 2.5 0 0 0 0 5M21 10.5a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0m-9 .5a5 5 0 0 1 5 5v6H7v-6a5 5 0 0 1 5-5m-7 5c0-.693.1-1.362.288-1.994l-.17.014A3.5 3.5 0 0 0 2 17.5V22h3zm17 6v-4.5a3.5 3.5 0 0 0-3.288-3.494c.187.632.288 1.301.288 1.994v6z" /></svg>
            <input
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Enter team name"
              className="focus:outline-none"
            />
          </div>
          <div className="flex items-center border border-gray-300 w-1/6 rounded-lg p-2">
            <select
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="focus:outline-none w-full"
            >
              <option value="">Select a team</option>
              {uniqueTeamNames().map((teamName, index) => (
                <option key={index} value={teamName}>{teamName}</option>
              ))}
            </select>
          </div>
          <button
            onClick={handleInvite}
            className="bg-blue-500 text-white p-2 rounded-lg flex items-center"
          >
            <FaUserPlus className="mr-2" /> Invite
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-4 text-red-500">
            {error}
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
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
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-medium mb-4">Current Members</h2>
        <div className='grid grid-cols-4 gap-3'>
          {filteredMembers.map((member) => (
            <div key={member.id} className="flex flex-wrap justify-between shadow-md items-center p-4 border-b last:border-b-0">
              <div className="flex items-center">
                <FaUserCircle className="text-gray-500 text-2xl mr-4" />
                <div>
                  <p className="text-lg font-bold">{member.name ? member.name.charAt(0).toUpperCase() + member.name.slice(1) : "No Name"}</p>
                  <p className="text-lg font-medium">{member.email}</p>
                  <p className="text-sm font-normal text-indigo-500">{member.teamName}</p>
                </div>
              </div>
              <button
                onClick={() => handleRemoveMember(member.id)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrashAlt />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InviteMember;
