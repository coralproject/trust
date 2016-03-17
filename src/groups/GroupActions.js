import _ from 'lodash';
import {clamp} from 'components/utils/math';
import {authXenia} from 'auth/AuthActions';

export const QUERYSET_SELECTED = 'QUERYSET_SELECTED';
export const QUERYSET_REQUEST = 'QUERYSET_REQUEST'; // request data for a single queryset
export const QUERYSETS_REQUEST = 'QUERYSETS_REQUEST';
export const QUERYSETS_REQUEST_FAILURE = 'QUERYSETS_REQUEST_FAILURE';
export const QUERYSET_REQUEST_FAILURE = 'QUERYSET_REQUEST_FAILURE';
export const QUERYSETS_RECEIVED = 'QUERYSETS_RECEIVED';
export const QUERYSET_RECEIVED = 'QUERYSET_RECEIVED';

export const REQUEST_FILTER_RANGES = 'REQUEST_FILTER_RANGES';
export const RECEIVE_FILTER_RANGES = 'RECEIVE_FILTER_RANGES';

export const QUERYSET_SAVE_SUCCESS = 'QUERYSET_SAVE_SUCCESS';
export const QUERYSET_SAVE_FAILED = 'QUERYSET_SAVE_FAILED';
export const CREATE_QUERY = 'CREATE_QUERY';

export const SUBMIT_CUSTOM_QUERY = 'SUBMIT_CUSTOM_QUERY';


export const selectQueryset = (queryset) => {
  return {
    type: QUERYSET_SELECTED,
    queryset
  };
};

export const requestQueryset = (queryset) => {
  return {
    type: QUERYSET_REQUEST,
    queryset
  };
};

export const requestQuerysets = () => {
  return {
    type: QUERYSETS_REQUEST
  };
};

export const receiveQuerysets = (querysets) => {
  return {
    type: QUERYSETS_RECEIVED,
    querysets
  };
};

export const requestQuerysetsFailure = (err) => {
  return {
    type: QUERYSETS_REQUEST_FAILURE,
    err
  };
};

export const fetchQuerysetsIfNotFetched = () => {
  return (dispatch, getState) => {
    if (! getState().groups.loading) {
      return dispatch(fetchQuerysets());
    }
    return {
      type: 'NOOP'
    };
  };
};

// get deep list of query_sets
export const fetchQuerysets = () => {
  return (dispatch) => {

    dispatch(requestQuerysets());

    fetch(window.xeniaHost + '/1.0/query', authXenia())
      .then(response => response.json())
      .then(querysets => dispatch(receiveQuerysets(querysets)))
      .catch(err => dispatch(requestQuerysetsFailure(err)));
  };
};

export const requestQuerysetFailure = (err) => {
  return {
    type: QUERYSET_REQUEST_FAILURE,
    err
  };
};

export const receiveQueryset = (data) => {
  return {
    type: QUERYSET_RECEIVED,
    data
  };
};

// execute a query_set
export const fetchQueryset = (querysetName) => {
  return (dispatch) => {
    dispatch(requestQueryset(querysetName));

    fetch(window.xeniaHost + '/1.0/exec/' + querysetName, authXenia())
      .then(response => response.json())
      .then(queryset => dispatch(receiveQueryset(queryset)))
      .catch(err => dispatch(requestQuerysetFailure(err)));
  };
};

export const executeCustomQueryset = queryset => {
  return {
    type: 'EXECUTE_CUSTOM_QUERYSET',
    queryset
  };
};


export const createQuery = (query) => {
  return {
    type: CREATE_QUERY,
    query
  };
};

export const makeQueryFromState = (/*type*/) => {
  return (dispatch, getState) => {
    console.log('function that calls async');
    // make a query from the current state
    const filterState = getState().filters;
    const filters = filterState.filterList.map(key => filterState[key]);

    let matches = _.flatten(_.map(filters, filter => {
      let dbField;
      if (filterState.breakdown === 'author') {
        dbField = _.template(filter.template)({dimension: 'author.' + filterState.specificBreakdown});
      } else if (filterState.breakdown === 'section') {
        dbField = _.template(filter.template)({dimension: 'section.' + filterState.specificBreakdown});
      } else { // all
        dbField = _.template(filter.template)({dimension: 'all'});
      }

      var matches = [];

      // Only create match statements for non-defaults
      if (filter.min !== filter.userMin) {
        matches.push( {$match: {[dbField]: {$gte: clamp(filter.userMin, filter.min, filter.max)}}});
      }

      if (filter.max !== filter.userMax) {
        matches.push( {$match: {[dbField]: {$lte: clamp(filter.userMax, filter.min, filter.max)}}});
      }

      return matches;

    }));

    let query = {
      name: 'user_search',
      desc: 'user search currently. this is going to be more dynamic in the future',
      pre_script: '',
      pst_script: '',
      params: [],
      queries: [
        {
          name: 'user_search',
          type: 'pipeline',
          collection: 'user_statistics',
          commands: [
            ...matches,
            // {$sort: {'statistics.comments.all.all.count': -1}},
            {$skip: 0},
            {$limit: 20}
            // {
            //   $redact: {
            //     $cond: {
            //       if: {
            //         $eq: [{$ifNull: ['$reply_comments', true]}, true]
            //       },
            //       then: '$$DESCEND',
            //       else: '$$PRUNE'
            //     }
            //   }
            // }
          ],
          return: true
        }
      ],
      enabled: true
    };

    doMakeQueryFromStateAsync(query, dispatch);

  };
};

// yikes. lots of this code is replicated above.
// time to make a xenia library
export const saveQueryFromState = (queryName, modDescription) => {
  return (dispatch, getState) => {
    console.log('function that calls async');
    // make a query from the current state
    const filterState = getState().filters;
    const filters = filterState.filterList.map(key => filterState[key]);

    let matches = _.flatten(_.map(filters, filter => {
      let dbField;
      if (filterState.breakdown === 'author') {
        dbField = _.template(filter.template)({dimension: 'author.' + filterState.specificBreakdown});
      } else if (filterState.breakdown === 'section') {
        dbField = _.template(filter.template)({dimension: 'section.' + filterState.specificBreakdown});
      } else { // all
        dbField = _.template(filter.template)({dimension: 'all'});
      }

      var matches = [];

      // Only create match statements for non-defaults
      if (filter.min !== filter.userMin) {
        matches.push( {$match: {[dbField]: {$gte: clamp(filter.userMin, filter.min, filter.max)}}});
      }

      if (filter.max !== filter.userMax) {
        matches.push( {$match: {[dbField]: {$lte: clamp(filter.userMax, filter.min, filter.max)}}});
      }

      return matches;

    }));

    let query = {
      name: queryName,
      desc: modDescription,
      pre_script: '',
      pst_script: '',
      params: [],
      queries: [
        {
          name: queryName,
          type: 'pipeline',
          collection: 'user_statistics',
          commands: [
            ...matches,
            {$skip: 0},
            {$limit: 20}
          ],
          return: true
        }
      ],
      enabled: true
    };

    doPutQueryFromState(query, dispatch);

  };
};

const doPutQueryFromState = (query, dispatch) => {
  const url = window.xeniaHost + '/1.0/query';
  let init = authXenia('PUT');
  init.body = JSON.stringify(query);

  fetch(url, init)
    .then(() => { // if response.status < 400
      dispatch({type: QUERYSET_SAVE_SUCCESS});
    }).catch(error => {
      dispatch({type: QUERYSET_SAVE_FAILED, error});
    });
};

const doMakeQueryFromStateAsync = _.debounce((query, dispatch)=>{
  console.log('actual async');
  dispatch(requestQueryset());
  dispatch(createQuery(query));

  const url = window.xeniaHost + '/1.0/exec';

  var init = authXenia('POST');
  init.body = JSON.stringify(query);

  fetch(url, init)
    .then(response => response.json())
    .then(json => {
      dispatch(receiveQueryset(json));
    })
    .catch(err => {
      dispatch(dataExplorationFetchError(err));
    });
}, 1000);