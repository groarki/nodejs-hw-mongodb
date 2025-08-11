export const notFoundHandler = (req, res, next) => {
  res.status.json({
    message: 'Route not found',
  });
};
