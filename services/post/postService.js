const prisma = require("../../config/db.config")

exports.findByAny = async(query)=>{
    const result = await prisma.post.findFirst({
        where:query
    })
    return result
}

exports.updateAny = async(id,data) => {
    const result = await prisma.post.update({
        where:{
            id : Number(id)
        },
        data:data
    })
    return result;
}


exports.createAny = async(data) => {
    const result = await prisma.post.create({
        data:data
    })

    return result
}

exports.getById = async(id) => {
    const result = await prisma.post.findFirst({
        where:{
            id : Number(id)
        }
    })
    return result;
}


// exports.getAll = async(where, limit, skip)=>{
//     const result = await prisma.post.findMany({
//         skip:skip,
//         take:limit,
//         where : {
//             OR :[
//             { title : {
//                 search : search
//              }},
//              {description : {
//                 search : search
//              }}  
//             ]
//         } 
//     })
//     return result;
// }

exports.getAll = async (where, limit, skip) => {
    const [totalPosts, posts] = await prisma.$transaction([
        prisma.post.count({ where }),
        prisma.post.findMany({
    where,
    skip,
    take: limit,
    orderBy: { createdAt: 'desc' },
    include: {
      user: true, 
      _count: { select: { comment: true } },
    },
})
    ])
  return { totalPosts, posts };
};