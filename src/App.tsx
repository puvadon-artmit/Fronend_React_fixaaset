import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './Home'
import Login from './Member/Login'
import store from '../../frontend/src/store/store';
import { Provider } from 'react-redux';
import Navigation from './component/Navigation';
import useMediaQuery from '@mui/material/useMediaQuery';
import Assets from './Assets/Assets';
import Category from './Category/Category';
import All_category from './Category/All_category';
import Aggregate_alldata from './Aggregate_data/Aggregate_alldata';
import Branch_template from './Template/Branch_template';
import Group_template from './Template/Group_template';
import Status_template from './Template/Status_template';
import Sacn from './ScanQR/Sacn';
import Test01 from './Test/Test01';
import Model_template from './Template/Model_template';
import Detail_Model_Template from './Template/Detail_Model_Template';
import Story_template from './Template/Story_template';
import Testposition from './Test/Testposition';
import Ground_template from './Template/Ground_template';
import Detail_Ground_template from './Template/Detail_Ground_template';
import Grondstory_template from './Template/Grondstory_template';
import Assets_template from './Template/Assets_template';
// import ScanAssets from './ScanQR/ScanAssets';
import Specific_assets from './Assets/Specific_assets';
import Specific_template from './Template/Specific_template';
import ScanAssets from './ScanQR/ScanAssets';

import {
  createTheme,
  ThemeProvider,
} from '@mui/material';

const theme = createTheme({
  typography: {
    fontFamily: 'Kanit, sans-serif',
  },
});

function App() {
  const isMobile = useMediaQuery('(min-width:600px)');

  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>

            <Routes>
              <Route path="/" element={<Login />}></Route>
              <Route path="/home" element={<Home />}></Route>
              <Route path="/assets" element={<Assets />}></Route>
              <Route path="/category" element={<Category />}></Route>
              <Route path="/scan-qrcode" element={<ScanAssets />}></Route>
              <Route path="/testposition" element={<Testposition />}></Route>
              <Route path="/category/all-category" element={<All_category />}></Route>
              <Route path="/category/all-category" element={<All_category />}></Route>
              <Route path="/allassets" element={<Assets_template />}></Route>
              <Route path="/assets/view_group" element={<Group_template />}></Route>
              <Route path="/assets/view_status" element={<Status_template />}></Route>
              <Route path="/assets/view_model/:category_id" element={<Model_template />}></Route>
              <Route path="/assets/view_ground" element={<Ground_template />}></Route>
              <Route path="/assets/view_model/detail_model/:item_model_id" element={<Detail_Model_Template />}></Route>
              <Route path="/assets/view_model/detail_ground/:ground_id" element={<Detail_Ground_template />}></Route>
              <Route path="/specific_assets/specific-data/:assets_id" element={<Specific_template />}></Route>
              <Route path="/sacn" element={<Sacn />}></Route>
              <Route path="/template_data/:category_id" element={<Assets />}></Route>
              <Route path="/template_data/story/:item_model_id" element={<Story_template />}></Route>
              <Route path="/template_data/grond-story/:ground_id" element={<Grondstory_template />}></Route>
              <Route path="/test01/:category_id" element={<Test01 />}></Route>
              <Route path="/aggregate_data/:category_id" element={<Aggregate_alldata />}></Route>
              <Route path="/specific_assets/:category_id" element={<Specific_assets />}></Route>
            </Routes>
            {!isMobile && (

              <Navigation />
            )}
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
