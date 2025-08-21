import axios from "axios"
import type { LtListDto } from "../types/map";



export const getLtList = async (teamId:number) => {
    const res = await axios.post<LtListDto[]>("http://localhost:8080/capsule/lt/getLtList",teamId ,{
        headers: { "Content-Type": "application/json" },
      });;
    return res.data;
}