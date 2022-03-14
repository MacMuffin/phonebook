import * as React from "react"
import { render, RenderOptions } from "@testing-library/react"
import { ChakraProvider, theme } from "@chakra-ui/react"
import { PhonebookContextProvider } from "./contexts/PhonebookContext"

const AllProviders = ({ children }: { children?: React.ReactNode }) => (
  <PhonebookContextProvider>
    <ChakraProvider theme={theme}>{children}</ChakraProvider>
  </PhonebookContextProvider>
)

const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllProviders, ...options })

export { customRender as render }
