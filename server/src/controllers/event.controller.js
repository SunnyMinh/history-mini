const fs = require("fs");
const path = require("path");
const {
  Event,
  Period,
  User,
} = require("../models");

function getUploadedImageUrl(file) {
  if (!file) {
    return null;
  }

  return (
    `/uploads/events/${file.filename}`
  );
}

function deleteEventImage(
  imageUrl
) {
  if (
    !imageUrl ||
    !imageUrl.startsWith(
      "/uploads/events/"
    )
  ) {
    return;
  }

  const fileName =
    path.basename(imageUrl);

  const filePath =
    path.resolve(
      __dirname,
      "../../uploads/events",
      fileName
    );

  fs.unlink(
    filePath,
    (error) => {
      if (
        error &&
        error.code !== "ENOENT"
      ) {
        console.error(
          "Delete image file error:",
          error
        );
      }
    }
  );
}

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

const createEvent = async (
  req,
  res
) => {
  try {
    const {
      period_id,
      event_name,
      time_label,
      description,
    } = req.body;

    if (
      !period_id ||
      !event_name?.trim()
    ) {
      deleteEventImage(
        getUploadedImageUrl(
          req.file
        )
      );

      return res.status(400).json({
        success: false,
        message:
          "period_id và event_name là bắt buộc",
      });
    }

    const period =
      await Period.findByPk(
        period_id
      );

    if (!period) {
      deleteEventImage(
        getUploadedImageUrl(
          req.file
        )
      );

      return res.status(404).json({
        success: false,
        message:
          "Không tìm thấy period",
      });
    }

    const imageUrl =
      getUploadedImageUrl(
        req.file
      );

    const event =
      await Event.create({
        period_id,

        event_name:
          event_name.trim(),

        created_by:
          req.user.userId,

        time_label:
          time_label?.trim() ||
          null,

        description:
          description?.trim() ||
          null,

        image_url:
          imageUrl,
      });

    return res.status(201).json({
      success: true,
      message:
        "Tạo event thành công",
      data: event,
    });
  } catch (error) {
    deleteEventImage(
      getUploadedImageUrl(
        req.file
      )
    );

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

const updateEvent = async (
  req,
  res
) => {
  let newImageUrl = null;

  try {
    const { id } =
      req.params;

    const {
      period_id,
      event_name,
      time_label,
      description,
    } = req.body;

    newImageUrl =
      getUploadedImageUrl(
        req.file
      );

    const event =
      await Event.findByPk(id);

    if (!event) {
      deleteEventImage(
        newImageUrl
      );

      return res.status(404).json({
        success: false,
        message:
          "Không tìm thấy event",
      });
    }

    const hasTextData =
      period_id !== undefined ||
      event_name !== undefined ||
      time_label !== undefined ||
      description !== undefined;

    if (
      !hasTextData &&
      !req.file
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Không có dữ liệu để cập nhật",
      });
    }

    if (
      period_id !== undefined
    ) {
      const period =
        await Period.findByPk(
          period_id
        );

      if (!period) {
        deleteEventImage(
          newImageUrl
        );

        return res.status(404).json({
          success: false,
          message:
            "Không tìm thấy period mới",
        });
      }

      event.period_id =
        period_id;
    }

    if (
      event_name !== undefined
    ) {
      const cleanEventName =
        event_name.trim();

      if (!cleanEventName) {
        deleteEventImage(
          newImageUrl
        );

        return res.status(400).json({
          success: false,
          message:
            "event_name không được để trống",
        });
      }

      event.event_name =
        cleanEventName;
    }

    if (
      time_label !== undefined
    ) {
      event.time_label =
        time_label.trim() ||
        null;
    }

    if (
      description !== undefined
    ) {
      event.description =
        description.trim() ||
        null;
    }

    const oldImageUrl =
      event.image_url;

    if (req.file) {
      event.image_url =
        newImageUrl;
    }

    await event.save();

    if (
      req.file &&
      oldImageUrl !==
        newImageUrl
    ) {
      deleteEventImage(
        oldImageUrl
      );
    }

    return res.status(200).json({
      success: true,
      message:
        "Cập nhật event thành công",
      data: event,
    });
  } catch (error) {
    deleteEventImage(
      newImageUrl
    );

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

    const imageUrl =
      event.image_url;

    await event.destroy();

    deleteEventImage(
      imageUrl
    );

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

const getEventsByPeriod = async (req, res) => {
  try {
    const { periodId } = req.params;

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