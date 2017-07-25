import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import BaseDialog from '../BaseDialog';
import LoginTypePicker from './LoginTypePicker';
import EditSectionForm from "./EditSectionForm";
import i18n from '@cdo/locale';
import {newSectionShape} from './shapes';
import {
  isAddingSection,
  finishEditingSection,
  updateSection,
} from './teacherSectionsRedux';

export class AddSectionDialog extends Component {
  static propTypes = {
    // Provided by Redux
    isOpen: PropTypes.bool.isRequired,
    section: newSectionShape,
    finishEditingSection: PropTypes.func.isRequired,
    updateSection: PropTypes.func.isRequired,
  };

  onClickEditSave = () => {
    const {section, updateSection, finishEditingSection} = this.props;

    const selectedAssignment = this.assignment.getSelectedAssignment();
    const data = {
      name: section.name,
      login_type: section.loginType,
      grade: section.grade,
      stage_extras: section.stageExtras,
      pairing_allowed: section.pairingAllowed,
      course_id: selectedAssignment ? selectedAssignment.courseId : null,
    };

    if (selectedAssignment && selectedAssignment.scriptId) {
      data.script = {
        id: selectedAssignment.scriptId
      };
    }

    const suffix = '';
    const sectionId = -1; // When it's a new section

    $.ajax({
      url: `/v2/sections${suffix}`,
      method: 'POST',
      contentType: 'application/json;charset=UTF-8',
      data: JSON.stringify(data),
    }).done(result => {
      updateSection(sectionId, result);
      finishEditingSection();
    }).fail((jqXhr, status) => {
      // We may want to handle this more cleanly in the future, but for now this
      // matches the experience we got in angular
      alert(i18n.unexpectedError());
      console.error(status);
    });
  };

  render() {
    const {isOpen, section} = this.props;
    const {loginType} = section || {};
    const title = i18n.newSection();
    return (
      <BaseDialog
        useUpdatedStyles
        fixedWidth={1010}
        isOpen={isOpen}
        uncloseable
        assetUrl={() => ''}
      >
        <PadAndCenter>
          {!loginType && /* First page */
            <LoginTypePicker title={title}/>
          }
          {loginType && /* Second page */
            <EditSectionForm
              title={title}
              assignmentRef={(element) => this.assignment = element}
              handleSave={this.onClickEditSave}
            />
          }
        </PadAndCenter>
      </BaseDialog>
    );
  }
}

export default connect(state => ({
  isOpen: isAddingSection(state.teacherSections),
  section: state.teacherSections.sectionBeingEdited,
}), {
  finishEditingSection,
  updateSection,
})(AddSectionDialog);

const PadAndCenter = ({children}) => (
  <div
    style={{
      display: 'flex',
      flexFlow: 'row',
      justifyContent: 'center',
      marginTop: 20,
      marginBottom: 20,
    }}
  >
    {children}
  </div>
);
PadAndCenter.propTypes = {children: PropTypes.any};

