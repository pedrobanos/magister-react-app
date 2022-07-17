import apiHttp from "./BaseServiceApi";
import imagesApiHttp from "./BaseServiceApiImages";

export const getComments = () =>apiHttp.get('/comments')
export const getPhotos = () => imagesApiHttp.get ('https://picsum.photos/v2/list?page=5&limit=10')
