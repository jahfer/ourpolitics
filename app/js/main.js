/* @flow */
import {shopURL} from './config';
import * as React from 'react';
import {PolicyBreakdown} from './components/PolicyBreakdown';
import I18n from './util/i18n';

I18n.init('fr');

document.addEventListener('DOMContentLoaded', function() {
  React.render(
    <PolicyBreakdown url={`${shopURL}/app/data/policies/${I18n.locale}.json`} pollInterval={2000} />,
    document.getElementById('content')
  );
});
