import axios from "axios";

axios.defaults.baseURL = process.env.BACKEND_HOST;

const playAxios = async () => {
  const res = await axios.get("/play");
  console.log(res);
  return res.data;
};

const completeAxios = async (data, email) => {
  const res = await axios.post("/complete", { data: data, email: email });
  console.log(res);
  return res.data;
};

export { playAxios, completeAxios };
