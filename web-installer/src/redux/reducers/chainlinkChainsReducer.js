/* eslint-disable no-prototype-builtins */
/* eslint-disable no-param-reassign */
import _ from 'lodash';
import { combineReducers } from 'redux';
import {
  ADD_CHAIN_CHAINLINK,
  ADD_NODE_CHAINLINK,
  REMOVE_NODE_CHAINLINK,
  REMOVE_CHAIN_CHAINLINK,
  UPDATE_CHAIN_NAME_CHAINLINK,
  RESET_CHAIN_CHAINLINK,
  ADD_REPOSITORY,
  REMOVE_REPOSITORY,
  UPDATE_REPEAT_ALERT,
  UPDATE_TIMEWINDOW_ALERT,
  UPDATE_THRESHOLD_ALERT,
  UPDATE_SEVERITY_ALERT,
  LOAD_CONFIG_CHAINLINK,
  LOAD_REPEAT_ALERTS_CHAINLINK,
  LOAD_TIMEWINDOW_ALERTS_CHAINLINK,
  LOAD_THRESHOLD_ALERTS_CHAINLINK,
  LOAD_SEVERITY_ALERTS_CHAINLINK,
  ADD_DOCKER,
  REMOVE_DOCKER,
} from 'redux/actions/types';

const chainlinkRepeatAlerts = {
  byId: {
  },
  allIds: [],
};

const chainlinkThresholdAlerts = {
  byId: {
    1: {
      name: 'System Is Down',
      identifier: 'system_is_down',
      description:
        'The Node Exporter URL is unreachable therefore the system is declared to be down.',
      adornment: 'Seconds',
      adornment_time: 'Seconds',
      parent_id: '',
      warning: {
        threshold: 0,
        enabled: true,
      },
      critical: {
        threshold: 200,
        repeat: 300,
        enabled: true,
      },
      enabled: true,
    },
    2: {
      name: 'Open File Descriptors Increased',
      identifier: 'open_file_descriptors',
      description: 'Open File Descriptors alerted on based on percentage usage .',
      adornment: '%',
      adornment_time: 'Seconds',
      parent_id: '',
      warning: {
        threshold: 85,
        enabled: true,
      },
      critical: {
        threshold: 95,
        repeat: 300,
        enabled: true,
      },
      enabled: true,
    },
    3: {
      name: 'System CPU Usage Increased',
      identifier: 'system_cpu_usage',
      description: 'System CPU alerted on based on percentage usage.',
      adornment: '%',
      adornment_time: 'Seconds',
      parent_id: '',
      warning: {
        threshold: 85,
        enabled: true,
      },
      critical: {
        threshold: 95,
        repeat: 300,
        enabled: true,
      },
      enabled: true,
    },
    4: {
      name: 'System storage usage increased',
      identifier: 'system_storage_usage',
      description: 'System Storage alerted on based on percentage usage.',
      adornment: '%',
      adornment_time: 'Seconds',
      parent_id: '',
      warning: {
        threshold: 85,
        enabled: true,
      },
      critical: {
        threshold: 95,
        repeat: 300,
        enabled: true,
      },
      enabled: true,
    },
    5: {
      name: 'System RAM usage increased',
      identifier: 'system_ram_usage',
      description: 'System RAM alerted on based on percentage usage.',
      adornment: '%',
      adornment_time: 'Seconds',
      parent_id: '',
      warning: {
        threshold: 85,
        enabled: true,
      },
      critical: {
        threshold: 95,
        repeat: 300,
        enabled: true,
      },
      enabled: true,
    },
  },
  allIds: ['1', '2', '3', '4', '5'],
};

const chainlinkTimeWindowAlerts = {
  byId: {
  },
  allIds: [],
};

const chainlinkSeverityAlerts = {
  byId: {
  },
  allIds: [],
};

// Reducers to add and remove chainlink node configurations from global state
function nodesById(state = {}, action) {
  switch (action.type) {
    case ADD_NODE_CHAINLINK:
      return {
        ...state,
        [action.payload.id]: action.payload,
      };
    case REMOVE_NODE_CHAINLINK:
      return _.omit(state, action.payload.id);
    default:
      return state;
  }
}

// Reducers to add and remove from list of all chainlink nodes
function allNodes(state = [], action) {
  switch (action.type) {
    case ADD_NODE_CHAINLINK:
      if (state.includes(action.payload.id)) {
        return state;
      }
      return state.concat(action.payload.id);
    case REMOVE_NODE_CHAINLINK:
      return state.filter((config) => config !== action.payload.id);
    default:
      return state;
  }
}

const ChainlinkNodesReducer = combineReducers({
  byId: nodesById,
  allIds: allNodes,
});

function chainlinkChainsById(state = {}, action) {
  switch (action.type) {
    case ADD_CHAIN_CHAINLINK:
      return {
        ...state,
        [action.payload.id]: {
          id: action.payload.id,
          chain_name: action.payload.chain_name,
          nodes: [],
          repositories: [],
          dockers: [],
          repeatAlerts: chainlinkRepeatAlerts,
          timeWindowAlerts: chainlinkTimeWindowAlerts,
          thresholdAlerts: chainlinkThresholdAlerts,
          severityAlerts: chainlinkSeverityAlerts,
        },
      };
    case UPDATE_CHAIN_NAME_CHAINLINK:
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          chain_name: action.payload.chain_name,
        },
      };
    case REMOVE_CHAIN_CHAINLINK:
      return _.omit(state, action.payload.id);
    case ADD_NODE_CHAINLINK:
      if (state[action.payload.parent_id].nodes.includes(action.payload.id)) {
        return state;
      }
      return {
        ...state,
        [action.payload.parent_id]: {
          ...state[action.payload.parent_id],
          nodes: state[action.payload.parent_id].nodes.concat(action.payload.id),
        },
      };
    case REMOVE_NODE_CHAINLINK:
      return {
        ...state,
        [action.payload.parent_id]: {
          ...state[action.payload.parent_id],
          nodes: state[action.payload.parent_id].nodes.filter(
            (config) => config !== action.payload.id,
          ),
        },
      };
    case ADD_REPOSITORY:
      // Since this is common for multiple chains and general settings
      // it must be conditional. Checking if parent id exists is enough.
      if (state[action.payload.parent_id] === undefined) {
        return state;
      }
      if (state[action.payload.parent_id].repositories.includes(action.payload.id)) {
        return state;
      }
      return {
        ...state,
        [action.payload.parent_id]: {
          ...state[action.payload.parent_id],
          repositories: state[action.payload.parent_id].repositories.concat(action.payload.id),
        },
      };
    case REMOVE_REPOSITORY:
      // Since this is common for multiple chains and general settings
      // it must be conditional. Checking if parent id exists is enough.
      if (state[action.payload.parent_id] === undefined) {
        return state;
      }
      return {
        ...state,
        [action.payload.parent_id]: {
          ...state[action.payload.parent_id],
          repositories: state[action.payload.parent_id].repositories.filter(
            (config) => config !== action.payload.id,
          ),
        },
      };
    case ADD_DOCKER:
      // Since this is common for multiple chains and general settings
      // it must be conditional. Checking if parent id exists is enough.
      if (state[action.payload.parent_id] === undefined) {
        return state;
      }
      if (state[action.payload.parent_id].dockers.includes(action.payload.id)) {
        return state;
      }
      return {
        ...state,
        [action.payload.parent_id]: {
          ...state[action.payload.parent_id],
          dockers: state[action.payload.parent_id].dockers.concat(action.payload.id),
        },
      };
    case REMOVE_DOCKER:
      // Since this is common for multiple chains and general settings
      // it must be conditional. Checking if parent id exists is enough.
      if (state[action.payload.parent_id] === undefined) {
        return state;
      }
      return {
        ...state,
        [action.payload.parent_id]: {
          ...state[action.payload.parent_id],
          dockers: state[action.payload.parent_id].dockers.filter(
            (config) => config !== action.payload.id,
          ),
        },
      };
    case UPDATE_REPEAT_ALERT:
      // Since this is common for multiple chains and general settings
      // it must be conditional. Checking if parent id exists is enough.
      if (state[action.payload.parent_id] === undefined) {
        return state;
      }
      return {
        ...state,
        [action.payload.parent_id]: {
          ...state[action.payload.parent_id],
          repeatAlerts: {
            ...state[action.payload.parent_id].repeatAlerts,
            byId: {
              ...state[action.payload.parent_id].repeatAlerts.byId,
              [action.payload.id]: action.payload.alert,
            },
          },
        },
      };
    case LOAD_REPEAT_ALERTS_CHAINLINK:
      return {
        ...state,
        [action.payload.parent_id]: {
          ...state[action.payload.parent_id],
          repeatAlerts: action.payload.alerts,
        },
      };
    case UPDATE_TIMEWINDOW_ALERT:
      // Since this is common for multiple chains and general settings
      // it must be conditional. Checking if parent id exists is enough.
      if (state[action.payload.parent_id] === undefined) {
        return state;
      }
      return {
        ...state,
        [action.payload.parent_id]: {
          ...state[action.payload.parent_id],
          timeWindowAlerts: {
            ...state[action.payload.parent_id].timeWindowAlerts,
            byId: {
              ...state[action.payload.parent_id].timeWindowAlerts.byId,
              [action.payload.id]: action.payload.alert,
            },
          },
        },
      };
    case LOAD_TIMEWINDOW_ALERTS_CHAINLINK:
      return {
        ...state,
        [action.payload.parent_id]: {
          ...state[action.payload.parent_id],
          timeWindowAlerts: action.payload.alerts,
        },
      };
    case UPDATE_THRESHOLD_ALERT:
      // Since this is common for multiple chains and general settings
      // it must be conditional. Checking if parent id exists is enough.
      if (state[action.payload.parent_id] === undefined) {
        return state;
      }
      return {
        ...state,
        [action.payload.parent_id]: {
          ...state[action.payload.parent_id],
          thresholdAlerts: {
            ...state[action.payload.parent_id].thresholdAlerts,
            byId: {
              ...state[action.payload.parent_id].thresholdAlerts.byId,
              [action.payload.id]: action.payload.alert,
            },
          },
        },
      };
    case LOAD_THRESHOLD_ALERTS_CHAINLINK:
      return {
        ...state,
        [action.payload.parent_id]: {
          ...state[action.payload.parent_id],
          thresholdAlerts: action.payload.alerts,
        },
      };
    case UPDATE_SEVERITY_ALERT:
      // Since this is common for multiple chains and general settings
      // it must be conditional. Checking if parent id exists is enough.
      if (state[action.payload.parent_id] === undefined) {
        return state;
      }
      return {
        ...state,
        [action.payload.parent_id]: {
          ...state[action.payload.parent_id],
          severityAlerts: {
            ...state[action.payload.parent_id].severityAlerts,
            byId: {
              ...state[action.payload.parent_id].severityAlerts.byId,
              [action.payload.id]: action.payload.alert,
            },
          },
        },
      };
    case LOAD_SEVERITY_ALERTS_CHAINLINK:
      return {
        ...state,
        [action.payload.parent_id]: {
          ...state[action.payload.parent_id],
          severityAlerts: action.payload.alerts,
        },
      };
    default:
      return state;
  }
}

function allChainlinkChains(state = [], action) {
  switch (action.type) {
    case ADD_CHAIN_CHAINLINK:
      if (state.includes(action.payload.id)) {
        return state;
      }
      return state.concat(action.payload.id);
    case REMOVE_CHAIN_CHAINLINK:
      return state.filter((config) => config !== action.payload.id);
    default:
      return state;
  }
}

const ChainlinkChainsReducer = combineReducers({
  byId: chainlinkChainsById,
  allIds: allChainlinkChains,
});

function CurrentChainlinkChain(state = '', action) {
  switch (action.type) {
    case ADD_CHAIN_CHAINLINK:
      return action.payload.id;
    case RESET_CHAIN_CHAINLINK:
      return '';
    case LOAD_CONFIG_CHAINLINK:
      return action.payload.id;
    default:
      return state;
  }
}

export {
  ChainlinkNodesReducer,
  ChainlinkChainsReducer,
  CurrentChainlinkChain,
  chainlinkRepeatAlerts,
  chainlinkThresholdAlerts,
  chainlinkTimeWindowAlerts,
  chainlinkSeverityAlerts,
};
