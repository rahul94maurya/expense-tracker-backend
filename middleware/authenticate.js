const jwt = require("jsonwebtoken");
const User = require("../modal/user");
const ApiError = require("../utils/ApiError");

exports.authenticate = async (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
      return next(new ApiError("Not authenticated", 401));
    }
    const [scheme, token] = authHeader.split(" ");
    if (scheme !== "Bearer" || !token) {
      return next(new ApiError("Invalid authorization header", 401));
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedToken.userId)
      .select("-password -__v -createdAt -updatedAt")
      .lean();

    if (!user) {
      return next(new ApiError("User not found", 404));
    }
    if (user.isActive === false || user.deletedAt) {
      return next(new ApiError("Account is inactive", 403));
    }
    req.user = user;
    next();
  } catch (error) {
    if (
      error instanceof jwt.TokenExpiredError ||
      error instanceof jwt.JsonWebTokenError ||
      error instanceof jwt.NotBeforeError
    ) {
      return next(new ApiError("Invalid or expired token", 401));
    }
    next(error);
  }
};
