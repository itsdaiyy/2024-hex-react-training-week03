import { deleteProduct, getProducts } from "../services/apiProducts";

function DeleteProductModal({
  deleteProductModalRef,
  tempProduct,
  setProducts,
  onClose,
}) {
  async function handleDeleteProduct(id) {
    const res = await deleteProduct(id);
    if (res === null) return;

    onClose();

    const productsRes = await getProducts();
    if (productsRes === null) return;
    setProducts(productsRes.products);
  }

  return (
    <div
      className="modal fade"
      id="delProductModal"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      ref={deleteProductModalRef}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">刪除產品</h1>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            你是否要刪除
            <span className="text-danger fw-bold ms-2">
              {tempProduct.title}
            </span>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              取消
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => handleDeleteProduct(tempProduct.id)}
            >
              刪除
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteProductModal;
