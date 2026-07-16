const fs = require("fs");
const path = require("path");
const { sequelize, Period, Event } = require("../models");

async function importHistoryData() {
  let transaction;

  try {
    const filePath = path.join(
      __dirname,
      "../data/history-data.json"
    );

    const historyData = JSON.parse(
      fs.readFileSync(filePath, "utf8")
    );

    const periodCount = await Period.count();
    const eventCount = await Event.count();

    if (periodCount > 0 || eventCount > 0) {
      throw new Error(
        `Database đã có ${periodCount} Period và ${eventCount} Event.`
      );
    }

    transaction = await sequelize.transaction();

    for (const periodData of historyData) {
      const period = await Period.create(
        {
          period_name: periodData.name,
          time_label: periodData.time_label || null,
          created_by: 1,
        },
        { transaction }
      );

      for (const eventData of periodData.events || []) {
        await Event.create(
          {
            period_id: period.id,
            event_name: eventData.name,
            time_label: eventData.time_label || null,
            description: eventData.description || null,
            image_url: eventData.image_url || null,
            created_by: 1,
          },
          { transaction }
        );
      }
    }

    await transaction.commit();
    console.log("Import dữ liệu thành công.");
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }

    console.error("Import thất bại:", error.message);
  } finally {
    await sequelize.close();
  }
}

importHistoryData();