
/**
 * Module dependencies
 */

import React, { Component } from 'react';
import Radium from 'radium';
import {connect} from 'react-redux';

import {
  fetchSubmissions,
  fetchGallery,
  updateFormStatus,
  requestEditAccess,
  leavingEdit,
  updateForm,
  fetchForm } from 'forms/FormActions';

import Page from 'app/layout/Page';
import FormChrome from 'app/layout/FormChrome';
import FormBuilder from 'forms/FormBuilder.js';

/**
 * Expose Form Edit page component
 */

@connect(({ forms }) => ({ forms }))
@Radium
export default class FormEdit extends Component {

  constructor(props) {
    super(props);
    this.state = { preview: false };
    const { id } = props.params;
    props.dispatch(fetchForm(id));
    props.dispatch(fetchGallery(id));
    props.dispatch(fetchSubmissions(id));
  }

  componentWillMount() {
    const {dispatch, params} = this.props;
    dispatch(requestEditAccess(params.id));
    dispatch(fetchForm(params.id));
  }

  componentDidMount() {
    const {dispatch, params} = this.props;
    this.props.history.listenBefore(() => {
      dispatch(leavingEdit(params.id));
      return true;
    });
  }

  onClosePreview() {
    this.setState({
      preview: false
    });
  }

  showPreview() {
    this.setState({
      preview: true
    });
  }

  updateFormStatus(value) {
    this.props.dispatch(updateFormStatus(this.props.forms.activeForm, value));
  }

  updateInactive(value) {
    this.props.dispatch(updateForm({ settings: { inactiveMessage: value } }));
  }

  render() {
    const { forms, route } = this.props;
    const { submissionList, activeSubmission, activeForm, activeGallery } = forms;
    const submissions = submissionList.map(id => forms[id]);
    const submission = forms[activeSubmission];
    const form = forms[activeForm];
    const gallery = forms[activeGallery];

    return (
      <Page>
        <FormChrome
          activeTab="builder"
          updateStatus={this.updateFormStatus.bind(this)}
          updateInactive={this.updateInactive.bind(this)}
          gallery={gallery}
          submissions={submissions}
          form={form}/>
        <div>
          {
            form ?
              <FormBuilder
                activeForm={ forms.activeForm }
                onClosePreview={this.onClosePreview.bind(this)}
                onOpenPreview={ this.showPreview.bind(this) }
                route={ route }
                preview={this.state.preview} />
            : null
          }
        </div>
      </Page>
    );
  }
}
