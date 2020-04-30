import React from "react";
import { useParams } from "../react-router";
import { ExampleType, ExampleMap } from "../example";

import { Form, FormMode, FormData } from "../smartmarkers-lib";
import { View } from "native-base";

interface RouteParams {
  example: string;
}

const SurveyWizardScreen: React.FC<any> = (props) => {
  const { example } = useParams<RouteParams>();
  const questionnaireData = ExampleMap[example as ExampleType];

  const onSubmit = (formData: FormData) => {
    console.log({ formData });
    alert(JSON.stringify(formData));
  };

  return (
    <View>
      <Form
        questionnaire={questionnaireData}
        mode={FormMode.Wizard}
        onSubmit={onSubmit}
      />
    </View>
  );
};

export default SurveyWizardScreen;
