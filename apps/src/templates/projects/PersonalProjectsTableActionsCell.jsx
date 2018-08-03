import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import QuickActionsCell from "../tables/QuickActionsCell";
import PopUpMenu, {MenuBreak} from "@cdo/apps/lib/ui/PopUpMenu";
import color from "../../util/color";
import FontAwesome from '../FontAwesome';
import i18n from '@cdo/locale';
import {showPublishDialog} from './publishDialog/publishDialogRedux';
import {
  unpublishProject,
  remixProject,
} from './projectsRedux';
import {showDeleteDialog} from './deleteDialog/deleteProjectDialogRedux';

export const styles = {
  xIcon: {
    paddingRight: 5,
  },
};

class PersonalProjectsTableActionsCell extends Component {
  static propTypes = {
    isPublished: PropTypes.bool.isRequired,
    projectId: PropTypes.string.isRequired,
    projectType: PropTypes.string.isRequired,
    showPublishDialog: PropTypes.func.isRequired,
    unpublishProject: PropTypes.func.isRequired,
    showDeleteDialog: PropTypes.func.isRequired,
    remixProject: PropTypes.func.isRequired,
  };

  state = {
    deleting: false,
    publishing: false,
    unpublishing: false,
    renaming: false,
    remixing: false
  };

  onPublish = () => {
    this.props.showPublishDialog(this.props.projectId, this.props.projectType);
  };

  onUnpublish = () => {
    this.props.unpublishProject(this.props.projectId);
  };

  onDelete = () => {
    this.props.showDeleteDialog(this.props.projectId);
  };

  onRemix = () => {
    this.props.remixProject(this.props.projectId);
  };

  render() {
    return (
      <QuickActionsCell>
        <PopUpMenu.Item
          onClick={() => console.log("Rename was clicked")}
        >
          {i18n.rename()}
        </PopUpMenu.Item>
        <PopUpMenu.Item
          onClick={this.onRemix}
        >
          {i18n.remix()}
        </PopUpMenu.Item>
        {this.props.isPublished && (
          <PopUpMenu.Item
            onClick={this.onUnpublish}
          >
            {i18n.unpublish()}
          </PopUpMenu.Item>
        )}
        {!this.props.isPublished && (
          <PopUpMenu.Item
            onClick={this.onPublish}
          >
            {i18n.publish()}
          </PopUpMenu.Item>
        )}
        <MenuBreak/>
        <PopUpMenu.Item
          onClick={this.onDelete}
          color={color.red}
        >
          <FontAwesome icon="times-circle" style={styles.xIcon}/>
          {i18n.delete()}
        </PopUpMenu.Item>
      </QuickActionsCell>
    );
  }
}

export default connect(state => ({}), dispatch => ({
  showPublishDialog(projectId, projectType) {
    dispatch(showPublishDialog(projectId, projectType));
  },
  unpublishProject(projectId) {
    dispatch(unpublishProject(projectId));
  },
  showDeleteDialog(projectId) {
    dispatch(showDeleteDialog(projectId));
  },
  remixProject(projectId) {
    dispatch(remixProject(projectId));
  },
}))(PersonalProjectsTableActionsCell);
