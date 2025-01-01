import axios from "axios";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const id = body?.id || "Gak ada";
  try {
    const response = await axios.get(
      `https://snpmb.bppp.kemdikbud.go.id/ajax/id:${id}/master:2`
    );
    return response.data;
  } catch (error) {
    return error;
  }
});
