import React from "react";
import Chatroom from "./Chatroom";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_ROOMS } from "../utils/queries";

const RoomList = () => {
    const { loading, data } = useQuery(QUERY_ALL_ROOMS);
    const rooms = data?.rooms || [];

    const userFunction = () => {
        console.log('This props stuff is cool!')
    };

    if (loading) {
        return <h3>Loading</h3>
    }
    return (
        <>
        {rooms && rooms.map((room) => (
            <Chatroom title={room.category} key={room._id} goSomeWhere={userFunction}/>
        ))}
        </>
    )
};

export default RoomList;