import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  components: {},
  breakpoints: {
    xxs: "320px",
    xs: "511px",
    sm: "568px",
    md: "768px",
    lg: "960px",
    xl: "1200px",
    "2xl": "1536px",
  },
});

export default theme;
