import Home from "./pages/home/home";
import Login from "./pages/login/login";
import List from "./pages/list/list";
import Single from "./pages/single/single";
import Products from "./pages/products/products";
import Single_product from "./pages/products/single_product";
import Update_Product from "./pages/products/update_product";
import New from "./pages/new/new";
import { BrowserRouter, Routes, Route} from "react-router-dom";

import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import Suppliers from "./pages/suppliers/suppliers";
import Change_password from "./pages/password_change/change_password";
import Viewsupplier from "./pages/suppliers/view_supplier";
import Orders from "./pages/orders/orders";
import Bussiness from "./pages/business/business";
import Create_bussiness_type from "./pages/Business_type/Create_bussiness_type";
import Catagories from "./pages/products/catagories";
import New_catagory from "./pages/products/new_catagory";
import Product_types from "./pages/products/product_type";
import New_type from "./pages/products/new_type";
import New_product from "./pages/products/new_product";
import Order_assign from "./pages/orders/assign_order";
import Delivery from "./pages/delivery/delivery_view";
import New_delivery from "./pages/delivery/new_delivery";
import Setting from "./pages/setting/setting";
import Report from "./pages/report/report";
import Updatecatagory from "./pages/products/update_catagory";
import UpdateType from "./pages/products/update_type";
import UpdateBussinessType from "./pages/business/update_bussiness_type";
import Auth from "./pages/Auth";
import Detail from "./pages/delivery/detail";
function App() {
  const { darkMode } = useContext(DarkModeContext);
  
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
          <Route index element={<Login />} />
            <Route name="home" path="home" element={  <Home />  } />
            </Route>


            <Route path="users">
              <Route index element={ <List /> } />
              <Route name="user" path=":userid" element={ <Single /> } />
              <Route name="user" path=":userid/delete" element={ <Single /> } />
            </Route>
            <Route path="suppliers">
            <Route index element={ <Suppliers />  } />
            <Route name="supplier" path=":userid" element={  <Viewsupplier  />  }    />
            <Route name="supplier" path="new" element={  <New /> } />
            <Route name="supplier" path="business" element={  <Bussiness type="business_type"/>  } />
            <Route name="supplier" path="business/:typeId" element={  <UpdateBussinessType/>  } />
            <Route name="supplier" path="business/create" element={ <Create_bussiness_type/> } />
            
           </Route>
            <Route path="products">
              <Route index element={<Products />} />
              <Route name="product" path="new" element={ <New_product />  }/>
              <Route name="product" path=":productId" element={<Single_product  />  }    />
              <Route name="product" path="catagory" element={ <Catagories />  }/>
              <Route name="product" path="product_types" element={  <Product_types />  }/>
              <Route name="product" path="product_types/new" element={  <New_type />  }/>
              <Route name="product" path="catagory/new" element={ <New_catagory />  }/>
              <Route name="product" path="catagory/:catagoryId" element={ <Updatecatagory />  } />
              <Route name="product" path="product_types/:typeId" element={  <UpdateType />  } />
              <Route name="product" path=":productId/update" element={  <Update_Product />  } />
              
                
            </Route>

            <Route path="orders">
              <Route index element={  <Orders /> } />
              <Route path=":orderId" element={ <Single /> } />
              <Route path=":orderId/assign" element={ <Order_assign /> } />
              {/* <Route
                path="new"
                element={ <New inputs={productInputs} title="Add New Product" /> }
              /> */}
            </Route>
            <Route path="delivery">
              <Route index element={<Delivery />} />
              <Route name="delivery" path=":userid" element={ <Detail /> } />
              <Route path="new" element={<New_delivery />} />
            </Route>
            <Route path="setting">
              <Route index element={ <Setting /> } />
              <Route path="change_password" element={ <Change_password /> } />
            </Route>
            <Route path="report">
              <Route index element={ <Report /> } />
            </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;