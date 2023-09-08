import './preloading.css'
const Loading = ({ content }) => {
  return (
    <div className={content ? "loading-content" : "loading"}>
      <div className="spinner text-secondary" role="status"></div>
    </div>
  );
};
export default Loading;
