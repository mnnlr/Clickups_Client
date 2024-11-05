import React, { useEffect, useState } from 'react'
import { axiosPrivate } from '../CustomAxios/customAxios';
import Cookies from "js-cookie"

export default function useGetTeams() {
    const [availableTeams, setAvailableTeams] = useState([]);

    const token = Cookies.get("User");

    useEffect(() => {
        getTeams();
    }, [token]);

    const getTeams = async () => {
        try {
            const response = await axiosPrivate.get("/api/teams", {
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                },
            });
            const responseData = response.data.teams.map(team => ({
                id: team._id,
                name: team.teamName,
            }));
            // console.log("teams from hook: ", responseData)
            setAvailableTeams(responseData);
        } catch (err) {
            console.log("Error's from useGetTeams: ", err);
        }
    };

    return { availableTeams, setAvailableTeams, getTeams };
}
