// models/todo.js
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static async addTask(params) {
      return await Todo.create(params);
    }

    static async showList() {
      console.log("My Todo list \n");

      console.log("Overdue");
      const overdueTask= await Todo.overdue();
      let arr2 = overdueTask
        .map((todo) => todo.displayableString())
        .join("\n");
      console.log(arr2);
      console.log("\n");

      console.log("Due Today");
      // FILL IN HERE
      const dueTodayLst = await Todo.dueToday();
      arr2 = dueTodayLst.map((todo) => todo.displayableString()).join("\n");
      console.log(arr2);
      console.log("\n");

      console.log("Due Later");
      // FILL IN HERE
      const dueLaterLst = await Todo.dueLater();
      arr2 = dueLaterLst.map((todo) => todo.displayableString()).join("\n");
      console.log(arr2);
    }

    static async overdue() {
      // FILL IN HERE TO RETURN OVERDUE ITEMS
      const { Op } = require("sequelize");
      let dte = new Date().toISOString().split("T")[0];
      let arr1 = await Todo.findAll({
        where: {
          dueDate: {
            [Op.lt]: dte,
          },
        },
      });
      return arr1;
    }

    static async dueToday() {
      // FILL IN HERE TO RETURN ITEMS DUE tODAY
      const { Op } = require("sequelize");
      let dte = new Date().toISOString().split("T")[0];
      let arr1 = await Todo.findAll({
        where: {
          dueDate: {
            [Op.eq]: dte,
          },
        },
      });

      return arr1;
    }

    static async dueLater() {
      // FILL IN HERE TO RETURN ITEMS DUE LATER
      const { Op } = require("sequelize");
      let dte = new Date().toISOString().split("T")[0];
      let arr1 = await Todo.findAll({
        where: {
          dueDate: {
            [Op.gt]: dte,
          },
        },
      });

      return arr1;
    }

    static async markAsComplete(id) {
      // FILL IN HERE TO MARK AN ITEM AS COMPLETE
      await Todo.update(
        { completed: true },
        {
          where: {
            id: id,
          },
        },
      );
    }

    displayableString() {
      const dte = new Date().toISOString().split("T")[0];
      if (this.dueDate == dte) {
        let checkbox = this.completed ? "[x]" : "[ ]";
        return `${this.id}. ${checkbox} ${this.title}`;
      } else {
        let checkbox = this.completed ? "[x]" : "[ ]";
        return `${this.id}. ${checkbox} ${this.title} ${this.dueDate}`;
      }
    }
  }
  Todo.init(
    {
      title: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Todo",
    },
  );
  return Todo;
};