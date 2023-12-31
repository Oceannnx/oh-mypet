const { dbConnect } = require('../dbConnect/database.js')

const fetchMySellPost = async (req, res) => {
  try {
    const client = await dbConnect()
    let paramsID = req.params.id
    if (paramsID === 'me') {
      paramsID = req.cookies.userID
    }
    const result = await client.query(
      `select
      sp._id,
      sp.userID as userID,
      sp.title,
      sp.petType,
      sp.petGene,
      sp.petAge,
      sp.petName,
      sp.petGender,
      sp.petBD,
      sp.petPrice,
      sp.petLocation,
      sp.petImages,
      sp.petDescription,
      sp.petPostDate,
      u.email,
      u.fName,
      u.lName,
      u.profileImg
      from sellPost as sp join user as u on sp.userID = u._id where userID = "${paramsID}" order by petPostDate desc`,
    )
    const MapSellPost = result[0].map((item) => {
      return {
        _id: item._id,
        userID: item.userID,
        title: item.title,
        petType: item.petType,
        petGene: item.petGene,
        petAge: item.petAge,
        petName: item.petName,
        petGender: item.petGender,
        petBD: item.petBD,
        petPrice: item.petPrice,
        petLocation: item.petLocation,
        petImages: item.petImages,
        petDescription: item.petDescription,
        petPostDate: item.petPostDate,
        user: {
          email: item.email,
          fName: item.fName,
          lName: item.lName,
          profileImg: item.profileImg,
        },
      }
    })
    return res.status(200).send(MapSellPost)
  } catch (error) {
    res.status(500).send({ success: false })
  }
}
module.exports = { fetchMySellPost }
