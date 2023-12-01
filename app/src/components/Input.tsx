import { ChangeEvent } from "react"
import { createUseStyles, useTheme } from "../theme"
import classNames from "classnames"

const useStyles = createUseStyles((theme) => ({
  input: {
    width: "100%",
  },
  right: {
    textAlign: "right",
  },
}))

interface InputProps<TValue extends number | string> {
  value: TValue
  setValue: (value: TValue) => void
  right?: true
  step?: string
}
export const Input = <TValue extends number | string>({
  value,
  setValue,
  right,
  step,
}: InputProps<TValue>) => {
  const theme = useTheme()
  const styles = useStyles({ theme })

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (typeof value === "number") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setValue(parseFloat(event.target.value) as any)
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setValue(event.target.value as any)
    }
  }

  const className = classNames(styles.input, right && styles.right)
  return (
    <input
      className={className}
      type={typeof value}
      step={step}
      min={typeof value === "number" ? 0 : undefined}
      value={value}
      onChange={handleChange}
    />
  )
}
