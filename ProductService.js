export class Product {
  constructor({ name, description, price, tags, images, favoriteCount = 0 }) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.tags = tags || [];
    this.images = images || [];
    this.favoriteCount = favoriteCount;
  }
  favorite() {
    this.favoriteCount += 1;
  }
}

// ElectronicProduct 클래스 (상속)
export class ElectronicProduct extends Product {
  constructor({ manufacturer, ...rest }) {
    super(rest);
    this.manufacturer = manufacturer || '알 수 없음';
  }
}

// Product API 함수
const BASE_URL = "https://panda-market-api-crud.vercel.app/api/products";

// 상품 리스트 가져오기 (async/await, try/catch, 다형성)
export async function getProductList({ page = 1, pageSize = 10, keyword = "" } = {}) {
  try {
    const url = `${BASE_URL}?page=${page}&pageSize=${pageSize}&keyword=${encodeURIComponent(keyword)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`상품 리스트 조회 실패: ${res.status}`);
    const { products } = await res.json();

    // products 배열로 인스턴스화 (다형성)
    return products.map(prod => {
      if (prod.tags && prod.tags.includes("전자제품")) {
        return new ElectronicProduct(prod);
      }
      return new Product(prod);
    });
  } catch (e) {
    console.error(e.message);
    return [];
  }
}

export async function getProduct(id) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`);
    if (!res.ok) throw new Error(`상품 조회 실패: ${res.status}`);
    return await res.json();
  } catch (e) {
    console.error(e.message);
    return null;
  }
}

export async function createProduct({ name, description, price, tags = [], images = [] }) {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description, price, tags, images }),
    });
    if (!res.ok) throw new Error(`상품 생성 실패: ${res.status}`);
    return await res.json();
  } catch (e) {
    console.error(e.message);
    return null;
  }
}

export async function patchProduct(id, data) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`상품 수정 실패: ${res.status}`);
    return await res.json();
  } catch (e) {
    console.error(e.message);
    return null;
  }
}

export async function deleteProduct(id) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error(`상품 삭제 실패: ${res.status}`);
    return true;
  } catch (e) {
    console.error(e.message);
    return false;
  }
}