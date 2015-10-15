import {shopURL} from './config';
import * as React from 'react';
import {PolicyBreakdown} from './components/PolicyBreakdown';
import I18n from './util/i18n';
import HistoryStore from './stores/HistoryStore';
import HistoryActions from './actions/HistoryActions';
import PolicyActions from './actions/PolicyActions';

document.addEventListener('DOMContentLoaded', function() {
  let userLang = HistoryStore.currentLocale();
  if (!userLang) {
    userLang = (navigator.language || navigator.browserLanguage).split('-')[0];
  }

  I18n.init(userLang);
  HistoryStore.navigateToRoot();
  HistoryActions.localeChanged.listen(renderContent);
  renderContent();
});

function renderContent() {
  PolicyActions.loadPolicies(`${shopURL}/app/data/policies/${I18n.locale}.json`);

  React.render(
    <PolicyBreakdown pollInterval={2000} />,
    document.getElementById('content')
  );
}