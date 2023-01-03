import React from "react";
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_ONE_ROOM } from "../utils/queries";

const OneRoom = () => {
    const { roomId } = useParams();
    const { loading, data } = useQuery(QUERY_ONE_ROOM, {
        variables: { roomId: roomId }
    });
    const room = data?.room || {};
    if (loading) {
        return <h3>Loading...</h3>
    }
    return (
        <>
        <h3>One room page</h3>
        <p>Room id: {room._id}</p>
        </>
    )
};
export default OneRoom;