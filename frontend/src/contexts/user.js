import React from "react";
import {createContext} from "react"
const user = {
    // Thibault id
    //id: "633cca004f78b0015281f6e5",

    // Apple 2 Id
    id: "63402f3d523f30c37800e55b",
    email: "fd",
    name: "caca",
    type: "COMPANY",
    avatar: 0,
}

export const UserContext = React.createContext({user, setUser: () => {}});
// export const UserContext = createContext();