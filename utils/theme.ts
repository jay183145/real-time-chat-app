import { getCookie, setCookie } from "cookies-next"

export enum ThemeName {
    light = "light",
    dark = "dark",
}

export const getTheme = () => {
    return getCookie("theme") as ThemeName
}

export const setTheme = (t: ThemeName) => {
    setCookie("theme", t)
    document.body.setAttribute("data-theme", t)
}
