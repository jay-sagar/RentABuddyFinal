const { default: axios } = require("axios");

const API_KEY=process.env.NEXT_PUBLIC_STRAPI_API_KEY;

const axiosClient = axios.create({
    baseURL: 'https://rentabuddy-strapi.onrender.com/',
    headers: {
        'Authorization': `Bearer ${API_KEY}`
    }
});

const getCategory = () => axiosClient.get('/categories?populate=*');

const getCastList = () => axiosClient.get('/casts?populate=*');

const getCastByCategory = (category) => axiosClient.get('/casts?filters[categories][Name][$in]=' + category + "&populate=*");

const getCastById = (id) => axiosClient.get('/casts/' + id + "?populate=*");

const bookAppointment = (data) => axiosClient.post('/appointments', data);

const getUserBookingList = (userEmail) => axiosClient.get("/appointments?[filters][Email][$eq]=" + userEmail + "&populate=[casts][image][populate][0]=url&populate=*");

const deleteBooking = (id) => axiosClient.delete('/appointments/' + id);

const getAllPeople = () => axiosClient.get('/casts');

const addCast = (data) => axiosClient.post('/casts', data);


export default {
    getCategory,
    getCastList,
    getCastByCategory,
    getCastById,
    bookAppointment,
    getUserBookingList,
    deleteBooking,
    getAllPeople,
    addCast
}
