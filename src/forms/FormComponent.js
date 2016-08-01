import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { DragSource } from 'react-dnd';
import { updateWidget, formDragEnded } from 'forms/FormActions';

import FaTrash from 'react-icons/lib/fa/trash';
import FaClose from 'react-icons/lib/fa/close';
import FaFloppyO from 'react-icons/lib/fa/floppy-o';
import FaArrowUp from 'react-icons/lib/fa/arrow-up';
import FaArrowDown from 'react-icons/lib/fa/arrow-down';
import FaUser from 'react-icons/lib/fa/user';
import FaCopy from 'react-icons/lib/fa/copy';

import TextFieldEditor from 'forms/editors/TextFieldEditor';
import TextAreaEditor from 'forms/editors/TextAreaEditor';
import MultipleChoiceEditor from 'forms/editors/MultipleChoiceEditor';
import DateFieldEditor from 'forms/editors/DateFieldEditor';
import NumberFieldEditor from 'forms/editors/NumberFieldEditor';
import EmailFieldEditor from 'forms/editors/EmailFieldEditor';
import PhoneNumberEditor from 'forms/editors/PhoneNumberEditor';

// TODO: Generalize this into dynamically generated components
const renderSettings = {

  DateField(field, props) {
    return (
      <DateFieldEditor field={ field } { ...props } />
    );
  },

  NumberField(field, props) {
    return (
      <NumberFieldEditor field={ field } { ...props } />
    );
  },

  TextField(field, props) {
    return (
      <TextFieldEditor field={ field } { ...props } />
    );
  },

  EmailField(field, props) {
    return (
      <EmailFieldEditor field={ field } { ...props } />
    );
  },

  TextArea(field, props) {
    return (
      <TextAreaEditor field={ field } { ...props } />
    );
  },

  MultipleChoice(field, props) {
    return (
      <MultipleChoiceEditor field={ field } { ...props } />
    );
  },

  PhoneNumber(field, props) {
    return (
      <PhoneNumberEditor field={ field } { ...props } />
    );
  }
};

const askSource = {
  beginDrag(props, monitor, component) {
    if (component.props.formDiagram) {
      component.props.formDiagram.setState({ itemBeingDragged: component.props.position });
    }
    return {
      field: props.field,
      id: props.id,
      onList: props.onList,
      position: props.position,
      component: component
    };
  },
  endDrag(props, monitor, component) {
    // dispatchProps should be merged with props but looks like it's not inside this call
    if (component && component.dispatchProps) component.dispatchProps.dispatch(formDragEnded());
    if (props.formDiagram) props.formDiagram.setState({ isHovering: false });
  }
};

@DragSource('form_component', askSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
@connect(({ forms }) => ({
  widgets: forms.widgets
}))
export default class FormComponent extends Component {
  static propTypes = {
    field: PropTypes.object.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.string
  };

  constructor(props, context) {
    super(props, context);
    // originalField is used to restore params when clicking X
    this.state = { 'expanded': false, field: props.field, originalField: props.field };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ field: nextProps.field, originalField: nextProps.field });
  }

  render() {
    const { onList, connectDragSource } = this.props;
    return this.props.connectDragSource(
      onList ?
        this.renderEdit()
        : this.renderType()
    );
  }

  toggleExpanded() {
    if (this.props.onList) {
      this.setState({ expanded: !this.state.expanded });
    }
  }

  renderType() {
    const { isDragging, field } = this.props;
    return (
      <div onClick={this.onClick.bind(this)} style={styles.askComponent(isDragging)}>
        <field.icon style={styles.icon} />
        <span style={styles.title}>{ field.type }</span>
      </div>
    );
  }

  onIdentityClick(e) {
    var field = Object.assign({}, this.state.field);
    field.identity = e.target.checked;
    this.setState({ field: field });
  }

  onDescriptionChange(e) {
    var field = Object.assign({}, this.state.field);
    field.description = e.target.value;
    this.setState({ field: field });
  }

  onTitleChange(e) {
    var field = Object.assign({}, this.state.field);
    field.title = e.target.value;
    this.setState({ field: field });
  }

  onSaveClick(e) {
    this.toggleExpanded();
    this.setState({ originalField: this.state.field });
    this.props.dispatch(updateWidget(this.props.id, this.state.field));
  }

  onCloseClick(e) {
    this.setState({ field: this.state.originalField });
    this.toggleExpanded();
  }

  renderEdit() {
    const { id, onMove, isLast, position, onDelete, onDuplicate } = this.props;
    const { field } = this.state;

    return (
      <div>
        {
          !this.state.expanded ?
          <div>
            {
              <div style={ styles.editContainer(this.state.expanded) } key={ id } onClick={ this.toggleExpanded.bind(this) }>
                <div style={ styles.fieldAndPosition }>
                  <div style={ styles.fieldPosition }>{ position + 1 }.</div>
                  <h4 style={styles.editBody}>
                    { !!field.title ? field.title : field.component }
                    {
                      field.wrapper && field.wrapper.required ?
                        <span style={ styles.requiredAsterisk }>*</span>
                      :
                        null
                    }
                    {
                      field.identity ?
                        <span style={ styles.identityLabel }><FaUser/></span>
                      :
                        null
                    }
                  </h4>
                </div>
                <div style={styles.arrowContainer}>
                  <button style={styles.copy} onClick={ onDuplicate.bind(this, position) }><FaCopy /></button>
                  <button style={styles.delete} onClick={ onDelete.bind(this, position) }><FaTrash /></button>
                  <button onClick={ position !== 0 ? onMove.bind(this, 'up', position) : null } style={styles.arrow} disabled={position === 0}><FaArrowUp /></button>
                  <button onClick={ !isLast ? onMove.bind(this, 'down', position) : null } style={styles.arrow} disabled={!!isLast}><FaArrowDown /></button>
                </div>
              </div>
            }
            </div>
          : null
        }
        {
          this.state.expanded ?
            <div style={ styles.editSettingsPanel }>

              <div style={ styles.titleAndDescription }>
                <input
                  onChange={ this.onTitleChange.bind(this) }
                  style={ styles.fieldTitle }
                  defaultValue={ this.props.field.title }
                  type="text"
                  placeholder={ `Type your question here (${ field.friendlyType })` } />
                <input
                  onChange={ this.onDescriptionChange.bind(this) }
                  defaultValue={ field.description }
                  style={ styles.fieldDescription }
                  type="text"
                  placeholder="Description text (optional)" />
              </div>

              { this.editSettings() }

              <div style={ styles.bottomButtons }>
                <button style={ styles.cancelButton } onClick={ this.onCloseClick.bind(this) }><FaClose /> Cancel</button>
                <button style={ styles.saveButton } onClick={ this.onSaveClick.bind(this) }><FaFloppyO /> Save</button>
              </div>

            </div>
          :
            null
        }
      </div>
    );
  }

  onEditorChange(field) {
    var fieldCopy = Object.assign({}, this.state.field, field);
    this.setState({ field: fieldCopy });
  }

  editSettings() {
    const { field } = this.state;
    // Passing listeners down from this class to the editors
    var localProps = { onEditorChange: this.onEditorChange.bind(this) };
    return renderSettings[field.component] ? renderSettings[field.component](field, localProps) : renderSettings['TextField'](field, localProps);
  }

  onClick() {
    const {onList, field, onClick } = this.props;
    if (!onList) {
      onClick(field);
    }
  }

}

export const styles = {
  askComponent: function(isDragging) {
    return {
      opacity: isDragging ? 0.75 : 1,
      marginBottom: 10,
      shadowOffset: { height: 1, width: 0},
      boxShadow: '0 1px 3px #9B9B9B',
      lineHeight: '40px',
      cursor: 'pointer',
      padding: '0 10px',
      height: 40,
      backgroundColor: '#fff',
      borderRadius: 3,
      width: '48%',
      textAlign: 'left',
      margin: '1%',
      display: 'flex',
      alignItems: 'center'
    };
  },
  editContainer: function(isExpanded) {
    return {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: '#fff',
      padding: '20px',
      width: '100%',
      boxShadow: '0 1px 3px #9B9B9B',
      borderRadius: 4,
      height: isExpanded ? '60px' : 'auto',
      lineHeight: '20px',
      cursor: 'pointer'
    }
  },
  editBody: {
    flex: 1,
    marginLeft: 10,
    alignSelf: 'flex-start'
  },
  arrowContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  arrow: {
    width: '25px',
    height: '30px',
    padding: '0',
    lineHeight: '20px',
    border: 'none',
    background: 'none',
    fontSize: '14pt',
    display: 'inline-block',
    cursor: 'pointer'
  },
  arrowPlaceHolder: {
    width: '25px',
    height: '30px',
    padding: '0',
    marginLeft: '5px',
    display: 'inline-block'
  },
  delete: {
    width: '25px',
    height: '30px',
    padding: '0',
    lineHeight: '20px',
    border: 'none',
    background: 'none',
    fontSize: '14pt',
    display: 'inline-block',
    cursor: 'pointer'
  },
  copy: {
    width: '25px',
    height: '30px',
    padding: '0',
    lineHeight: '20px',
    border: 'none',
    background: 'none',
    fontSize: '14pt',
    display: 'inline-block',
    cursor: 'pointer'
  },
  editSettingsPanel: {
    position: 'relative',
    top: '0px',
    left: '0px',
    width: '100%',
    height: 'auto',
    padding: '20px',
    backgroundColor: 'white',
    boxShadow: '0px 1px 2px #444'
  },
  saveButton: {
    display: 'inline-block',
    fontSize: '11pt',
    height: '40px',
    color: 'white',
    background: '#36B278',
    border: 'none',
    borderRadius: '4px',
    marginTop: '10px',
    lineHeight: '40px',
    textAlign: 'center',
    cursor: 'pointer',
    padding: '0 20px',
    marginLeft: '10px'
  },
  cancelButton: {
    fontSize: '11pt',
    height: '40px',
    color: '#777',
    background: 'white',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginTop: '10px',
    lineHeight: '40px',
    textAlign: 'center',
    cursor: 'pointer',
    padding: '0 20px',
    lineHeight: '40px',
    marginLeft: '10px'
  },
  label: {
    display: 'block',
    width: '100%',
    marginBottom: '10px'
  },
  fieldTitle: {
    fontSize: '14pt',
    padding: '5px 0',
    width: '75%',
    display: 'block',
    border: 'none',
    background: 'none'
  },
  fieldDescription: {
    fontSize: '11pt',
    padding: '5px 0',
    marginBottom: '20px',
    width: '50%',
    display: 'block',
    border: 'none',
    background: 'none'
  },
  fieldPosition: {
    alignSelf: 'flex-start',
    fontWeight: 'bold'
  },
  fieldAndPosition: {
    display: 'flex',
    flexGrow: '1'
  },
  requiredAsterisk: {
    color: '#B22'
  },
  identity: {
    padding: '20px 0'
  },
  identityLabel: {
    color: '#333',
    padding: '0 5px',
    marginLeft: '5px',
    display: 'inline-block'
  },
  bottomButtons: {
    textAlign: 'right'
  },
  icon: {
    marginRight: 8,
    fontSize: '11pt'
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: '1em'
  }
};
