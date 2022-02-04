// An enum makes more sense here but the compiled enums don't play nicely with Google Apps Script
export default class Constants {
  static BaseCopyLogId = '1HARYvYFKNyYS72Sa-hi1b8oB9I5Wzg8cV1I47_iHf2s';
  static OperationLogFileName = 'Copy Folder Log';
  static PropertiesDocCopyTitle =
    'DO NOT DELETE OR MODIFY - will be deleted after operation completes';
  static PropertiesDocChangeOwnerPrefix=
    'DO NOT DELETE OR MODIFY - NewOwner{{';
  static PropertiesDocDescription =
    'This document will be deleted after the folder copy/change owner is complete. It is only used to store properties necessary to complete the procedure';
  static MaxRuntimeExceeded =
    'Script has reached daily maximum run time of 90 minutes. Script must pause for 24 hours to reset Google Quotas, and will resume at that time. For more information, please see https://developers.google.com/apps-script/guides/services/quotas';
  static SingleRunExceeded =
    'Paused due to Google quota limits - operation will resume in 8 minutes';
  static StartCopyingText = 'Started copying';
  static StartChangeOwnerText = 'Started change owner operation';
  static UserStoppedScript =
    'Stopped manually by user. Please use "Resume" button to restart copying';
}
