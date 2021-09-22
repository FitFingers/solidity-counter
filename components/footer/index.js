import Link from "next/link";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  footer: {
    background: theme.palette.secondary.main,
    color: theme.palette.common.white,
    display: "flex",
    justifyContent: "center",
    padding: theme.spacing(2, 3),
    marginTop: theme.spacing(-5),
  },
}));

export default function Footer() {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Link passHref href="/">
        <a>© {new Date().getFullYear()} James Hooper</a>
      </Link>
    </footer>
  );
}
