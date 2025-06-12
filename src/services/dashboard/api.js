import axios from "../../utils/axios";
import { checkAndSaveToken } from "../../utils/tokenManager";

export const getDashboard = async () => {
    const response = await axios.get(`?action=getDashboard`);
    checkAndSaveToken(response);
    return response;
}