import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TemplateEditor from './components/TemplateEditor';
import TemplateList from './components/TemplateList ';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TemplateList/>} />
        <Route path="/editor/:id" element={<TemplateEditor/>} />
        <Route path="/editor" element={<TemplateEditor/>} />
      </Routes>
    </Router>
  );
}

export default App;
