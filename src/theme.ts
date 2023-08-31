import { createUseStyles as baseCreateUseStyles, Styles, useTheme as baseUseTheme } from "react-jss"

export const theme = {
  fonts: {
    archivoBlack: "'Archivo Black', sans-serif",
    inter: "'Inter', sans-serif"
  },
  colors: {
    black: "#000000",
    gray: "#FF0000"
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