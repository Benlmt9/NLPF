import React from "react";

const error = {};

export const ErrorContext = React.createContext({error, setError: () => {}})