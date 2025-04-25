import { Card, CardContent, Typography } from "@mui/material";

interface ProfileProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string | number;
}

const Profile = ({ firstName, lastName, email, phone }: ProfileProps) => {
  return (
    <Card style={{ margin: 20 }}>
      <CardContent>
        <Typography variant="h5">
          {firstName} {lastName}
        </Typography>
        <Typography color="textSecondary">{email}</Typography>
        <Typography color="textSecondary">{phone}</Typography>
      </CardContent>
    </Card>
  );
};

export default Profile;
