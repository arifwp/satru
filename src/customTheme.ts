import { extendTheme } from '@chakra-ui/react';

const customTheme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode:  false,
  },
  colors: {
    w: "white",
    wt: "#eeeeee",
    dark: '#191919'
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