import React, { createContext, useContext, useState } from "react";

// Create a context to store the user's choice
const ChoiceContext = createContext();

// Custom hook to use the ChoiceContext
export const useChoice = () => {
    return useContext(ChoiceContext);
};

// Provider to wrap the app and provide the context value
export const ChoiceProvider = ({ children }) => {
    const [choice, setChoice] = useState(null); // Initially no choice is selected

    return (
        <ChoiceContext.Provider value={{ choice, setChoice }}>
            {children}
        </ChoiceContext.Provider>
    );
};
