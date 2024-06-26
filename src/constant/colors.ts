import { useColorModeValue } from "@chakra-ui/react"

const useBgComponentBaseColor = () => {
    return useColorModeValue("#F8F9FA", "#1C1C1E");
}

export {
    useBgComponentBaseColor
}