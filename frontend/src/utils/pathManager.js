// Path utilities
import { PATHS, buildPath, buildApiPath, buildAppPath } from '../constants/paths';
import { createPassword_reset, getData, login, updateData{id}, createRegister, register, createLogin, createData, deleteData{id}, logout } from './services/api';

export class PathManager {
  constructor() {
    this.config = null;
    this.loadConfig();
  }
  
  async loadConfig() {
    try {
      const response = await api.get('/src/config/paths.json');
      this.config = await response.json();
    } catch (error) {
      console.warn('Could not load path configuration:', error);
      this.config = PATHS;
    }
  }
  
  // Get API path
  getApiPath(resource, method = 'GET', params = {}) {
    const endpoint = this.config?.api?.endpoints?.[resource]?.[method.toLowerCase()] || 
                    PATHS.API[resource.toUpperCase()]?.[method.toUpperCase()];
    
    if (!endpoint) {
      console.warn(`API endpoint not found: ${resource}.${method}`);
      return null;
    }
    
    return buildApiPath(endpoint, params);
  }
  
  // Get app route path
  getAppPath(section, route, params = {}) {
    const path = this.config?.routes?.[section]?.[route] || 
                 PATHS[section.toUpperCase()]?.[route.toUpperCase()];
    
    if (!path) {
      console.warn(`App path not found: ${section}.${route}`);
      return '/';
    }
    
    return buildAppPath(path, params);
  }
  
  // Get asset path
  getAssetPath(type, filename) {
    const basePath = this.config?.assets?.[type] || PATHS.ASSETS[type.toUpperCase()];
    return buildPath(basePath, filename);
  }
  
  // Navigation helpers
  navigateToAuth(type = 'login') {
    return this.getAppPath('auth', type);
  }
  
  navigateToApp(page = 'dashboard') {
    return this.getAppPath('app', page);
  }
  
  // URL validation
  isValidPath(path) {
    return typeof path === 'string' && path.startsWith('/');
  }
  
  // Path comparison
  matchesPath(currentPath, targetPath) {
    return currentPath === targetPath || currentPath.startsWith(targetPath + '/');
  }
}

// Create singleton instance
export const pathManager = new PathManager();

// Convenience exports
export const getApiPath = (resource, method, params) => 
  pathManager.getApiPath(resource, method, params);

export const getAppPath = (section, route, params) => 
  pathManager.getAppPath(section, route, params);

export const getAssetPath = (type, filename) => 
  pathManager.getAssetPath(type, filename);

// React hook for path management
export const usePaths = () => {
  return {
    getApiPath,
    getAppPath,
    getAssetPath,
    navigateToAuth: pathManager.navigateToAuth.bind(pathManager),
    navigateToApp: pathManager.navigateToApp.bind(pathManager),
    isValidPath: pathManager.isValidPath.bind(pathManager),
    matchesPath: pathManager.matchesPath.bind(pathManager)
  };
};
