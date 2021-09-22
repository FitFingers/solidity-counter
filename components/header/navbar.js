import { Typography } from "@material-ui/core";
import Link from "next/link";

// ===================================================
// COMPONENTS
// ===================================================

export default function DesktopNavbar({ links = [] }) {
  return (
    <>
      {links.map(({ label, link }) => (
        <Typography variant="body2" key={`desktop-nav-link-${label}`}>
          <Link href={link}>{label}</Link>
        </Typography>
      ))}
    </>
  );
}
