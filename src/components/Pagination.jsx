import { getProducts } from "../services/apiProducts";

function Pagination({ pageInfo, setProducts, setPageInfo }) {
  console.log(pageInfo);
  async function handlePageChange(page) {
    const data = await getProducts(page);
    if (data === null) return;
    setProducts(data.products);
    setPageInfo(data.pagination);
  }

  return (
    <div className="d-flex justify-content-center">
      <nav>
        <ul className="pagination">
          <li className="page-item">
            <a
              onClick={() => handlePageChange(pageInfo?.current_page - 1)}
              className={`page-link ${!pageInfo?.has_pre && `disabled`}`}
              href="#"
            >
              上一頁
            </a>
          </li>
          {Array.from(
            { length: pageInfo?.total_pages },
            (_, index) => index + 1
          ).map((el) => (
            <li className="page-item" key={el}>
              <a
                onClick={() => handlePageChange(el)}
                className={`page-link ${
                  el === pageInfo?.current_page && `active`
                }`}
                href="#"
              >
                {el}
              </a>
            </li>
          ))}
          <li className="page-item">
            <a
              onClick={() => handlePageChange(pageInfo?.current_page + 1)}
              className={`page-link ${!pageInfo?.has_next && `disabled`}`}
              href="#"
            >
              下一頁
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Pagination;
