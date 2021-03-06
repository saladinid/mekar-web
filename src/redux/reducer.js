// import multireducer from 'multireducer';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-connect';
import { reducer as form } from 'redux-form';
import auth from './modules/auth';
import notifs from './modules/notifs';
import info from './modules/info';
import branchs from './modules/public/repository';
import appraisalHistories from './modules/public/appraisalHistories';
import articles from './modules/public/articles';
import categories from './modules/public/categories';
import users from './modules/public/users';

export default function createReducers(asyncReducers) {
  return {
    routing: routerReducer,
    reduxAsyncConnect,
    online: (v = true) => v,
    form,
    notifs,
    auth,
    info,
    branchs,
    appraisalHistories,
    articles,
    categories,
    users,
    ...asyncReducers
  };
}
