import { Thoughts } from "./components/Thoughts";
import "./index.css"

export const App = () => {
  return (
<>
    <div className="site-header">
        <h1>Share your Happy Thoughts</h1>
    </div>

    <div>
      <Thoughts />
    </div>
</>

  );
};