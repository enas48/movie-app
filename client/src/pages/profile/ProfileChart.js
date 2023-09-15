import React, { useState, useEffect } from 'react'
import { Cell, Legend, PieChart, Pie } from 'recharts'
import axios from 'axios'
function ProfileChart ({ profileUserId }) {
  const [moviebookmarkedIds, setmovieBookMarkedId] = useState(0)
  const [moviefavouriteIds, setmovieFavouriteId] = useState(0)
  const [moviewatchedIds, setmovieWatchedId] = useState(0)
  const [tvbookmarkedIds, settvBookMarkedId] = useState(0)
  const [tvfavouriteIds, settvFavouriteId] = useState(0)
  const [tvwatchedIds, settvWatchedId] = useState(0)

  const piedataMovie = [
    { name: 'Wishlist movie', value: moviebookmarkedIds },
    { name: ' Favourites movie', value: moviefavouriteIds },
    { name: ' Watched movie', value: moviewatchedIds }
  ]
  const piedataTv = [
    { name: 'Wishlist tv series', value: tvbookmarkedIds },
    { name: ' Favourites tv series', value: tvfavouriteIds },
    { name: ' Watched tv series', value: tvwatchedIds }
  ]
  const COLORS = ['#eab414', '#dc3545', '#0ed40e']
  const RADIAN = Math.PI / 180
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text
        x={x}
        y={y}
        fill='white'
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline='central'
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }
  const fetchBookmarks = async () => {
    try {
      const result = await axios(
        `${process.env.REACT_APP_APP_URL}/bookmarks/${profileUserId}`,
        {
          headers: {
            Accept: 'application/json'
          }
        }
      )
      if (result.data.bookmark) {
        let movieBookMarkedIds = result.data.bookmark.filter(
          item => item.type === 'movie'
        )

        setmovieBookMarkedId(movieBookMarkedIds.length)
        let tvBookMarkedIds = result.data.bookmark.filter(
          item => item.type === 'tv'
        )

        settvBookMarkedId(tvBookMarkedIds.length)
      }
    } catch (err) {
      console.log(err)
    }
  }
  const fetchFavourites = async () => {
    try {
      const result = await axios(
        `${process.env.REACT_APP_APP_URL}/favourites/${profileUserId}`,
        {
          headers: {
            Accept: 'application/json'
          }
        }
      )
      if (result.data.favourite) {
        let movieFavouritesIds = result.data.favourite.filter(
          item => item.type === 'movie'
        )

        setmovieFavouriteId(movieFavouritesIds.length)
        let tvFavouriteIds = result.data.favourite.filter(
          item => item.type === 'tv'
        )

        settvFavouriteId(tvFavouriteIds.length)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const fetchWatched = async () => {
    try {
      const result = await axios(
        `${process.env.REACT_APP_APP_URL}/watched/${profileUserId}`,
        {
          headers: {
            Accept: 'application/json'
          }
        }
      )
      if (result.data.watched) {
        let movieWatchedIds = result.data.watched.filter(
          item => item.type === 'movie'
        )

        setmovieWatchedId(movieWatchedIds.length)
        let tvWatchedIds = result.data.watched.filter(
          item => item.type === 'tv'
        )

        settvWatchedId(tvWatchedIds.length)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchBookmarks()
    fetchFavourites()
    fetchWatched()
  }, [])
  return (
    <div className='d-flex flex-wrap gap-5 justify-content-center align-items-center'>
      <PieChart width={230} height={280}>
        <Pie
          data={piedataMovie}
          labelLine={false}
          label={renderCustomizedLabel}
          cx='50%'
          cy='50%'
          innerRadius={60}
          outerRadius={80}
          fill='#8884d8'
          paddingAngle={5}
          dataKey='value'
        >
          {piedataMovie.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend />
      </PieChart>
      <PieChart width={230} height={280}>
        <Pie
          data={piedataTv}
          labelLine={false}
          label={renderCustomizedLabel}
          cx='50%'
          cy='50%'
          innerRadius={60}
          outerRadius={80}
          fill='#8884d8'
          paddingAngle={5}
          dataKey='value'
        >
          {piedataTv.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend />
      </PieChart>
    </div>
  )
}
export default ProfileChart
