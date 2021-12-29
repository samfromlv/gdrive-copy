const FeatureFlag = {
  SKIP_DUPLICATE_ID: true,
  //SKIP_DUPLICATE_ID should be on for CREATE_SHORTCUTS_WHEN_DUPLICATE to work
  CREATE_SHORTCUTS_WHEN_DUPLICATE: true,
  REPLACE_DESCRIPTION_WITH_ORIGINAL_LINK: true,
  IS_GOOGLE_WORKSPACE: true,
  //If this flag is true and file or folder shortcut is found, copy of its target will be created.
  //In case multiple shortcuts reference same target, only first shorcut will create copy, other shorcuts will 
  //be ignored (SKIP_DUPLICATE_ID = true,  CREATE_SHORTCUTS_WHEN_DUPLICATE = false) or will
  //be copied as shorcuts that point to target copy (SKIP_DUPLICATE_ID = true,  CREATE_SHORTCUTS_WHEN_DUPLICATE = true)
  //In case both shorcut and target are both copied, it might happen that shorcut is processed first and will be replaced by target copy,
  //than target itself is processed and it will be replaced by shorcut. So in final result shorcut and taget will be flipped.
  CREATE_SHORTCUT_COPIES: true
};

export default FeatureFlag;
