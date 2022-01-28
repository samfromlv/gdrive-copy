'use strict';

import React from 'react';
import { Picker } from '../util/picker';
import SelectFolder from '../components/SelectFolder';
import Appreciation from '../components/Appreciation';
import PageChanger from '../components/PageChanger';
import Page from '../components/Page';
import Success from '../components/Success';
import Error from '../components/Error';
import Panel from '../components/Panel';
import Overlay from '../components/Overlay';
import FolderLink from '../components/FolderLink';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import { Stepper, Step, StepLabel } from 'material-ui/Stepper';
import { getDriveSpreadsheetURL } from '../util/helpers';

export default class ChangeOwner extends React.Component {
  constructor() {
    super();

    this.maxSteps = 2; // 3 steps, but 0-indexed

    this.state = {
      stepNum: 0,
      srcFolderID: '',
      srcFolderName: '',
      srcParentID: '',
      newOwnerEmail: '',
      followShortcuts: false,
      removePermissions: false,
      success: false,
      successMsg: '',
      error: false,
      errorMsg: '',
      processing: false,
      processingMsg: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFolderSelect = this.handleFolderSelect.bind(this);
    this.handleNewOwnerEmail = this.handleNewOwnerEmail.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.nextView = this.nextView.bind(this);
    this.prevView = this.prevView.bind(this);
    this.showError = this.showError.bind(this);
    this.showSuccess = this.showSuccess.bind(this);
    this.reset = this.reset.bind(this);
    this.processing = this.processing.bind(this);
    this.pickerCallback = this.pickerCallback.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // initialize Picker if gapi is loaded
    if (nextProps.isAPILoaded) {
      this.picker = new Picker(this.pickerCallback);
      this.picker.onApiLoad();
    }
  }

  showError(msg) {
    this.setState({
      error: true,
      success: false,
      processing: false,
      errorMsg: msg
    });
  }

  showSuccess(msg) {
    this.setState({
      error: false,
      success: true,
      processing: false,
      successMsg: msg
    });
  }

  processing(msg) {
    this.setState({
      processing: true,
      processingMsg: msg ? msg : ''
    });
  }

  clearSelection(id, name) {
    return () => {
      let state = {};
      state[id] = '';
      state[name] = '';
      this.setState(state);
    };
  }

  reset() {
    this.setState({
      stepNum: 0,
      error: false,
      success: false,
      processing: false,
      followShortcuts: false,
      removePermissions: false,
      srcFolderID: '',
      srcFolderName: '',
      newOwnerEmail: ''
    });
  }

  /**
   * A callback function that extracts the chosen document's metadata from the
   * response object. For details on the response object, see
   * https://developers.google.com/picker/docs/result
   *
   * @param {object} data The response object.
   */
  pickerCallback(data) {
    var action = data[google.picker.Response.ACTION];

    if (action == google.picker.Action.PICKED) {
      var doc = data[google.picker.Response.DOCUMENTS][0];
      this.handleFolderSelect(
        doc[google.picker.Document.ID],
        doc[google.picker.Document.NAME],
        doc[google.picker.Document.PARENT_ID]
      );
    } else if (action == google.picker.Action.CANCEL) {
      google.script.host.close();
    }
  }


  handleSubmit(e) {
    this.processing('Initializing the change owner');
    const _this = this;
    if (process.env.NODE_ENV === 'production') {
      google.script.run
        .withSuccessHandler(function (result) {
          _this.setState({
            copyLogID: result.spreadsheetId
          });
          _this.showSuccess('Change owner operation has started in background');
          // after initialized, this begins the copy loop
          google.script.run.changeOwner();
        })
        .withFailureHandler(function (err) {
          _this.showError(err.message);
        })
        .initializeChangeOwner({
          srcFolderID: this.state.srcFolderID,
          srcFolderName: this.state.srcFolderName,
          srcParentID: this.state.srcParentID,
          newOwnerEmail: this.state.newOwnerEmail,
          followShortcuts: this.state.followShortcuts,
          removePermissions: this.state.removePermissions
        });
    } else {
      if (window.location.search.indexOf('testmode') !== -1) {
        return setTimeout(
          () => this.showError('This is a testmode error'),
          1000
        );
      }
      return setTimeout(
        () => this.showSuccess('Change owner operation has started in background'),
        1000
      );
    }
  }

  /**
   * Sets folder info in state
   * @param {string} id
   * @param {string} name
   * @param {string} parentID
   */
  handleFolderSelect(id, name, parentID) {
    this.setState({
      processing: false,
      error: false,
      srcFolderID: id,
      srcFolderName: name,
      srcParentID: parentID
    });
  }




  handleCheck(e) {
    const settings = {};
    settings[e.target.id] = e.target.checked;
    this.setState(settings);
  }

  handleNewOwnerEmail(e) {
    this.setState({
      newOwnerEmail: e.target.value
    });
  }


  nextView() {
    if (this.state.stepNum === this.maxSteps) {
      return;
    } else {
      this.setState({ stepNum: this.state.stepNum + 1 });
    }
  }

  prevView() {
    this.setState({ stepNum: this.state.stepNum - 1 });
  }

  render() {
    const radioStyle = {
      marginBottom: 16
    };

    if (this.state.success && !this.state.error) {
      return (
        <div>
          <Success msg={this.state.successMsg}>
            Things you should know:
            <ul>
              <li>
                You can close this window, change owner operation will continue in background
              </li>
              <li>
                The{' '}
                <a
                  href={getDriveSpreadsheetURL(this.state.copyLogID)}
                  target="_blank"
                >
                  Operation Log
                </a>{' '}
                will tell you when change owner operation is complete. This page will{' '}
                <b>not</b> update
              </li>
              <li>
                Folder:{' '}
                <FolderLink
                  folderID={this.state.srcFolderID}
                  name={this.state.srcFolderName}
                />
              </li>
              <li>
                Please do not try to start another copy or change owner operation until this one is
                finished
              </li>
            </ul>
          </Success>
          <Appreciation />
        </div>
      );
    }
    return (
      <div>
        {this.state.processing && <Overlay label={this.state.processingMsg} />}
        {this.state.error && !this.state.success && (
          <Error>{this.state.errorMsg}</Error>
        )}

        <Stepper activeStep={this.state.stepNum}>
          <Step>
            <StepLabel>Select folder</StepLabel>
          </Step>
          <Step>
            <StepLabel>Settings</StepLabel>
          </Step>
          <Step>
            <StepLabel>Review and confirm</StepLabel>
          </Step>
        </Stepper>

        <PageChanger activeStep={this.state.stepNum}>
          <Page stepNum={0} label="In which folder would you like to change owner of your files?">
            <SelectFolder
              handleFolderSelect={this.handleFolderSelect}
              showError={this.showError}
              processing={this.processing}
              picker={this.picker}
              folderID={this.state.srcFolderID}
              folderName={this.state.srcFolderName}
              reset={this.clearSelection('srcFolderID', 'srcFolderName')}
            />
            {this.state.srcFolderID !== '' && (
              <div className="controls">
                <RaisedButton
                  onClick={this.nextView}
                  primary={true}
                  label="Next"
                />
              </div>
            )}
          </Page>

          <Page label="Enter new owner email" stepNum={1}>
            <TextField
              key="newOwnerEmail"
              id="newOwnerEmail"
              name="newOwnerEmail"
              onChange={this.handleNewOwnerEmail}
              floatingLabelText="New owner email"
              value={this.state.newOwnerEmail}
            />
            <br />
            Leave empty to keep yourself as owner
            <br />
            <br />
            <br />
            <Checkbox
              checked={this.state['removePermissions']}
              onCheck={this.handleCheck}
              id="removePermissions"
              label={
                <span>
                  Remove all user permissions and make restricted
                </span>
              }
            />
            <br />
            <br />
            <br />
            <br />
            <Checkbox
              checked={this.state['followShortcuts']}
              onCheck={this.handleCheck}
              id="followShortcuts"
              label={
                <span>
                  Follow shortcuts
                </span>
              }
            />
            <br />
            Tool will crawl all shortcuts and change owner in referenced folders
            and their subfolders, even if they are outside selected folder.
            Please be carefull, this may produce unexpected results.
            Use Drive search, type:shortcut and search within folder to see all shortcuts.
            <div className="controls">
              <FlatButton
                label="Go back"
                onClick={this.reset}
                style={{ marginRight: '1em' }}
              />
              <RaisedButton
                onClick={this.nextView}
                primary={true}
                label="Next"
              />
            </div>
          </Page>

          <Page label="Review and start change owner operation" stepNum={2}>
            <Panel>
              <h3>Folder</h3>

              <FolderLink
                folderID={this.state.srcFolderID}
                name={this.state.srcFolderName}
              />

              <br />
              <br />
              <h3>New owner email</h3>
              <span>{this.state.newOwnerEmail ? this.state.newOwnerEmail : "<keep me as owner>"}</span>

              <br />
              <br />
              <h3>Remove permissions and make restricted?</h3>
              <div>
                {this.state.removePermissions ? 'Yes' : 'No'}
              </div>

              <br />
              <br />
              <h3>Follow shortcuts?</h3>
              <div>
                {this.state.followShortcuts ? 'Yes' : 'No'}
              </div>

            </Panel>

            <div className="controls">
              <FlatButton
                label="Start over"
                onClick={this.reset}
                style={{ marginRight: '1em' }}
              />
              <RaisedButton
                label="Change Owner"
                primary={true}
                onClick={this.handleSubmit}
              />
            </div>
          </Page>
        </PageChanger>

        {/* show sample folder URL in test mode */}
        {process.env.NODE_ENV !== 'production' && (
          <div>
            https://drive.google.com/drive/folders/19pDrhPLxYRSEgmMDGMdeo1lFW3nT8v9-
          </div>
        )}
      </div>
    );
  }
}
