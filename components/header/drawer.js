import { useCallback, useState } from "react";
import Link from "next/link";
import {
  makeStyles,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  IconButton,
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";

// ===================================================
// STYLES
// ===================================================

const useStyles = makeStyles((theme) => ({
  drawer: {
    marginTop: theme.spacing(-1),
    minWidth: 220,
  },
  homeLink: {
    background: theme.palette.primary.main,
    "& .MuiTypography-root": {
      color: theme.palette.common.white,
    },
  },
}));

// ===================================================
// COMPONENTS
// ===================================================

export default function MobileDrawer({ links = [] }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const toggleDrawer = useCallback((b) => setOpen(b ?? !open), [open]);

  return (
    <>
      <IconButton
        onClick={() => toggleDrawer(true)}
        aria-label="toggle mobile navigation"
      >
        <Menu />
      </IconButton>
      <Drawer anchor="left" open={open} onClose={() => toggleDrawer(false)}>
        <div
          role="presentation"
          onClick={() => toggleDrawer(false)}
          onKeyDown={() => toggleDrawer(false)}
          className={classes.drawer}
        >
          <List>
            <ListItem button className={classes.homeLink}>
              <Link passHref href="/">
                <ListItemText
                  primary={<Typography variant="h6">James Hooper</Typography>}
                />
              </Link>
            </ListItem>
            {links.map(({ label, link }) => (
              <ListItem button key={label}>
                <Link passHref href={link}>
                  <ListItemText primary={label} />
                </Link>
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </>
  );
}
