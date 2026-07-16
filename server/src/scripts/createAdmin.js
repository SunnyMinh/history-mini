const bcrypt = require("bcryptjs");

const {
  sequelize,
  User,
  Role,
  UserRole,
} = require("../models");


async function createAdmin() {
  try {
    await sequelize.authenticate();

    console.log("✅ Kết nối PostgreSQL thành công");

    const existingAdmin = await User.findOne({
      where: {
        username: "admin",
      },
    });


    if (existingAdmin) {
      console.log("⚠️ User admin đã tồn tại");
      return;
    }


    const hashedPassword = await bcrypt.hash(
      "123456",
      10
    );


    const adminUser = await User.create({
      username: "admin",
      password: hashedPassword,
      usermail: "admin@gmail.com",
    });


    console.log("✅ Đã tạo user admin");

    const adminRole = await Role.findOne({
      where: {
        role_name: "Admin",
      },
    });


    if (!adminRole) {
      throw new Error(
        "Không tìm thấy role Admin trong bảng roles"
      );
    }


    await UserRole.create({
      user_id: adminUser.id,
      role_id: adminRole.id,
    });


    console.log("✅ Đã gán role Admin");
    console.log("");
    console.log("Tài khoản test:");
    console.log("username: admin");
    console.log("password: 123456");

  } catch (error) {
    console.error("❌ Có lỗi xảy ra:");
    console.error(error);

  } finally {
    await sequelize.close();
  }
}


createAdmin();