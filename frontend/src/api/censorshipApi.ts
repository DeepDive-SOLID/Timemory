import api from "./axios";

export const checkCensorship = async (content: string): Promise<boolean> => {
  try {
    const res = await api.post<boolean>(
      "/censorship/checkContent",
      content,
      {
        headers: { "Content-Type": "text/plain" },
      }
    );
    return res.data;
  } catch (err) {
    console.error("Censorship API error:", err);
    return false; // 실패하면 그냥 통과시킴
  }
};
