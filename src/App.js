import { messages as mockMessages } from "./mock/mockMessages";
import { users as mockUsers, currentUserId } from "./mock";
import Interface from "./components/Interface";
import { useEffect, useState } from "react";
import { getIndexById, getMessageIndexById } from "./utils/matching";
import { storeData, getData } from "./storage";
import { getUniqueId } from "./utils/general";

const App = () => {
  const [users, setUsers] = useState(mockUsers);
  const [messages, setMessages] = useState(mockMessages);
  const [userId, setUserId] = useState(getUniqueId(16));
  console.log(userId);

  //  set the state from the disk
  useEffect(() => {
    const data = getData();
    if (data.users && data.messages) {
      setUsers(data.users);
      setMessages(data.messages);
    }
  }, []);
  // when the state changes, save the changes to the disk
  useEffect(() => {
    storeData("users", users);
  }, [users]);
  useEffect(() => {
    storeData("messages", messages);
  }, [messages]);

  // Adds the current user ID to the blocked array in the data
  const blockUserId = (fId) => {
    const foreignUserId = Number(fId);
    const usersCopy = [...users];
    usersCopy[getIndexById(currentUserId, users)].blocked.push(foreignUserId);
    setUsers(usersCopy);
  };

  const addMessage = (payload) => {
    const copy = [...messages];
    copy.push(payload);
    setMessages(copy);
	console.log(copy)
  };

  const onLikeUpdate = (user, boolean) => {
	  addMessage({
		toUserId: user.userId,
		fromUserId: userId,
		messageId: getUniqueId(16),
		content: "",
		sendTimestamp: 0,
		read: false,
		blocked: false,
	})
    // const usersCopy = [...users];
    // if (boolean) {
    //   usersCopy.currentUser.likes.push(user.userId);
    //   usersCopy.currentUser.seen.push(user.userId);
    // }
    // check if users Match -> add respective IDs in respective {match}
  };

  const deleteMessage = (messageId) => {
    const messagesCopy = [...messages];
    const index = getMessageIndexById(messageId, messagesCopy);
    messagesCopy.splice(index, 1);
    setMessages(messagesCopy);
  };

  const addUser = async (newUser) => {
    console.log(newUser);
    const usersCopy = [...users];
    // const coords = await getLngLat(newUser.personalDetails.location.postCode);
    // newUser.personalDetails.location.longitude = coords.longitude;
    // newUser.personalDetails.location.latitude = coords.latitude;
    usersCopy.push(newUser);
    console.log(usersCopy);
    setUsers(usersCopy);
  };

  return (
    <>
      <button
        onClick={() => {
          localStorage.clear();
        }}
      >
        Clear localStorage
      </button>
      <Interface
        users={users}
        messages={messages}
        addMessage={addMessage}
        onLikeUpdate={onLikeUpdate}
        blockUserId={blockUserId}
        addUser={addUser}
        newUserId={userId}
      />
    </>
  );
};

export default App;
