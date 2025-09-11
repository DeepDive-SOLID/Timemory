import axios from "axios";

export const checkCensorship = async (content: string): Promise<boolean> => {
  try {
    const res = await axios.post<boolean>(
      "/api/censorship/checkContent",
      content,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return res.data;
  } catch (err) {
    console.error("Censorship API error:", err);
    return false; // 실패하면 그냥 통과시킴
  }
};
