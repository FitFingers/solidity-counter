import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Box,
} from "@material-ui/core";
import Link from "next/link";
import dynamic from "next/dynamic";
// import MyLogo from "public/my-logo.png";

const MobileDrawer = dynamic(() => import("./drawer"));
const DesktopNavbar = dynamic(() => import("./navbar"));

// ===================================================
// UTIL
// ===================================================

export const links = [
  { label: "Home", link: "/" },
  { label: "About", link: "/#about" },
  { label: "Projects", link: "/#projects" },
  { label: "Skills", link: "/#skills" },
  { label: "Contact", link: "/#contact" },
];

// ===================================================
// STYLES
// ===================================================

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "&>:first-child": {
      flex: 1,
      padding: theme.spacing(1, 2),
    },
  },
  logo: {
    position: "relative",
    maxWidth: 180,
    width: "100%",
    height: "auto",
    padding: theme.spacing(1, 2),
  },
  links: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "&>*": {
      padding: theme.spacing(1, 2),
    },
  },
}));

// ===================================================
// COMPONENTS
// ===================================================

export default function Header({}) {
  const classes = useStyles();

  return (
    <AppBar color="transparent" elevation={0} position="absolute">
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6">
          <Link passHref href="/">
            My Awesome Project
          </Link>
          {/* <Box className={classes.logo}>
            <Image alt="My Awesome Project Logo" src={MyLogo} layout="responsive" />
          </Box> */}
        </Typography>
        <Box className={classes.links}>
          <Box
            component={MobileDrawer}
            display={{ xs: "block", md: "none" }}
            links={links}
          ></Box>
          <Box
            component={DesktopNavbar}
            display={{ xs: "none", md: "block" }}
            links={links}
          ></Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
