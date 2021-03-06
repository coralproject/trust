
/**
 * Module dependencies
 */

import cloneDeep from 'lodash/lang/cloneDeep';

/**
 * Action names
 */

export const FETCH_SUBMISSIONS_REQUEST = 'FETCH_SUBMISSIONS_REQUEST';
export const FETCH_SUBMISSIONS_SUCCESS = 'FETCH_SUBMISSIONS_SUCCESS';
export const FETCH_SUBMISSIONS_FAILED = 'FETCH_SUBMISSIONS_FAILED';

export const SET_ACTIVE_SUBMISSION = 'SET_ACTIVE_SUBMISSION';
export const UPDATE_ACTIVE_SUBMISSION = 'UPDATE_ACTIVE_SUBMISSION';

export const UPDATE_WIDGET = 'UPDATE_WIDGET';
export const MOVE_WIDGET = 'MOVE_WIDGET';

export const FETCH_FORM_REQUEST = 'FETCH_FORM_REQUEST';
export const FETCH_FORM_SUCCESS = 'FETCH_FORM_SUCCESS';
export const FETCH_FORM_FAILURE = 'FETCH_FORM_FAILURE';
export const APPEND_FORM_WIDGET = 'APPEND_FORM_WIDGET';
export const DELETE_FORM_WIDGET = 'DELETE_FORM_WIDGET';
export const DUPLICATE_FORM_WIDGET = 'DUPLICATE_FORM_WIDGET';

export const CREATE_INIT_FORM = 'CREATE_INIT_FORM';
export const FORM_CREATED = 'FORM_CREATED';
export const FORM_CREATION_FAILURE = 'FORM_CREATION_FAILURE';
export const UPDATE_FORM = 'UPDATE_FORM';
export const UPDATE_FORM_SETTINGS = 'UPDATE_FORM_SETTINGS';
export const UPDATE_FORM_HEADER = 'UPDATE_FORM_HEADER';
export const UPDATE_FORM_FOOTER = 'UPDATE_FORM_FOOTER';
export const UPDATE_FORM_FINISHED_SCREEN = 'UPDATE_FORM_FINISHED_SCREEN';

export const FETCH_FORMS_REQUEST = 'FETCH_FORMS_REQUEST';
export const FETCH_FORMS_SUCCESS = 'FETCH_FORMS_SUCCESS';
export const FETCH_FORMS_FAILURE = 'FETCH_FORMS_FAILURE';

export const REQUEST_EDIT_FORM_ACCESS = 'REQUEST_EDIT_FORM_ACCESS';
export const EDIT_FORM_ACCEPTED = 'FORM_EDIT_FORM_ACCEPTED';
export const EDIT_FORM_DENIED = 'EDIT_FORM_ACCEPTED';
export const EDIT_FORM_LEAVE = 'EDIT_FORM_LEAVE';

export const FETCH_FORM_GALLERY_REQUEST = 'FETCH_FORM_GALLERY_REQUEST';
export const FETCH_FORM_GALLERY_SUCCESS = 'FETCH_FORM_GALLERY_SUCCESS';
export const FETCH_FORM_GALLERY_FAILURE = 'FETCH_FORM_GALLERY_FAILURE';

export const FORM_STATUS_UPDATED = 'FORM_STATUS_UPDATED';
export const FORM_STATUS_UPDATE_ERROR = 'FORM_STATUS_UPDATE_ERROR';

export const FORM_ANSWER_SENT_TO_GALLERY = 'FORM_ANSWER_SENT_TO_GALLERY';
export const FORM_ANSWER_REMOVED_FROM_GALLERY = 'FORM_ANSWER_REMOVED_FROM_GALLERY';

export const FORM_ANSWER_REINSERT = 'FORM_ANSWER_REINSERT';

export const FORM_DELETED = 'FORM_DELETED';

export const CREATE_EMPTY_FORM= 'CREATE_EMPTY_FORM';

export const EDIT_ANSWER_BEGIN = 'EDIT_ANSWER_BEGIN';
export const EDIT_ANSWER_UPDATE = 'EDIT_ANSWER_UPDATE';
export const EDIT_ANSWER_CANCEL = 'EDIT_ANSWER_CANCEL';
export const EDIT_ANSWER_REQUEST = 'EDIT_ANSWER_REQUEST';
export const EDIT_ANSWER_SUCCESS = 'EDIT_ANSWER_SUCCESS';
export const EDIT_ANSWER_FAILED = 'EDIT_ANSWER_FAILED';

export const EDIT_FORM_REQUEST = 'EDIT_FORM_REQUEST';
export const EDIT_FORM_SUCCESS = 'EDIT_FORM_SUCCESS';
export const EDIT_FORM_FAILURE = 'EDIT_FORM_FAILURE';

export const UPDATE_FORM_INACTIVE_MESSAGE_REQUEST = 'UPDATE_FORM_INACTIVE_MESSAGE_REQUEST';
export const UPDATE_FORM_INACTIVE_MESSAGE_SUCCESS = 'UPDATE_FORM_INACTIVE_MESSAGE_SUCCESS';
export const UPDATE_FORM_INACTIVE_MESSAGE_FAILURE = 'UPDATE_FORM_INACTIVE_MESSAGE_FAILURE';

export const FORM_DRAG_ENDED = 'FORM_DRAG_ENDED';
export const FORM_DRAG_STARTED = 'FORM_DRAG_STARTED';

export const PUBLISH_GALLERY_REQUEST = 'PUBLISH_GALLERY_REQUEST';
export const PUBLISH_GALLERY_SUCCESS = 'PUBLISH_GALLERY_SUCCESS';
export const PUBLISH_GALLERY_FAILURE = 'PUBLISH_GALLERY_FAILURE';

export const UPDATE_GALLERY_TITLE = 'UPDATE_GALLERY_TITLE';
export const UPDATE_GALLERY_DESCRIPTION = 'UPDATE_GALLERY_DESCRIPTION';
export const UPDATE_READER_INFO_PLACEMENT = 'UPDATE_READER_INFO_PLACEMENT';
export const UPDATE_GALLERY_ORIENTATION = 'UPDATE_GALLERY_ORIENTATION';

export const UPDATE_FILTER_BY = 'UPDATE_FILTER_BY';
export const UPDATE_ORDER = 'UPDATE_ORDER';
export const UPDATE_SEARCH = 'UPDATE_SEARCH';
export const CLEAN_SUBMISSION_FILTERS = 'CLEAN_SUBMISSION_FILTERS';

export const GALLERY_ENABLE_IDENTIFIABLE = 'GALLERY_ENABLE_IDENTIFIABLE';

export const UPDATE_EDITABLE_PII = 'UPDATE_EDITABLE_PII';
export const RESET_EDITABLE_TEXT = 'RESET_EDITABLE_TEXT';

export const COPY_FORM = 'COPY_FORM';

/**
 * Utils
 */

const getInit = (method, body, oidc = {}) => {
  const headers = new Headers({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  });

  if (oidc.user) {
    headers.append('Authorization', oidc.user.id_token);
  }

  const init = { method, headers };

  if (method !== 'GET' && body) init.body = JSON.stringify(body);

  return init;
};

const handleResp = res => {
  if (res.status === 401) {
    throw new Error('Not Authorized to make this request');
  } else if (res.status > 399) {
    throw new Error('Error! Status ' + res.status);
  } else {
    return res.json();
  }
};

const authenticated = oidc => {
  return oidc.user && !oidc.user.expired;
};

/**
 * Action creators
 */

const formRequestStarted = id => ({ type: FETCH_FORM_REQUEST, id });
const formRequestSuccess = form => ({ type: FETCH_FORM_SUCCESS, form });
const formRequestFailure = err => ({ type: FETCH_FORM_FAILURE, err });

const formsRequestStarted = () => ({ type: FETCH_FORMS_REQUEST });
const formsRequestSuccess = forms => ({ type: FETCH_FORMS_SUCCESS, forms });
const formsRequestFailure = err => ({ type: FETCH_FORMS_SUCCESS, err });

const deleteSuccessful = id => ({ type: FORM_DELETED, id });

const formRequestEditAccess = formId => ({
  type: REQUEST_EDIT_FORM_ACCESS,
  formId,
  publish: true
});

const formLeaveEdit = formId => ({ type: EDIT_FORM_LEAVE, formId, publish: true });

const createEmptyAction = saveDestination => ({
  type: CREATE_EMPTY_FORM,
  saveDestination
});

const submissionsFetched = (counts, submissions) => ({
  type: FETCH_SUBMISSIONS_SUCCESS,
  submissions,
  counts
});

const submissionsFetchError = error => ({ type: FETCH_SUBMISSIONS_FAILED, error });

const formCreated = form => ({ type: FORM_CREATED, form });
const formCreationFailure = error => ({ type: FORM_CREATION_FAILURE, error });

const requestGallery = () => ({ type: FETCH_FORM_GALLERY_REQUEST });
const receivedGallery = gallery => {
  if (!Array.isArray(gallery.config.identifiableIds)) {
    gallery.config.identifiableIds = [];
  }
  return { type: FETCH_FORM_GALLERY_SUCCESS, gallery };
};
const galleryRequestError = error => ({ type: FETCH_FORM_GALLERY_FAILURE, error });

const answerRemovedFromGallery = gallery => ({
  type: FORM_ANSWER_REMOVED_FROM_GALLERY,
  gallery
});

/**
 * Actions API
 */

export const fetchForms = () => (dispatch, getState) => {
  const {oidc, app} = getState();

  dispatch(formsRequestStarted());

  return fetch(`${app.askHost}/v1/form`, getInit('GET', null, oidc))
    .then(handleResp)
    .then(forms => dispatch(formsRequestSuccess(forms)))
    .catch(error => dispatch(formsRequestFailure(error)));
};

export const fetchForm = id => (dispatch, getState) => {
  const {app, oidc} = getState();

  dispatch(formRequestStarted(id));

  return fetch(`${app.askHost}/v1/form/${id}`, getInit('GET', null, oidc))
    .then(handleResp)
    .then(form => dispatch(formRequestSuccess(form)))
    .catch(error => dispatch(formRequestFailure(error)));
};

export const copyForm = (id) => (dispatch, getState) => {
  if (getState().forms[id]) {
    dispatch({type: COPY_FORM, id});
  } else {
    dispatch(fetchForm(id))
      .then(() => dispatch({type: COPY_FORM, id}));
  }
};

export const deleteForm = (name, description, id) => (dispatch, getState) => {
  const {app, oidc} = getState();

  dispatch(formRequestStarted(id));
  return fetch(`${app.askHost}/v1/form/${id}`, getInit('DELETE', { name, description }, oidc))
    .then(handleResp)
    .then(deletedForm => {
      dispatch(deleteSuccessful(id));
      // FIXME: Ask service returns 'null' for deleted forms.
      //dispatch(formRequestSuccess(deletedForm, 'delete'));
    })
    .catch(error => dispatch(formRequestFailure(error)));
};

export const requestEditAccess = formId => dispatch =>
dispatch(formRequestEditAccess(formId));

export const leavingEdit = formId => dispatch =>
dispatch(formLeaveEdit(formId));

export const createEmpty = () => (dispatch) =>
dispatch(createEmptyAction());

export const appendWidget = (type, targetPosition) => ({
  type: APPEND_FORM_WIDGET,
  widget: type,
  targetPosition: targetPosition
});

export const duplicateWidget = position => ({
  type: DUPLICATE_FORM_WIDGET,
  position
});

export const deleteWidget = widgetPosition => ({
  type: DELETE_FORM_WIDGET,
  widgetPosition
});

export const updateWidget = (id, data) => ({ type: UPDATE_WIDGET, data, id });
export const moveWidget = (from, to) => ({ type: MOVE_WIDGET, from, to });

// updateForm should ONLY be used to update top-level properties
// the following actions should be used to update nested properties like header and footer
// hopefully we can update so the form is roughly flat and we won't have to do all this.
export const updateForm = data => ({ type: UPDATE_FORM, data });
export const updateFormSettings = settings => ({type: UPDATE_FORM_SETTINGS, settings});
export const updateFormHeader = header => ({type: UPDATE_FORM_HEADER, header});
export const updateFormFooter = footer => ({type: UPDATE_FORM_FOOTER, footer});
export const updateFormFinishedScreen = finishedScreen => ({type: UPDATE_FORM_FINISHED_SCREEN, finishedScreen});

export const setActiveSubmission = submissionId => ({
  type: SET_ACTIVE_SUBMISSION,
  submissionId
});

export const updateActiveSubmission = props => ({
  type: UPDATE_ACTIVE_SUBMISSION,
  props
});

export const saveForm = (form, widgets) => {
  const data = Object.assign({}, form);
  data.steps[0].widgets = widgets;

  return (dispatch, getState) => {

    const {app, oidc} = getState();

    data.settings.saveDestination =  `${app.askHost}/v1/form/${form.id}/submission`;

    dispatch({ type: CREATE_INIT_FORM, data });
    return fetch(`${app.elkhornHost}/create`, getInit('POST', data, oidc))
    .then(handleResp)
    .then(json => {
      dispatch(formCreated(json));
      return json;
    })
    .catch(error => dispatch(formCreationFailure(error)));
  };
};

export const editForm = form => (dispatch, getState) => {
  const data = {...form};
  const {app, oidc} = getState();

  // update save destination on edit to capture config changes
  data.settings.saveDestination = `${app.askHost}/v1/form/${form.id}/submission`;

  dispatch({type: EDIT_FORM_REQUEST, data});
  return fetch(`${app.elkhornHost}/create`, getInit('POST', data, oidc))
  .then(handleResp)
  .then(json => {
    dispatch({type: EDIT_FORM_SUCCESS, data: json});
    return json;
  })
  .catch(error => dispatch({type: EDIT_FORM_FAILURE, error}));
};

export const updateInactiveMessage = (message, form) => (dispatch, getState) => {
  const formData = {...form};
  formData.settings.inactiveMessage = message;

  const { app, oidc } = getState();

  dispatch({ type: UPDATE_FORM_INACTIVE_MESSAGE_REQUEST });
  return fetch(`${app.elkhornHost}/create`, getInit('POST', formData, oidc))
  .then(handleResp)
  .then(json => {
    dispatch({type: UPDATE_FORM_INACTIVE_MESSAGE_SUCCESS, data: json});
    return json;
  })
  .catch(error => {
    dispatch({type: UPDATE_FORM_INACTIVE_MESSAGE_FAILURE, error});
  });
};

export const fetchSubmissions = (formId, page = 0) => (dispatch, getState) => {
  const { app, forms, oidc } = getState();
  const { submissionOrder, submissionFilterBy, submissionSearch } = forms;
  const filterBy = submissionFilterBy === 'default' ? '' : submissionFilterBy;
  const skip = page * 10;

  return fetch(
    `${app.askHost}/v1/form/${formId}/submission?skip=${skip}&limit=10&orderby=${submissionOrder}&filterby=${filterBy}&search=${submissionSearch}`,
    getInit('GET', null, oidc)
  )
    .then(handleResp)
    .then(data => dispatch(submissionsFetched(data.counts, data.submissions || [])))
    .catch(error => dispatch(submissionsFetchError(error)));
};

// Receives an object of <string>, <bool> elements like {flagged: true, bookmarked: false}
// and updates the submission flags. The flags attribute on a submission is
// an array of strings. For example `flags: ["flagged", "bookmarked"]`

export const updateSubmissionFlags = props => (dispatch, getState) => {
  const {forms, oidc, app} = getState();
  const { activeSubmission, activeForm } = forms;
  const keys = Object.keys(props);

  // Create an array with the old and new flags
  const allKeys = keys.concat(forms[activeSubmission].flags);

  dispatch(updateActiveSubmission({
    // remove the flags that are for removing and prevent duplicates using a Set
    flags: [...new Set(allKeys.filter(k => props[k] !== false))]
  }));

  // Perform an http request for each flag passed in the original object
  // and return the responses as an array (we are not using it but is good
  // to return the promise so the caller know when everything is done)
  return Promise.all(keys.map(prop =>
    fetch(
      `${app.askHost}/v1/form/${activeForm}/submission/${activeSubmission}/flag/${prop}`,
      getInit( props[prop] ? 'POST': 'DELETE', null, oidc)
    )
    .then(res => {
      fetch(`${app.elkhornHost}/publish/aggregations/form/${activeForm}`, getInit('GET', null, oidc))
        .then(res => {
          if (res.status !== 200) {
            // As there is no front end component for form aggregations, we can fail silently
            // only notifying developers here. If/when we use this data in the interface we
            // can message failures properly.
            console.log("Error publishing form aggregations.")
          }
        })

      handleResp(res)
    })
  ));
};

export const fetchGallery = formId => (dispatch, getState) => {
  dispatch(requestGallery(formId));

  const {app, oidc} = getState();

  fetch(`${app.askHost}/v1/form/${formId}/gallery`, getInit('GET', null, oidc))
    .then(handleResp)
    .then(galleries => dispatch(receivedGallery(galleries[0]))) // we only support 1 gallery
    .catch(error => dispatch(galleryRequestError(error)));
};

export const sendToGallery = (galleryId, subId, answerId) => {
  return (dispatch, getState) => {
    const {app, oidc} = getState();

    if (!authenticated(oidc)) {
      return;
    }

    fetch(`${app.askHost}/v1/form_gallery/${galleryId}/submission/${subId}/${answerId}`, getInit('POST', null, oidc))
      .then(handleResp)
      .then(gallery => {
        dispatch({type: FORM_ANSWER_SENT_TO_GALLERY, gallery});
      })
      .catch(error => { console.log(error); });
  };
};

export const removeFromGallery = (galleryId, subId, answerId) => {
  return (dispatch, getState) => {
    const { app, oidc } = getState();

    fetch(`${app.askHost}/v1/form_gallery/${galleryId}/submission/${subId}/${answerId}`, getInit('DELETE', null, oidc))
      .then(handleResp)
      .then(gallery => dispatch(answerRemovedFromGallery(gallery)))
      .catch(error => {
        console.log('failed to remove from gallery', error);
      });
  };
};

export const updateFormStatus = (formId, status) => (dispatch, getState) => dispatch({
  type: FORM_STATUS_UPDATED,
  form: getState().forms[formId],
  status
});

export const publishFormStatus = (formId, status) => (dispatch, getState) => {
  const {app, oidc} = getState();

  return fetch(`${app.askHost}/v1/form/${formId}/status/${status}`, getInit('PUT', null, oidc))
    .then(handleResp)
    .then(form => {
      dispatch(updateFormStatus(formId, status));
      const updatedState = getState();
      // we want the Promise to evaluate to the saved form.
      return updatedState.forms[updatedState.forms.activeForm];
    })
    .catch(error => dispatch({type: FORM_STATUS_UPDATE_ERROR, error}));
};

// user opens the Edit Answer modal
export const beginEdit = (galleryId, submissionId, answerId) => {
  return (dispatch, getState) => {

    const {forms} = getState();
    const answerKey = `${submissionId}|${answerId}`;
    const reply = forms[answerKey];
    const editableAnswer = reply.answer.edited ? reply.answer.edited : reply.answer.answer.text;
    // deep clone on the array
    const editablePii = reply.identity_answers ? reply.identity_answers.map(a => cloneDeep(a)) : [];

    dispatch({
      type: EDIT_ANSWER_BEGIN,
      answerId,
      submissionId,
      editableAnswer,
      editablePii,
      answerKey
    });
  };
};


// user starts typing and changing the Answer
export const updateEditableAnswer = text => ({type: EDIT_ANSWER_UPDATE, text });
export const cancelEdit = () => ({ type: EDIT_ANSWER_CANCEL });

// this just resets the editable text to the original
// it does NOT remove the edit on the data object.
export const resetEditableTextToOriginal = answer => ({
  type: RESET_EDITABLE_TEXT,
  text: answer.answer.answer.text
});

export const updateEditablePii = (reply, idAnswer, value) => {
  return (dispatch, getState) => {

    const {forms: {editablePii: editablePii}} = getState();
    // set the new value to the edited field in the editablePII array
    const newEditablePii = editablePii.map(entry => {
      if (entry.widget_id === idAnswer.widget_id) {
        return {...entry, edited: value};
      } else {
        return {...entry};
      }
    });

    dispatch({type: UPDATE_EDITABLE_PII, editablePii: newEditablePii});
  };
};

// post updates to the server
// answer_id is the same as widget_id if updating PII
export const editAnswer = (edited, submission_id, answer_id, formId) => {
  return (dispatch, getState) => {
    dispatch({type: EDIT_ANSWER_REQUEST});

    const {app, oidc} = getState();

    fetch(
      `${app.askHost}/v1/form/${formId}/submission/${submission_id}/answer/${answer_id}`,
      getInit('PUT', {edited}, oidc)
    )
      .then(handleResp)
      .then(submission => {
        dispatch({type: EDIT_ANSWER_SUCCESS, submission});
        // just re-fetch the gallery instead of trying to munge the state
        dispatch(fetchGallery(formId));
      })
      .catch(error => dispatch({type: EDIT_ANSWER_FAILED, error}));
  };
};

export const updateGalleryTitle = title => ({ type: UPDATE_GALLERY_TITLE, title });

export const updateGalleryDesc = description => ({
  type: UPDATE_GALLERY_DESCRIPTION,
  description
});

export const updateReaderInfoPlacement = placement => ({
  type: UPDATE_READER_INFO_PLACEMENT,
  placement
});

export const updateGalleryOrientation = orientation => ({
  type: UPDATE_GALLERY_ORIENTATION,
  orientation
});

/**
 * {id} is the id of a widget in a form
 * {add} is a boolean indicating whether the id should be added or removed
 */
export const toggleIdentifiable = (id, add) => (dispatch, getState) => {
  const { forms } = getState();
  const oldIds = forms[forms.activeGallery].config.identifiableIds || [];

  let ids;

  if (add) { // add the new id
    ids = [id, ...oldIds];
  } else { // splice out the old one
    ids = [...oldIds];
    ids.splice(ids.indexOf(id), 1);
  }

  dispatch({type: GALLERY_ENABLE_IDENTIFIABLE, ids});
};

export const publishGallery = () => (dispatch, getState) => {
  const {app, forms, oidc} = getState();
  const { activeGallery } = forms;
  const gallery = forms[activeGallery];

  dispatch({type: PUBLISH_GALLERY_REQUEST});

  return fetch(`${app.elkhornHost}/gallery/${gallery.id}/publish`, getInit('POST', gallery, oidc))
  .then(handleResp)
  .then(gallery => {
    dispatch({type: PUBLISH_GALLERY_SUCCESS, gallery});
    return gallery;
  })
  .then(gallery => dispatch(fetchGallery(forms.activeForm)))
  .catch(error => dispatch({type: PUBLISH_GALLERY_FAILURE, error}));
};

export const updateFilterBy = filterBy => ({
  type: UPDATE_FILTER_BY,
  value: filterBy
});

export const updateOrder = order => ({
  type: UPDATE_ORDER,
  value: order
});

export const updateSearch = search => ({
  type: UPDATE_SEARCH,
  value: search
});

export const cleanSubmissionFilters = () => ({ type: CLEAN_SUBMISSION_FILTERS });

export const formDragStarted = () => ({ type: FORM_DRAG_STARTED });
export const formDragEnded = () => ({ type: FORM_DRAG_ENDED });

export const reinsertGalleryAnswer = (galleryId, key, position) => ({
  type: FORM_ANSWER_REINSERT,
  galleryId,
  key,
  position
});

export const downloadCSV = formId => (dispatch, getState) => {
  const { app, forms, oidc } = getState();
  const { submissionFilterBy, submissionSearch } = forms;
  const filterBy = submissionFilterBy === 'default' ? '' : submissionFilterBy;

  fetch(`${app.askHost}/v1/form/${formId}/submission/export?filterby=${filterBy}&search=${submissionSearch}&download=true`, getInit('GET', null, oidc))
  .then(res => res.blob())
  .then((file) => {
    const csvFile = new Blob([file], {type: 'text/csv'});
    window.open(window.URL.createObjectURL(csvFile), "_blank");
  });
};

export const hasFlag = (submission, flag) => -1 !== submission.flags.indexOf(flag);
