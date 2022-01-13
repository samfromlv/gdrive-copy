// An enum makes more sense here but the compiled enums don't play nicely with Google Apps Script
export default class Constants {
  static BaseCopyLogId = '1ZEFwieDBVRZBZ82nCEApxNlGc3qMvRaCuxE6klcmHUU';
  static PropertiesDocTitle =
    'DO NOT DELETE OR MODIFY - will be deleted after copying completes';
  static PropertiesDocDescription =
    'This document will be deleted after the folder copy is complete. It is only used to store properties necessary to complete the copying procedure';
  static MaxRuntimeExceeded =
    'Script has reached daily maximum run time of 90 minutes. Script must pause for 24 hours to reset Google Quotas, and will resume at that time. For more information, please see https://developers.google.com/apps-script/guides/services/quotas';
  static SingleRunExceeded =
    'Paused due to Google quota limits - copy will resume in 4 minutes';
  static StartCopyingText = 'Started copying';
  static UserStoppedScript =
    'Stopped manually by user. Please use "Resume" button to restart copying';
}
