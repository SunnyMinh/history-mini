const {
  Period,
  User,
} = require("../models");


// ==========================================
// GET ALL PERIODS
// GET /api/periods
// ==========================================

const getAllPeriods = async (req, res) => {
  try {
    const periods = await Period.findAll({
      include: [
        {
          model: User,
          as: "creator",

          attributes: [
            "id",
            "username",
          ],
        },
      ],

      order: [
        ["id", "ASC"],
      ],
    });


    return res.status(200).json({
      success: true,
      message: "Lấy danh sách period thành công",
      data: periods,
    });

  } catch (error) {
    console.error(
      "Get periods error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
};



// ==========================================
// CREATE PERIOD
// POST /api/periods
// ==========================================

const createPeriod = async (req, res) => {
  try {
    const {
      period_name,
      time_label,
    } = req.body;


    // Kiểm tra dữ liệu bắt buộc
    if (!period_name) {
      return res.status(400).json({
        success: false,
        message: "period_name là bắt buộc",
      });
    }


    // Tạo period mới
    const period = await Period.create({
      period_name: period_name,

      time_label: time_label,

      // Lấy userId từ JWT
      created_by: req.user.userId,
    });


    return res.status(201).json({
      success: true,
      message: "Tạo period thành công",
      data: period,
    });

  } catch (error) {
    console.error(
      "Create period error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
};

// ==========================================
// GET PERIOD BY ID
// GET /api/periods/:id
// ==========================================

const getPeriodById = async (req, res) => {
  try {
    // Lấy id trên URL
    const { id } = req.params;

    const period = await Period.findByPk(id, {
      include: [
        {
          model: User,
          as: "creator",
          attributes: [
            "id",
            "username",
          ],
        },
      ],
    });


    // Không tìm thấy period
    if (!period) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy period",
      });
    }


    return res.status(200).json({
      success: true,
      message: "Lấy period thành công",
      data: period,
    });

  } catch (error) {
    console.error(
      "Get period by id error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
};

// ==========================================
// UPDATE PERIOD
// PUT /api/periods/:id
// ==========================================

const updatePeriod = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      period_name,
      time_label,
    } = req.body;


    // 1. Tìm period
    const period = await Period.findByPk(id);


    // 2. Không tìm thấy
    if (!period) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy period",
      });
    }


    // 3. Không gửi dữ liệu nào để sửa
    if (
      period_name === undefined &&
      time_label === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "Không có dữ liệu để cập nhật",
      });
    }


    // 4. Nếu có period_name thì cập nhật
    if (period_name !== undefined) {
      if (!period_name.trim()) {
        return res.status(400).json({
          success: false,
          message: "period_name không được để trống",
        });
      }

      period.period_name = period_name;
    }


    // 5. Nếu có time_label thì cập nhật
    if (time_label !== undefined) {
      period.time_label = time_label;
    }


    // 6. Lưu xuống PostgreSQL
    await period.save();


    return res.status(200).json({
      success: true,
      message: "Cập nhật period thành công",
      data: period,
    });

  } catch (error) {
    console.error(
      "Update period error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
};

// ==========================================
// DELETE PERIOD
// DELETE /api/periods/:id
// ==========================================

const deletePeriod = async (req, res) => {
  try {
    const { id } = req.params;


    // 1. Tìm period
    const period = await Period.findByPk(id);


    // 2. Không tìm thấy
    if (!period) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy period",
      });
    }


    // 3. Xóa
    await period.destroy();


    return res.status(200).json({
      success: true,
      message: "Xóa period thành công",
    });

  } catch (error) {
    console.error(
      "Delete period error:",
      error
    );


    // Period có Event và FK không cho xóa
    if (
      error.name ===
      "SequelizeForeignKeyConstraintError"
    ) {
      return res.status(409).json({
        success: false,
        message:
          "Không thể xóa period vì đang có event thuộc period này",
      });
    }


    return res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
};

module.exports = {
  getAllPeriods,
  createPeriod,
  getPeriodById,
  updatePeriod,
  deletePeriod,
};