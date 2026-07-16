const {
  User,
  Role,
} = require("../models");


const requireAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(
      req.user.userId,
      {
        include: [
          {
            model: Role,
            as: "roles",

            attributes: [
              "id",
              "role_name",
            ],

            through: {
              attributes: [],
            },
          },
        ],
      }
    );


    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy user",
      });
    }

    const isAdmin = user.roles.some(
      (role) => role.role_name === "Admin"
    );

    if (!isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Bạn không có quyền thực hiện chức năng này",
      });
    }


    next();

  } catch (error) {
    console.error("Role middleware error:", error);

    return res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
};


module.exports = {
  requireAdmin,
};