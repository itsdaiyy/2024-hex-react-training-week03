import { useEffect, useRef, useState } from "react";
import { Modal } from "bootstrap";

import { getProducts } from "../services/apiProducts";

import ProductsListItem from "./ProductsListItem";
import AddProductModal from "./AddProductModal";
import DeleteProductModal from "./DeleteProductModal";
import Pagination from "./Pagination";

const defaultModalState = {
  imageUrl: "",
  title: "",
  category: "",
  unit: "",
  origin_price: "",
  price: "",
  description: "",
  content: "",
  is_enabled: 0,
  imagesUrl: [""],
};

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [modalMode, setModalMode] = useState(null);
  const [tempProduct, setTempProduct] = useState(defaultModalState);
  const [pageInfo, setPageInfo] = useState();

  const productModalRef = useRef(null);
  const deleteProductModalRef = useRef(null);

  // 載入產品
  useEffect(() => {
    const getData = async () => {
      const data = await getProducts();
      if (data === null) {
        setProducts([]);
        return;
      }

      const { products, pagination } = data;

      setProducts(products);
      setPageInfo(pagination);
    };
    getData();
  }, []);

  // 產品 Modal
  useEffect(() => {
    //  Modal 初始化
    new Modal(productModalRef.current);
    new Modal(deleteProductModalRef.current);
  }, []);

  // Open AddProductModal
  function handleOpenProductModal(mode, product) {
    setModalMode(mode);

    switch (mode) {
      case "edit":
        setTempProduct(product);
        break;

      case "create":
        setTempProduct(defaultModalState);
        break;

      default:
        break;
    }

    const modalInstance = Modal.getInstance(productModalRef.current);
    modalInstance.show();
  }

  // Close AddProductModal
  function handleCloseProductModal() {
    const modalInstance = Modal.getInstance(productModalRef.current);
    modalInstance.hide();
  }

  function handleOpenDeleteProductModal(product) {
    setTempProduct(product);
    const modalInstance = Modal.getInstance(deleteProductModalRef.current);
    modalInstance.show();
  }

  function handleCloseDeleteProductModal() {
    const modalInstance = Modal.getInstance(deleteProductModalRef.current);
    modalInstance.hide();
  }

  return (
    <>
      <div className="container py-4 px-5 border mb-4 text-end">
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={() => handleOpenProductModal("create")}
        >
          建立新的產品
        </button>
      </div>
      <div className="container py-5 px-4 border">
        <div className="row gy-5">
          <div className="col text-center row-gap-2">
            <h2 className="text-center mb-4">產品列表</h2>
            <table className="table align-middle">
              <thead>
                <tr>
                  <th scope="col">類別</th>
                  <th scope="col">產品名稱</th>
                  <th scope="col">原價</th>
                  <th scope="col">售價</th>
                  <th scope="col">是否啟用</th>
                  <th scope="col">編輯</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => {
                  return (
                    <ProductsListItem
                      key={product.id}
                      product={product}
                      onEdit={() => handleOpenProductModal("edit", product)}
                      onDelete={() => handleOpenDeleteProductModal(product)}
                      setProducts={setProducts}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="container my-4">
        <Pagination
          pageInfo={pageInfo}
          setProducts={setProducts}
          setPageInfo={setPageInfo}
        />
      </div>
      <AddProductModal
        tempProduct={tempProduct}
        setTempProduct={setTempProduct}
        productModalRef={productModalRef}
        onClose={handleCloseProductModal}
        modalMode={modalMode}
        setProducts={setProducts}
      />
      <DeleteProductModal
        tempProduct={tempProduct}
        deleteProductModalRef={deleteProductModalRef}
        setProducts={setProducts}
        onClose={handleCloseDeleteProductModal}
      />
    </>
  );
}

export default AdminDashboard;
