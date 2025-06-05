import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";

/**
 * Application routing component.
 * 
 * This component sets up the main routes for the application using React Router.
 * Currently, it defines the root route (`/`) that renders the `Home` component.
 * 
 * Additional routes can be easily added within the `<Routes>` component.
 * 
 * @returns {JSX.Element} The routing component, encapsulating the `Router` and defined routes.
 * 
 * @example
 * // Example usage:
 * // In your main file, add AppRouter to render the routes:
 * // <AppRouter />
 */
const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
