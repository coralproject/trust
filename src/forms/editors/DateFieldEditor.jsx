import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';

import CommonFieldOptions from 'forms/CommonFieldOptions';

@connect(({ forms, app }) => ({ forms, app }))
@Radium
export default class DateFieldEditor extends Component {

  constructor(props) {
    super(props);
    this.state = { field: props.field }
  }

  componentWillReceiveProps(nextProps) {
    let { field } = this.state;
    let updatedField = Object.assign({}, field, nextProps.field);
    this.setState({ field: updatedField });
  }

  render() {
    let { field } = this.state;
    return (
      <div>
        <div style={ styles.bottomOptions }>
          <CommonFieldOptions {...this.props} />
        </div>
      </div>
    );
  }

}

const styles = {
  bottomOptions: {
    display: 'flex',
    width: '100%'
  }
};
