import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { AxiosLib } from '../../lib/axios'
import { useState } from 'react'
import { Post } from '../../components/Post'
import { Footer } from '../../components/Footer'
import Swal from 'sweetalert2'

export const Filter = () => {
  const { animals } = useParams()
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const fetchFilterSellPost = async () => {
    try {
      const result = await AxiosLib.get(`/api/fetchFilterSellPost/${animals}`)
      setPosts(result.data)
      setIsLoading(false)
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message,
      })
    }
  }

  useEffect(() => {
    fetchFilterSellPost()
  }, [animals])

  return (
    <>
      {isLoading ? (
        <div className="h-screen bg-[#FFFDF3] flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue1"></div>
        </div>
      ) : (
        <div className="flex justify-around flex-wrap lg:grid grid-cols-4 justify-items-center auto-cols-auto gap-y-10 bg-secondaryColor py-8 md:m-3 m-6">
          {posts.map((post, index) => {
            return (
              <Post
                key={index}
                userId={post.user._id}
                email={post.user.email}
                fName={post.user.fName}
                lName={post.user.lName}
                profileImg={post.user.profileImg}
                title={post.title}
                petType={post.petType}
                price={post.petPrice}
                location={post.petLocation}
                petImage={post.petImages}
                postDate={post.petPostDate}
                postId={post._id}
              />
            )
          })}
        </div>
      )}
      <Footer />
    </>
  )
}
