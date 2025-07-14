import {
  Product,
  ElectronicProduct,
  getProductList,
  getProduct,
  createProduct,
  patchProduct,
  deleteProduct,
} from "./ProductService.js";

import {
  Article,
  getArticleList,
  getArticle,
  createArticle,
  patchArticle,
  deleteArticle,
} from "./ArticleService.js";

// === 상품 리스트 가져오기 및 인스턴스 확인 ===
(async () => {
  const products = await getProductList({ page: 1, pageSize: 5 });
  console.log("상품 인스턴스 배열:", products);
  products.forEach(prod => {
    console.log(
      prod instanceof ElectronicProduct
        ? `[전자제품] ${prod.name} - 제조사: ${prod.manufacturer}`
        : `[일반상품] ${prod.name}`
    );
  });

  // 상품 생성 테스트
  const newProd = await createProduct({
    name: "테스트 상품",
    description: "테스트 설명",
    price: 10000,
    tags: ["테스트", "전자제품"],
    images: ["https://img.com/1.jpg"],
  });
  console.log("생성된 상품:", newProd);

  // favorite 테스트
  if (products.length > 0) {
    products[0].favorite();
    console.log("favorite() 후 찜 수:", products[0].favoriteCount);
  }
})();

// === 게시글 리스트 가져오기 및 인스턴스 확인 ===
getArticleList({ page: 1, pageSize: 5, keyword: "" }).then(articles => {
  console.log("게시글 리스트:", articles);

  // Article 인스턴스 생성 및 like() 테스트
  if (articles.length > 0) {
    const articleObj = new Article({
      ...articles[0],
      writer: articles[0].writer || "익명",
    });
    articleObj.like();
    console.log("like() 후 좋아요 수:", articleObj.likeCount);
    console.log("생성일자:", articleObj.createdAt);
  }

  // 게시글 생성 테스트
  createArticle({
    title: "API 생성 테스트",
    content: "테스트 내용입니다",
    image: "https://img.com/test.jpg",
  }).then(created => {
    console.log("생성된 게시글:", created);
  });
});