import defaultHeadings from "../../JSON/defaultHeadings";
const DefaultPanel = {
  get heading() {
    const currentHour = new Date().getHours();
    for (const [from, till, greeting] of defaultHeadings) {
      if (currentHour >= from && currentHour <= till) return greeting[language];
    }
  },
  get content() {},
};

export default DefaultPanel;
