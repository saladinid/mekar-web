import React from 'react';
import { IndexRoute, Route } from 'react-router';
import { routerActions } from 'react-router-redux';
import { UserAuthWrapper } from 'redux-auth-wrapper';
import { App, PublicLayout, Home, NotFound } from 'containers';
import getRoutesUtils from 'utils/routes';

// eslint-disable-next-line import/no-dynamic-require
if (typeof System.import === 'undefined') System.import = module => Promise.resolve(require(module));

export default store => {
  const { injectReducerAndRender, permissionsComponent } = getRoutesUtils(store); //  injectReducerAndRender,

  /* Permissions */
  const isAuthenticated = UserAuthWrapper({
    authSelector: state => state.auth.user,
    redirectAction: routerActions.replace,
    wrapperDisplayName: 'UserIsAuthenticated'
  });

  const isNotAuthenticated = UserAuthWrapper({
    authSelector: state => state.auth.user,
    redirectAction: routerActions.replace,
    wrapperDisplayName: 'UserIsNotAuthenticated',
    predicate: user => !user,
    failureRedirectPath: '/',
    allowRedirectBack: false
  });

  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={App}>
      <Route component={PublicLayout}>
        {/* Home (main) route */}
        <IndexRoute component={Home} /> {/* Routes requiring login */}
        {/*
          You can also protect a route like this:
          <Route path="protected-route" {...permissionsComponent(isAuthenticated)(Component)}>
        */}
        <Route {...permissionsComponent(isAuthenticated)()}>
          <Route
            path="loginSuccess"
            getComponent={() => System.import('./containers/Public/LoginSuccess/LoginSuccess')} />
        </Route>

        {/* Routes disallow login */}
        <Route {...permissionsComponent(isNotAuthenticated)()}>
          <Route
            path="register"
            getComponent={() => System.import('./containers/Public/Register/Register')} />
        </Route>

        {/* Routes */}
        {/* <Route
          path="inner"
          getComponent={() => injectReducerAndRender(
            {
              appraisalHistories: System.import('./redux/modules/public/articles')
            },
            System.import('./containers/Public/Inner/Inner'))}
          /* getComponent={() => System.import('./containers/Public/Inner/Inner')} * /
          /> */}
        <Route
          path="articles"
          getComponent={() => injectReducerAndRender(
            {
              appraisalHistories: System.import('./redux/modules/public/articles')
            },
            System.import('./containers/Public/Inner/Articles'))}
          />
        <Route
          path="categories"
          getComponent={() => injectReducerAndRender(
            {
              appraisalHistories: System.import('./redux/modules/public/categories')
            },
            System.import('./containers/Public/Inner/Categories'))}
          />
        <Route
          path="users"
          getComponent={() => injectReducerAndRender(
            {
              appraisalHistories: System.import('./redux/modules/public/users')
            },
            System.import('./containers/Public/Inner/Users'))}
          />
        <Route
          path="details/:id"
          getComponent={() => injectReducerAndRender(
            {
              appraisalHistories: System.import('./redux/modules/public/articles')
            },
            System.import('./containers/Public/Details/Details'))}
          /* getComponent={() => System.import('./containers/Public/Details/Details')} */
          />
        <Route
          path="profile"
          getComponent={() => System.import('./containers/Public/Dashboard/Profile')} />
        <Route
          path="dashboard"
          getComponent={() => injectReducerAndRender(
            {
              appraisalHistories: System.import('./redux/modules/public/articles')
            },
            System.import('./containers/Public/Dashboard/Dashboard'))}
          /* getComponent={() => System.import('./containers/Public/Dashboard/Dashboard')} */
          />
        {/* <Route
          path="articles"
          getComponent={() => injectReducerAndRender(
            {
              appraisalHistories: System.import('./redux/modules/public/articles')
            },
            System.import('./containers/Public/Dashboard/Data/Articles'))}
          /> */}
        <Route
          path="riwayat-taksiran"
          getComponent={() => injectReducerAndRender(
            {
              appraisalHistories: System.import('./redux/modules/public/appraisalHistories')
            },
            System.import('./containers/Public/AppraisalHistory/AppraisalHistory'))} />
        {/* <Route
          path="alamat-cabang-mitra"
          getComponent={() => System.import('./containers/Public/PartnersAddress/PartnersAddress')} />
        <Route
          path="bantuan/faq"
          getComponent={() => System.import('./containers/Public/Help/Faq/Faq')} />
        <Route
          path="bantuan/hubungi-kami"
          getComponent={() => System.import('./containers/Public/Help/ContactUs/ContactUs')} />
        <Route
          path="bantuan/syarat-ketentuan"
          getComponent={() => System.import('./containers/Public/Help/TermsAndConditions/TermsAndConditions')} />
        <Route
          path="login"
          getComponent={() => System.import('./containers/Public/Login/Login')} />
        <Route
          path="media"
          getComponent={() => System.import('./containers/Public/Media/Media')} />
        <Route
          path="mitra"
          getComponent={() => System.import('./containers/Public/Partners/Partners')} />
        <Route
          path="perusahaan/tentang"
          getComponent={() => System.import('./containers/Public/Company/About/About')} />
        <Route
          path="perusahaan/kenapa"
          getComponent={() => System.import('./containers/Public/Company/Why/Why')} />
        <Route
          path="perusahaan/rekan"
          getComponent={() => System.import('./containers/Public/Company/Associate/Associate')} />
        <Route
          path="perusahaan/tim"
          getComponent={() => System.import('./containers/Public/Company/Team/Team')} />
        <Route
          path="perusahaan/karier"
          getComponent={() => System.import('./containers/Public/Company/Career/Career')} />
        <Route
          path="peta-situs"
          getComponent={() => System.import('./containers/Public/SiteMap/SiteMap')} />
        <Route
          path="riwayat-taksiran"
          getComponent={() => injectReducerAndRender(
            {
              appraisalHistories: System.import('./redux/modules/public/appraisalHistories')
            },
            System.import('./containers/Public/AppraisalHistory/AppraisalHistory'))} />
        <Route
          path="testimoni"
          getComponent={() => System.import('./containers/Public/Testimonials/Testimonials')} />*/}
      </Route>

      {/* Catch all route */}
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
