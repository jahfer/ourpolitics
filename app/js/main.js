/* @flow */
import {shopURL} from './config';
import React from 'react';
import OurPolitics from './components/OurPolitics';

document.addEventListener('DOMContentLoaded', function() {
  React.render(
    <OurPolitics url={`${shopURL}/app/data/policies.json`} />,
    document.getElementById('content')
  );
});
