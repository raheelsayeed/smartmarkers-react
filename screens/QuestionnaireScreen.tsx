import React from "react";
import { useParams, useHistory } from "../react-router";

import { useFhirContext } from "../smartmarkers-lib";
import { View, Spinner } from "native-base";

import { SessionWizard } from "../smartmarkers-lib/components/SessionWizard";
import { Task } from "../smartmarkers-lib/models/internal";

interface RouteParams {
  rid: string;
}

const QuestionnaireScreen: React.FC<any> = (props) => {
  const { rid } = useParams<RouteParams>();
  const history = useHistory();
  const { server } = useFhirContext();
  const [isReady, setIsReady] = React.useState(false);
  const [task, setTask] = React.useState<Task | null>(null);

  React.useEffect(() => {
    if (!isReady) {
      const loadItem = async () => {
        if (server) {
          const task = await server.getTaskByRequestId(rid);
          setTask(task);
        }
        setIsReady(true);
      };
      loadItem();
    }
  }, []);

  if (!isReady) {
    return <Spinner />;
  }

  if (task) {
    return (
      <SessionWizard
        tasks={[task]}
        onCompleted={() => history.push(`/dashboard`)}
      ></SessionWizard>
    );
  } else {
    return <View>Failed to load task</View>;
  }
};

export default QuestionnaireScreen;
