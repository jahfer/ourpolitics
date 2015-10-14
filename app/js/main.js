import {shopURL} from './config';
import * as React from 'react';
import {PolicyBreakdown} from './components/PolicyBreakdown';
import I18n from './util/i18n';

const userLang = (navigator.language || navigator.browserLanguage).split('-')[0];
I18n.init(userLang);

document.addEventListener('DOMContentLoaded', function() {
  React.render(
    <PolicyBreakdown url={`${shopURL}/app/data/policies/${I18n.locale}.json`} pollInterval={2000} />,
    document.getElementById('content')
  );
});
