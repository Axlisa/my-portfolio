import { HashRouter } from "react-router-dom";
import { About, Contact, Experience, Hero, Navbar, Tech, Works, StarsCanvas, StudyExperiences } from "./components";
// Remove the problematic import
import Footer from "./components/Footer";
const App = () => {
  return (
    <HashRouter>
      <div className='relative z-0 bg-primary'>
        <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
          <Navbar />
          <Hero />
        </div>
        <About />
        <Experience />
        <Tech />
        <StudyExperiences /> {/* Added the StudyExperiences component */}
        <Works />
        <div className='relative z-0'>
          <Contact />
          <StarsCanvas />
          <Footer/>
        </div>
      </div>
    </HashRouter>
  );
}
export default App;
