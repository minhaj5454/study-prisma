const prisma = require("../../config/db.config")

exports.findByAny = async(query)=>{
    const result = await prisma.comment.findFirst({
        where:query
    })
    return result
}

exports.updateAny = async(id,data) => {
    const result = await prisma.comment.update({
        where:{
            id : Number(id)
        },
        data:data
    })
    return result;
}


exports.createAny = async(data) => {
    const result = await prisma.comment.create({
        data:data
    })

    return result
}

exports.getById = async(id) => {
    const result = await prisma.comment.findFirst({
        where:{
            id : Number(id)
        }
    })
    return result;
}

exports.getAll = async()=>{
    const result = await prisma.comment.findMany({
        include : {
            user:true,
            post:{
                include:{
                    user:true
                }
            }
        },
        orderBy:{
            createdAt : "desc"
        }
    })
    return result
}