import ReactGA from 'react-ga';

export const initGA = () => {
  ReactGA.initialize('456685443'); 
};

export const logPageView = () => {
  ReactGA.pageview(window.location.pathname + window.location.search);
};