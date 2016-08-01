import React, { Component } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';

import { createEmpty, updateForm } from 'forms/FormActions';
import { showFlashMessage } from 'flashmessages/FlashMessagesActions';

import Page from 'app/layout/Page';
import FormBuilder from 'forms/FormBuilder.js';
import FormChrome from 'app/layout/FormChrome';

@connect(({ app, forms }) => ({ app, forms }))
@Radium
export default class FormCreate extends Component {

  constructor(props) {
    super(props);
    this.state = {preview: false};
  }

  componentWillMount() {
    this.props.dispatch(createEmpty());
  }

  updateFormStatus(status) {
    this.props.dispatch(updateForm({ status, settings: { isActive: status === 'open' } }));
  }

  updateInactive(value) {
    this.props.dispatch(updateForm({ settings: { inactiveMessage: value } }));
  }

  render() {
    const { preview } = this.state;
    const { forms } = this.props;
    return (
      <Page style={styles.page}>
        <FormChrome form={forms.form}
          create={true}
          updateStatus={this.updateFormStatus.bind(this)}
          updateInactive={this.updateInactive.bind(this)}
          activeTab="builder" />
        <div style={styles.formBuilderContainer}>
          <FormBuilder
            onClosePreview={this.onClosePreview.bind(this)}
            onOpenPreview={ this.showPreview.bind(this) }
            route={ this.props.route }
            create={true}
            preview={preview} />
        </div>
      </Page>
    );
  }

  onClosePreview() {
    this.setState({
      preview: false
    });
  }

  showPreview() {

    // First test the form is reachable
    const form = this.props.activeForm ? this.props.forms[this.props.activeForm] : this.props.forms.form;
    const previewForm = {...form};
    previewForm.steps[0].widgets = this.props.forms.widgets;
    const url = `${this.props.app.elkhornHost}/preview.js?props=${encodeURIComponent(JSON.stringify(previewForm))}`;

    let formCreate = this;

    fetch(url, {
      method: 'HEAD'
    }).then(() => {
      formCreate.setState({
        preview: true
      });
    }).catch(() => {
      formCreate.props.dispatch(showFlashMessage('Uh-oh, we can\'t preview your form. Try again or report the error to your technical team', 'warning'));
    });

  }

}

const styles = {
  page: {
    backgroundColor: '#F7F7F7'
  },
  headerTitle: {
    flex: 1,
    color: '#5D5D5D'
  },
  title: {
    fontSize: 36,
    display: 'inline-block',
    marginBottom: 15,
    fontWeight: 'bold'
  },
  description: {
    fontSize: 24,
    display: 'inline-block'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    paddingBottom: 20,
    borderBottom: '1px solid #E9E9E9'
  },
  textField: {
    marginRight: 20
  },
  headerBtn: {
    marginLeft: 20,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    padding: 15
  },
  saveBtn: {
    backgroundColor: '#7BC9A3'
  },
  shareBtn: {
    backgroundColor: '#F77160'
  },
  previewBtn: {
    backgroundColor: '#4A4A4A'
  },
  icon: {
    float: 'right',
    marginLeft: 10
  },
  formBuilderContainer: {
  },
  builderTitle: {
    marginBottom: 30,
    fontSize: 25
  }
};
