import { tableAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers, extendTheme } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(tableAnatomy.keys);

const customTheme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  colors: {
    w: "white",
    wt: "#eeeeee",
    // dark: '#191919'
    dark: "#000000",
    bordercolor: "#CBD5E0",
  },
  styles: {
    global: (props: any) => ({
      body: {
        bg: props.colorMode === "dark" ? "dark" : "white",
        color: props.colorMode === "dark" ? "wt" : "black",
      },
    }),
  },
  components: {
    Text: {
      baseStyle: {
        fontSize: [12, null, 14],
      },
      variants: {
        secondary: {
          opacity: 0.6,
        },
      },
    },
    Modal: {
      baseStyle: (props: any) => ({
        dialog: {
          bg: props.colorMode === "dark" ? "dark" : "white",
        },
      }),
    },
    Menu: {
      baseStyle: (props: any) => ({
        list: {
          bg: props.colorMode === "dark" ? "dark" : "white",
        },
        item: {
          bg: props.colorMode === "dark" ? "dark" : "white",
        },
      }),
    },
    Link: {
      variants: {
        linkPrimary: {
          color: "teal.400",
          fontWeight: "semibold",
          textDecoration: "none",
          _hover: { textDecoration: "none" },
        },
      },
    },
    Button: {
      baseStyle: (props: any) => ({
        fontWeight: "semibold",
        borderRadius: "8px",
      }),
      variants: {
        primaryButton: {
          bg: "teal.400",
          fontWeight: "semibold",
        },
      },
    },
    Table: {
      variants: {
        primary: definePartsStyle((props) => {
          const { colorMode } = props;
          return {
            tbody: {
              tr: {
                "&:nth-of-type(odd)": {
                  bg: colorMode === "dark" ? "dark" : "white",
                },
                "&:nth-of-type(even)": {
                  bg: colorMode === "dark" ? "#1C1C1E" : "#F8F9FA",
                },
              },
            },
            tfoot: {
              tr: {
                "&:last-of-type": {
                  th: { borderBottomWidth: 0 },
                },
              },
            },
          };
        }),
      },
    },
    Form: {
      parts: ["container", "requiredIndicator", "helperText"],
      baseStyle: {
        container: {
          label: {
            fontSize: "12px",
          },
        },
      },
    },
    FormError: {
      baseStyle: {
        text: {
          fontSize: "14px",
        },
      },
    },
    Input: {
      variants: {
        // Customize the 'outline' variant
        outline: (props: any) => ({
          field: {
            borderColor:
              props.colorMode === "light"
                ? "gray.300"
                : "RGBA(255, 255, 255, 0.24)", // Default border color for normal state
            // _hover: {
            //   borderColor:
            //     props.colorMode === "light" ? "gray.400" : "gray.500", // Hover state
            // },
            // _focus: {
            //   borderColor:
            //     props.colorMode === "light" ? "blue.500" : "blue.300", // Focus state
            //   boxShadow: "0 0 0 1px",
            // },
          },
        }),
      },
      defaultProps: {
        size: "md", // Ensure size is set
        variant: "outline", // Use 'outline' variant by default
      },
    },
  },
});

export default customTheme;
