import { v2 as cloudinary } from 'cloudinary';

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  useFactory: () => {
    return cloudinary.config({
      cloud_name: 'dbmj1ajrv',
      api_key: '951342522286217',
      api_secret: 'e8YAWBKGyLji5Ft57lNemzdmdOQ',
    });
  },
};
