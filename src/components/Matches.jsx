import MatchedUser from "./MatchedUser";

const Matches = (props) => {
  const { users } = props;
  // just for WiP
  const currentUserId = 6;

  const findUser = (id) => {
    return users.find(({ userId }) => userId === id);
  };

  let currentUser = findUser(currentUserId);

  const matchFinder = (currentUser) => {
    // creates array of users that currentUser has liked.
    let matches = [...currentUser.matches];
    matches.forEach((id, i) => {
      matches[i] = findUser(id);
    });
    // returns array of users that also like currentUser.
    return matches.filter((user) => {
      return user.matches.includes(currentUser.userId) === true;
    });
  };

  return (
    <>
      {matchFinder(currentUser).map((user, i) => {
        return (
          <div className="userCard" key={i}>
            <MatchedUser user={user} />
          </div>
        );
      })}
    </>
  );
};

export default Matches;
