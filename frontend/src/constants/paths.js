// Path constants - Auto-generated
export const PATHS = {
  // Authentication routes
  AUTH: {
    LOGIN: PATHS.AUTH.LOGIN,
    REGISTER: PATHS.AUTH.REGISTER,
    LOGOUT: '/logout',
    PROFILE: PATHS.AUTH.PROFILE,
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: '/reset-password'
  },
  
  // Application routes
  APP: {
    HOME: '/',
    DASHBOARD: PATHS.APP.DASHBOARD,
    SETTINGS: PATHS.APP.SETTINGS,
    HELP: '/help',
    ABOUT: '/about'
  },
  
  // API endpoints
  API: {
    BASE: '/api',
    VERSION: 'v1',
    REGISTER: {
    POST: getApiPath("register", "GET")
    },
    LOGIN: {
    POST: getApiPath("login", "GET")
    },
    PASSWORD_RESET: {
    POST: getApiPath("password_reset", "GET")
    },
    DATA: {
    GET: getApiPath("data", "GET")
    POST: getApiPath("data", "GET")
    PUT: getApiPath("data/{id}", "GET")
    DELETE: getApiPath("data/{id}", "GET")
    },
  },
  
  // Asset paths
  ASSETS: {
    IMAGES: '/assets/images',
    ICONS: '/assets/icons',
    STYLES: '/assets/styles',
    FONTS: '/assets/fonts'
  }
};

// Helper functions for path building
export const buildPath = (basePath, ...segments) => {
  return [basePath, ...segments].join('/').replace(/\/+/g, '/');
};

export const buildApiPath = (endpoint, params = {}) => {
  let path = `${PATHS.API.BASE}${endpoint}`;
  
  // Replace path parameters
  Object.keys(params).forEach(key => {
    path = path.replace(`{${key}}`, params[key]);
  });
  
  return path;
};

export const buildAppPath = (route, params = {}) => {
  let path = route;
  
  // Replace path parameters
  Object.keys(params).forEach(key => {
    path = path.replace(`:${key}`, params[key]);
  });
  
  return path;
};

// Environment-specific path helpers
export const getApiBaseUrl = () => {
  return import.meta.env.VITE_API_URL || 'http://localhost:8000';
};

export const getAppBaseUrl = () => {
  return import.meta.env.VITE_APP_URL || 'http://localhost:3000';
};

export const getCdnUrl = () => {
  return import.meta.env.VITE_CDN_URL || '/assets';
};
