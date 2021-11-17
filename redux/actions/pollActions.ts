// import axios from 'axios';
import { Dispatch } from 'react';
// import { BASE_URL } from '../../utils';

export interface PollModel {
  id: string;
  response_count: number;
  question_text: string;
  answers_options: [{slug:string, text:string}];
}

export interface LoadPollAction {
  readonly type: 'ON_LOAD_POLL';
  payload: PollModel;
}

export interface ErrorAction {
  readonly type: 'ON_ERROR';
  payload: any;
}

export type PollAction = LoadPollAction | ErrorAction;

// we need to dispatch action
export const onLoadPoll = () => {
  return async (dispatch: Dispatch<PollAction>) => {
    try {
      const res = await fetch("https://api.jsonbin.io/b/619254c40ddbee6f8b0bc2af");
      const response = await res.json() as PollModel;


      if (!response) {
        dispatch({
          type: 'ON_ERROR',
          payload: 'Login issue with API',
        });
      } else {
        dispatch({
          type: 'ON_LOAD_POLL',
          payload: response,
        });
      }
    } catch (error) {
      dispatch({
        type: 'ON_ERROR',
        payload: error,
      });
    }
  };
};