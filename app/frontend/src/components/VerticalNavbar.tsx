import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Collapse,
  ListItemButton,
  Box,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import PersonIcon from "@mui/icons-material/Person";
import ExpandMore from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import WorkIcon from "@mui/icons-material/Work";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import EmailIcon from "@mui/icons-material/Email";
import profile_pic from "../assets/images/profile_pic.jpg";
import logo from "../assets/images/logo.png";

interface StyleConfig {
  fontSize: string;
  fontWeight: number;
}

const defaultStyle: StyleConfig = {
  fontSize: "0.775rem",
  fontWeight: 300,
};

const selectedStyle: StyleConfig = {
  fontSize: "0.775rem",
  fontWeight: 400,
};

const Navbar = () => {
  const [workspaceOpen, setWorkspaceOpen] = useState(false);
  const location = useLocation();

  const handleWorkspaceClick = () => {
    setWorkspaceOpen(!workspaceOpen);
  };

  // Function to check if a nav item is currently selected
  const isSelected = (path: string) => location.pathname === path;

  // Custom NavItem component with configurable styles
  const NavItem = ({
    to,
    icon,
    text,
    style = defaultStyle,
    onClick,
    children,
  }: {
    to?: string;
    icon?: React.ReactNode;
    text: string;
    style?: StyleConfig;
    onClick?: () => void;
    children?: React.ReactNode;
  }) => {
    const selected = to ? isSelected(to) : false;

    const ButtonContent = () => (
      <>
        {icon && (
          <ListItemIcon sx={{ color: "#fff", minWidth: "40px" }}>
            {icon}
          </ListItemIcon>
        )}
        <ListItemText
          primary={text}
          sx={{
            color: "#fff",
            "& .MuiListItemText-primary": {
              fontSize: selected ? selectedStyle.fontSize : style.fontSize,
              fontWeight: selected
                ? selectedStyle.fontWeight
                : style.fontWeight,
            },
          }}
        />
        {children}
      </>
    );

    return (
      <ListItemButton
        component={to ? Link : "div"}
        to={to}
        onClick={onClick}
        sx={{
          borderRadius: "8px",
          mb: 0.5,
          backgroundColor: selected
            ? "rgba(255, 255, 255, 0.08)"
            : "transparent",
          "&:hover": {
            backgroundColor: selected
              ? "rgba(255, 255, 255, 0.12)"
              : "rgba(255, 255, 255, 0.04)",
          },
          transition: "background-color 0.2s ease",
        }}
      >
        <ButtonContent />
      </ListItemButton>
    );
  };

  return (
    <Box
      sx={{
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        width: "200px", // Restored original width
        background: "linear-gradient(180deg, #010F16 0%, #06192A 100%)",
        padding: "10px",
        zIndex: 2,
        overflow: "auto",
      }}
    >
      <List>
        <ListItem>
          <Box
            component="img"
            src={logo}
            alt="Logo"
            sx={{
              width: "160px",
              height: "auto",
              display: "block",
              marginBottom: "15px",
            }}
          />
        </ListItem>

        <NavItem to="/" icon={<HomeIcon />} text="Home" />
        <NavItem to="/about" icon={<InfoIcon />} text="About" />
        <NavItem to="/contact" icon={<EmailIcon />} text="Contact" />
        <NavItem icon={<SearchIcon />} text="Search" />

        <NavItem
          icon={<WorkIcon />}
          text="Workspace"
          onClick={handleWorkspaceClick}
          style={{ fontSize: "0.775rem", fontWeight: 400 }}
        >
          {workspaceOpen ? (
            <ExpandLess sx={{ color: "#fff", marginLeft: "90px" }} />
          ) : (
            <ExpandMore sx={{ color: "#fff", marginLeft: "90px" }} />
          )}
        </NavItem>

        <Collapse in={workspaceOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <NavItem
              to="/smart-search"
              text="Smart Search"
              style={{ fontSize: "0.813rem", fontWeight: 400 }}
            />
            <NavItem
              to="/smart-cma"
              text="Smart CMA"
              style={{ fontSize: "0.813rem", fontWeight: 400 }}
            />
            <NavItem
              to="/smart-reports"
              text="Smart Reports"
              style={{ fontSize: "0.813rem", fontWeight: 400 }}
            />
          </List>
        </Collapse>

        <NavItem to="/contacts" icon={<PersonIcon />} text="Contacts" />

        <ListItemButton>
          <Avatar
            src={profile_pic}
            alt="Profile Pic"
            style={{ marginRight: "15px" }}
          />
          <ListItemText
            primary="Steve Realtor"
            sx={{
              color: "#fff",
              "& .MuiListItemText-primary": {
                fontSize: "0.875rem",
                fontWeight: 300,
              },
            }}
          />
        </ListItemButton>
      </List>
    </Box>
  );
};

export default Navbar;
