/* @flow */

import * as React from "react";
import {PolicyBreakdown} from "./components/PolicyBreakdown"

document.addEventListener('DOMContentLoaded', function() {
  React.render(
    <PolicyBreakdown url="/data/policies.json" pollInterval={2000} />,
    document.getElementById('content')
  )
})
