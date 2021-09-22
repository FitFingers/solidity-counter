import { makeStyles, Box, Typography } from "@material-ui/core";
import Footer from "components/footer";
import Header from "components/header";
// import { useEffect } from "react";

// ===================================================
// STYLES
// ===================================================

const useStyles = makeStyles((theme) => ({
  pageWrapper: {},
  pageInner: {
    margin: "auto",
    maxWidth: theme.breakpoints.values.lg,
    padding: theme.spacing(0, 5),
  },
}));

// ===================================================
// COMPONENTS
// ===================================================

export default function Layout({ children }) {
  const classes = useStyles();

  // // Remove the server-side injected CSS.
  // useEffect(() => {
  //   const jssStyles = document.querySelector("#jss-server-side");
  //   if (jssStyles) {
  //     jssStyles.parentElement.removeChild(jssStyles);
  //   }
  // }, []);

  return (
    <Box className={classes.pageWrapper}>
      <Header />
      <main className={classes.pageInner}>{children}</main>
      <Footer />
    </Box>
  );
}
