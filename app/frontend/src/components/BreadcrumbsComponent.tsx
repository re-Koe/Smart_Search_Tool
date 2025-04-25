import { Link, useLocation } from "react-router-dom";
import { Breadcrumbs, styled, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const pathNameMap: Record<string, string> = {
  "smart-search": "Smart Search",
  "smart-cma": "Smart CMA",
  "new-cma": "New CMA",
  "smart-reports": "Smart Reports",
  "smart-marketing": "Smart Marketing",
  "new-smart-report": "New Seller Report",
  designs: "Designs",
  listingad: "Listing Ad",
  contacts: "Contacts",
  precon: "Pre-construction E-mail",
  preview: "Preview",
};

const BreadcrumbLink = styled(Link)({
  color: "#555",
  textDecoration: "none",
  "&:hover": {
    textDecoration: "underline",
    color: "#2196f3",
  },
});

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Map each pathname to its route and readable name ahead of time
  const breadcrumbItems = pathnames.map((name, index) => {
    const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
    const isLast = index === pathnames.length - 1;

    // Rename current segment to 'Client Preferences' if it's after 'contacts'
    if (pathnames[index - 1] === "contacts") {
      name = "Client Preferences";
    }

    // Access the readable name with type safety
    const readableName = pathNameMap[name] || name;

    return { name: readableName, routeTo, isLast };
  });

  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
      sx={{ marginTop: "20px" }}
    >
      <BreadcrumbLink to="/">Home</BreadcrumbLink>
      {breadcrumbItems.map(({ name, routeTo, isLast }) =>
        isLast ? (
          <Typography
            color="textPrimary"
            key={name}
            sx={{ fontWeight: "bold", color: "#2196f3" }}
          >
            {name}
          </Typography>
        ) : (
          <BreadcrumbLink key={name} to={routeTo}>
            {name}
          </BreadcrumbLink>
        ),
      )}
    </Breadcrumbs>
  );
};

export default Breadcrumb;
