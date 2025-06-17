const prisma = require("../../config/db.config")

exports.findByAny = async(query)=>{
    const result = await prisma.user.findFirst({
        where:query,
        include : {
            // post : {
            //     select : {
            //         title : true,
            //         description : true
            //     }
            // }
            post : true,
            _count:{
                select:{
                    post:true,
                    comment:true
                }
            }
        }
    })
    return result
}

exports.updateAny = async(id,data) => {
    const result = await prisma.user.update({
        where:{
            id : Number(id)
        },
        data:data
    })
    return result;
}


exports.createAny = async(data) => {
    const result = await prisma.user.create({
        data:data
    })

    return result
}

exports.getById = async(id) => {
    const result = await prisma.user.findFirst({
        where:{
            id : Number(id)
        }
    })
    return result;
}