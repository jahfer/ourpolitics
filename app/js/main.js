/* @flow */
import {shopURL} from './config';
import * as React from 'react';
import {PolicyBreakdown} from './components/PolicyBreakdown';

document.addEventListener('DOMContentLoaded', function() {
  React.render(
    <PolicyBreakdown url={`${shopURL}/app/data/policies/en.json`} pollInterval={2000} />,
    document.getElementById('content')
  );
});
