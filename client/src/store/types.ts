export enum ActionTypes {
  FETCH_SURVEYS = 'FETCH_SURVEYS',
  FETCH_USER = 'FETCH_USER'
}

export interface AuthAction {
  type: ActionTypes.FETCH_USER;
  payload: boolean | object | null;
}

export interface SurveyAction {
  type: ActionTypes.FETCH_SURVEYS;
  payload: boolean | any[];
}
