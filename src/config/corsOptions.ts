import cors from 'cors'

import allowedOrigins from './allowedOrigins'

const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins
};

// Error handler
// const corsOptions = {
//   origin: (origin, callback) => {
//     if (allowedOrigins.includes(origin)) {
//       callback(null, true)
//     } else{
//       callback(new Error('Not alosed by CORS'))
//     }
//   }
// }

export default corsOptions;