import { tableAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers, extendTheme } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(tableAnatomy.keys);

const customTheme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode:  false,
  },
  colors: {
    w: "white",
    wt: "#eeeeee",
    // dark: '#191919'
    dark: '#000000'
  },
  styles: {
    global: (props: any) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'dark' : 'white',
        color: props.colorMode === 'dark' ? 'wt' : 'black',
      }
    }),
  },
  components: {
    Text: {
      variants: {
        secondary: {
          opacity: 0.8
        }
      }
    },
    Modal: {
      baseStyle: (props: any) => ({
        dialog: {
          bg:props.colorMode === 'dark'?'dark':'white'
        }
      })
    },
    Menu: {
      baseStyle: (props: any) => ({
        list: {
          bg: props.colorMode === 'dark' ? 'dark' : 'white'
        },
        item: {
          bg: props.colorMode === 'dark' ? 'dark' : 'white'
        }
      })
    },
    Link: {
      variants: {
        linkPrimary: {
          color: 'teal.400',
          fontWeight: 'semibold',
          textDecoration: 'none',
          _hover: {textDecoration: 'none'}
        },
      }
    },
    Button: {
      baseStyle: (props: any) => ({
        fontWeight: 'semibold',
        borderRadius: '8px',
      }),
      variants: {
        primaryButton: {
          bg: 'teal.400',
          fontWeight: 'semibold'
        },
      }
    },
    Table: {
      variants: {
        primary: definePartsStyle((props) => {
          const { colorMode } = props;
          return {
            tbody: {
              tr: {
                '&:nth-of-type(odd)': {
                  bg: colorMode === 'dark' ? 'dark' : 'white',
                },
                '&:nth-of-type(even)': {
                  bg: colorMode === 'dark' ? '#1C1C1E' : '#F8F9FA',
                },
              },
            },
            tfoot: {
              tr: {
                '&:last-of-type': {
                  th: { borderBottomWidth: 0 },
                },
              },
            },
          };
        })
      }
    },
    Form: {
      parts: ['container', 'requiredIndicator', 'helperText'],
      baseStyle: {
        container: {
          label: {
            fontSize: '12px',
          },
        },
      },
    },
    FormError: {
      baseStyle: {
        text: {
          fontSize: '14px',
        },
      },
    },
  },
});

export default customTheme;