[@react.component]
let make = (~data: Schema.TopicMap.t(array(Schema.policy))) => {
  let policyRows = Schema.TopicMap.fold((topic, policies, lst) => {
    [<PolicyRow topic policies key={Strings.Topic.to_str(topic, ~language=I18n.EN)} />, ...lst]
  }, data, [])->Array.of_list;

  let language = React.useContext(LanguageContext.ctx);
  let t = Strings.Text.react_string(~language);
  let t_party = Strings.Party.react_string(~language);

  <div className="policyTable">
    <div className="policyRow tableHeader">
      <div className="policyCells">
        <div className="policyCell partyTitle backgroundColor--Empty">
          { t(Strings.title) }
        </div>
        <div className="policyCell partyTitle backgroundColor--NDP">
          { t_party(NDP) }
        </div>
        <div className="policyCell partyTitle backgroundColor--Conservatives">
          { t_party(Conservative) }
        </div>
        <div className="policyCell partyTitle backgroundColor--Liberals">
          { t_party(Liberal) }
        </div>
      </div>
    </div>
    <ul>
      { policyRows->React.array }
    </ul>
  </div>
};