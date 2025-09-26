import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import UserCard from "./components/UserCard";
import PostCard from "./components/PostCard";
import CommentCard from "./components/CommentCard";
import useFetchData from "./hooks/useFetchData";

export default function App() {
  const { users, posts, comments, fetchPosts, fetchComments, loading, error } =
    useFetchData();

  const [viewStack, setViewStack] = useState([{ view: "users" }]);
  const [layout, setLayout] = useState("grid");
  const [toDelete, setToDelete] = useState(null);

  const current = viewStack[viewStack.length - 1];

  const openUser = (user) => {
    fetchPosts(user.id);
    setViewStack([...viewStack, { view: "posts", user }]);
  };

  const openPost = (post) => {
    fetchComments(post.id);
    setViewStack([...viewStack, { view: "comments", post }]);
  };

  const popView = () => {
    if (viewStack.length > 1) {
      setViewStack(viewStack.slice(0, -1));
    }
  };

  const canGoBack = viewStack.length > 1;

  const handleDeleteComment = (comment) => setToDelete(comment);
  const confirmDelete = () => {
    if (toDelete) {
      comments[toDelete.postId] = comments[toDelete.postId].filter(
        (c) => c.id !== toDelete.id
      );
      setToDelete(null);
    }
  };
  const cancelDelete = () => setToDelete(null);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      <Header
        onToggleLayout={() => setLayout(layout === "grid" ? "list" : "grid")}
        layout={layout}
        onBack={popView}
        canGoBack={canGoBack}
      />

      <main className="flex-1 p-6">
        {loading && <div className="text-center p-6">Carregando...</div>}
        {error && <div className="text-red-600 mb-4">Erro: {error}</div>}

        {current.view === "users" && (
          <section>
            <h2 className="text-2xl mb-4">Usuários</h2>
            <div
              className={
                layout === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
                  : "flex flex-col gap-3"
              }
            >
              {users.map((u) => (
                <UserCard key={u.id} user={u} onClick={openUser} />
              ))}
            </div>
          </section>
        )}

        {current.view === "posts" && (
          <section>
            <h2 className="text-2xl mb-4">Posts de {current.user.name}</h2>
            <button
              className="px-3 py-1 rounded bg-slate-200 mb-4"
              onClick={popView}
            >
              Voltar para usuários
            </button>
            <div
              className={
                layout === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 gap-4"
                  : "flex flex-col gap-3"
              }
            >
              {posts.map((p) => (
                <PostCard key={p.id} post={p} onClick={openPost} />
              ))}
            </div>
          </section>
        )}

        {current.view === "comments" && (
          <section>
            <h2 className="text-2xl mb-4">Comentários</h2>
            <button
              className="px-3 py-1 rounded bg-slate-200 mb-4"
              onClick={popView}
            >
              Voltar para posts
            </button>
            <div className="flex flex-col gap-3">
              {(comments[current.post.id] || []).map((c) => (
                <CommentCard
                  key={c.id}
                  comment={c}
                  onDelete={handleDeleteComment}
                />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />

      {toDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
            <h3 className="text-lg font-semibold mb-2">Confirmar exclusão</h3>
            <p className="text-sm text-slate-600 mb-4">
              Tem certeza que deseja excluir este comentário?
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={cancelDelete}
                className="px-3 py-1 rounded border"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                className="px-3 py-1 rounded bg-red-500 text-white"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
