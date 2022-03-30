import { useSelector } from "react-redux";
import { getIndexById } from "../../utils/matching";

const UserImage = (props) => {
	const users = useSelector((state) => state.matching.users);
	const index = getIndexById(props.foreignId, users);
	return (
		<img
			className="w-25 rounded-circle ms-2"
			src={users[index].personalDetails.selfie.image}
			alt="user"
		/>
	);
};

export default UserImage;
