const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

const {
  sequelize,
  User,
  Role,
} = require("../models");

const register = async (req, res) => {
  let transaction;

  try {
    const {
      username,
      usermail,
      password,
    } = req.body;

    // Chuẩn hóa dữ liệu
    const cleanUsername = username?.trim();
    const cleanUsermail = usermail
      ?.trim()
      .toLowerCase();

    // Kiểm tra dữ liệu bắt buộc
    if (
      !cleanUsername ||
      !cleanUsermail ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Vui lòng nhập username, usermail và password",
      });
    }

    // Kiểm tra độ dài mật khẩu
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message:
          "Password phải có ít nhất 6 ký tự",
      });
    }

    transaction =
      await sequelize.transaction();

    // Kiểm tra username hoặc email đã tồn tại
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [
          {
            username: cleanUsername,
          },
          {
            usermail: cleanUsermail,
          },
        ],
      },

      transaction,
    });

    if (existingUser) {
      await transaction.rollback();

      return res.status(409).json({
        success: false,
        message:
          "Username hoặc email đã tồn tại",
      });
    }

    // Tìm quyền Viewer
    const viewerRole = await Role.findOne({
      where: {
        role_name: "Viewer",
      },

      transaction,
    });

    if (!viewerRole) {
      await transaction.rollback();

      return res.status(500).json({
        success: false,
        message:
          "Không tìm thấy quyền Viewer trong database",
      });
    }

    // Mã hóa password
    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    // Tạo user mới
    const newUser = await User.create(
      {
        username: cleanUsername,
        usermail: cleanUsermail,
        password: hashedPassword,
      },

      {
        transaction,
      }
    );

    // Gán quyền Viewer
    await newUser.addRole(
      viewerRole,
      {
        transaction,
      }
    );

    await transaction.commit();

    return res.status(201).json({
      success: true,
      message:
        "Đăng ký tài khoản thành công",

      data: {
        user: {
          id: newUser.id,
          username: newUser.username,
          usermail: newUser.usermail,
          roles: ["Viewer"],
        },
      },
    });
  } catch (error) {
    if (
      transaction &&
      !transaction.finished
    ) {
      await transaction.rollback();
    }

    console.error(
      "Register error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;


    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng nhập username và password",
      });
    }


    const user = await User.findOne({
      where: {
        username: username,
      },

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
    });


    // 4. Không tìm thấy user
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Username hoặc password không đúng",
      });
    }


    // 5. So sánh password
    const passwordCorrect = await bcrypt.compare(
      password,
      user.password
    );


    // 6. Password sai
    if (!passwordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Username hoặc password không đúng",
      });
    }


    // 7. Tạo JWT
    const token = jwt.sign(
      {
        userId: user.id,
      },

      process.env.JWT_SECRET,

      {
        expiresIn:
          process.env.JWT_EXPIRES_IN || "1d",
      }
    );


    // 8. Trả response
    return res.status(200).json({
      success: true,

      message: "Đăng nhập thành công",

      data: {
        token: token,

        user: {
          id: user.id,
          username: user.username,
          usermail: user.usermail,

          roles: user.roles.map((role) => {
            return role.role_name;
          }),
        },
      },
    });

  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await User.findByPk(
      req.user.userId,
      {
        attributes: {
          exclude: ["password"],
        },

        include: [
          {
            model: Role,
            as: "roles",

            attributes: [
              "id",
              "role_name",
              "description",
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

    return res.status(200).json({
      success: true,
      message: "Lấy thông tin user thành công",
      data: user,
    });

  } catch (error) {
    console.error("Get me error:", error);

    return res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
};

module.exports = {
  register,
  login,
  getMe,
};