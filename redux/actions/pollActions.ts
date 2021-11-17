import { Dispatch } from "react";

export interface Options {
  slug: string;
  text: string;
}
export interface PollModel {
  id: string;
  response_count: number;
  question_text: string;
  answers_options: Array<Options>;
}

export interface LoadPollAction {
  readonly type: "ON_LOAD_POLL";
  payload: PollModel;
}

export interface ErrorAction {
  readonly type: "ON_ERROR";
  payload: any;
}

const MOCK_DATA: PollModel = {
  id: "test-id",
  response_count: 1000,
  question_text: "MOCK DATA (API IS BLOCKED): How often do you watch porn while masturbating?",
  answers_options: [
    { slug: "test1", text: "This is a sample text 1." },
    { slug: "test2", text: "This is a sample text 2." },
    { slug: "test3", text: "This is a sample text 3." },
    { slug: "test4", text: "This is a sample text 4." },
    { slug: "test5", text: "This is a sample text 5." },
  ],
};
export type PollAction = LoadPollAction | ErrorAction;

// we need to dispatch action
export const onLoadPoll = () => {
  return async (dispatch: Dispatch<PollAction>) => {
    try {
      const res = await fetch("https://api.jsonbin.io/b/619254c40ddbee6f8b0bc2af");
      const response = (await res.json()) as PollModel;

      if (!response) {
        dispatch({
          type: "ON_ERROR",
          payload: "Login issue with API",
        });
      } else if (!response.id) {
        dispatch({
          type: "ON_LOAD_POLL",
          payload: MOCK_DATA,
        });
      } else {
        dispatch({
          type: "ON_LOAD_POLL",
          payload: response,
        });
      }
    } catch (error) {
      dispatch({
        type: "ON_ERROR",
        payload: error,
      });
    }
  };
};
