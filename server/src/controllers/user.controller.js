const bcrypt = require("bcryptjs");

const {
  sequelize,
  User,
  Role,
  UserRole,
} = require("../models");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
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

      order: [
        ["id", "ASC"],
      ],
    });


    return res.status(200).json({
      success: true,
      message: "Lấy danh sách user thành công",
      data: users,
    });

  } catch (error) {
    console.error(
      "Get all users error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
};


const getUserById = async (req, res) => {
  try {
    const { id } = req.params;


    const user = await User.findByPk(id, {
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
    });


    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy user",
      });
    }


    return res.status(200).json({
      success: true,
      message: "Lấy user thành công",
      data: user,
    });

  } catch (error) {
    console.error(
      "Get user by id error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
};

const createUser = async (req, res) => {
  try {
    const {
      username,
      password,
      usermail,
      role_name,
    } = req.body;

    if (
      !username ||
      !password ||
      !role_name
    ) {
      return res.status(400).json({
        success: false,
        message:
          "username, password và role_name là bắt buộc",
      });
    }

    const existingUser = await User.findOne({
      where: {
        username,
      },
    });


    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Username đã tồn tại",
      });
    }

    const role = await Role.findOne({
      where: {
        role_name,
      },
    });


    if (!role) {
      return res.status(404).json({
        success: false,
        message: "Role không tồn tại",
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const result = await sequelize.transaction(
      async (transaction) => {

        const user = await User.create(
          {
            username,
            password: hashedPassword,
            usermail,
          },
          {
            transaction,
          }
        );


        await UserRole.create(
          {
            user_id: user.id,
            role_id: role.id,
          },
          {
            transaction,
          }
        );


        return user;
      }
    );


    const createdUser = await User.findByPk(
      result.id,
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
            ],

            through: {
              attributes: [],
            },
          },
        ],
      }
    );


    return res.status(201).json({
      success: true,
      message: "Tạo user thành công",
      data: createdUser,
    });

  } catch (error) {
    console.error(
      "Create user error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
};



module.exports = {
  getAllUsers,
  getUserById,
  createUser,
};