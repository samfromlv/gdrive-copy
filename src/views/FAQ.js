'use strict';

import React from 'react';
import Warning from '../components/icons/Warning';

export default function FAQ() {
  return (
    <main className="doc">
      <h2>FAQ</h2>
      <a name="top" />
      <ul>
        <li>
          <a href="#longerThan2Mins">
            The copying has been paused longer than 2 minutes and it isn't
            complete. What do I do?
          </a>
        </li>
        <li>
          <a href="#copyBetweenDomains">
            Can I use this app to copy a folder between domains?
          </a>
        </li>
        <li>
          <a href="#whenIsItDone">How do I know when it is done?</a>
        </li>
        <li>
          <a href="#notEverythingCopied">
            It didn't copy everything - what do I do?
          </a>
        </li>
        <li>
          <a href="#multipleAccounts">
            How do I sign into a different account with this app?
          </a>
        </li>
        <li>
          <a href="#infiniteLoop">
            HELP! The copying is stuck in an infinite loop! What do I do?
          </a>
        </li>
        <li>
          <a href="#uninstall">
            How do I uninstall the app and remove all permissions?
          </a>
        </li>
        <li>
          <a href="#teamdrives">Does this app support Team Drives?</a>
        </li>
      </ul>
      <h3>
        <a name="longerThan2Mins" />
        The copying has been paused longer than 2 minutes and it isn't complete.
        What do I do?
      </h3>
      <div>
        When the app stops, you can use the "Resume" button to restart the
        copying. When selecting the folder to resume, you must select the{' '}
        <b>in-progress</b> folder, <b>not</b> the original.
        <br />
        <br />
        For example, if you are creating a copy of "Folder A" called "Copy of
        Folder A", you should select "Copy of Folder A" when you resume the
        copying. Selecting the original folder will return an error.
      </div>
      <a href="#top">Top</a>
      <h3>
        <a name="copyBetweenDomains" />
        Can I use this app to copy a folder between domains?
      </h3>
      <div>
        Yes! Follow the steps below:
        <ol>
          <li>Log into the account that owns the folder ("Account 1")</li>
          <li>
            Share the folder with the domain to which you'd like to copy
            ("Account 2")
          </li>
          <li>Open an private/incognito window and log into Account 2</li>
          <li>
            Go to the "Shared with me" section, right click the folder, and
            select "Add to Drive"
          </li>
          <li>Open the app, and select the folder that has been shared</li>
          <li>Create a copy and Account 2 will now be the owner</li>
        </ol>
      </div>
      <a href="#top">Top</a>
      <h3>
        <a name="whenIsItDone" />
        How do I know when it is done?
      </h3>
      <div>
        You will know it is complete when the Operation Log says "Complete" in cell
        C2. In addition, the cell will highlight green.
      </div>
      <a href="#top">Top</a>
      <h3>
        <a name="notEverythingCopied" />
        It didn't copy everything - what do I do?
      </h3>
      <div>
        Typically this is due to server errors encountered while copying. You
        should be able to do one of the following to resolve this situation:
        <ol>
          <li>
            Audit the Operation Log for any errors, and manually copy those files
          </li>
          <li>
            Restart the copy process. Typically, it is best if you wait a few
            hours if you ran into significant copying errors
          </li>
        </ol>
      </div>
      <a href="#top">Top</a>
      <h3>
        <a name="multipleAccounts" />
        How do I sign into a different account with this app?
      </h3>
      <div>
        There isn't a handy Account Switcher like you'll find in native Google
        Apps. However, you can try to use the link at the top of the page which
        should re-direct you and allow you to sign if from a different account.
        <br />
        <br />
        If that fails, I would recommend signing in from another browser, or
        opening an incognito/private window and accessing the app that way.
      </div>
      <a href="#top">Top</a>
      <h3>
        <a name="infiniteLoop" />
        HELP! The copying is stuck in an infinite loop! What do I do?
      </h3>
      <div>
        Please use the "Pause" function built into the app and open an{' '}
        <a
          className="github-button"
          href="https://github.com/samfromlv/gdrive-copy/issues"
          aria-label="Issue ericyd/gdrive-copy on GitHub"
          target="_blank"
        >
          <Warning /> Issue
        </a>{' '}
      </div>
      <a href="#top">Top</a>
      <h3>
        <a name="uninstall" />
        How do I uninstall the app and remove all permissions?
      </h3>
      <div>
        To quote{' '}
        <a href="https://webapps.stackexchange.com/a/30849">
          the excellent answer on stackexchange:
        </a>
        <ol>
          <li>
            Go to <a href="https://accounts.google.com">accounts.google.com</a>
          </li>
          <li>
            Under "Sign-in &amp; security" tab click "Connected apps &amp;
            sites"
          </li>
          <li>
            Under the section "Apps connected to your account", click on MANAGE
            APPS:
          </li>
          <li>Select app you want &amp; click REMOVE button</li>
        </ol>
      </div>
      <a href="#top">Top</a>

      <h3>
        <a name="teamdrives" />
        Does this app support Team Drives?
      </h3>
      <div>No.</div>
      <a href="#top">Top</a>
    </main>
  );
}
