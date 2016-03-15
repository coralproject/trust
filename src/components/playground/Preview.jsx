import React from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';

import CommentBox from './commentBox';
import Stream from './stream';

import MdRemoveRedEye from 'react-icons/lib/md/remove-red-eye';
import MdComment from 'react-icons/lib/md/comment';

import mediaQueries from '../../playgroundSettings';

@connect(state => state.playground)
@Radium
class Preview extends React.Component {

  constructor(props) {
    super(props);
    this.state = { commentsAreVisible: this.props.togglerGroups.layout.togglers.hiddenbydefault.status };
  }

  onClickToReadClick() {
    this.setState({ commentsAreVisible: true });
  }

  render() {

    return (
      <div style={ styles.preview }>
        <div style={ styles.previewBar }>
          <h2 style={ styles.previewBarTitle }>
            <MdRemoveRedEye style={ styles.previewIcon } />
            <span style={ styles.previewTitleSpan }>Preview</span>
          </h2>
        </div>

        { 
          !this.props.togglerGroups.layout.togglers.hiddenbydefault.status || 
            this.state.commentsAreVisible ?

            <div style={ styles.sandBox }>
              <p style={ styles.sandBoxIntro }>This is a sandbox only, this preview will be reset every time you reload the page.</p>
              <CommentBox />
              <Stream />
            </div>

          : 

            <div style={ styles.clickToRead } onClick={ this.onClickToReadClick.bind(this) }>
              <MdComment /> Click to see the comments...
            </div>
        }
      </div>
    );
  }
}

// same as the @connect decorator above
export default Preview;

var styles = {
  preview: {
    background: 'white',
    padding: '40px',
    color: '#3d3d3d',
    [mediaQueries.tablet]: {
      padding: '20px'
    }
  },
  previewIcon: {
    marginTop: '-10px',
    marginRight: '10px'
  },
  clickToRead: {
    cursor: 'pointer',
    padding: '20px',
    border: '1px solid #ddd',
    margin: '10px 0',
    fontSize: '20pt',
    color: '#444'
  },
  sandBox: {
  },
  sandBoxIntro: {
    padding: '20px',
    color: '#999',
    textAlign: 'center',
    fontSize: '9pt'
  },
  previewBar: {
    borderBottom: '1px solid #ccc',
    position: 'relative',
    fontSize: '16pt',
    paddingBottom: '10px'
  },
  previewTitleSpan: {
    fontFamily: 'Fira Sans',
    fontWeight: '300',
    fontSize: '24pt'
  }
};