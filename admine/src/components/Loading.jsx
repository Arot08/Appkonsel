export default function Loading({ show }) {
  if (!show) return null;

  return (
    <div
      className="container-loading z-[9999] flex items-center justify-center"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "#ffffffdb"
      }}
    >
      <div className="text-center">
        <div className="loader mb-2"></div>
        <p className="text-gray-700 font-medium">Processing...</p>
      </div>

      <style>{`
    .loader {
      width: 40px;
      height: 40px;
      border: 4px solid #ccc;
      border-top-color: #007bff;
      border-radius: 50%;
      animation: spin .8s linear infinite;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `}</style>
    </div>

  );
}
