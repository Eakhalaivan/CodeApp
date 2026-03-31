import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';

const Landing = lazy(() => import('./pages/Landing').then(m => ({ default: m.Landing })));
const ProblemList = lazy(() => import('./pages/ProblemList').then(m => ({ default: m.ProblemList })));
const ProblemDetail = lazy(() => import('./pages/ProblemDetail').then(m => ({ default: m.ProblemDetail })));
const MaterialList = lazy(() => import('./pages/MaterialList').then(m => ({ default: m.MaterialList })));
const MaterialDetail = lazy(() => import('./pages/MaterialDetail').then(m => ({ default: m.MaterialDetail })));
const Dashboard = lazy(() => import('./pages/Dashboard').then(m => ({ default: m.Dashboard })));
const Login = lazy(() => import('./pages/Login').then(m => ({ default: m.Login })));
const Signup = lazy(() => import('./pages/Signup').then(m => ({ default: m.Signup })));
const Leaderboard = lazy(() => import('./pages/Leaderboard').then(m => ({ default: m.Leaderboard })));
const Settings = lazy(() => import('./pages/Settings').then(m => ({ default: m.Settings })));
const CodingMethod = lazy(() => import('./pages/CodingMethod').then(m => ({ default: m.CodingMethod })));
const RoadmapList = lazy(() => import('./pages/RoadmapList').then(m => ({ default: m.RoadmapList })));
const RoadmapDetail = lazy(() => import('./pages/RoadmapDetail').then(m => ({ default: m.RoadmapDetail })));

function App() {
  return (
    <Router>
      <Suspense fallback={
        <div className="h-screen w-full bg-slate-950 flex items-center justify-center">
           <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
        </div>
      }>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/problems" element={<ProblemList />} />
            <Route path="/problems/:id" element={<ProblemDetail />} />
            <Route path="/materials" element={<MaterialList />} />
            <Route path="/materials/:id" element={<MaterialDetail />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/coding-method" element={<CodingMethod />} />
            <Route path="/roadmaps" element={<RoadmapList />} />
            <Route path="/roadmaps/:id" element={<RoadmapDetail />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
