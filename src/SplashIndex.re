[@react.component]
let make = () => {
  <>
    <h1>"Hello world!"->React.string</h1>
    <ul>
      <li>
        <a href="#" onClick={ _ => ReasonReactRouter.push("/policies") }>"Policies (2019)"->React.string</a>
      </li>
    </ul>
  </>
}