const express = require ('express')
const router = express.Router();
const Person = require('../models/Person');
const {jwtAuthMiddleWare,generateToken} = require('../jwt')


router.post('/signup',async (req, res) => {
    try {

        const data = req.body

        const newPerson = new Person(data);

       const response = await newPerson.save();
       console.log('Saved Data');

       const payload = {
        id: response.id,
        username:response.username
       }
       console.log(JSON.stringify(payload));

       const token = generateToken(payload);
       console.log('Token is :', token)
       res.status(200).json({respone:response, token:token})}

 catch (error) {
        console.log('Error details:', error)
        res.status(500).json({error:'Internal Server Error'})
       
       
    }


});


router.post('/login', async (req,res)=>{
    try {
        const {username,password} = req.body;
        const user = await Person.findOne({username: username});
        if(!user || !(await user.comparePassword(password))){
          return res.status(401).json({error:'Invalid username or password'});

        }

        const payload = {
            id : user.id,
            username:user.username
        }

        const token = generateToken(payload);

        res.json({token})
    } catch (error) {
        res.status(500).json({error:'Internal Server Error'})
       
        
    }
})

router.get('/profile',jwtAuthMiddleWare,async(req,res)=>{
    try{
    const userData = req.user;
    console.log('User data',userData);
    const userId = userData.id;
    const user = await Person.findById(userId);

    res.status(200).json({user});
}catch(error){
    console.log(error);
    res.status(500).json({error:'Internal Server error'});

}
})

router.get('/',jwtAuthMiddleWare,async(req,res)=>{
        try {
            const data = await Person.find();
            console.log('Data successfully geted')
       res.status(200).json(data)

        } catch (error) {
            
             res.status(500).json({error:'Internal Server Error'})
       
     }

});

router.get('/:workType', async (req,res)=> {
    try {
            const workType = req.params.workType;
    if(workType == 'chef' || workType == 'manager' || workType == 'waiter'){  
        const response = await Person.find({work:workType});
        console.log('Work type successfully added')
        res.status(200).json(response);


    }else{
        res.status(400).json({error:'Invalid work type'});
    }
        
    } catch (error) {
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
       
    }

})

router.put('/:id', async (req,res)=>{
    try {
        const personId = req.params.id;
        const updatePersonData = req.body;

        const response = await Person.findByIdAndUpdate(personId,updatePersonData,{
            new : true,
            runValidators:true,
        })

        if(!response){
            return res.status(404).json({error:'Person not found'});
        }

        console.log('data updated')
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Internal Server Error'});

        
    }
})

router.delete('/:id',async (req,res)=>{
    try {
       const personId = req.params.id;
       
       const response = await Person.findByIdAndDelete(personId);
       if(!response){
            return res.status(404).json({error:'Person not found'});
        }
        console.log('data deleted successfully')
        res.status(200).json(response);
        
    } catch (error) {

        console.log(error)
        res.status(500).json({error:'Internal Server Error'})
        
    }
})


module.exports = router;