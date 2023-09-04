
import { useParams } from 'react-router-dom'
import MovieDetails from './movie/MovieDetails'
import TvDetails from './series/TvDetails'
import Person from './Person'

function SearchItem (props) {
  const { media_type } = useParams()

  return (
    <>
      {media_type === 'movie' && (
        <MovieDetails
          bookmarkedIds={props.bookmarkedIds}
          addBookMark={props.addBookMark}
          favouriteIds={props.favouriteIds}
          addFavourite={props.addFavourite}
          show={props.show}
          handleClose={props.handleClose}
        />
      )}
      {media_type === 'tv' && (
        <TvDetails
          bookmarkedIds={props.bookmarkedIds}
          addBookMark={props.addBookMark}
          favouriteIds={props.favouriteIds}
          addFavourite={props.addFavourite}
          show={props.show}
          handleClose={props.handleClose}
        />
      )}
      {media_type === 'person' && (
        <Person
          bookmarkedIds={props.bookmarkedIds}
          addBookMark={props.addBookMark}
          favouriteIds={props.favouriteIds}
          addFavourite={props.addFavourite}
          show={props.show}
          handleClose={props.handleClose}
        />
      )}
      {media_type !== 'movie' || media_type !== 'tv' || (media_type !== 'person' && 'no result')}
    </>
  )
}

export default SearchItem
