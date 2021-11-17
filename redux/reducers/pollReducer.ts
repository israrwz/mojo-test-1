import { PollAction, PollModel } from "../actions/pollActions";

type PollState = {
  poll: PollModel;
  error: string | undefined;
};

const initialState = {
  poll: {} as PollModel,
  error: undefined,
};

const PollReducer = (state: PollState = initialState, action: PollAction) => {
  switch (action.type) {
    case "ON_LOAD_POLL":
      return {
        ...state,
        poll: action.payload,
      };
    case "ON_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export { PollReducer };
