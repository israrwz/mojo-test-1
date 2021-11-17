import { AnswersAction, AnswersModel } from "../actions/AnswersActions";

type AnswersState = {
  answers: AnswersModel;
  error: string | undefined;
};

const initialState = {
  answers: {} as AnswersModel,
  error: undefined,
};

const AnswersReducer = (state: AnswersState = initialState, action: AnswersAction) => {
  switch (action.type) {
    case "ON_LOAD_ANSWERS":
      return {
        ...state,
        answers: action.payload,
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

export { AnswersReducer };
