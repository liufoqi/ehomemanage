const {Router} =require('express');
const router = Router();
const  adminUserModel= require('../model/adminUser');
const auth =require('./auth');
//增加管理员
router.post('/',auth,async (req,res,next)=> {
    try{
        let{
            username,
            nickname,
            avatar,
            password,
            desc,
            phone,
            sex,
            job,
    
        }=req.body;
        if(username&&password){
            const data = await  adminUserModel.create({
                username,
                nickname,
                avatar,
                password, 
                desc,
                phone,
                sex,
                job,
            });
            res.json({
                code:200,
                data,
                msg:'添加管路员成功！'
            })
        }else{
            res.json({
                code:401,
                msg:'缺少必要参数'
            })
        }
    }catch (e) {
        next(e)
    }
});
router.post('/login',async(req,res,next)=>{
    try {
        let{
           username,
           password,
        }=req.body;
      if(username&&password){
           const user = await adminUserModel.findOne({username});
          if(user){
              if(password=user.password){
                  req.session.user=user;
                  res.json({
                      code:200,
                      user,
                      msg:'登录成功'
                  })
              }else{
                  res.json({
                      code:401,
                      msg:'密码错误'
                  })
              }
          }else{
              res.json({
                  code:401,
                  msg:'账号不存在'
              })
          }

        }  else{
          res.json({
              code:400,
              msg:'账号或密码为空'
          })
      }
    }catch (e) {
        next(e)
    }
});
router.patch('/update', async(req,res,next)=>{
    try{
        const {id} = req.params
        const{
            _id,
          username,
         nickname,
            avatar,
            password, 
            desc,
            phone,
            sex,
            job
        }=req.body
        const data = await adminUserModel.findById(_id);
        const updateData = await data.update({$set : {username,
            nickname,
            avatar,
            password, 
            desc,
            phone,
            sex,
            job  
        }})
        res.json({
            code:200,
            data:updateData,
            msg:'个人信息修改成功！'
        })
    }catch(e){
        next(e)
    }
})
router.delete('/:id', async (req,res,next)=>{
    try{
        let{id}=req.params
        const data= await adminUserModel.findById(id)
        const deleteData = await data.delete()
        res.json({
         code:200,
         msg:'删除成功！'
        })
    }catch(e){
      next(e)
    }
})
router.get('/list',auth,async (req,res,next)=>{
     try{
         let {page=1,page_size=10} = req.query
         page=parseInt(page)
         page_size=parseInt(page_size)
          const data = await adminUserModel
          .find()
          .skip((page-1)*page_size)
          .limit(page_size)
          .sort({_id:-1})
        
    res.json({
            code:200,
            data,
            msg:'获取管理员列表成功！'
        })

     }catch(e){
       next(e)
     }
});
router.get('/:id', auth,async (req,res,next)=>{
    try{
        const {id} = req.params
    const data = await adminUserModel.findById(id)
        res.json({
            code:200,
            data,
            msg:'获取管理员成功！'
        })
    }catch(e){
        next(e)
    }
})
 module.exports=router;
