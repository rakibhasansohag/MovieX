import { useSelector } from "react-redux";

import "./genres.scss";

const Genres = ({ data }) => {
  const { genres } = useSelector((state) => state.home);

  return (
    <div className="genres">
      {data?.map((genreId) => {
        const genre = genres[genreId];
        if (!genre || !genre?.name) return null;
        return (
          <div key={genreId} className="genre">
            {genre?.name}
          </div>
        );
      })}
    </div>
  );
};

export default Genres;
