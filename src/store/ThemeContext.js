import { createContext, useState } from "react";

export const UserThemeContext = createContext()



const UserThemeProvider = ({children}) => {
    let currentTheme = localStorage.getItem('theme')
    if(!currentTheme){
        currentTheme = 'light'
    }
    const [theme, setTheme] = useState(currentTheme)
    return(
        <UserThemeContext.Provider value={{theme, setTheme}}>
            {children}
        </UserThemeContext.Provider>
    )
}

export default UserThemeProvider


