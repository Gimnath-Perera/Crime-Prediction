import { Scrollbars } from 'react-custom-scrollbars-2';

import Footer from './components/Footer';
import Form from './components/Form';
import Header from './components/Header';
import Hero from './components/Hero';
const App = () => {
  return (
    <Scrollbars>
      <Header />
      <div class='relative pt-[85px] lg:pt-[85px] pb-[85px] bg-white'>
        <div class='container'>
          <Hero />
          <Form />
        </div>
      </div>
      <Footer />
    </Scrollbars>
  );
};

export default App;
