import React from "react";

const user = {
    id: 1,
    first_name: "caca",
    last_name: "caca",
    type: "CANDIDATE"
}

export const UserContext = React.createContext({user, setUser: () => {}});