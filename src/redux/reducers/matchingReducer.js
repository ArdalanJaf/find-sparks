import { matchingInitialState } from "../matchingInitialState";
import { types } from "../types";
import { getIndexById } from "../../utils/matching";

export function matchingReducer(state = matchingInitialState, action) {
  switch (action.type) {
    case types.ADD_USER:
      const users = [...state.users];
      users.push(action.payload);
      return { ...state, users };

    case types.ADD_TO_SEEN: {
      const users = [...state.users];
      const currentUser =
        users[getIndexById(action.payload.currentUserId, users)];
      if (!currentUser.seen.includes(action.payload.seenUserId)) {
        currentUser.seen.push(action.payload.seenUserId);
      }
      console.log(currentUser.seen);

    case types.ADD_TO_LIKES: {
      const { user, currentUser } = action.payload;
      const users = [...state.users];
      currentUser.likes.push(user.userId);

      return { ...state, users };
    }

    case types.UPDATE_MATCHES: {
      const { seenUserId, currentUserId } = action.payload;

      const seenUserIndex = getIndexById(seenUserId, state.users);
      const currentUserIndex = getIndexById(currentUserId, state.users);

      if (
        state.users[seenUserIndex].likes.includes(currentUserId) &&
        state.users[currentUserIndex].likes.includes(seenUserId)
      ) {
        const users = [...state.users];

        users[seenUserIndex].matches.push(currentUserId);
        users[currentUserIndex].matches.push(seenUserId);

        return { ...state, users };
      } else return state;
    }

    case types.BLOCK_USER: {
      console.log(state);
      const users = [...state.users];

      console.log(action.payload, users, users[getIndexById(1, users)]);
      const index = getIndexById(Number(action.payload), users);
      console.log(index, "i");

      users[index].blocked.push(Number(action.payload));
      return { ...state, users };
    }

    default:
      return state;
  }
}
