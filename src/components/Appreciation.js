/**
 * Holds three pre-defined list items:
 * - donate form button
 * - Star on github button
 * - rate and review link
 */
'use strict';

import React from 'react';
import Panel from './Panel';
import Star from './icons/Star';
import Divider from 'material-ui/Divider';

export default function Appreciation(props) {
  return (
    <Panel label="Want to show your appreciation?">
      <div className="list-item-large">
        If you'd like to show your support in the form
        of monetary contribution, please consider giving to
        <a href="https://www.paypal.com/donate/?business=MSLDZBZ8YLYJN&amp;no_recurring=0&amp;currency_code=EUR" target="_blank">Donate</a>
        .
      </div>
      <Divider />
      <div className="list-item-large">
        or, you can
        <a
          className="github-button"
          href="https://github.com/samfromlv/gdrive-copy"
          aria-label="Star ericyd/gdrive-copy on GitHub"
          target="_blank"
        >
          <Star width="1em" height="1em" /> Star
        </a>{' '}
        on Github
      </div>
    </Panel>
  );
}
