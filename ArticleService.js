export class Article {
  constructor({ title, content, writer, likeCount = 0, createdAt = null }) {
    this.title = title;
    this.content = content;
    this.writer = writer;
    this.likeCount = likeCount;
    this.createdAt = createdAt || new Date().toISOString();
  }
  like() {
    this.likeCount += 1;
  }
}

const BASE_URL = "https://panda-market-api-crud.vercel.app/api/articles";

// GET - Article 리스트 (page, pageSize, keyword)
export function getArticleList({ page = 1, pageSize = 10, keyword = "" } = {}) {
  const url = `${BASE_URL}?page=${page}&pageSize=${pageSize}&keyword=${encodeURIComponent(keyword)}`;
  return fetch(url)
    .then(res => {
      if (!res.ok) throw new Error(`게시글 리스트 조회 실패: ${res.status}`);
      return res.json();
    })
    .then(data => data.articles)
    .catch(e => {
      console.error(e.message);
      return [];
    });
}

// GET - 특정 Article
export function getArticle(id) {
  return fetch(`${BASE_URL}/${id}`)
    .then(res => {
      if (!res.ok) throw new Error(`게시글 조회 실패: ${res.status}`);
      return res.json();
    })
    .catch(e => {
      console.error(e.message);
      return null;
    });
}

// POST - Article 생성
export function createArticle({ title, content, image }) {
  return fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content, image }),
  })
    .then(res => {
      if (!res.ok) throw new Error(`게시글 생성 실패: ${res.status}`);
      return res.json();
    })
    .catch(e => {
      console.error(e.message);
      return null;
    });
}

// PATCH - Article 수정
export function patchArticle(id, data) {
  return fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then(res => {
      if (!res.ok) throw new Error(`게시글 수정 실패: ${res.status}`);
      return res.json();
    })
    .catch(e => {
      console.error(e.message);
      return null;
    });
}

// DELETE - Article 삭제
export function deleteArticle(id) {
  return fetch(`${BASE_URL}/${id}`, { method: "DELETE" })
    .then(res => {
      if (!res.ok) throw new Error(`게시글 삭제 실패: ${res.status}`);
      return true;
    })
    .catch(e => {
      console.error(e.message);
      return false;
    });
}