import { Dispatch } from "react";

export interface StatsModel {
  always: number;
  most: number;
  half: number;
  rarely: number;
  never: number;
}
export interface AnswersModel {
  response_count: number;
  answer_stats: StatsModel;
}

export interface LoadAnswersAction {
  readonly type: "ON_LOAD_ANSWERS";
  payload: AnswersModel;
}

export interface ErrorAnswerAction {
  readonly type: "ON_ERROR";
  payload: any;
}

export type AnswersAction = LoadAnswersAction | ErrorAnswerAction;

export const onSendAnswer = (slug: string) => {
  return async (dispatch: Dispatch<AnswersAction>) => {
    try {
      const res = await fetch("https://api.jsonbin.io/b/61927bef0ddbee6f8b0bd64c?answer=" + slug);
      const response = (await res.json()) as AnswersModel;

      if (!response) {
        return dispatch({
          type: "ON_ERROR",
          payload: "Login issue with API",
        });
      } else {
        return dispatch({
          type: "ON_LOAD_ANSWERS",
          payload: response,
        });
      }
    } catch (error) {
      return dispatch({
        type: "ON_ERROR",
        payload: error,
      });
    }
  };
};
