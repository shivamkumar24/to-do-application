import { Button, AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { gettodos } from "../Redux/actions";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = JSON.parse(localStorage.getItem("isAuth")) || false;
  const logindata = JSON.parse(localStorage.getItem("logindata"));

  const handleLogout = () => {
    localStorage.setItem("isAuth", false);
    localStorage.clear();
    dispatch(gettodos);
    navigate("/");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          style={{ flexGrow: 1, cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          To-Do
        </Typography>
        {isAuth && logindata !== null ? (
          <>
            <IconButton color="inherit">
              <AccountCircle />
            </IconButton>
            <Typography variant="body1">{`Hi, ${logindata.name}`}</Typography>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button color="inherit" onClick={() => navigate("/signup")}>
              SignUp
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
