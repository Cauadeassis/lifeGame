module.exports = {
  pageExtensions: ["js", "jsx", "ts", "tsx"],
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://127.0.0.1:5000/api/:path*",
      },
    ];
  },
};
