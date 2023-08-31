import { createUseStyles as baseCreateUseStyles, Styles, useTheme as baseUseTheme } from "react-jss"

export const theme = {
  fonts: {
    archivoBlack: "'Archivo Black', sans-serif",
    inter: "'Inter', sans-serif"
  },
  colors: {
    white: "#FFFFFF",
    gray300: "#E1E1E1",
    gray400: "#B7B7B7",
    black: "#000000",
    yellow: "#E6FE74",
    orange: "#FE6232"
  },
}

export type HeistTheme = typeof theme;

export const useTheme = () => baseUseTheme<HeistTheme>()

export type CreateUseStylesOptions = Parameters<typeof baseCreateUseStyles<string, unknown, HeistTheme>>[1]

export function createUseStyles<C extends string = string, Props = unknown>(
  styles: Styles<C, Props, HeistTheme> | ((theme: HeistTheme) => Styles<C, Props, undefined>),
  options?: CreateUseStylesOptions
) {
  return baseCreateUseStyles<C, Props, HeistTheme>(styles, options)
}