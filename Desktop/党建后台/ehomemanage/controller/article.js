const {Router}=require('express');
const router =Router();
const articleModel =require('../model/article');
const auth =require('./auth')

router.post('/',auth,async(req,res,next)=>{
    try{ 
        let {
        title,
        content,
        contentText,
        author,
        img,
        type,
        look_num
    } = req.body;
     const data = await articleModel.create({
        title,
        content,
        contentText,
        author,
        type,
        img,
        look_num
     })
     res.json({
         code:200,
         data,
         msg:'添加文章成功'
     })
    }catch(e){
        next(e)
    }
   
});
router.delete('/:id',auth,async (req,res,next)=>{
    try{
        let {id}= req.params
        const data = await articleModel.findById(id)
        const delData = await data.remove()
        res.json({
            code:200,
            msg:'删除文章成功！'
        })
    }catch(e){
        next(e)
    }
})
router.get('/',async (req,res,next)=>{
    try{
        let {page=1,page_size=20}=req.query
        page=parseInt(page)
        page_size=parseInt(page_size)
        const data = await articleModel.find()
        .skip((page-1)*page_size)
        .limit(page_size)
        .sort({_id:-1})
        .populate({
            path:'author',
            select:"-password"
        })
        .populate({
            path:'type'
        })
        res.json({
            code:200,
            data,
            msg:'获取文章列表成功！'
        })
    }catch(e){
        next(e)
    }
   
    
});
router.get('/:id', auth,async(req,res,next)=>{
    try{
       const {id} = req.params
       const data = await articleModel.findById(id)
       .populate({
           path:'author',
           select:'-password'
       })
       .populate({
           path:'type'
       })
       res.json({
           code:200,
           data,
           msg:'获取文章成功'
       })
    }catch(e){
        next(e)
    }
})
module.exports=router