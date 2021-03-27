module.exports.isAdmin = (req, res, next) => {
    const { role } = req.user
    if(role === "admin"){
        next()  //ถ้าใช่ Admin จะทำงานต่อได้
    }else{
        return res.status(403).json({
            error: {
                message : "ไม่มีสิทธิ์ใช้งานส่วนนี้ เฉพาะ Admin เท่านั้น"
            }
        })
    }
}
