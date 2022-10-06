import React from "react";
import {createContext} from "react"
const user = {
    // Thibault id
    //id: "633cca004f78b0015281f6e5",

    // Apple 2 Id
    id: "633e93b3ccf73abfcc482dc5",
    email: "fd",
    name: "caca",
    type: "CANDIDATE",
    avatar: 0,
}

export const UserContext = React.createContext({user, setUser: () => {}});
// export const UserContext = createContext();