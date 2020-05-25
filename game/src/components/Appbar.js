import React from "react";
import { makeStyles, Typography, Button } from "@material-ui/core";
import { Link, useLocation } from "react-router-dom";
import { IconContext } from "react-icons";
import { FaSignOutAlt } from "react-icons/fa";
import { GiBackpack, GiCrestedHelmet, GiThreeFriends } from "react-icons/gi";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  linkContainer: {
    display: "flex",
    justifyContent: "flex-end",
    "& > *": {
      marginRight: theme.spacing(1),
    },
  },
  linkButtons: {
    display: "flex",
    alignItems: "flex-end",
  },
}));

export default function Appbar() {
  const classes = useStyles();
  const location = useLocation();

  const getMyColor = (path) =>
    location.pathname === path ? "secondary" : "default";

  return (
    <IconContext.Provider value={{ size: "1.4em" }}>
      <div className={classes.root}>
        <Typography variant="h6">Game marketplace</Typography>
        <nav className={classes.linkContainer}>
          <Button
            color={getMyColor("/game/inventory")}
            component={Link}
            classes={{ label: classes.linkButtons }}
            endIcon={<GiBackpack />}
            to="/game/inventory"
          >
            Inventory
          </Button>
          <Button
            color={getMyColor("/game/profile")}
            component={Link}
            classes={{ label: classes.linkButtons }}
            endIcon={<GiCrestedHelmet />}
            to="/game/profile"
          >
            Profile
          </Button>
          <Button
            color={getMyColor("/game/friends")}
            component={Link}
            classes={{ label: classes.linkButtons }}
            endIcon={<GiThreeFriends />}
            to="/game/friends"
          >
            Friends
          </Button>

          <Button
            component={Link}
            classes={{ label: classes.linkButtons }}
            endIcon={<FaSignOutAlt />}
            to="/logout"
          >
            Logout
          </Button>
        </nav>
      </div>
    </IconContext.Provider>
  );
}
