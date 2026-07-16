const {
  Event,
  Period,
  User,
} = require("../models");


// ==========================================
// GET ALL EVENTS
// GET /api/events
// ==========================================

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.findAll({
      include: [
        {
          model: Period,
          as: "period",
          attributes: [
            "id",
            "period_name",
            "time_label",
          ],
        },

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
      message: "Lấy danh sách event thành công",
      data: events,
    });

  } catch (error) {
    console.error(
      "Get all events error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
};



// ==========================================
// GET EVENT BY ID
// GET /api/events/:id
// ==========================================

const getEventById = async (req, res) => {
  try {
    const { id } = req.params;


    const event = await Event.findByPk(id, {
      include: [
        {
          model: Period,
          as: "period",
          attributes: [
            "id",
            "period_name",
            "time_label",
          ],
        },

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


    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy event",
      });
    }


    return res.status(200).json({
      success: true,
      message: "Lấy event thành công",
      data: event,
    });

  } catch (error) {
    console.error(
      "Get event by id error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
};



// ==========================================
// CREATE EVENT
// POST /api/events
// ==========================================

const createEvent = async (req, res) => {
  try {
    const {
      period_id,
      event_name,
      time_label,
      description,
      image_url,
    } = req.body;


    // Kiểm tra dữ liệu bắt buộc
    if (!period_id || !event_name) {
      return res.status(400).json({
        success: false,
        message:
          "period_id và event_name là bắt buộc",
      });
    }


    // Kiểm tra Period có tồn tại không
    const period = await Period.findByPk(
      period_id
    );


    if (!period) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy period",
      });
    }


    // Tạo event
    const event = await Event.create({
      period_id,
      event_name,
      created_by: req.user.userId,
      time_label,
      description,
      image_url,
    });


    return res.status(201).json({
      success: true,
      message: "Tạo event thành công",
      data: event,
    });

  } catch (error) {
    console.error(
      "Create event error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
};



// ==========================================
// UPDATE EVENT
// PUT /api/events/:id
// ==========================================

const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      period_id,
      event_name,
      time_label,
      description,
      image_url,
    } = req.body;


    // Tìm event
    const event = await Event.findByPk(id);


    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy event",
      });
    }


    // Không gửi dữ liệu nào
    if (
      period_id === undefined &&
      event_name === undefined &&
      time_label === undefined &&
      description === undefined &&
      image_url === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "Không có dữ liệu để cập nhật",
      });
    }


    // Nếu muốn đổi period
    if (period_id !== undefined) {
      const period = await Period.findByPk(
        period_id
      );


      if (!period) {
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy period mới",
        });
      }


      event.period_id = period_id;
    }


    // Nếu sửa event_name
    if (event_name !== undefined) {
      if (!event_name.trim()) {
        return res.status(400).json({
          success: false,
          message:
            "event_name không được để trống",
        });
      }

      event.event_name = event_name;
    }


    // Các field còn lại
    if (time_label !== undefined) {
      event.time_label = time_label;
    }


    if (description !== undefined) {
      event.description = description;
    }


    if (image_url !== undefined) {
      event.image_url = image_url;
    }


    await event.save();


    return res.status(200).json({
      success: true,
      message: "Cập nhật event thành công",
      data: event,
    });

  } catch (error) {
    console.error(
      "Update event error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
};



// ==========================================
// DELETE EVENT
// DELETE /api/events/:id
// ==========================================

const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;


    const event = await Event.findByPk(id);


    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy event",
      });
    }


    await event.destroy();


    return res.status(200).json({
      success: true,
      message: "Xóa event thành công",
    });

  } catch (error) {
    console.error(
      "Delete event error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
};



// ==========================================
// GET EVENTS BY PERIOD
// GET /api/periods/:periodId/events
// ==========================================

const getEventsByPeriod = async (req, res) => {
  try {
    const {
      periodId,
    } = req.params;


    // Kiểm tra period tồn tại
    const period = await Period.findByPk(
      periodId
    );


    if (!period) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy period",
      });
    }


    const events = await Event.findAll({
      where: {
        period_id: periodId,
      },

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
      message:
        "Lấy danh sách event của period thành công",

      data: {
        period: {
          id: period.id,
          period_name: period.period_name,
          time_label: period.time_label,
        },

        events,
      },
    });

  } catch (error) {
    console.error(
      "Get events by period error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
};



module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventsByPeriod,
};