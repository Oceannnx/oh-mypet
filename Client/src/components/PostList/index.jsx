import { Post } from '../Post'
import { AxiosLib } from '../../lib/axios'
import { useEffect, useState } from 'react'
import { Footer } from '../Footer'
import Swal from 'sweetalert2'

export const PostList = (props) => {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { accountID } = props || ''
  const fetchSellPost = async () => {
    try {
      const result = await AxiosLib.get(`/api/fetchMySellPost/${accountID}`)
      setPosts(result.data)
      setIsLoading(false)
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Oops...', text: error.message })
    }
  }
  useEffect(() => {
    fetchSellPost()
  }, [])
  return (
    <section className=" bg-[#FFFDF4]">
      {isLoading ? (
        <div className="flex justify-center items-center h-screen bg-[#FFFDF3]">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue1"></div>
        </div>
      ) : (
        <div className="flex justify-around flex-wrap xl:grid grid-cols-4 justify-items-center gap-y-10 py-8 mx-6">
          {posts.map((post, index) => {
            return (
              <Post
                key={index}
                userId={post.userID}
                email={post.user.email}
                fName={post.user.fName}
                lName={post.user.lName}
                profileImg={post.user.profileImg}
                title={post.title}
                price={post.petPrice}
                petType={post.petType}
                location={post.petLocation}
                petImage={post.petImages}
                postDate={post.petPostDate}
                postId={post._id}
              />
            )
          })}
        </div>
      )}
      <Footer></Footer>
    </section>
  )
}
