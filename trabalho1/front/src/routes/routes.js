import { createBrowserRouter } from "react-router-dom";

import LoginComponent from '../pages/login'
import SignupComponent from '../pages/signup'
import ListComponent from '../pages/list'

function NoMatch() {
    return (
      <div style={{ padding: 20 }}>
        <h2>404: Page Not Found</h2>
      </div>
    );
  }

const router = createBrowserRouter([
    {
      path: "/",
      element: <ListComponent />,
    },
    {
      path: "/list",
      element: <ListComponent />,
    },
    {
      path: "/login",
      element: <LoginComponent />,
    },
    {
      path: "/signup",
      element: <SignupComponent />,
    },
    {
      path: "*",
      element: <NoMatch />,
    },
]);

export { router };