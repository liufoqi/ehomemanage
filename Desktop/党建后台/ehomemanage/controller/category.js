const {Router} =require('express');
const router =Router()
const categoryModel = require('../model/category')
router.post('/',async(req,res,next)=>{
    try{
        let {title,icon}=req.body
        const data = await categoryModel.create({
           title,
           icon,
        })
        res.json({
            code:200,
            msg:'添加目录成功'
        })
    } catch(e){
        next(e)
    }
})
router.get('/list',async (req,res,next)=>{
    try{
       const data =await categoryModel.find()
    res.json({
        code:200,
        data,
        msg:'获取文章分类成功'
    })
}catch(e){
    next(e)
}
});
module.exports = router
    
   