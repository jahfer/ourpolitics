@react.component
let make = (~children: React.element) =>
  <aside className="banner">
    <div className="banner--content">
      children
    </div>
  </aside>