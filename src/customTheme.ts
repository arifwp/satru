import { extendTheme } from '@chakra-ui/react';

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
          opacity: 0.6
        }
      }
    },
    Modal: {
      baseStyle: (props: any) => ({
        dialog: {
          bg:props.colorMode === 'dark'?'#1C1C1E':'white'
        }
      })
    },
    Menu: {
      baseStyle: (props: any) => ({
        list: {
          bg: props.colorMode === 'dark' ? '#1C1C1E' : 'white'
        },
        item: {
          bg: props.colorMode === 'dark' ? '#1C1C1E' : 'white'
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
        p: 6,
        borderRadius: '8px',
      }),
      variants: {
        primaryButton: {
          bg: 'teal.400',
          fontWeight: 'semibold'
        },
      }
    },
  },
});

export default customTheme;