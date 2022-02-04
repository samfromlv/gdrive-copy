/**
 * Represents the options sent from the front end client when initiating a copy
 */
type FrontEndOptions = {
  srcFolderID: string;
  srcFolderName: string;
  srcParentID: string;
  destFolderName: string;
  copyPermissions: boolean;
  copyTo: string;
  destParentID: string;
  destId?: string;
  spreadsheetId?: string;
  propertiesDocId?: string;
  leftovers?: gapi.client.drive.FileListResource;
  folderIdMap?: object;
  remaining?: string[];
  timeZone?: string;
  destFolderId?: string;
};

type ChangeOwnerFrontEndOptions = {
  logFolderID: string;
  logFolderName: string;
  srcFolderID: string;
  srcFolderName: string;
  newOwnerEmail: string;
  followShortcuts: boolean;
  removePermissions: boolean;
  spreadsheetId?: string;
  propertiesDocId?: string;
  leftovers?: gapi.client.drive.FileListResource;
  remaining?: string[];
  timeZone?: string;
};

/**
 * Drive must be declared since we aren't using the gapi library but using it for typings
 */
declare namespace Drive {
  const Files: gapi.client.drive.files;
  const Permissions: gapi.client.drive.PermissionsResource;
}
