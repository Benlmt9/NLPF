import React from "react";
import {createContext} from "react"
const user = {
    // Thibault id
    //id: "633cca004f78b0015281f6e5",

    // Apple 2 Id
    id: "633f863dcd2973914f9a44c4",
    email: "fd",
    name: "caca",
    type: "COMPANY",
    avatar: 0,
}

export const UserContext = React.createContext({user, setUser: () => {}});
// export const UserContext = createContext();