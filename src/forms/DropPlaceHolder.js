import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import { DropTarget } from 'react-dnd';

import { appendWidget, moveWidget } from 'forms/FormActions';

const DropHelper = {

  showDropCandidate(draggedItem, formDiagram, targetPosition, component) {

    let tempWidgets = formDiagram.stateBeforeDrag.slice();

    // If item was present on the list
    if (draggedItem.onList) {

      // First we make a copy removing the dragged element
      let fieldsCopy = tempWidgets.slice();
      fieldsCopy.splice(draggedItem.position, 1);

      let fieldsBefore = fieldsCopy.slice(0, targetPosition);
      let fieldsAfter = fieldsCopy.slice(targetPosition);
      tempWidgets = fieldsBefore.concat(draggedItem.field).concat(fieldsAfter);

    } else {

      draggedItem.field.dropped = true;
      // If hovering over the default empty placeholder (the bottom one)
      if (component.props.empty) {
        tempWidgets[targetPosition] = draggedItem.field;
      } else {
        // if hovering over an existing field
        let fieldsBefore = tempWidgets.slice(0, targetPosition);
        let fieldsAfter = tempWidgets.slice(targetPosition);
        tempWidgets = fieldsBefore.concat(draggedItem.field).concat(fieldsAfter);
      }
    }

    formDiagram.setState({ tempWidgets: tempWidgets });

  }
}

const askTarget = {

  // Hover changes the component's internal state
  hover(props, monitor, component) {

    let formDiagram = component.props.formDiagram;
    let targetPosition = component.props.position;
    formDiagram.cancelReset();

    // Hover is fired a gazillion times, this is to prevent
    // unnecessary re-renders
    if (targetPosition != formDiagram.previousHover) {
      formDiagram.previousHover = targetPosition;
    } else {
      return; // hovering the same as before? early return, do nothing.
    }

    formDiagram.setState({ isHovering: true });

    let draggedItem = monitor.getItem();

    DropHelper.showDropCandidate(draggedItem, formDiagram, targetPosition, component);

  },

  // persist state only on drop
  drop(props, monitor, component) {

    let formDiagram = component.props.formDiagram;
    let targetPosition = component.props.position;

    var draggedItem = monitor.getItem();

    draggedItem.field.dropped = true;

    // If we are dragging an item already on the form
    if (draggedItem.onList) {
      formDiagram.moveWidget(draggedItem.position, targetPosition);
    } else {
      formDiagram.appendWidget(draggedItem.field, targetPosition);
      //formDiagram.setState({ isHovering: false });
    }

  }
};

@DropTarget('form_component', askTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver()
}))
@connect(({ app, forms }) => ({ app, forms }))
export default class DropPlaceHolder extends Component {

  componentWillReceiveProps(nextProps) {
    // This acts as an onLeave handler
    if (this.props.isOver && !nextProps.isOver) {
      this.props.formDiagram.enqueueReset();
    }
  }

  render() {
    return (
      this.props.connectDropTarget(
        <div style={ styles.padder }>
          {
            this.props.isOver
              ? <div style={ styles.dropPlaceHolderActive }></div>
              : <div style={ styles.dropPlaceHolder }>
                  {
                    this.props.children ?
                      this.props.children
                    :
                      <p style={ styles.emptyPlaceholderText }>Drag and drop fields here to add a question</p>
                  }
                </div>
          }
        </div>
      )
    );
  }
}

const styles = {
  dropPlaceHolder: {
    minHeight: '70px',
    background: '#eee',
    borderRadius: '4px',
    //marginBottom: '10px',
    transition: 'background .3s'
  },
  dropPlaceHolderActive: {
    border: '1px dashed #111',
    minHeight: '70px',
    background: '#aaccbb',
    padding: '30px',
    borderRadius: '4px',
    //marginBottom: '10px',
    transition: 'background .3s'
  },
  emptyPlaceholderText: {
    textAlign: 'center',
    fontSize: '15pt',
    lineHeight: '70px',
    border: '1px dashed #111'
  },
  padder: {
    height: '80px',
    paddingBottom: '10px'
  }
};
