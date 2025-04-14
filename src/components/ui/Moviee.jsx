// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import React, { useEffect, useRef, useState } from "react";
// import { Link } from "react-router-dom/cjs/react-router-dom.min";
// import Movies from "../../pages/Movies";

// const Moviee = ({ movie }) => {
//   const [img, setImg] = useState();

//   const mountedRef = useRef(true);

//   useEffect(() => {
//     const image = new Image();
//     image.src = movie.url;
//     image.onload = () => {
//       setTimeout(() => {
//         if (mountedRef.current) {
//           setImg(image);
//         }
//       }, 300);
//     };
//     return () => {
//       // when the component unmounts
//       mountedRef.current = false;
//     }
//   });

//   return (
//     <div className="book">
//       {img ? (
//         <>
//           <Link to={`/movies/${movie.imdbID}`}>
//             <figure className="book__img--wrapper">
//               <img src={img.src} alt="" className="book__img" />
//             </figure>
//           </Link>
//           <div className="book__title">
//             <Link to={`/movies/${movie.imdbID}`} className="book__title--link">
//               {movie.Title}
//             </Link>
//           </div>
//           <Movies Year={movie.Year} />
//           <Movies Poster={movie.Poster} />
//         </>
//       ) : (
//         <>
//           <div className="book__img--skeleton">
//             <div className="skeleton book__title--skeleton"></div>
//             <div className="skeleton book__rating--skeleton"></div>
//             <div className="skeleton book__price--skeleton"></div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Moviee;
