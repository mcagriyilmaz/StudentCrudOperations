//import logo from './logo.svg';
import './App.css';
import { BrowserRouter} from "react-router-dom";
import {Routes} from "react-router-dom";
import {Route} from "react-router-dom";
import ListStudentComponent from './components/ListStudentComponent'
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateStudentComp from './components/CreateStudentComp';
import ViewStudentComponent from './components/ViewStudentComponent';


function App() {
  return (
    <div>
      <BrowserRouter>
      <HeaderComponent/>
      <div className='container'>
        <Routes>
          <Route path='/' element={<ListStudentComponent/>}/>
          <Route path='/students' element={<ListStudentComponent/>}/>
          <Route path='/add-student/:id' element={<CreateStudentComp/>}/>
          <Route path='/view-student/:id' element={<ViewStudentComponent/>}/>
        </Routes>
        
      </div>
      
      
      </BrowserRouter>
  </div>
  );
}

export default App;
