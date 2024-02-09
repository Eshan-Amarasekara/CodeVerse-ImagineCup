import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styles from './style';

import {
  Navbar,
  Hero,
  Business,
  Testimonials,
  Footer,
  Education,
  EducationMode,
  BusinessMode,
  UploadImageForm,
  Services
} from './components';

const App = () => (
  <Router>
    <div className="bg-primary w-full overflow-hidden">


      <Routes>
        <Route
          path="/"
          element={
            <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
              <div className={`${styles.boxWidth}`}>
                <Navbar/>
                <Hero/>
                <Education />
                <Business />
                <UploadImageForm/>
                <Testimonials />
                <Services/>
                <Footer />
              </div>
            </div>
          }
        />
        <Route path="/EducationMode" element={<EducationMode />} />
        <Route path="/BusinessMode" element={<BusinessMode />} />
        
      </Routes>
    </div>
  </Router>
);

export default App;
