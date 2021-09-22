import "../styles/globals.css";
import { CssBaseline } from "@material-ui/core";
import Layout from "components/layout";
import ThemeProvider from "theme";

function MyAwesomeProject({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <CssBaseline />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyAwesomeProject;
