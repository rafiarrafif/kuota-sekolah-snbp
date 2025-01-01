import axios from "axios";

export default defineEventHandler(async () => {
  try {
    const response = await axios.get(
      "https://snpmb.bppp.kemdikbud.go.id/ajax/id:0/master:0"
    );
    return response.data;
  } catch (error) {
    return error;
  }
});
