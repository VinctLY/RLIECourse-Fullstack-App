import useAuth from "../../hooks/useAuth";

const Profile = () => {
	const auth = useAuth();

	console.log(auth);

	return <div>Profile</div>;
};

export default Profile;
