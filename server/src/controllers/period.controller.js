const {
  Period,
  User,
} = require("../models");


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


const createPeriod = async (req, res) => {
  try {
    const {
      period_name,
      time_label,
    } = req.body;

    if (!period_name) {
      return res.status(400).json({
        success: false,
        message: "period_name là bắt buộc",
      });
    }

    const period = await Period.create({
      period_name: period_name,

      time_label: time_label,

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

const getPeriodById = async (req, res) => {
  try {
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

    const period = await Period.findByPk(id);

    if (!period) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy period",
      });
    }


    if (
      period_name === undefined &&
      time_label === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "Không có dữ liệu để cập nhật",
      });
    }


    if (period_name !== undefined) {
      const cleanPeriodName = period_name.trim();
      if (!cleanPeriodName) {
        return res.status(400).json({
          success: false,
          message: "period_name không được để trống",
        });
      }

      period.period_name = cleanPeriodName;
    }


    if (time_label !== undefined) {
      const cleanTimeLabel = time_label?.trim();

      period.time_label = cleanTimeLabel || null;
    }


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


const deletePeriod = async (req, res) => {
  try {
    const { id } = req.params;

    const period = await Period.findByPk(id);


    if (!period) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy period",
      });
    }


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