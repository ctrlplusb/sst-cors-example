import axios, { Method } from "axios";
import React from "react";

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

enum Stage {
  Step1 = "Step1",
  Step2 = "Step2",
}

export default function App() {
  const [stage, setStage] = React.useState<Stage>(Stage.Step1);
  const [results, setResults] = React.useState<{
    failed: Method[];
    succeeded: Method[];
  } | null>(null);

  const onGetCookieClick = async () => {
    try {
      const response = await apiClient.get("/cookie-creator");
      if (response.status === 200) {
        setStage(Stage.Step2);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const onSendCookieClick = async () => {
    const failed: Method[] = [];
    const succeeded: Method[] = [];

    const tryMethod = async (method: Method) => {
      try {
        const response = await apiClient.request({
          method,
          url: "/cookie-handler",
        });
        if (
          response.status === 200 &&
          response.data.token === "the-token-value"
        ) {
          succeeded.push(method);
        } else {
          failed.push(method);
        }
      } catch (err) {
        console.error(`${method} failed: ${err}`);
        failed.push(method);
      }
    };

    await Promise.all([
      tryMethod("delete"),
      tryMethod("get"),
      tryMethod("patch"),
      tryMethod("post"),
      tryMethod("put"),
    ]);

    setResults({
      failed,
      succeeded,
    });
  };

  return (
    <div>
      <h1>SST CORS Debug</h1>

      {stage === Stage.Step1 && (
        <>
          <h2>Step 1: Make a request to get an HTTP Only cookie</h2>
          <p>
            <button onClick={onGetCookieClick}>Get Cookie</button>
          </p>
        </>
      )}

      {stage === Stage.Step2 && (
        <>
          <h2>
            Step 2: Make a request for each valid HTTP Method to ensure cookie
            is included
          </h2>
          <p>
            <button onClick={onSendCookieClick}>Send Cookie</button>
          </p>
          {results && (
            <code>
              <pre>{JSON.stringify(results, null, 2)}</pre>
            </code>
          )}
        </>
      )}
    </div>
  );
}
